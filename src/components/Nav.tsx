import { motion } from "framer-motion";
import { Asterisk, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { initSound, setSound, soundEnabled } from "../utils/sound";

const links = [
  { label: "The Book", href: "#book" },
  { label: "The Atlas", href: "#atlas" },
  { label: "Playground", href: "#play" },
  { label: "The Skill", href: "#skill" },
];

const ease = [0.05, 0.7, 0.1, 1] as const;

export default function Nav() {
  const [sound, setSoundState] = useState(false);
  useEffect(() => {
    initSound();
    setSoundState(soundEnabled());
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease, delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-5 py-3 md:px-10">
        <motion.a
          href="#top"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center gap-2 btn-press"
        >
          <motion.span
            whileHover={{ rotate: 90 }}
            transition={{ duration: 300, ease }}
            className="grid h-8 w-8 place-items-center rounded-full bg-ink text-paper transition-colors group-hover:bg-tangerine"
          >
            <Asterisk className="h-4 w-4" />
          </motion.span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
            information<span className="text-tangerine">=</span>beautiful
          </span>
        </motion.a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink btn-press"
            >
              {l.label}
              <motion.span
                layoutId="nav-underline"
                className="absolute -bottom-1 left-0 h-px w-0 bg-tangerine transition-all duration-300 group-hover:w-full"
              />
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const next = !sound;
              setSound(next);
              setSoundState(next);
            }}
            aria-pressed={sound}
            title={sound ? "Sound on – hovers and clicks chirp" : "Sound off – click to enable"}
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink-soft transition-colors hover:border-tangerine hover:text-tangerine btn-press"
          >
            {sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </motion.button>
          <motion.a
            href="#get"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full border border-ink bg-ink px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:border-tangerine hover:bg-tangerine btn-press"
          >
            Get the book
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}
