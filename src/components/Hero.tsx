import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import HeroField from "./HeroField";

const ease = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yMeta = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="grid-paper relative flex min-h-[100svh] flex-col overflow-hidden pt-[52px]"
    >
      <HeroField />

      {/* edge rulers */}
      <div className="axis-x pointer-events-none absolute inset-x-0 top-[52px] h-2.5 opacity-40" />
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-2.5 border-r border-ink/10 bg-[linear-gradient(to_bottom,rgb(23_20_14/0.4)_1px,transparent_1px)] bg-[size:100%_16px] opacity-40" />

      {/* corner registration marks */}
      <div className="pointer-events-none absolute right-5 top-20 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft md:block">
        <p>pl. 01 — opening spread</p>
        <p className="mt-1">51.5072° n / 0.1276° w</p>
      </div>
      <div className="pointer-events-none absolute bottom-24 left-6 hidden rotate-180 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft [writing-mode:vertical-rl] md:block">
        a tribute to the atlas of infographics — not affiliated with the author
      </div>

      <motion.div style={{ opacity: fade }} className="relative z-10 flex flex-1 flex-col justify-center px-5 md:px-14">
        <motion.div style={{ y: yTitle }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-tangerine"
          >
            256 pages · 200+ infographics · one man’s mission
          </motion.p>

          <h1 className="font-display leading-[0.86] tracking-[-0.03em] text-ink">
            <Line delay={0.18}>
              <span className="block text-[clamp(3.2rem,11.5vw,10.5rem)] font-black uppercase">
                Informat<span className="text-tangerine">i</span>on
              </span>
            </Line>
            <Line delay={0.32}>
              <span className="block pl-[6vw] text-[clamp(2.4rem,7vw,6.2rem)] font-light italic">
                is{" "}
                <span className="text-hollow not-italic">truly</span>
              </span>
            </Line>
            <Line delay={0.46}>
              <span className="relative block text-[clamp(3.2rem,11.5vw,10.5rem)] font-black uppercase">
                Beaut<span className="text-teal">i</span>ful
                <span className="absolute -bottom-3 left-1 hidden h-1.5 w-[38%] bg-sun md:block" />
              </span>
            </Line>
          </h1>
        </motion.div>

        <motion.div style={{ y: yMeta }} className="mt-10 flex flex-col gap-6 md:mt-14 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.62 }}
            className="max-w-md text-base leading-relaxed text-ink-soft md:text-lg"
          >
            An interactive tribute to{" "}
            <em className="font-display text-ink">Information is Beautiful</em> — David McCandless’
            cult atlas of infographics that taught the world to see data as a landscape. Explore the
            spreads, then find a legitimate copy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.74 }}
            className="flex items-center gap-4"
          >
            <a
              href="#atlas"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-tangerine"
            >
              Enter the atlas
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* rotating seal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease, delay: 1 }}
        className="absolute bottom-16 right-8 z-10 hidden md:block"
      >
        <div className="animate-slow-spin">
          <svg width="130" height="130" viewBox="0 0 130 130">
            <defs>
              <path id="circ" d="M 65,65 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
            </defs>
            <circle cx="65" cy="65" r="30" fill="#ff5d1f" />
            <circle cx="65" cy="65" r="6" fill="#f3eee1" />
            <text fontSize="10.5" letterSpacing="2.5" fill="#17140e" fontFamily="JetBrains Mono, monospace">
              <textPath href="#circ">NEW EDITION · REVISED · RECALCULATED · REIMAGINED ·</textPath>
            </text>
          </svg>
        </div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="relative z-10 flex items-center justify-center pb-7"
      >
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-soft">
          <span className="h-px w-10 bg-ink/30" />
          scroll to visualise
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
          <span className="h-px w-10 bg-ink/30" />
        </div>
      </motion.div>
    </section>
  );
}
