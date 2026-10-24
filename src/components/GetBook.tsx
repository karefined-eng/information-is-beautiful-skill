import { motion } from "framer-motion";
import { ArrowUpRight, BookHeart, LibraryBig, SearchCheck, ShoppingBag, Sparkles } from "lucide-react";
import { ACCENTS, buyOptions, kindLabel } from "../data/book";
import SectionHead from "./SectionHead";

const ease = [0.22, 1, 0.36, 1] as const;

const kindIcon: Record<string, React.ElementType> = {
  buy: ShoppingBag,
  borrow: LibraryBig,
  preview: SearchCheck,
  official: Sparkles,
};

export default function GetBook() {
  return (
    <section id="get" className="relative px-5 py-24 md:px-14 md:py-36">
      <SectionHead
        fig="fig. 06"
        kicker="the honest routes"
        title={
          <>
            No free PDF here —<br />
            <em className="font-light text-tangerine">every legal one.</em>
          </>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
        className="mb-12 flex max-w-3xl items-start gap-4 rounded-2xl border border-tangerine/50 bg-tangerine/10 p-5"
      >
        <BookHeart className="mt-0.5 h-5 w-5 shrink-0 text-tangerine" />
        <p className="text-[15px] leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">Why nothing to download?</span> The book is a
          256-page designed object — years of an author’s labour — and it stays in copyright. But
          you can read it free at a library, borrow it legally online, or preview it first. Buying a
          copy funds the next atlas of infographics.
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {buyOptions.map((o, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          const Icon = kindIcon[o.kind];
          return (
            <motion.a
              key={o.venue}
              href={o.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease, delay: (i % 3) * 0.09 }}
              className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-2xl border border-ink/15 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink hover:shadow-[6px_6px_0_#17140e]"
              style={{ ["--acc" as string]: accent }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[var(--acc)] transition-all duration-300 group-hover:h-1.5" />
              <div className="flex items-start justify-between">
                <span
                  className="flex items-center gap-2 rounded-full border border-ink/20 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  <Icon className="h-3 w-3" />
                  {kindLabel[o.kind]}
                </span>
                <ArrowUpRight className="h-5 w-5 text-ink/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--acc)]" />
              </div>
              <div className="mt-6">
                <h3 className="font-display text-2xl font-bold leading-tight">{o.venue}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{o.blurb}</p>
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft/70">{o.meta}</p>
            </motion.a>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft"
      >
        <span>ISBN 978-0007492893 · new edition</span>
        <span>
          official home: <span className="text-tangerine">informationisbeautiful.net</span> — hundreds of visuals, free
        </span>
      </motion.div>
    </section>
  );
}
