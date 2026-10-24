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
            <Asterisk className={`h-4 w-4 shrink-0 ${i % 6 === 0 ? "text-tangerine" : i % 6 === 2 ? "text-teal" : i % 6 === 4 ? "text-sun" : "text-paper/40"}`} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative z-10 -rotate-1 border-y border-ink/20 bg-ink text-paper shadow-[0_8px_30px_rgb(23_20_14/0.15)]">
      <Row />
    </div>
  );
}
