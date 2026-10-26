import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Play, Quote } from "lucide-react";
import { tedTalk } from "../data/book";
import SectionHead from "./SectionHead";

const ease = [0.22, 1, 0.36, 1] as const;

const tomes = [
  { year: "2009 / 2012", title: "Information is Beautiful", note: "the atlas – new edition 2012" },
  { year: "2014", title: "Knowledge is Beautiful", note: "196 new infographics" },
  { year: "2022", title: "Beautiful News", note: "a year of positive trends" },
];

export default function Author() {
  const [showTalk, setShowTalk] = useState(false);
  return (
    <section className="relative border-t border-paper/10 bg-ink px-5 pb-24 pt-4 text-paper md:px-14 md:pb-36">
      <SectionHead
        invert
        title={
          <>
            One man, <span className="text-hollow-paper">1,500+</span>
            <br />
            drawn truths
          </>
        }
      />

      <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        {/* quote + bio */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
          >
            <Quote className="mb-6 h-9 w-9 text-tangerine" fill="currentColor" strokeWidth={0} />
            <p className="font-display text-[clamp(1.8rem,4vw,3.4rem)] font-black leading-[1.05] tracking-tight">
              “Data is the new <span className="italic font-light text-teal">oil?</span> No – data is
              the new <span className="italic font-light text-sun">soil.</span>”
            </p>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-paper/60">
              David McCandless is a London-based data-journalist and information designer. Out of the
              flood of facts washing over us, he builds diagrams – maps of money, fear, belief and
              hope. His work has hung at New York’s MoMA and Tate Britain, and appeared in The
              Guardian, Wired and the BBC.
            </p>
          </motion.div>

          <motion.a
            href={tedTalk}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              e.preventDefault();
              setShowTalk((v) => !v);
            }}
            aria-expanded={showTalk}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="group mt-10 flex items-center justify-between gap-6 rounded-2xl border border-paper/20 p-5 transition-colors hover:border-tangerine hover:bg-tangerine md:p-6"
          >
            <span className="flex items-center gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-paper text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
                <Play className="h-4 w-4 fill-current" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold md:text-xl">Watch the TED Global talk</span>
                <span className="mt-0.5 block text-sm text-paper/50 transition-colors group-hover:text-ink/70">
                  “The beauty of data visualization” – free & legal
                </span>
              </span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink" />
          </motion.a>

          {showTalk && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mt-6 overflow-hidden rounded-2xl border border-paper/20"
            >
              <div className="relative aspect-video">
                <iframe
                  src="https://embed.ted.com/talks/david_mccandless_the_beauty_of_data_visualization"
                  title="The beauty of data visualization – David McCandless (TEDGlobal 2010)"
                  className="absolute inset-0 h-full w-full"
                  frameBorder={0}
                  scrolling="no"
                  loading="lazy"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="px-5 py-3 font-mono text-[12px] uppercase leading-relaxed tracking-[0.2em] text-paper/40">
                official TED embed – CC BY-NC-ND © David McCandless / TED
              </p>
              <button
                type="button"
                onClick={() => setShowTalk(false)}
                className="w-full border-t border-paper/15 bg-paper/5 py-2.5 font-mono text-[12px] uppercase tracking-[0.25em] text-paper/50 transition-colors hover:text-tangerine"
              >
                hide video
              </button>
            </motion.div>
          )}
        </div>

        {/* tomes ledger */}
        <motion.div
          initial="off"
          whileInView="on"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ on: { transition: { staggerChildren: 0.1 } } }}
          className="self-center"
        >
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.3em] text-paper/40">the three tomes</p>
          {tomes.map((t, i) => (
            <motion.div
              key={t.title}
              variants={{ off: { opacity: 0, x: 36 }, on: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } }}
              className={`flex items-baseline justify-between gap-6 border-b border-paper/15 py-5 ${i === 0 ? "border-t" : ""}`}
            >
              <span className="font-mono text-[12px] tracking-[0.2em] text-tangerine">{t.year}</span>
              <span className="flex-1 text-right">
                <span className="block font-display text-lg font-bold leading-tight md:text-xl">{t.title}</span>
                <span className="block text-xs text-paper/45">{t.note}</span>
              </span>
            </motion.div>
          ))}
          <motion.p
            variants={{ off: { opacity: 0 }, on: { opacity: 1, transition: { duration: 0.8, delay: 0.2 } } }}
            className="mt-6 font-mono text-[12px] leading-relaxed tracking-[0.05em] text-paper/35"
          >
            clients & collaborators incl. Google · Apple · Microsoft · BBC · Bill & Melinda Gates
            Foundation
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
