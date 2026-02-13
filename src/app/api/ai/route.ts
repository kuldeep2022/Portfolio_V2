import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const runtime = "nodejs";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { prompt, messages } = body || {};
    const normalizedPrompt = prompt || messages?.[messages.length - 1]?.content || "";

    console.log("[AI API] Triggered with prompt:", normalizedPrompt.substring(0, 30));

    if (!normalizedPrompt) {
      return new Response("No prompt provided", { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error("[AI API] Missing GOOGLE_GENERATIVE_AI_API_KEY");
      return new Response("API Key missing on server", { status: 500 });
    }

    console.log("[AI API] Calling streamText with models/gemini-1.5-flash");

    const result = await streamText({
      model: google("models/gemini-flash-latest"),
      system: `You are "Virtual Kuldeep", an AI assistant for Kuldeep Dave's portfolio website.

About Kuldeep:
- Senior Software Engineer at Meta (Nov 2025 - Present).
- Expert in: Kubernetes, Azure DevOps, React, Next.js, Java, Python.
- Location: Greater Seattle Area.

Key Achievements:
- Redesigned mobility app for legacy systems at GM (40% productivity boost).
- Reduced app crash rates by 20% through rigorous testing.
- Implemented CI/CD pipelines reducing deployment time by 30%.

Your Personality:
- Professional, concise, and helpful.
- You answer as if you are Kuldeep's digital representative.
- If asked about contact, direct them to the "Hire Me" form or email davekuldeep98@gmail.com.
- Keep responses short and punchy (Apple-style minimalism).`,
      messages: messages?.[0]?.content ? messages : [{ role: "user", content: normalizedPrompt }],
    });

    console.log("[AI API] Returning stream response");
    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("[AI API] CRITICAL ERROR:", error);
    // Return the error as plain text so the frontend catch block can at least see it
    return new Response(`Server Error: ${error.message || "Unknown error"}`, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
