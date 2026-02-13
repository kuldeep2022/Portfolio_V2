"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingContent, setStreamingContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    setError(null);
    const userMessage = { role: "user", content: inputValue, id: Date.now().toString() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setStreamingContent("");
    
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage.content }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Request failed (${response.status})`);
      }

      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let buffer = "";
        while (!done) {
          const chunk = await reader.read();
          done = chunk.done;
          if (chunk.value) {
            buffer += decoder.decode(chunk.value, { stream: true });
            setStreamingContent(buffer);
          }
        }
        const finalText = buffer.trim();
        if (finalText) {
          setMessages(prev => [...prev, { role: "assistant", content: finalText, id: Date.now().toString() }]);
        }
      } else {
        const text = await response.text();
        setMessages(prev => [...prev, { role: "assistant", content: text, id: Date.now().toString() }]);
      }
    } catch (error: any) {
      console.error("Error calling complete:", error);
      setError(error.message || "Connection issue. Please try again.");
    } finally {
      setIsLoading(false);
      setStreamingContent("");
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl hover:bg-white/20 transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Sparkles className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-semibold text-white">Virtual Kuldeep</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10" ref={scrollRef}>
              {messages.length === 0 && (
                <div className="text-center text-neutral-500 mt-20">
                  <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Ask me anything about Kuldeep's experience!</p>
                </div>
              )}
              
              {messages.map((m: any, index: number) => (
                <motion.div
                  key={m.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex mb-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-sm'
                        : 'bg-neutral-800 text-neutral-200 rounded-tl-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && streamingContent && (
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-4"
                >
                  <div className="max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap bg-neutral-800 text-neutral-200 rounded-tl-sm">
                    {streamingContent}
                  </div>
                </motion.div>
              )}
              
              {isLoading && !streamingContent && (
                <div className="flex justify-start">
                  <div className="bg-neutral-800 p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-center my-2">
                  <span className="text-xs text-red-400 bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
                    {error}
                  </span>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleFormSubmit} className="p-4 border-t border-white/10 bg-white/5">
              <div className="relative">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-neutral-900/50 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-1 top-1 p-2 bg-blue-600 rounded-full hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
