import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const steps = [
  "wrangling outliers",
  "smoothing curves",
  "calibrating colourways",
  "squaring the treemap",
  "plotting molehills",
  "aligning the axis",
  "beautifying information",
];

export default function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const DUR = 2100;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DUR);
      setPct(Math.round(p * 100));
      setStep(Math.min(steps.length - 1, Math.floor(p * steps.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 320);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-paper"
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="w-[min(420px,80vw)]">
        <div className="flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
          <span className="text-paper/50">iib://loading</span>
          <span className="text-tangerine">{String(pct).padStart(3, "0")}%</span>
        </div>
        <div className="mt-3 h-px w-full bg-paper/15">
          <motion.div className="h-px bg-tangerine" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70">
          <span className="animate-blink inline-block h-1.5 w-1.5 rounded-full bg-teal" />
          <span>{steps[step]}…</span>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30">
        fig. 0 — the void, before the data
      </div>
    </motion.div>
  );
}
