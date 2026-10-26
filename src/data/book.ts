/* ------------------------------------------------------------------ */
/*  Data for the tribute site — facts sourced from the publisher,      */
/*  the author's site and public bibliographic records.                */
/* ------------------------------------------------------------------ */

export const ACCENTS = ["#d04000", "#007a7d", "#b88000", "#a01565", "#2538b8", "#306b22"] as const;

export const marqueeTopics = [
  "Billion–Dollar–o–Gram",
  "Snake Oil Supplements",
  "Mountains out of Molehills",
  "Colours in Culture",
  "Left vs Right",
  "Twentieth Century Death",
  "The DNA of Ideas",
  "Most Virgin Births?",
  "Peak Break-up Times",
  "Planet Earth",
  "Who Sues Whom?",
  "The True Size of Africa",
  "Rhythms of the Brain",
  "Letting Go of God",
];

export interface Spec {
  label: string;
  value: string;
  note?: string;
}

export const specs: Spec[] = [
  { label: "Author", value: "David McCandless", note: "London-based data-journalist" },
  { label: "Publisher", value: "William Collins", note: "HarperCollins imprint" },
  { label: "First edition", value: "2009", note: "US: “The Visual Miscellaneum”" },
  { label: "New edition", value: "2012", note: "Revised, recalculated, reimagined" },
  { label: "Pages", value: "256", note: "Full-colour throughout" },
  { label: "ISBN", value: "978-0007492893", note: "New edition, hardback" },
];

export type VizKind = "blocks" | "bubbles" | "spikes" | "wheel" | "squares" | "split";

export interface AtlasPiece {
  id: string;
  index: string;
  title: string;
  kind: VizKind;
  color: string;
  tagline: string;
  body: string;
  axis: string;
}

export const atlasPieces: AtlasPiece[] = [
  {
    id: "billion",
    index: "01",
    title: "Billion–Dollar–o–Gram",
    kind: "blocks",
    color: "#d04000",
    tagline: "Big money, made legible.",
    body:
      "The book’s signature spread stacks the vast sums that swirl through the news — bailouts, wars, aid, crimes, earnings — into a single coloured lattice. Figures that are meaningless as headlines suddenly snap into proportion. This homage re-blocks some of that money at illustrative scale.",
    axis: "area = $, illustrative values",
  },
  {
    id: "snakeoil",
    index: "02",
    title: "Snake Oil? Supplements",
    kind: "bubbles",
    color: "#007a7d",
    tagline: "Hype vs. evidence, bubbled.",
    body:
      "One of the most beloved charts in the book maps health supplements by the strength of scientific evidence versus their popularity. The higher the bubble floats, the stronger the proof. Garlic hovers near the top; fads sink to the murky bottom. Bubble size is an echo of the original’s spirit — not the dataset.",
    axis: "y = strength of evidence · x = popularity",
  },
  {
    id: "molehills",
    index: "03",
    title: "Mountains out of Molehills",
    kind: "spikes",
    color: "#a01565",
    tagline: "A timeline of media panics.",
    body:
      "A decade of front-page terrors — bird flu, SARS, killer everything — charted by press coverage volume. Each mountain is a fear; most are molehills with terrific PR. The rhythm of alarm becomes visible as landscape. Peaks here are illustrative echoes of that idea.",
    axis: "y = relative press coverage · x = 1998 → 2008",
  },
  {
    id: "colours",
    index: "04",
    title: "Colours in Culture",
    kind: "wheel",
    color: "#b88000",
    tagline: "What colours mean around the world.",
    body:
      "The same hue can signal mourning in one culture and celebration in another. The book’s colour wheel aligns shade with meaning across dozens of cultures — a Rosetta stone of chroma. This wheel is an illustrative reconstruction in the spirit of the original.",
    axis: "ring = culture · segment = meaning, illustrative",
  },
  {
    id: "death",
    index: "05",
    title: "Twentieth Century Death",
    kind: "squares",
    color: "#2538b8",
    tagline: "The century’s grim ledger.",
    body:
      "Humanity’s hundred hardest years, counted. Wars, genocides, famines and disasters rendered as a field of tallying squares so that scale — numb in prose — becomes felt on the page. One of the book’s most sobering spreads, echoed here with illustrative blocks.",
    axis: "1 square ≈ 250,000 lives, illustrative",
  },
  {
    id: "leftright",
    index: "06",
    title: "Left vs Right",
    kind: "split",
    color: "#306b22",
    tagline: "Two world-views, one diagram.",
    body:
      "A respectful X-ray of the political divide: the values, instincts and hopes that animate the left and the right, mirrored across a shared centre. Neither side mocked nor crowned — just mapped. Labels here sketch the concept, not the full canvas of the original.",
    axis: "concept cartography, mirrored",
  },
];

export interface BuyOption {
  venue: string;
  kind: "buy" | "borrow" | "preview" | "official";
  blurb: string;
  meta: string;
  url: string;
}

export const buyOptions: BuyOption[] = [
  {
    venue: "informationisbeautiful.net",
    kind: "official",
    blurb: "The author’s own site — hundreds of free visualizations, datasets and the blog the book grew from.",
    meta: "free · official",
    url: "https://informationisbeautiful.net",
  },
  {
    venue: "HarperCollins / William Collins",
    kind: "buy",
    blurb: "Buy the new edition direct from the publisher — 256 full-colour pages, ISBN 978-0007492893.",
    meta: "hardback · publisher",
    url: "https://harpercollins.co.uk/products/information-is-beautiful-new-edition-david-mccandless?variant=32556404555854",
  },
  {
    venue: "Bookshop.org",
    kind: "buy",
    blurb: "Order online while supporting independent bookshops with every purchase.",
    meta: "supports indies",
    url: "https://bookshop.org/search?keywords=Information%20is%20Beautiful%20McCandless",
  },
  {
    venue: "WorldCat — local libraries",
    kind: "borrow",
    blurb: "Find the book on the shelf of a library near you. 255 pages of infographics, free to read there.",
    meta: "free · libraries",
    url: "https://search.worldcat.org/title/Information-is-beautiful/oclc/819379328",
  },
  {
    venue: "Open Library",
    kind: "borrow",
    blurb: "Borrow a scanned copy through the Internet Archive’s controlled digital lending programme.",
    meta: "free · legal borrow",
    url: "https://openlibrary.org/search?q=information+is+beautiful+mccandless",
  },
  {
    venue: "Google Books",
    kind: "preview",
    blurb: "Flip through a legitimate limited preview of the book before you buy.",
    meta: "free · preview",
    url: "https://books.google.com/books?id=GAJXMAEACAAJ",
  },
];

export const kindLabel: Record<BuyOption["kind"], string> = {
  buy: "BUY",
  borrow: "BORROW",
  preview: "PREVIEW",
  official: "OFFICIAL",
};

export const tedTalk = "https://www.ted.com/talks/david_mccandless_the_beauty_of_data_visualization";

/* deterministic pseudo-random for generative art */
export function mulberry(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
