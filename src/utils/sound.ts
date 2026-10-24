// Opt-in UI sound kit — synthesized with WebAudio, no audio assets.
// Muted by default; every visit starts silent (WCAG 1.4.2 spirit) until the
// visitor flips the toggle in the nav. Preference persists in localStorage.

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let on = false;
let lastTick = 0;
const detach: Array<() => void> = [];

function blip(freqFrom: number, freqTo: number, dur: number, vol: number) {
  if (!ctx || !master || ctx.state !== "running") return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freqFrom, t);
  osc.frequency.exponentialRampToValueAtTime(freqTo, t + dur);
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

function onOver(e: MouseEvent) {
  if (!(e.target as HTMLElement).closest?.("a, button")) return;
  const now = performance.now();
  if (now - lastTick < 70) return;
  lastTick = now;
  blip(1180, 880, 0.05, 0.05);
}

function onClick(e: MouseEvent) {
  if (!(e.target as HTMLElement).closest?.("a, button")) return;
  // A click is a user gesture — the sanctioned moment to resume a suspended
  // context (e.g. restored from a previous session's saved preference).
  if (ctx?.state === "suspended") void ctx.resume();
  blip(660, 990, 0.08, 0.07);
}

export function soundEnabled() {
  return on;
}

export function setSound(next: boolean) {
  on = next;
  try {
    localStorage.setItem("iib-sound", next ? "1" : "0");
  } catch {
    /* private browsing */
  }
  if (next) {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
      document.addEventListener("mouseover", onOver);
      document.addEventListener("click", onClick);
      detach.push(() => {
        document.removeEventListener("mouseover", onOver);
        document.removeEventListener("click", onClick);
      });
    }
    void ctx.resume();
    blip(660, 990, 0.1, 0.08);
  } else if (ctx) {
    detach.splice(0).forEach((fn) => fn());
    void ctx.suspend();
  }
}

export function initSound() {
  try {
    on = localStorage.getItem("iib-sound") === "1";
  } catch {
    on = false;
  }
  if (on) setSound(true);
}
