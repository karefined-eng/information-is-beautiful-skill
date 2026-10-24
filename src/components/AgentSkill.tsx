import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  BookMarked,
  Bot,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  FolderTree,
  ListChecks,
  Package,
  Palette,
  ShieldCheck,
  TerminalSquare,
  UploadCloud,
  Waypoints,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SectionHead from "./SectionHead";

const ease = [0.22, 1, 0.36, 1] as const;
const BASE = "/skills/information-is-beautiful";
const ZIP = "/skills/information-is-beautiful.zip";
const ZIP_SHA = "632b8ed874fc9116cc6f6059a9c058366b38cad81191b9482b963921c96e7311";

const FILES = [
  { path: `${BASE}/SKILL.md`, label: "SKILL.md", icon: FileText, note: "instructions + frontmatter" },
  { path: `${BASE}/references/chart-matcher.md`, label: "chart-matcher.md", icon: Waypoints, note: "data shape → visual form" },
  { path: `${BASE}/references/palettes.md`, label: "palettes.md", icon: Palette, note: "colour as a data channel" },
  { path: `${BASE}/references/quality-checklist.md`, label: "quality-checklist.md", icon: ListChecks, note: "the beauty audit" },
  { path: `${BASE}/references/sources.md`, label: "sources.md", icon: BookMarked, note: "authentic lineage" },
];

interface HostStep {
  text: string;
  code?: string[];
}
interface Host {
  id: string;
  label: string;
  icon: React.ElementType;
  steps: HostStep[];
}

const HOSTS: Host[] = [
  {
    id: "code",
    label: "Claude Code",
    icon: TerminalSquare,
    steps: [
      {
        text: "Unzip and drop the folder where Claude Code looks for skills — personal scope (every project) or project scope (travels with the repo):",
        code: [
          "unzip information-is-beautiful.zip",
          "mkdir -p ~/.claude/skills",
          "cp -r information-is-beautiful ~/.claude/skills/",
          "# or, project-scoped & committed with the repo:",
          "cp -r information-is-beautiful .claude/skills/",
        ],
      },
      {
        text: "Verify Claude Code discovered it, then invoke it directly — everything after the command is passed to the skill as its brief ($ARGUMENTS):",
        code: ["/skills", "/information-is-beautiful chart this CSV of q3 churn by plan"],
      },
      {
        text: "Or skip the slash: Claude auto-invokes the skill whenever your task matches its description (e.g. “make an infographic of these survey results”). After editing SKILL.md, run /reload-plugins. Plugin-installed copies invoke as /plugin-name:information-is-beautiful.",
      },
    ],
  },
  {
    id: "claudeai",
    label: "Claude.ai / Desktop",
    icon: UploadCloud,
    steps: [
      { text: "Enable the runtime first: Settings → Capabilities → switch on “Code execution and file creation” (on Team/Enterprise, an owner enables Skills under Organization settings → Plugins & skills)." },
      {
        text: "Upload the zip — it is already packaged folder-as-root exactly as the uploader expects:",
        code: ["Customize → Skills → “+” → Create skill → Upload a skill", "→ choose information-is-beautiful.zip"],
      },
      { text: "Toggle the skill on. There’s no command to remember in chat — ask naturally (“design a comparison of these two datasets as an editorial infographic”) and Claude uses the skill when it fits." },
    ],
  },
  {
    id: "api",
    label: "API · Agent SDK",
    icon: Zap,
    steps: [
      {
        text: "Upload through the Skills API (or the CLI helper). Zip path — one call:",
        code: [
          "zip -r information-is-beautiful.zip information-is-beautiful/",
          "ant apply information-is-beautiful   # CLI upload",
          "# → returns skill_01…  (versions: skver_… or latest)",
        ],
      },
      {
        text: "Or from Python, using the SDK’s directory helper:",
        code: ["client.beta.skills.create(files=files_from_dir(\"information-is-beautiful\"))"],
      },
      {
        text: "Attach the skill to a container that has the code-execution tool enabled; its files land at /skills/information-is-beautiful/ and Claude loads it when your prompt is about visualizing information. Upload must stay under 30 MB uncompressed — this package is 19 KB.",
      },
    ],
  },
];

/* ---------------- tiny markdown renderer ---------------- */
function inline(text: string, kb: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**"))
      return (
        <strong key={`${kb}-${i}`} className="font-semibold text-sun">
          {p.slice(2, -2)}
        </strong>
      );
    if (p.startsWith("`") && p.endsWith("`"))
      return (
        <code key={`${kb}-${i}`} className="rounded bg-paper/10 px-1.5 py-0.5 font-mono text-[0.82em] text-teal">
          {p.slice(1, -1)}
        </code>
      );
    return <span key={`${kb}-${i}`}>{p}</span>;
  });
}

function Markdown({ src }: { src: string }) {
  const lines = src.split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;

  if (lines[0]?.trim() === "---") {
    const meta: string[] = [];
    i = 1;
    while (i < lines.length && lines[i].trim() !== "---") {
      meta.push(lines[i]);
      i++;
    }
    i++;
    out.push(
      <div key="fm" className="mb-5 rounded-lg border border-paper/15 bg-paper/5 p-4 font-mono text-[11px] leading-relaxed">
        {meta.map((m, j) => {
          const idx = m.indexOf(":");
          return (
            <div key={j} className={j > 0 && !m.startsWith(" ") ? "mt-2" : ""}>
              {idx > 0 && !m.startsWith(" ") ? (
                <>
                  <span className="text-tangerine">{m.slice(0, idx)}</span>
                  <span className="text-paper/45">:</span>
                  <span className="text-paper/70">{m.slice(idx + 1)}</span>
                </>
              ) : (
                <span className="text-paper/70">{m}</span>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  for (; i < lines.length; i++) {
    const l = lines[i];
    const k = `l${i}`;
    if (!l.trim()) continue;
    if (l.startsWith("```")) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i++;
      }
      out.push(
        <pre key={k} className="my-3 overflow-x-auto rounded-lg border border-paper/15 bg-black/40 p-4 font-mono text-[11px] leading-relaxed text-paper/85">
          {buf.join("\n")}
        </pre>
      );
      continue;
    }
    if (l.startsWith("### "))
      out.push(
        <h4 key={k} className="mb-1 mt-5 font-mono text-[12px] font-bold uppercase tracking-[0.15em] text-magenta">
          {inline(l.slice(4), k)}
        </h4>
      );
    else if (l.startsWith("## "))
      out.push(
        <h3 key={k} className="mb-2 mt-7 font-mono text-[13px] font-bold uppercase tracking-[0.18em] text-teal first:mt-0">
          {inline(l.slice(3), k)}
        </h3>
      );
    else if (l.startsWith("# "))
      out.push(
        <h2 key={k} className="mb-3 font-display text-2xl font-black text-paper">
          {inline(l.slice(2), k)}
        </h2>
      );
    else if (l.trim() === "---") out.push(<hr key={k} className="my-5 border-paper/15" />);
    else if (l.startsWith("- [ ] "))
      out.push(
        <p key={k} className="flex gap-2.5 py-0.5 pl-3 text-[13px] leading-relaxed text-paper/75">
          <span className="mt-[5px] block h-3 w-3 shrink-0 rounded-[3px] border border-tangerine/70" />
          <span>{inline(l.slice(6), k)}</span>
        </p>
      );
    else if (l.startsWith("- "))
      out.push(
        <p key={k} className="flex gap-2.5 py-0.5 pl-3 text-[13px] leading-relaxed text-paper/75">
          <span className="mt-[8px] block h-1 w-1 shrink-0 rounded-full bg-tangerine" />
          <span>{inline(l.slice(2), k)}</span>
        </p>
      );
    else {
      const num = l.match(/^(\d+)\.\s+(.*)/);
      if (num)
        out.push(
          <p key={k} className="flex gap-3 py-1 pl-3 text-[13px] leading-relaxed text-paper/80">
            <span className="shrink-0 font-mono text-[11px] font-bold text-tangerine">{num[1]}.</span>
            <span>{inline(num[2], k)}</span>
          </p>
        );
      else
        out.push(
          <p key={k} className="py-0.5 text-[13px] leading-relaxed text-paper/70">
            {inline(l, k)}
          </p>
        );
    }
  }
  return <>{out}</>;
}

/* ---------------- section ---------------- */
export default function AgentSkill() {
  const [active, setActive] = useState(0);
  const [host, setHost] = useState(0);
  const [cache, setCache] = useState<Record<string, string>>({});
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const file = FILES[active];
  const content = cache[file.path];

  useEffect(() => {
    if (cache[file.path] || failed) return;
    fetch(file.path)
      .then((r) => {
        if (!r.ok) throw new Error("nf");
        return r.text();
      })
      .then((t) => setCache((c) => ({ ...c, [file.path]: t })))
      .catch(() => setFailed(true));
    return () => clearTimeout(timer.current);
  }, [active, cache, file.path, failed]);

  const copy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const Host = HOSTS[host];

  return (
    <section id="skill" className="relative border-t border-ink/10 px-5 py-24 md:px-14 md:py-36">
      <SectionHead
        fig="fig. 05"
        kicker="the agent skill"
        title={
          <>
            The book, <em className="font-light text-tangerine">compiled</em>
            <br />
            for AI agents
          </>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
        className="mb-5 flex max-w-3xl items-start gap-4"
      >
        <Bot className="mt-1 h-6 w-6 shrink-0 text-tangerine" />
        <p className="text-[15px] leading-relaxed text-ink-soft">
          Built to the{" "}
          <a href="https://agentskills.io/specification" target="_blank" rel="noreferrer" className="font-semibold text-ink underline decoration-tangerine decoration-2 underline-offset-2">
            Agent Skills open specification
          </a>{" "}
          — a folder with a <code className="rounded bg-ink/10 px-1.5 py-0.5 font-mono text-[13px] text-ink">SKILL.md</code>{" "}
          (name, description, license, metadata) plus references an agent loads on demand. The
          distillation is deliberately narrow, and every principle’s{" "}
          <span className="font-semibold text-ink">authentic source is preserved</span> in{" "}
          <code className="rounded bg-ink/10 px-1.5 py-0.5 font-mono text-[13px] text-ink">references/sources.md</code>.
        </p>
      </motion.div>

      <div className="mb-12 flex flex-wrap gap-2.5">
        {["spec-compliant frontmatter", "5 markdown docs · 19 KB", "MIT · remix freely", "sources preserved", "zip upload-ready"].map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: i * 0.06 }}
            className="rounded-full border border-ink/20 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft"
          >
            {t}
          </motion.span>
        ))}
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[380px_1fr] lg:gap-12">
        {/* left column */}
        <div className="space-y-5">
          {/* the package */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="rounded-2xl border border-ink bg-ink p-6 text-paper"
          >
            <p className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-sun">
              <Archive className="h-4 w-4" /> the package
            </p>
            <p className="font-display text-lg font-bold leading-snug">information-is-beautiful.zip</p>
            <p className="mt-1 text-xs text-paper/55">folder-as-root · 5 markdown files · 12 KB (19 KB unpacked)</p>
            <a
              href={ZIP}
              download
              className="group mt-4 flex items-center justify-center gap-2.5 rounded-full bg-tangerine px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-sun"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              download the zip
            </a>
            <p className="mt-3 break-all font-mono text-[9.5px] leading-relaxed text-paper/35">
              sha256 {ZIP_SHA.slice(0, 24)}…{ZIP_SHA.slice(-8)}
            </p>
          </motion.div>

          {/* install & invoke */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="rounded-2xl border border-ink/15 p-6"
          >
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft">install & invoke — pick your host</p>
            <div className="mb-5 flex flex-wrap gap-2">
              {HOSTS.map((h, i) => (
                <button
                  key={h.id}
                  onClick={() => setHost(i)}
                  className={`flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${i === host ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink-soft hover:border-ink/60"}`}
                >
                  <h.icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  {h.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.ol
                key={Host.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
                className="space-y-4"
              >
                {Host.steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 font-mono text-[11px] font-bold text-tangerine">{i + 1}.</span>
                    <div className="min-w-0">
                      <p className="text-sm leading-relaxed text-ink-soft">{s.text}</p>
                      {s.code && (
                        <pre className="mt-2 overflow-x-auto rounded-lg bg-ink p-3.5 font-mono text-[11px] leading-relaxed text-paper/85">
                          {s.code.join("\n")}
                        </pre>
                      )}
                    </div>
                  </li>
                ))}
              </motion.ol>
            </AnimatePresence>
          </motion.div>

          {/* arguments */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="rounded-2xl border border-ink/15 bg-paper-deep/40 p-6"
          >
            <Package className="mb-3 h-5 w-5 text-teal" strokeWidth={1.7} />
            <h3 className="font-display text-xl font-bold">Commands & arguments</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Skills have no typed signature — there is one “command” per host: the folder’s name.
              In Claude Code that name becomes the slash command; whatever you type after it arrives
              as <code className="rounded bg-ink/10 px-1 py-0.5 font-mono text-xs">$ARGUMENTS</code> and the skill
              treats it as the design brief (data, audience, medium). Everywhere else, the argument
              is simply your natural-language request. For scripted reads, the skill resolves its
              references via <code className="rounded bg-ink/10 px-1 py-0.5 font-mono text-xs">$&#123;CLAUDE_SKILL_DIR&#125;</code>.
            </p>
          </motion.div>

          {/* provenance */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="rounded-2xl border border-tangerine/50 bg-tangerine/10 p-6"
          >
            <ShieldCheck className="mb-3 h-5 w-5 text-tangerine" strokeWidth={1.7} />
            <h3 className="font-display text-xl font-bold">Provenance, honestly</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Principles are teachable; the book’s expression is the author’s. This skill quotes
              nothing from it, and{" "}
              <code className="rounded bg-ink/10 px-1 py-0.5 font-mono text-xs">references/sources.md</code>{" "}
              maps every principle to its true origin — McCandless, Tufte, Few, Cairo, WCAG. Want
              the real atlas?{" "}
              <a href="#get" className="font-semibold text-ink underline decoration-tangerine decoration-2 underline-offset-2">
                fig. 06
              </a>{" "}
              has the legal routes.
            </p>
          </motion.div>
        </div>

        {/* viewer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-ink bg-ink text-paper shadow-[0_28px_80px_-24px_rgb(23_20_14/0.5)]"
        >
          <div className="flex items-center justify-between gap-4 border-b border-paper/15 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-tangerine" />
              <span className="h-3 w-3 rounded-full bg-sun" />
              <span className="h-3 w-3 rounded-full bg-teal" />
              <span className="ml-3 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40 md:block">
                ~/skills/information-is-beautiful
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copy}
                disabled={!content}
                className="flex items-center gap-2 rounded-full border border-paper/25 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors hover:border-tangerine hover:text-tangerine disabled:opacity-40"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-teal" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "copied" : "copy"}
              </button>
              <a
                href={file.path}
                download
                className="flex items-center gap-2 rounded-full border border-paper/25 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors hover:border-teal hover:text-teal"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">file</span>
              </a>
              <a
                href={file.path}
                target="_blank"
                rel="noreferrer"
                aria-label="Open raw file"
                className="grid h-7 w-7 place-items-center rounded-full border border-paper/25 transition-colors hover:border-magenta hover:text-magenta"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-[230px_1fr]">
            <div className="hidden border-r border-paper/15 p-4 md:block">
              <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40">
                <FolderTree className="h-3.5 w-3.5" />
                files
              </p>
              <p className="px-2 pb-1.5 font-mono text-[10px] text-paper/35">information-is-beautiful/</p>
              {FILES.map((f, i) => {
                const isRef = f.path.includes("/references/");
                return (
                  <div key={f.path}>
                    {isRef && i === 1 && <p className="px-2 py-1.5 font-mono text-[10px] text-paper/35">└─ references/</p>}
                    <button
                      onClick={() => setActive(i)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors ${i === active ? "bg-paper/10 text-paper" : "text-paper/55 hover:bg-paper/5 hover:text-paper/85"} ${isRef ? "pl-6" : ""}`}
                    >
                      <f.icon className="h-3.5 w-3.5 shrink-0" style={{ color: i === active ? "#ff5d1f" : undefined }} strokeWidth={1.8} />
                      <span>
                        <span className="block font-mono text-[11px]">{f.label}</span>
                        <span className="block text-[10px] text-paper/40">{f.note}</span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 overflow-x-auto border-b border-paper/15 p-3 md:hidden">
              {FILES.map((f, i) => (
                <button
                  key={f.path}
                  onClick={() => setActive(i)}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 font-mono text-[10px] transition-colors ${i === active ? "border-tangerine bg-tangerine/15 text-paper" : "border-paper/20 text-paper/50"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="h-[560px] overflow-y-auto p-5 md:p-7">
              {failed ? (
                <p className="font-mono text-xs leading-relaxed text-paper/60">
                  (raw files not reachable in this preview — they live in
                  <span className="text-teal"> public/skills/information-is-beautiful/ </span>
                  inside the project)
                </p>
              ) : content ? (
                <Markdown src={content} />
              ) : (
                <p className="animate-blink font-mono text-xs uppercase tracking-[0.25em] text-paper/40">loading {file.label}…</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-paper/15 px-5 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-paper/35">
            <span>{file.path.replace(BASE, "skill:")}</span>
            <span className="hidden sm:block">agent skills spec · markdown · MIT</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
