import { motion } from "framer-motion";
import { type ReactElement } from "react";
import { mulberry } from "../data/book";

/* ------------------------------------------------------------------ */
/*  Six bespoke SVG renderers — illustrative homages to the book’s     */
/*  spreads. All figures here are fictional echoes, not the datasets.  */
/* ------------------------------------------------------------------ */

const MONO = "JetBrains Mono, monospace";
const VIEW = "0 0 800 440";
const ease = [0.22, 1, 0.36, 1] as const;

const TANGERINE = "#ff5d1f";
const TEAL = "#00a5a8";
const SUN = "#ffb300";
const MAGENTA = "#e22d96";
const COBALT = "#3557ff";
const LEAF = "#4f9d3a";
const INK = "#17140e";
const PAPER = "#f3eee1";

export type VizKey = "blocks" | "bubbles" | "spikes" | "wheel" | "squares" | "split";

/* -------------------- 01 · billion-dollar blocks ------------------- */
function BlocksViz() {
  const data = [
    ["Bank bailouts ’08", 700],
    ["Iraq & Afghan wars", 450],
    ["OPEC oil profits", 300],
    ["Global arms trade", 210],
    ["Medicare fraud /yr", 150],
    ["Walmart profits", 90],
    ["Pledged climate aid", 60],
    ["Global yoga market", 40],
    ["Netaid to Africa /yr", 30],
    ["UN peacekeeping", 22],
    ["Fighting malaria", 15],
    ["Wall St art market", 9],
  ] as const;
  const colors = [TANGERINE, COBALT, SUN, MAGENTA, TEAL, LEAF, INK];
  // flow layout
  const k = 9;
  let x = 20;
  let y = 24;
  let rowH = 0;
  const rects: { x: number; y: number; s: number; c: string; label: string; v: number }[] = [];
  for (const [label, v] of data) {
    const s = Math.sqrt(v) * k;
    if (x + s > 790) {
      x = 20;
      y += rowH + 12;
      rowH = 0;
    }
    rects.push({ x, y, s, c: colors[rects.length % colors.length], label, v });
    x += s + 12;
    rowH = Math.max(rowH, s);
  }

  return (
    <svg viewBox={VIEW} className="h-auto w-full" role="img" aria-label="Billion dollar blocks homage">
      {rects.map((r, i) => (
        <motion.g key={r.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: i * 0.04, ease }} style={{ transformOrigin: `${r.x + r.s / 2}px ${r.y + r.s / 2}px` }}>
          <rect x={r.x} y={r.y} width={r.s} height={r.s} rx={6} fill={r.c} stroke={INK} strokeWidth={1.5} />
          {r.s > 70 && (
            <>
              <text x={r.x + 10} y={r.y + 26} fontFamily={MONO} fontSize="15" fontWeight="700" fill={r.c === SUN ? INK : PAPER}>
                ${r.v}bn
              </text>
              <text x={r.x + 10} y={r.y + 44} fontFamily={MONO} fontSize="9.5" letterSpacing="1.5" fill={r.c === SUN ? INK : PAPER} opacity={0.85}>
                {r.label.toUpperCase()}
              </text>
            </>
          )}
          {r.s <= 70 && <title>{`${r.label} — $${r.v}bn`}</title>}
        </motion.g>
      ))}
      <text x={20} y={430} fontFamily={MONO} fontSize="10" letterSpacing="2.5" fill={INK} opacity={0.5}>
        AREA = MONEY ($BN) · VALUES ARE AN ILLUSTRATIVE HOMAGE, NOT THE ORIGINAL DATASET
      </text>
    </svg>
  );
}

/* -------------------- 02 · snake-oil bubbles ----------------------- */
function BubblesViz() {
  const data: [string, number, number][] = [
    // name, evidence, popularity
    ["Garlic", 86, 52],
    ["Omega-3", 82, 66],
    ["Folic acid", 74, 26],
    ["Vitamin D", 68, 58],
    ["Vitamin C", 46, 84],
    ["Calcium", 44, 62],
    ["Multivits", 34, 88],
    ["Echinacea", 30, 44],
    ["Ginseng", 26, 40],
    ["Ginkgo", 24, 48],
    ["Energy drinks", 22, 72],
    ["Guarana", 18, 36],
    ["Detox tea", 9, 60],
    ["Homeopathy", 4, 56],
    ["Colloidal silver", 3, 18],
    ["Oxygen water", 2, 12],
  ];
  const band = (e: number) => (e >= 60 ? TEAL : e >= 25 ? SUN : e >= 12 ? MAGENTA : INK);
  const X = (p: number) => 70 + (p / 100) * 660;
  const Y = (e: number) => 390 - (e / 100) * 340;

  return (
    <svg viewBox={VIEW} className="h-auto w-full" role="img" aria-label="Supplement evidence bubbles homage">
      {[0, 25, 50, 75, 100].map((t) => (
        <g key={t}>
          <line x1={70} y1={Y(t)} x2={730} y2={Y(t)} stroke={INK} strokeOpacity={0.12} strokeDasharray="3 5" />
          <text x={32} y={Y(t) + 4} fontFamily={MONO} fontSize="9" fill={INK} opacity={0.5}>
            {t}
          </text>
        </g>
      ))}
      <text x={20} y={30} fontFamily={MONO} fontSize="10" letterSpacing="2.5" fill={INK} opacity={0.55}>
        STRONG EVIDENCE ↑
      </text>
      <text x={590} y={420} fontFamily={MONO} fontSize="10" letterSpacing="2.5" fill={INK} opacity={0.55}>
        VERY POPULAR →
      </text>
      <line x1={70} y1={400} x2={730} y2={400} stroke={INK} strokeWidth={1.5} />
      <line x1={70} y1={400} x2={70} y2={30} stroke={INK} strokeWidth={1.5} />
      <text x={80} y={Y(10) - 6} fontFamily={MONO} fontSize="9" letterSpacing="3" fill={MAGENTA}>
        — — SNAKE OIL TERRITORY — —
      </text>
      {data.map(([name, ev, pop], i) => {
        const r = Math.sqrt(pop) * 2.1 + 4;
        const cx = X(pop);
        const cy = Y(ev);
        const dark = band(ev) === SUN;
        return (
          <motion.g key={name} initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.15 + i * 0.05 }} style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <circle cx={cx} cy={cy} r={r} fill={band(ev)} fillOpacity={0.9} stroke={INK} strokeWidth={1.4} />
            <text x={cx} y={cy + 3.5} textAnchor="middle" fontFamily={MONO} fontSize={r > 16 ? 10 : 0} fontWeight="700" fill={dark ? INK : PAPER}>
              {r > 16 ? name.split(" ")[0].slice(0, 8).toUpperCase() : ""}
            </text>
            {r <= 16 && (
              <text x={cx} y={cy - r - 5} textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill={INK} opacity={0.7}>
                {name.toUpperCase()}
              </text>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ---------------- 03 · molehill mountain spikes -------------------- */
function SpikesViz() {
  const panics = [
    { name: "Millennium bug", c: 20, w: 7, h: 130, color: SUN },
    { name: "Killer bees", c: 34, w: 5, h: 62, color: TEAL },
    { name: "MMR vaccine", c: 50, w: 6, h: 96, color: LEAF },
    { name: "SARS", c: 64, w: 5, h: 168, color: MAGENTA },
    { name: "Bird flu", c: 84, w: 7, h: 192, color: TANGERINE },
    { name: "Videogame violence", c: 102, w: 8, h: 74, color: COBALT },
  ];
  const base = 380;
  const X = (m: number) => 30 + m * 6.2;
  const rand = mulberry(42);
  const jitters = Array.from({ length: 125 }, () => (rand() - 0.5) * 8);

  return (
    <svg viewBox={VIEW} className="h-auto w-full" role="img" aria-label="Media panic peaks homage">
      {[0, 1, 2, 3].map((t) => (
        <line key={t} x1={30} y1={base - 70 * (t + 1)} x2={770} y2={base - 70 * (t + 1)} stroke={INK} strokeOpacity={0.1} strokeDasharray="2 6" />
      ))}
      <line x1={30} y1={base} x2={770} y2={base} stroke={INK} strokeWidth={1.5} />
      {panics.map((p, pi) => {
        const pts: string[] = [];
        for (let m = p.c - p.w * 3; m <= p.c + p.w * 3; m++) {
          const g = p.h * Math.exp(-((m - p.c) ** 2) / (2 * p.w * p.w));
          const noise = jitters[(m % 125 + 125) % 125] * (1 + g / 90);
          pts.push(`${X(m)},${base - Math.max(0, g) + noise}`);
        }
        const d = `M ${X(p.c - p.w * 3)},${base} L ${pts.join(" L ")} L ${X(p.c + p.w * 3)},${base} Z`;
        return (
          <motion.g key={p.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: pi * 0.1, ease }}>
            <path d={d} fill={p.color} fillOpacity={0.82} stroke={INK} strokeWidth={1.2} />
            <line x1={X(p.c)} y1={base - p.h - 26} x2={X(p.c)} y2={base - p.h - 12} stroke={INK} strokeWidth={1} />
            <text x={X(p.c)} y={base - p.h - 32} textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="1.5" fontWeight="700" fill={INK}>
              {p.name.toUpperCase()}
            </text>
          </motion.g>
        );
      })}
      {[1998, 2001, 2004, 2007].map((yr, i) => (
        <text key={yr} x={30 + i * 12 * 3.4 * 6.05 + 20} y={base + 22} fontFamily={MONO} fontSize="9" fill={INK} opacity={0.5}>
          {yr}
        </text>
      ))}
    </svg>
  );
}

/* ------------------- 04 · colours-in-culture wheel ----------------- */
function WheelViz() {
  const meanings = ["Passion", "Mourning", "Luck", "Royalty", "Danger", "Calm", "Fertility", "Death", "Wealth", "Youth"];
  const cultures = ["Western", "Japanese", "Hindu", "N. American", "Chinese", "S. America", "E. Europe", "African"];
  const base = ["#e63f2e", "#17140e", "#4f9d3a", "#7a4fb3", "#ff5d1f", "#00a5a8", "#e22d96", "#2b2b2b", "#ffb300", "#f49ac1"];
  // exceptions: cultureIdx, meaningIdx → color (echoing the original’s best-known twists)
  const exc: Record<string, string> = {
    "1,1": "#f7f4ea",
    "2,1": "#f7f4ea",
    "4,1": "#f7f4ea",
    "4,2": "#e63f2e",
    "4,0": "#e63f2e",
    "1,3": "#ffb300",
    "2,7": "#f7f4ea",
    "5,1": "#00a5a8",
    "6,5": "#ffb300",
    "3,3": "#e63f2e",
    "7,2": "#e63f2e",
    "4,8": "#ffb300",
    "2,6": "#ffb300",
  };
  const cx = 285;
  const cy = 232;
  const seg = 36;
  const rad = (d: number) => ((d - 90) * Math.PI) / 180;
  const ann = (r0: number, r1: number, a0: number, a1: number) => {
    const X = (r: number, a: number) => cx + r * Math.cos(rad(a));
    const Y = (r: number, a: number) => cy + r * Math.sin(rad(a));
    return `M ${X(r1, a0).toFixed(2)} ${Y(r1, a0).toFixed(2)} A ${r1} ${r1} 0 0 1 ${X(r1, a1).toFixed(2)} ${Y(r1, a1).toFixed(2)} L ${X(r0, a1).toFixed(2)} ${Y(r0, a1).toFixed(2)} A ${r0} ${r0} 0 0 0 ${X(r0, a0).toFixed(2)} ${Y(r0, a0).toFixed(2)} Z`;
  };
  let n = 0;

  return (
    <svg viewBox={VIEW} className="h-auto w-full" role="img" aria-label="Colours in culture wheel homage">
      {cultures.map((_, ci) =>
        meanings.map((_, mi) => {
          const a0 = mi * seg + 2;
          const a1 = (mi + 1) * seg - 2;
          const r0 = 200 - ci * 19;
          const r1 = r0 - 16;
          const fill = exc[`${ci},${mi}`] ?? base[mi];
          n++;
          return (
            <motion.path key={`${ci}-${mi}`} d={ann(r0, r1, a0, a1)} fill={fill} stroke={PAPER} strokeWidth={1.5} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: n * 0.004 }} />
          );
        })
      )}
      <circle cx={cx} cy={cy} r={44} fill={INK} />
      <text x={cx} y={cy - 3} textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="2" fill={PAPER}>
        HUE =
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="2" fill={SUN}>
        MEANING
      </text>
      {meanings.map((m, mi) => {
        const a = mi * seg + seg / 2;
        const lx = cx + 214 * Math.cos(rad(a));
        const ly = cy + 214 * Math.sin(rad(a));
        const rot = a > 90 && a < 270 ? a + 180 : a;
        return (
          <text key={m} fontFamily={MONO} fontSize="9.5" letterSpacing="1.5" fill={INK} textAnchor={rot > 90 ? "end" : "start"} transform={`rotate(${rot} ${lx} ${ly})`} x={lx} y={ly + 3} opacity={0.75}>
            {m.toUpperCase()}
          </text>
        );
      })}
      <g>
        {cultures.map((c, ci) => (
          <g key={c}>
            <rect x={560} y={74 + ci * 40} width={200 - ci * 19 - 16 > 0 ? 14 : 14} height={14} rx={3} fill={exc[`${ci},1`] ?? (ci % 2 ? INK : [SUN, MAGENTA, TEAL, COBALT][ci % 4])} stroke={INK} strokeWidth={1.2} />
            <text x={582} y={85 + ci * 40} fontFamily={MONO} fontSize="10" letterSpacing="1.5" fill={INK} opacity={0.8}>
              {c.toUpperCase()}
            </text>
            <line x1={560} y1={81 + ci * 40} x2={540} y2={81 + ci * 40} stroke={INK} strokeOpacity={0.25} strokeDasharray="2 3" />
          </g>
        ))}
        <text x={560} y={56} fontFamily={MONO} fontSize="10" letterSpacing="2.5" fill={INK} opacity={0.55}>
          RINGS = CULTURES →
        </text>
      </g>
    </svg>
  );
}

/* ------------------ 05 · century-of-death squares ------------------ */
function SquaresViz() {
  const cats: [string, number, string][] = [
    ["War & conflict", 88, COBALT],
    ["Pandemics", 44, TEAL],
    ["Famines", 40, SUN],
    ["Genocides", 32, MAGENTA],
    ["Disasters", 24, TANGERINE],
    ["Other", 14, INK],
  ];
  const cell = 15;
  const cols = 46;
  const startX = 45;
  const startY = 96;
  let flat: { cat: string; color: string }[] = [];
  cats.forEach(([cat, count, color]) => {
    for (let i = 0; i < count; i++) flat.push({ cat, color });
  });
  const total = flat.length;

  return (
    <svg viewBox={VIEW} className="h-auto w-full" role="img" aria-label="Twentieth century death squares homage">
      {flat.map((s, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return (
          <motion.rect
            key={i}
            x={startX + col * cell}
            y={startY + row * (cell + 2)}
            width={cell - 1.5}
            height={cell - 1.5}
            rx={2.5}
            fill={s.color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.1 + i * 0.006 }}
          >
            <title>{s.cat}</title>
          </motion.rect>
        );
      })}
      <text x={startX} y={70} fontFamily={MONO} fontSize="10" letterSpacing="2.5" fill={INK} opacity={0.55}>
        ONE SQUARE ≈ 250,000 LIVES · {total} SQUARES SHOWN · ILLUSTRATIVE
      </text>
      {cats.map(([cat, count, color], i) => {
        const lx = 45 + (i % 3) * 250;
        const ly = 226 + Math.floor(i / 3) * 34;
        return (
          <motion.g key={cat} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 1.4 + i * 0.08 }}>
            <rect x={lx} y={ly - 10} width={12} height={12} rx={2.5} fill={color} />
            <text x={lx + 20} y={ly} fontFamily={MONO} fontSize="10.5" letterSpacing="1" fill={INK}>
              {cat.toUpperCase()} · {count}
            </text>
          </motion.g>
        );
      })}
      <motion.text x={45} y={330} fontFamily={MONO} initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ delay: 2.2, duration: 0.8 }} fontSize="13" fontWeight="700" fill={INK}>
        ≈ 60,500,000 PEOPLE. THE NUMBER YOU CAN’T UNSEE.
      </motion.text>
      <motion.line x1={45} y1={345} x2={465} y2={345} stroke={TANGERINE} strokeWidth={3} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.4, duration: 0.7, ease }} style={{ transformOrigin: "left" }} />
    </svg>
  );
}

/* ------------------- 06 · left-vs-right concept map ---------------- */
function SplitViz() {
  const left = ["change is a path", "care for the least", "question authority", "one human tribe", "nurture nature", "share the net"];
  const right = ["tradition anchors", "earn what you reap", "order before drift", "roots & nation", "grow by rivalry", "protect your own"];
  const cy = 218;

  return (
    <svg viewBox={VIEW} className="h-auto w-full" role="img" aria-label="Left versus right concept map homage">
      <line x1={400} y1={36} x2={400} y2={404} stroke={INK} strokeOpacity={0.15} strokeDasharray="4 6" />
      <text x={400} y={26} textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="3" fill={INK} opacity={0.45}>
        THE SPECTRUM
      </text>

      {left.map((t, i) => {
        const y = 74 + i * 58;
        return (
          <motion.g key={t} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: i * 0.07, ease }}>
            <path d={`M 252 ${y} C 320 ${y}, 320 ${cy}, 356 ${cy}`} fill="none" stroke={TEAL} strokeWidth={1.6} strokeOpacity={0.75} />
            <rect x={52} y={y - 17} width={200} height={34} rx={17} fill={PAPER} stroke={TEAL} strokeWidth={1.8} />
            <text x={152} y={y + 3.5} textAnchor="middle" fontFamily={MONO} fontSize="10.5" letterSpacing="0.5" fill={INK}>
              {t.toUpperCase()}
            </text>
          </motion.g>
        );
      })}
      {right.map((t, i) => {
        const y = 74 + i * 58;
        return (
          <motion.g key={t} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: i * 0.07, ease }}>
            <path d={`M 548 ${y} C 480 ${y}, 480 ${cy}, 444 ${cy}`} fill="none" stroke={TANGERINE} strokeWidth={1.6} strokeOpacity={0.75} />
            <rect x={548} y={y - 17} width={200} height={34} rx={17} fill={PAPER} stroke={TANGERINE} strokeWidth={1.8} />
            <text x={648} y={y + 3.5} textAnchor="middle" fontFamily={MONO} fontSize="10.5" letterSpacing="0.5" fill={INK}>
              {t.toUpperCase()}
            </text>
          </motion.g>
        );
      })}

      <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.4, ease }} style={{ transformOrigin: "400px 218px" }}>
        <circle cx={400} cy={cy} r={52} fill={INK} />
        <text x={400} y={cy - 8} textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="2" fill={SUN} fontWeight="700">
          COMMON
        </text>
        <text x={400} y={cy + 5} textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="2" fill={PAPER} fontWeight="700">
          HOPES
        </text>
        <text x={400} y={cy + 20} textAnchor="middle" fontFamily={MONO} fontSize="7.5" fill={PAPER} opacity={0.6}>
          safety · family · fairness
        </text>
      </motion.g>
    </svg>
  );
}

export const VIZ_RENDERERS: Record<VizKey, () => ReactElement> = {
  blocks: BlocksViz,
  bubbles: BubblesViz,
  spikes: SpikesViz,
  wheel: WheelViz,
  squares: SquaresViz,
  split: SplitViz,
};
