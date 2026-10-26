import { motion } from "framer-motion";
import { ArrowUp, Asterisk, Mail, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// Inline SVG icons for social platforms not in lucide-react
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.301 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.72h-3.308l-7.227-8.26L18.244 2.25zM2.25 4.89l8.778 10.02H2.25L2.25 4.89zM12.42 4.89l7.227 8.26-8.502 9.72H12.42L12.42 4.89zM2.25 14.91l8.778 10.02H2.25L2.25 14.91z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

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

      <div className="mt-16 grid gap-10 border-t border-paper/15 pt-10 md:grid-cols-5">
        <div>
          <p className="mb-3 flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.25em]">
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
          <p className="mb-3 font-mono text-[12px] font-bold uppercase tracking-[0.25em] text-paper">author</p>
          <div className="space-y-1 text-sm text-paper/50">
            <p className="flex items-center gap-2">
              <span className="font-display font-medium text-paper/70">karefined</span>
              <a href="https://github.com/karefined-eng" target="_blank" rel="noreferrer" className="text-paper/40 hover:text-tangerine transition-colors" aria-label="GitHub">
                <GitHubIcon className="h-3.5 w-3.5" />
              </a>
            </p>
            <p className="flex items-center gap-2">
              <a href="mailto:karefined@gmail.com" className="transition-colors hover:text-tangerine" aria-label="Email">
                <Mail className="h-3.5 w-3.5" />
                <span>karefined@gmail.com</span>
              </a>
            </p>
          </div>
        </div>
        <div>
          <p className="mb-3 font-mono text-[12px] font-bold uppercase tracking-[0.25em] text-paper">data, honestly</p>
          <p className="text-sm leading-relaxed text-paper/50">
            Every chart on this page is an illustrative homage drawn from scratch. For the real
            datasets and the real craft, get the book – links above.
          </p>
        </div>
        <div>
          <p className="mb-3 font-mono text-[12px] font-bold uppercase tracking-[0.25em] text-paper">routes</p>
          <ul className="space-y-2 text-sm text-paper/50">
            <li><a href="https://informationisbeautiful.net" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-tangerine">informationisbeautiful.net <ExternalLink className="h-3 w-3" /></a></li>
            <li><a href="https://davidmccandless.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-teal">davidmccandless.com <ExternalLink className="h-3 w-3" /></a></li>
            <li><a href="https://www.ted.com/talks/david_mccandless_the_beauty_of_data_visualization" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-sun">the TED talk <ExternalLink className="h-3 w-3" /></a></li>
            <li><a href="https://openlibrary.org/search?q=information+is+beautiful+mccandless" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-magenta">borrow the book <ExternalLink className="h-3 w-3" /></a></li>
            <li><a href="#skill" className="transition-colors hover:text-cobalt">the agent skill (SKILL.md)</a></li>
            <li><Link to="/about" className="transition-colors hover:text-tangerine">about this project</Link></li>
            <li><Link to="/privacy" className="transition-colors hover:text-tangerine">privacy policy</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-mono text-[12px] font-bold uppercase tracking-[0.25em] text-paper">connect</p>
          <div className="flex gap-3">
            <a href="https://github.com/karefined-eng" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-paper/30 transition-colors hover:border-tangerine hover:bg-tangerine/10" aria-label="GitHub">
              <GitHubIcon className="h-4.5 w-4.5" />
            </a>
            <a href="https://twitter.com/karefined" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-paper/30 transition-colors hover:border-tangerine hover:bg-tangerine/10" aria-label="Twitter/X">
              <TwitterIcon className="h-4.5 w-4.5" />
            </a>
            <a href="https://linkedin.com/in/karefined" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-paper/30 transition-colors hover:border-tangerine hover:bg-tangerine/10" aria-label="LinkedIn">
              <LinkedInIcon className="h-4.5 w-4.5" />
            </a>
            <a href="mailto:karefined@gmail.com" className="grid h-9 w-9 place-items-center rounded-full border border-paper/30 transition-colors hover:border-tangerine hover:bg-tangerine/10" aria-label="Email">
              <Mail className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-paper/15 pt-6 font-mono text-[12px] uppercase tracking-[0.25em] text-paper/35">
        <span>© MMXXVI a tribute, typeset in Fraunces</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" />
          information = beautiful
        </span>
        <div className="flex items-center gap-2">
          <a href="#top" aria-label="Back to top" className="group grid h-10 w-10 place-items-center rounded-full border border-paper/30 transition-colors hover:border-tangerine hover:bg-tangerine">
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}
