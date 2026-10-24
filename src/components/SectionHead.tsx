import { motion } from "framer-motion";

export default function SectionHead({
  fig,
  kicker,
  title,
  invert = false,
}: {
  fig: string;
  kicker: string;
  title: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className={`mb-4 font-mono text-[11px] uppercase tracking-[0.3em] ${invert ? "text-paper/50" : "text-tangerine"}`}
      >
        {fig} — {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`font-display text-[clamp(2.2rem,5.5vw,4.6rem)] font-black leading-[0.95] tracking-[-0.02em] ${invert ? "text-paper" : "text-ink"}`}
      >
        {title}
      </motion.h2>
    </div>
  );
}
