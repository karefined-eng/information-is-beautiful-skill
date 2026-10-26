import { AnimatePresence, motion } from "framer-motion";
import { Hand } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ACCENTS } from "../data/book";
import SectionHead from "./SectionHead";

interface B {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  label: string;
  c: string;
  dark: boolean; // use ink text on light fills
}

const TOPICS: [string, number][] = [
  ["Money", 66],
  ["Health", 58],
  ["Love", 52],
  ["Fear", 42],
  ["Belief", 46],
  ["Time", 38],
  ["Power", 50],
  ["Nature", 56],
  ["War", 34],
  ["Space", 44],
  ["Ideas", 48],
  ["Death", 32],
  ["Hope", 36],
  ["Sex", 30],
];

export default function Playground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let raf = 0;
    let bubbles: B[] = [];
    let dragging = -1;
    const pointer = { x: 0, y: 0, active: false };

    const light = (hex: string) => hex === "#ffb300";

    const resize = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!bubbles.length) {
        let tries = 0;
        bubbles = TOPICS.map(([label, r], i) => {
          let x = 0;
          let y = 0;
          let ok = false;
          while (!ok && tries < 900) {
            tries++;
            x = r + 12 + Math.random() * (W - 2 * r - 24);
            y = r + 12 + Math.random() * (H - 2 * r - 24);
            ok = bubbles.every((b) => (b.x - x) ** 2 + (b.y - y) ** 2 > (b.r + r + 14) ** 2);
          }
          return {
            x,
            y,
            vx: (Math.random() - 0.5) * 1.4,
            vy: (Math.random() - 0.5) * 1.4,
            r,
            label,
            c: ACCENTS[i % ACCENTS.length],
            dark: light(ACCENTS[i % ACCENTS.length]),
          };
        });
      }
    };

    const pick = (px: number, py: number) => {
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        if ((b.x - px) ** 2 + (b.y - py) ** 2 <= (b.r + 8) ** 2) return i;
      }
      return -1;
    };

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const down = (e: PointerEvent) => {
      const p = toLocal(e);
      const i = pick(p.x, p.y);
      if (i >= 0) {
        dragging = i;
        pointer.active = true;
        pointer.x = p.x;
        pointer.y = p.y;
        canvas.setPointerCapture(e.pointerId);
      }
    };
    const move = (e: PointerEvent) => {
      const p = toLocal(e);
      if (pointer.active) {
        pointer.x = p.x;
        pointer.y = p.y;
      } else {
        const hover = pick(p.x, p.y);
        canvas.style.cursor = hover >= 0 ? "grab" : "default";
      }
    };
    const up = () => {
      dragging = -1;
      pointer.active = false;
      canvas.style.cursor = "default";
    };

    const step = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        if (i === dragging) {
          b.vx = (pointer.x - b.x) * 0.22;
          b.vy = (pointer.y - b.y) * 0.22;
        } else {
          b.vx += (cx - b.x) * 0.00011;
          b.vy += (cy - b.y) * 0.00011;
        }
        b.vx *= 0.9965;
        b.vy *= 0.9965;
        const sp = Math.hypot(b.vx, b.vy);
        if (sp > 9) {
          b.vx = (b.vx / sp) * 9;
          b.vy = (b.vy / sp) * 9;
        }
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.82; }
        if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.82; }
        if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy) * 0.82; }
        if (b.y > H - b.r) { b.y = H - b.r; b.vy = -Math.abs(b.vy) * 0.82; }
      }

      // collisions
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const a = bubbles[i];
          const b = bubbles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.01;
          const min = a.r + b.r;
          if (dist < min) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = (min - dist) / 2;
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;
            const rvx = b.vx - a.vx;
            const rvy = b.vy - a.vy;
            const rel = rvx * nx + rvy * ny;
            if (rel < 0) {
              const imp = -rel * 0.9;
              a.vx -= (nx * imp) / 2;
              a.vy -= (ny * imp) / 2;
              b.vx += (nx * imp) / 2;
              b.vy += (ny * imp) / 2;
            }
          }
        }
      }

      for (const b of bubbles) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.c;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(18,16,10,0.9)";
        ctx.stroke();
        ctx.fillStyle = b.dark ? "#12100a" : "#f5f0e6";
        ctx.font = `700 ${Math.max(11, b.r * 0.3)}px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.label.toUpperCase(), b.x, b.y - 2);
        ctx.font = `500 ${Math.max(11, b.r * 0.16)}px "JetBrains Mono", monospace`;
        ctx.globalAlpha = b.dark ? 0.7 : 0.75;
        ctx.fillText(`${Math.round(b.r * 4)} pts`, b.x, b.y + b.r * 0.3);
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(step);
    };

    resize();
    step();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <section id="play" className="relative border-t border-paper/10 bg-ink px-5 py-24 text-paper md:px-14 md:py-36">
      <SectionHead
        invert
        title={
          <>
            Data is <span className="font-light text-teal">play</span>
            <span className="text-tangerine">.</span>
          </>
        }
      />

<div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xl text-base leading-relaxed text-paper/90">
          The book's real lesson is that numbers behave like matter – they cluster, collide and
          settle into patterns. Here are the book's obsessions as physical bubbles. Grab one. Fling
          it. Information is <span className="text-paper">visceral</span>.
        </p>
        <span className="font-mono text-[12px] uppercase tracking-[0.25em] text-paper/40">
          n = 14 topics · census of a curious mind
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 24 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div
          ref={wrapRef}
          className="relative h-[62vh] min-h-[420px] overflow-hidden rounded-3xl border border-paper/15 bg-[radial-gradient(ellipse_at_center,#1e1b12_0%,#12100a_70%)]"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full touch-none"
            onPointerDown={() => setTouched(true)}
          />
          <AnimatePresence>
            {!touched && (
              <motion.div
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute left-1/2 top-6 flex -translate-x-1/2 items-center gap-3 rounded-full border border-paper/15 bg-ink/70 px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.25em] text-paper/70 backdrop-blur-sm"
              >
                <motion.span animate={{ x: [0, 8, -6, 0], y: [0, -4, 2, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}>
                  <Hand className="h-3.5 w-3.5 text-sun" />
                </motion.span>
                drag · fling · collide
              </motion.div>
            )}
          </AnimatePresence>
          <div className="pointer-events-none absolute bottom-4 left-5 font-mono text-[12px] uppercase tracking-[0.25em] text-paper/30">
            simulation 1.0 · gravity: curiosity
          </div>
          <div className="pointer-events-none absolute bottom-4 right-5 font-mono text-[12px] uppercase tracking-[0.25em] text-paper/30">
            canvas physics · no data was harmed
          </div>
        </div>
      </motion.div>
    </section>
  );
}
