import { motion } from "framer-motion";
import { BookOpenText, Languages, Layers, Palette } from "lucide-react";
import { useRef, useState } from "react";
import { specs } from "../data/book";
import SectionHead from "./SectionHead";

const ease = [0.22, 1, 0.36, 1] as const;

const cards = [
  {
    icon: Layers,
    title: "An atlas, not a textbook",
    body: "Across 256 full-colour pages, McCandless distils the data that swamps us – money, health, fear, love – into diagrams you can wander through.",
  },
  {
    icon: Palette,
    title: "Beauty as an interface",
    body: "Every spread treats colour, scale and whitespace as instruments. The design isn’t decoration on the data; it is the argument.",
  },
  {
    icon: BookOpenText,
    title: "Revised & recalculated",
    body: "The 2012 new edition re-ran every figure on fresher data and was “reimagined” throughout – infographics as living documents.",
  },
  {
    icon: Languages,
    title: "A worldwide language",
    body: "Published by William Collins in the UK and as “The Visual Miscellaneum” in the US, it has travelled into languages and libraries everywhere.",
  },
];

export default function TheBook() {
  const imgRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const r = imgRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: y * -8, y: x * 10 });
  };

  return (
    <section id="book" className="relative overflow-hidden px-5 py-24 md:px-14 md:py-36">
      <SectionHead
        title={
          <>
            The book that made
            <br />
            numbers <span className="font-light text-tangerine">gorgeous</span>
          </>
        }
      />

      <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
        {/* object shot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="relative"
        >
          <div className="[perspective:1200px]">
            <div
              ref={imgRef}
              onMouseMove={onMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              className="relative overflow-hidden rounded-2xl border border-ink/15 shadow-[0_24px_80px_-20px_rgb(23_20_14/0.35)] transition-transform duration-200 ease-out will-change-transform"
              style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            >
              <img src="/prints.jpg" alt="A fanned stack of colorful data-visualization art prints" className="block w-full" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[12px] uppercase tracking-[0.25em] text-paper">
                <span>the studio floor, after printing</span>
                <span className="text-sun">plate 255/255</span>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6, ease }}
            className="absolute -right-3 -top-5 rotate-6 rounded-lg border border-ink bg-sun px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.15em] shadow-[4px_4px_0_#17140e] md:-right-6"
          >
            out in print · not pirated
          </motion.div>
        </motion.div>

        {/* ledger */}
        <div>
          <motion.div
            initial="off"
            whileInView="on"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ on: { transition: { staggerChildren: 0.07 } } }}
          >
            {specs.map((s) => (
              <motion.div
                key={s.label}
                variants={{ off: { opacity: 0, x: 30 }, on: { opacity: 1, x: 0, transition: { duration: 0.6, ease } } }}
                className="group flex items-baseline justify-between gap-4 border-b border-ink/15 py-4 transition-colors hover:border-tangerine"
              >
                <span className="font-mono text-[12px] uppercase tracking-[0.25em] text-ink-soft">{s.label}</span>
                <span className="text-right">
                  <span className="font-display text-xl font-semibold md:text-2xl">{s.value}</span>
                  {s.note && <span className="block text-xs text-ink-soft">{s.note}</span>}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="mt-8 border-l-2 border-tangerine pl-5 font-display text-lg italic leading-relaxed text-ink-soft md:text-xl"
          >
            “A visual guide to how the world really works, through stunning infographics and data
            visualisations – thoroughly revised, recalculated and reimagined.”
            <span className="mt-2 block font-mono text-[12px] uppercase not-italic tracking-[0.25em] text-ink">– the publisher’s jacket copy</span>
          </motion.p>
        </div>
      </div>

      {/* feature cards */}
      <div className="mt-20 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease, delay: i * 0.08 }}
            className="group rounded-2xl border border-ink/15 bg-paper-deep/40 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink hover:bg-ink hover:text-paper"
          >
            <c.icon className="mb-5 h-6 w-6 text-tangerine" strokeWidth={1.6} />
            <h3 className="font-display text-xl font-bold">{c.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed opacity-70">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
