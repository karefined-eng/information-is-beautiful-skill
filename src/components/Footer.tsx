import { motion } from "framer-motion";
import { ArrowUp, Asterisk } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-paper/10 bg-ink px-5 pb-10 pt-20 text-paper md:px-14">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center font-display text-[clamp(2.6rem,9vw,8rem)] font-black uppercase leading-[0.9] tracking-tight"
      >
        see the <span className="text-hollow-paper">whole</span>
        <br />
        picture<span className="text-tangerine">.</span>
      </motion.p>

      <div className="mt-16 grid gap-10 border-t border-paper/15 pt-10 md:grid-cols-4">
        <div>
          <p className="mb-3 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
            <Asterisk className="h-4 w-4 text-tangerine" />
            colophon
          </p>
          <p className="text-sm leading-relaxed text-paper/50">
            An unofficial fan tribute to <em className="font-display">Information is Beautiful</em> by
            David McCandless (William Collins). Not affiliated with or endorsed by the author or
            publisher.
          </p>
        </div>
        <div>
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-paper">data, honestly</p>
          <p className="text-sm leading-relaxed text-paper/50">
            Every chart on this page is an illustrative homage drawn from scratch. For the real
            datasets and the real craft, get the book — links above.
          </p>
        </div>
        <div>
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-paper">routes</p>
          <ul className="space-y-2 text-sm text-paper/50">
            <li><a href="https://informationisbeautiful.net" target="_blank" rel="noreferrer" className="transition-colors hover:text-tangerine">informationisbeautiful.net</a></li>
            <li><a href="https://davidmccandless.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-teal">davidmccandless.com</a></li>
            <li><a href="https://www.ted.com/talks/david_mccandless_the_beauty_of_data_visualization" target="_blank" rel="noreferrer" className="transition-colors hover:text-sun">the TED talk</a></li>
            <li><a href="https://openlibrary.org/search?q=information+is+beautiful+mccandless" target="_blank" rel="noreferrer" className="transition-colors hover:text-magenta">borrow the book</a></li>
            <li><a href="#skill" className="transition-colors hover:text-cobalt">the agent skill (SKILL.md)</a></li>
          </ul>
        </div>
        <div className="flex items-start justify-start md:justify-end">
          <a
            href="#top"
            aria-label="Back to top"
            className="group grid h-14 w-14 place-items-center rounded-full border border-paper/30 transition-colors hover:border-tangerine hover:bg-tangerine"
          >
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-paper/15 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/35">
        <span>© MMXXVI a tribute, typeset in Fraunces</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" />
          information = beautiful
        </span>
      </div>
    </footer>
  );
}
