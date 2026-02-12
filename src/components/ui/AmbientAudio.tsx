"use client";

import { useEffect, useRef, useState } from "react";

export function AmbientAudio() {
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataRef = useRef<Uint8Array | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const start = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      const buffer = new Uint8Array(analyser.frequencyBinCount);
      analyserRef.current = analyser;
      dataRef.current = buffer;

      const tick = () => {
        if (!analyserRef.current || !dataRef.current) return;
        analyserRef.current.getByteTimeDomainData(dataRef.current as any);
        let sum = 0;
        for (let i = 0; i < dataRef.current.length; i += 1) {
          const v = dataRef.current[i] - 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / dataRef.current.length) / 128;
        const level = Math.min(1, rms * 3);
        document.documentElement.style.setProperty("--ambient-level", level.toFixed(3));
        rafRef.current = requestAnimationFrame(tick);
      };

      tick();
      setEnabled(true);
    } catch (err: any) {
      setError("Microphone access blocked.");
      setEnabled(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => {
        if (!enabled) start();
      }}
      className="ambient-toggle"
    >
      {enabled ? "Ambient Live" : "Enable Ambient"}
      {error ? <span className="ambient-error">{error}</span> : null}
    </button>
  );
}
