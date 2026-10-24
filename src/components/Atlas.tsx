import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MousePointerClick } from "lucide-react";
import { useState } from "react";
import { atlasPieces } from "../data/book";
import SectionHead from "./SectionHead";
import { VIZ_RENDERERS } from "./VizRenderers";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Atlas() {
  const [idx, setIdx] = useState(0);
  const piece = atlasPieces[idx];
  const Renderer = VIZ_RENDERERS[piece.kind];

  const go = (dir: number) => setIdx((p) => (p + dir + atlasPieces.length) % atlasPieces.length);

  return (
    <section id="atlas" className="relative border-t border-ink/10 px-5 py-24 md:px-14 md:py-36">
      <SectionHead
        fig="fig. 02"
        kicker="inside the atlas"
        title={
          <>
            Six spreads,
            <br />
            <span className="text-hollow">six ways of seeing</span>
          </>
        }
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(300px,380px)_1fr] lg:gap-16">
        {/* menu — desktop */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="hidden lg:block"
        >
          <p className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft">
            <MousePointerClick className="h-3.5 w-3.5 text-tangerine" />
            choose a spread · all sketches are homages
          </p>
          <div className="border-t border-ink/15">
            {atlasPieces.map((p, i) => {
              const active = i === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setIdx(i)}
                  className={`group flex w-full items-baseline gap-4 border-b border-ink/15 px-4 py-5 text-left transition-all duration-300 ${active ? "bg-ink text-paper" : "hover:bg-paper-deep/60"}`}
                >
                  <span className={`font-mono text-[10px] tracking-[0.2em] ${active ? "text-tangerine" : "text-ink-soft"}`}>{p.index}</span>
                  <span
                    className="mt-0.5 h-3 w-3 shrink-0 self-center rounded-full border border-ink/40"
                    style={{ background: p.color }}
                  />
                  <span className="flex-1">
                    <span className="block font-display text-xl font-bold leading-tight">{p.title}</span>
                    <span className={`mt-1 block text-xs ${active ? "text-paper/60" : "text-ink-soft"}`}>{p.tagline}</span>
                  </span>
                  <ArrowRight className={`h-4 w-4 self-center transition-transform duration-300 ${active ? "translate-x-0 text-tangerine" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"}`} />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* chips — mobile */}
        <div className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 lg:hidden">
          {atlasPieces.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setIdx(i)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${i === idx ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink-soft"}`}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
              {p.title}
            </button>
          ))}
        </div>

        {/* stage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        >
          <div className="rounded-2xl border border-ink/15 bg-paper-deep/30 p-4 md:p-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1 font-mono text-[10px] uppercase tracking-[0.25em]">
              <span className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: piece.color }} />
                <span className="text-ink">fig. {piece.index} · {piece.tagline}</span>
              </span>
              <span className="text-ink-soft">{piece.axis}</span>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-ink/20 bg-paper shadow-[inset_0_0_60px_rgb(23_20_14/0.04)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={piece.id}
                  initial={{ opacity: 0, y: 26, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.99 }}
                  transition={{ duration: 0.55, ease }}
                  className="p-3 md:p-6"
                >
                  <Renderer />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* piece narrative */}
            <AnimatePresence mode="wait">
              <motion.div
                key={piece.id + "-text"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease, delay: 0.08 }}
                className="mt-7 grid gap-6 md:grid-cols-[minmax(0,260px)_1fr] md:gap-10"
              >
                <div>
                  <h3 className="font-display text-3xl font-black leading-[1.02] tracking-tight">{piece.title}</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft">
                    homage · not the dataset
                  </p>
                </div>
                <p className="text-[15px] leading-relaxed text-ink-soft">{piece.body}</p>
              </motion.div>
            </AnimatePresence>

            {/* pager */}
            <div className="mt-8 flex items-center justify-between border-t border-ink/15 pt-5">
              <div className="flex gap-3">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous spread"
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next spread"
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2.5">
                {atlasPieces.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setIdx(i)}
                    aria-label={`Go to ${p.title}`}
                    className="group grid h-6 w-6 place-items-center"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${i === idx ? "h-2.5 w-2.5" : "h-1.5 w-1.5 bg-ink/25 group-hover:bg-ink/60"}`}
                      style={i === idx ? { background: p.color } : undefined}
                    />
                  </button>
                ))}
              </div>
              <span className="font-mono text-[11px] tracking-[0.25em] text-ink-soft">
                {piece.index} / 06
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
