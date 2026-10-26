import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function About() {
  const location = useLocation();
  
  return (
    <section id="about" className="relative border-t border-ink/10 px-5 py-24 md:px-14 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-3xl mx-auto">
          <Link
            to={location.state?.from || "/"}
            className="inline-flex items-center gap-2 mb-8 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-ink-soft hover:text-tangerine transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <header className="mb-12">
            <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.25em] text-tangerine">
              colophon · about this project
            </p>
            <h1 className="font-display text-[clamp(2.8rem,8vw,7rem)] font-black uppercase leading-[0.9] tracking-tight text-ink">
              About this
              <br />
              <span className="text-hollow">tribute</span>
            </h1>
          </header>

          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-ink">What is this?</h2>
              <p className="text-[15px] leading-relaxed text-ink-soft">
                This is an unofficial fan tribute to <em className="font-display text-ink">Information is Beautiful</em> – 
                David McCandless' landmark atlas of infographics (William Collins, 2009; revised edition 2012). 
                It celebrates the book's philosophy: <strong>form follows data; beauty in service of comprehension</strong>.
              </p>
              
              <p className="text-[15px] leading-relaxed text-ink-soft">
                The site contains interactive homages to six iconic spreads from the book, a live 
                <strong>chart-matcher playground</strong> that helps you pick the right visual form for your data, 
                and the full text of the <strong>information-is-beautiful Agent Skill</strong> – an MIT-licensed 
                skill that teaches AI coding agents honest, editorial-quality information design.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-ink">What this is <span className="text-hollow">not</span></h2>
              <ul className="space-y-3 text-[15px] leading-relaxed text-ink-soft">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-tangerine shrink-0" />
                  <span>Not affiliated with David McCandless, HarperCollins, or Information is Beautiful Ltd.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-tangerine shrink-0" />
                  <span>Not a reproduction of the book's content – all visualizations are illustrative homages drawn from scratch.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-tangerine shrink-0" />
                  <span>Not a source for the book's datasets – for those, visit <a href="https://informationisbeautiful.net" target="_blank" rel="noreferrer" className="text-tangerine hover:underline">informationisbeautiful.net</a>.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-ink/15 space-y-6">
            <h2 className="font-display text-2xl font-bold text-ink">The Agent Skill</h2>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              The <code className="bg-ink/5 px-1.5 py-0.5 rounded font-mono text-sm">information-is-beautiful</code> 
              skill teaches AI agents the <strong>craft of honest information design</strong> through five checkable laws:
            </p>
            <ol className="space-y-3 mt-4 text-[15px] leading-relaxed text-ink-soft">
              <li className="flex gap-3"><span className="font-mono text-tangerine shrink-0">1.</span>Form follows data</li>
              <li className="flex gap-3"><span className="font-mono text-tangerine shrink-0">2.</span>Honest scales</li>
              <li className="flex gap-3"><span className="font-mono text-tangerine shrink-0">3.</span>Colour is a data channel</li>
              <li className="flex gap-3"><span className="font-mono text-tangerine shrink-0">4.</span>Ink must be earned</li>
              <li className="flex gap-3"><span className="font-mono text-tangerine shrink-0">5.</span>Annotation is narration</li>
            </ol>
            <p className="text-[15px] leading-relaxed text-ink-soft mt-4">
              It includes a <a href="/playground" className="text-tangerine hover:underline">chart-matcher decision table</a>, 
              a <a href="/skills/information-is-beautiful/references/quality-checklist.html" className="text-tangerine hover:underline">25-point quality audit</a>, 
              and <a href="/skills/information-is-beautiful/references/creative-moves.html" className="text-tangerine hover:underline">eight generative patterns</a> for unforgettable forms.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://github.com/karefined-eng/information-is-beautiful-skill" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-paper">
                View on GitHub
              </a>
              <a href="https://www.npmjs.com/package/@karefined/information-is-beautiful-skill" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-tangerine hover:text-paper">
                Install Skill
              </a>
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-ink/15 space-y-6">
            <h2 className="font-display text-2xl font-bold text-ink">Data Sources & Attribution</h2>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              All visualizations on this site use real, publicly available data from authoritative sources:
            </p>
            <ul className="space-y-2 text-[15px] leading-relaxed text-ink-soft">
              <li><span className="font-mono text-tangerine">→</span> UN World Population Prospects 2024</li>
              <li><span className="font-mono text-tangerine">→</span> Ember Climate 2024</li>
              <li><span className="font-mono text-tangerine">→</span> Ghana Statistical Service</li>
              <li><span className="font-mono text-tangerine">→</span> Our World in Data</li>
              <li><span className="font-mono text-tangerine">→</span> World Bank Open Data</li>
            </ul>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Full provenance for every design principle is documented in 
              <a href="/skills/information-is-beautiful/references/sources.html" className="text-tangerine hover:underline">references/sources.md</a>.
            </p>
          </div>

          <div className="mt-16 pt-10 border-t border-ink/15 space-y-6">
            <h2 className="font-display text-2xl font-bold text-ink">Author</h2>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-tangerine/10 flex items-center justify-center shrink-0">
                <span className="font-display text-2xl font-bold text-tangerine">K</span>
              </div>
              <div>
                <p className="font-display font-medium text-lg text-ink">karefined</p>
                <p className="text-[15px] leading-relaxed text-ink-soft mt-1">
                  Developer and designer. Built this tribute to celebrate the craft of information design 
                  and to give AI agents a proper education in honest visualization.
                </p>
                <div className="mt-4 flex gap-3">
                  <a href="https://github.com/karefined-eng" target="_blank" rel="noreferrer" className="text-paper/50 hover:text-tangerine transition-colors" aria-label="GitHub">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.301 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  <a href="https://twitter.com/karefined" target="_blank" rel="noreferrer" className="text-paper/50 hover:text-tangerine transition-colors" aria-label="Twitter/X">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.72h-3.308l-7.227-8.26L18.244 2.25zM2.25 4.89l8.778 10.02H2.25L2.25 4.89zM12.42 4.89l7.227 8.26-8.502 9.72H12.42L12.42 4.89zM2.25 14.91l8.778 10.02H2.25L2.25 14.91z"/></svg>
                  </a>
                  <a href="https://linkedin.com/in/karefined" target="_blank" rel="noreferrer" className="text-paper/50 hover:text-tangerine transition-colors" aria-label="LinkedIn">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}