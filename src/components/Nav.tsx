import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";

const links = [
  { label: "The Book", href: "#book" },
  { label: "The Atlas", href: "#atlas" },
  { label: "Playground", href: "#play" },
  { label: "The Skill", href: "#skill" },
];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-5 py-3 md:px-10">
        <a href="#top" className="group flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-paper transition-colors group-hover:bg-tangerine">
            <Asterisk className="h-4 w-4" />
          </span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
            information<span className="text-tangerine">=</span>beautiful
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-tangerine transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#get"
          className="rounded-full border border-ink bg-ink px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:border-tangerine hover:bg-tangerine"
        >
          Get the book
        </a>
      </div>
    </motion.header>
  );
}
