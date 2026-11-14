import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";
import { marqueeTopics } from "../data/book";

function Row({ reverse = false, className = "" }: { reverse?: boolean; className?: string }) {
  const items = [...marqueeTopics, ...marqueeTopics];
  return (
    <div className={`flex overflow-hidden ${className}`}>
      <div className={`flex shrink-0 items-center gap-8 py-3.5 pr-8 ${reverse ? "animate-marquee-right" : "animate-marquee-left"}`}>
        {items.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center gap-8">
            <span className="whitespace-nowrap font-display text-lg italic md:text-xl">{t}</span>
            <motion.span
              animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: i * 0.1 }}
              className={`h-4 w-4 shrink-0 ${i % 6 === 0 ? "text-tangerine" : i % 6 === 2 ? "text-teal" : i % 6 === 4 ? "text-sun" : "text-paper/40"}`}
            >
              <Asterisk />
            </motion.span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.05, 0.7, 0.1, 1] }}
      className="relative z-10 -rotate-1 border-y border-ink/20 bg-ink text-paper shadow-[0_8px_30px_rgb(23_20_14/0.15)]"
    >
      <Row />
    </motion.div>
  );
}