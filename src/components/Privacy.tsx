import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Privacy() {
  const location = useLocation();
  
  return (
    <section id="privacy" className="relative border-t border-ink/10 px-5 py-24 md:px-14 md:py-36">
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
              colophon · privacy policy
            </p>
            <h1 className="font-display text-[clamp(2.8rem,8vw,7rem)] font-black uppercase leading-[0.9] tracking-tight text-ink">
              Privacy
              <br />
              <span className="text-hollow">Policy</span>
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Last updated: <time dateTime="2026-10-26">October 26, 2026</time>
            </p>
          </header>

          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">1. Data We Collect</h2>
              <p className="text-[15px] leading-relaxed text-ink-soft">
                This site is a static tribute with no user accounts, no forms, and no personal data collection. 
                We do not collect, store, or process any personally identifiable information (PII).
              </p>
              <p className="text-[15px] leading-relaxed text-ink-soft mt-3">
                The only data processed are standard web server logs (IP address, user agent, requested URL, 
                timestamp) handled by our hosting provider (Vercel) for security and analytics purposes. 
                We do not access or use these logs.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">2. Cookies & Local Storage</h2>
              <p className="text-[15px] leading-relaxed text-ink-soft">
                This site uses <strong>no cookies</strong> for tracking, analytics, or advertising.
              </p>
              <p className="text-[15px] leading-relaxed text-ink-soft mt-3">
                We use <code className="bg-ink/5 px-1.5 py-0.5 rounded font-mono text-sm">localStorage</code> 
                for exactly one user preference: the sound toggle in the navigation (muted/unmuted). 
                This data never leaves your browser and is not transmitted to any server.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">3. Third-Party Services</h2>
              <p className="text-[15px] leading-relaxed text-ink-soft">
                The following third-party resources are loaded:
              </p>
              <ul className="space-y-2 mt-3 text-[15px] leading-relaxed text-ink-soft">
                <li><strong>Google Fonts</strong> (fonts.googleapis.com, fonts.gstatic.com) – for Fraunces, Space Grotesk, and JetBrains Mono fonts. Loaded with <code>preconnect</code> and <code>display=swap</code>. No cookies set.</li>
                <li><strong>Vercel</strong> – hosting and CDN. Standard server logs only.</li>
              </ul>
              <p className="text-[15px] leading-relaxed text-ink-soft mt-3">
                No Google Analytics, no Facebook Pixel, no third-party analytics, no advertising networks, 
                no social media tracking pixels.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">4. External Links</h2>
              <p className="text-[15px] leading-relaxed text-ink-soft">
                This site links to external websites (GitHub, informationisbeautiful.net, TED, Open Library, etc.). 
                We are not responsible for the privacy practices of those sites. External links open with 
                <code>rel="noreferrer"</code> to prevent referrer leakage.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">5. Security</h2>
              <p className="text-[15px] leading-relaxed text-ink-soft">
                The site is served exclusively over HTTPS with the following security headers (via Vercel):
              </p>
              <ul className="space-y-1 mt-3 font-mono text-sm text-ink-soft">
                <li><code>X-Content-Type-Options: nosniff</code></li>
                <li><code>X-Frame-Options: DENY</code></li>
                <li><code>Referrer-Policy: strict-origin-when-cross-origin</code></li>
                <li><code>Permissions-Policy: camera=(), microphone=(), geolocation=()</code></li>
                <li><code>Cross-Origin-Opener-Policy: same-origin</code></li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">6. Your Rights</h2>
              <p className="text-[15px] leading-relaxed text-ink-soft">
                Since we collect no personal data, there is no data to access, rectify, erase, or port. 
                If you believe we are processing data we shouldn't, contact us below.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">7. Changes to This Policy</h2>
              <p className="text-[15px] leading-relaxed text-ink-soft">
                Any updates will be posted here with a revised "Last updated" date. 
                Continued use of the site after changes constitutes acceptance.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">8. Contact</h2>
              <p className="text-[15px] leading-relaxed text-ink-soft">
Questions about this policy or our data practices? Email
                <a href="mailto:karefined@gmail.com" className="text-tangerine hover:underline">karefined@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}