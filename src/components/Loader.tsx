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

const easePlayful = [0.175, 0.885, 0.32, 1.275] as const;
const easePremium = [0.05, 0.7, 0.1, 1] as const;

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: easePremium } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-paper"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: easePremium, delay: 0.1 }}
        className="w-[min(420px,80vw)]"
      >
        <div className="flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
          <span className="text-paper/50">iib://loading</span>
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.3, ease: easePlayful }}
            className="text-tangerine"
          >
            {String(pct).padStart(3, "0")}%
          </motion.span>
        </div>
        <div className="mt-3 h-px w-full bg-paper/15 overflow-hidden">
          <motion.div
            className="h-px bg-tangerine"
            style={{ width: `${pct}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: pct / 100 }}
            transition={{ duration: 0.4, ease: easePlayful }}
            transformOrigin="left center"
          />
        </div>
        <div className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70">
          <span className="animate-blink inline-block h-1.5 w-1.5 rounded-full bg-teal" />
          <motion.span
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3, ease: easePremium }}
          >
            {steps[step]}…
          </motion.span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="pointer-events-none absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 animate-ambient-float"
      >
        fig. 0 — the void, before the data
      </motion.div>
    </motion.div>
  );
}