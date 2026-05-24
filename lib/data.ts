const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://majboutique.example";

export const BRAND = {
  name: "MAJ Boutique",
  shortName: "MAJ",
  tagline: "Adorned in silence, worn with intention.",
  taglineSub:
    "Each piece carries the quiet certainty of something made to last — beyond seasons, beyond occasion.",
  legalName: "MAJ Boutique",
  url: siteUrl,
  founded: "1924",
  city: "Paris",
  email: "atelier@jewellery.example",
  phone: "+33 1 84 00 00 24",
  address: {
    street: "14 Place Vendôme",
    locality: "Paris",
    region: "Île-de-France",
    postalCode: "75001",
    country: "FR",
  },
  social: {
    instagram: "https://instagram.com/",
    pinterest: "https://pinterest.com/",
    youtube: "https://youtube.com/",
  },
};

export type ShowroomPiece = {
  productId: string;
  position: [number, number, number];
  scale: number;
  label: string;
};

/** Curated pieces on the main showroom pedestal */
export const SHOWROOM_PIECES: ShowroomPiece[] = [
  {
    productId: "celestial-diamond-ring",
    position: [0, 0.08, 0],
    scale: 1,
    label: "Ring",
  },
  {
    productId: "lumiere-pendant",
    position: [-1.55, 0.38, 0.15],
    scale: 0.44,
    label: "Necklace",
  },
  {
    productId: "constellation-choker",
    position: [1.45, 0.42, 0.1],
    scale: 0.4,
    label: "Choker",
  },
  {
    productId: "etoile-bangle",
    position: [-0.95, 0.32, -0.55],
    scale: 0.42,
    label: "Bracelet",
  },
  {
    productId: "meridien-chronograph",
    position: [1.05, 0.48, -0.5],
    scale: 0.38,
    label: "Watch",
  },
  {
    productId: "celestial-ear-climber",
    position: [0.15, 0.52, 0.72],
    scale: 0.4,
    label: "Earring",
  },
];

export type ProductType =
  | "ring"
  | "necklace"
  | "bracelet"
  | "watch"
  | "earring";

export type Silhouette =
  | "halo"
  | "solitaire"
  | "eternity"
  | "trinity"
  | "pendant"
  | "choker"
  | "bangle"
  | "watch"
  | "earring";

export type Metal =
  | "gold"
  | "rose"
  | "platinum"
  | "silver"
  | "chrome"
  | "obsidian";

export type Product = {
  id: string;
  name: string;
  type: ProductType;
  collection: string;
  tagline: string;
  description: string;
  price: string;
  metalDefault: Metal;
  stoneTone: string;
  silhouette: Silhouette;
  keywords: string[];
  details: { label: string; value: string }[];
};

export const PRODUCTS: Product[] = [
  {
    id: "celestial-diamond-ring",
    name: "Celestial Diamond Ring",
    type: "ring",
    collection: "Eternal Diamond Series",
    tagline: "Timeless elegance forged in future light.",
    description:
      "A masterpiece crafted for those who seek timeless elegance, futuristic artistry, and extraordinary brilliance. Hand-finished with microscopic pavé and a center stone cut for maximum fire.",
    price: "€32,800",
    metalDefault: "gold",
    stoneTone: "#fbf7e0",
    silhouette: "halo",
    keywords: [
      "celestial diamond ring",
      "luxury engagement ring",
      "designer diamond jewelry",
    ],
    details: [
      { label: "Finishing", value: "Handcrafted" },
      { label: "Materials", value: "18k Gold · VVS" },
      { label: "Detailing", value: "Micro-Pavé" },
      { label: "Design", value: "Exclusive" },
    ],
  },
  {
    id: "aurora-halo",
    name: "Aurora Halo",
    type: "ring",
    collection: "Eternal Diamond Series",
    tagline: "A whisper of dawn captured in 18k gold.",
    description:
      "Hand-finished over forty hours by a single artisan, the Aurora Halo refracts light through a microscopic constellation of pavé diamonds set in warm yellow gold.",
    price: "€28,400",
    metalDefault: "gold",
    stoneTone: "#fbf7e0",
    silhouette: "halo",
    keywords: ["luxury diamond ring", "halo engagement ring", "designer gold ring"],
    details: [
      { label: "Carat", value: "2.10ct" },
      { label: "Cut", value: "Round Brilliant" },
      { label: "Clarity", value: "VVS1" },
      { label: "Origin", value: "Antwerp" },
    ],
  },
  {
    id: "noir-monolith",
    name: "Noir Monolith",
    type: "ring",
    collection: "Midnight Chrome Edition",
    tagline: "Cinematic shadow forged in brushed obsidian platinum.",
    description:
      "An architectural silhouette in black-rhodium platinum, surrounding a single emerald-cut white diamond suspended in negative space.",
    price: "€42,900",
    metalDefault: "obsidian",
    stoneTone: "#dde4ff",
    silhouette: "solitaire",
    keywords: ["black diamond ring", "chrome luxury ring", "platinum ring"],
    details: [
      { label: "Carat", value: "3.05ct" },
      { label: "Cut", value: "Emerald" },
      { label: "Clarity", value: "IF" },
      { label: "Origin", value: "Geneva" },
    ],
  },
  {
    id: "celestine-eternity",
    name: "Celestine Eternity",
    type: "ring",
    collection: "Rose Gold Elegance",
    tagline: "An infinite circumference of pavé brilliance.",
    description:
      "A continuous band of perfectly graded diamonds set into a feather-light rose-gold rail. Designed to be worn alone or as a constellation.",
    price: "€18,750",
    metalDefault: "rose",
    stoneTone: "#fff0e8",
    silhouette: "eternity",
    keywords: ["eternity ring", "rose gold band", "pavé diamond ring"],
    details: [
      { label: "Carat", value: "1.40ct tw" },
      { label: "Cut", value: "Round Brilliant" },
      { label: "Clarity", value: "VS1" },
      { label: "Origin", value: "Paris" },
    ],
  },
  {
    id: "trinity-prism",
    name: "Trinity Prism",
    type: "ring",
    collection: "Royal Gold Collection",
    tagline: "Three sculpted prisms of refracted light.",
    description:
      "A triad of mirror-finished gold forms cradles three step-cut diamonds, each cut to a bespoke angle for maximum optical fire.",
    price: "€34,200",
    metalDefault: "gold",
    stoneTone: "#eef3ff",
    silhouette: "trinity",
    keywords: ["three stone ring", "royal gold ring", "designer ring"],
    details: [
      { label: "Carat", value: "2.65ct tw" },
      { label: "Cut", value: "Asscher" },
      { label: "Clarity", value: "VVS2" },
      { label: "Origin", value: "Milan" },
    ],
  },
  {
    id: "lumiere-pendant",
    name: "Lumière Pendant",
    type: "necklace",
    collection: "Celestial Sapphire Collection",
    tagline: "A single droplet of caught light, suspended on a whisper.",
    description:
      "An 18k yellow gold pendant set with a pear-cut diamond, floating on a hand-woven Venetian chain of microscopic links.",
    price: "€21,600",
    metalDefault: "platinum",
    stoneTone: "#7da5ff",
    silhouette: "pendant",
    keywords: ["luxury diamond pendant", "sapphire necklace", "designer necklace"],
    details: [
      { label: "Carat", value: "1.20ct" },
      { label: "Cut", value: "Pear" },
      { label: "Chain", value: "Venetian 42cm" },
      { label: "Origin", value: "Paris" },
    ],
  },
  {
    id: "constellation-choker",
    name: "Constellation Choker",
    type: "necklace",
    collection: "Celestial Sapphire Collection",
    tagline: "Thirty-six diamonds arranged like a private night sky.",
    description:
      "Thirty-six brilliant-cut diamonds drift along a fine platinum line, each stone individually millegrained and set to catch the light from every angle.",
    price: "€67,500",
    metalDefault: "platinum",
    stoneTone: "#f4f8ff",
    silhouette: "choker",
    keywords: ["diamond choker", "luxury necklace", "sapphire jewelry"],
    details: [
      { label: "Carat", value: "4.80ct tw" },
      { label: "Cut", value: "Round Brilliant" },
      { label: "Length", value: "38cm" },
      { label: "Origin", value: "Antwerp" },
    ],
  },
  {
    id: "etoile-bangle",
    name: "Étoile Bangle",
    type: "bracelet",
    collection: "Rose Gold Elegance",
    tagline: "A single uninterrupted arc of polished rose gold.",
    description:
      "A solid 18k rose-gold bangle, hand-polished to a mirror finish, with a discreet inset of brilliant diamonds along the inner curve.",
    price: "€14,900",
    metalDefault: "rose",
    stoneTone: "#ffe9df",
    silhouette: "bangle",
    keywords: ["rose gold bangle", "luxury bracelet", "diamond bracelet"],
    details: [
      { label: "Carat", value: "0.60ct tw" },
      { label: "Diameter", value: "63mm" },
      { label: "Finish", value: "Mirror Polish" },
      { label: "Origin", value: "Florence" },
    ],
  },
  {
    id: "meridien-chronograph",
    name: "Méridien Chronograph",
    type: "watch",
    collection: "Royal Gold Collection",
    tagline: "A mechanical horizon strapped to the wrist.",
    description:
      "A self-winding chronograph movement housed in a 39mm rose-gold case, with a guilloché obsidian dial and a hand-stitched alligator strap.",
    price: "€48,200",
    metalDefault: "rose",
    stoneTone: "#1a1a1f",
    silhouette: "watch",
    keywords: ["luxury watch", "chronograph watch", "rose gold watch"],
    details: [
      { label: "Movement", value: "Automatic" },
      { label: "Case", value: "39mm Rose Gold" },
      { label: "Reserve", value: "72h" },
      { label: "Origin", value: "La Chaux-de-Fonds" },
    ],
  },
  {
    id: "celestial-ear-climber",
    name: "Celestial Ear Climber",
    type: "earring",
    collection: "Eternal Diamond Series",
    tagline: "A constellation of light ascending the ear.",
    description:
      "Hand-set pavé diamonds trace an elegant climb along 18k rose gold — designed to catch light with every movement, finished in our Paris atelier.",
    price: "€11,900",
    metalDefault: "rose",
    stoneTone: "#fff5e8",
    silhouette: "earring",
    keywords: [
      "luxury earrings",
      "diamond ear climber",
      "rose gold earrings",
      "haute joaillerie",
    ],
    details: [
      { label: "Carat", value: "0.85ct tw" },
      { label: "Metal", value: "18k Rose Gold" },
      { label: "Setting", value: "Micro-Pavé" },
      { label: "Origin", value: "Paris" },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export type SignatureCollection = {
  id: string;
  name: string;
  description: string;
  metal: Metal;
  silhouette: Silhouette;
  stoneTone: string;
  productId: string;
  accent: string;
};

export const SIGNATURE_COLLECTIONS: SignatureCollection[] = [
  {
    id: "eternal-diamond",
    name: "Eternal Diamond Series",
    description:
      "Microscopic pavé constellations and center stones cut for extraordinary fire — composed for eternity.",
    metal: "gold",
    silhouette: "halo",
    stoneTone: "#fff5d6",
    productId: "celestial-diamond-ring",
    accent: "from-gold-600/30 via-gold-400/10 to-ink-950",
  },
  {
    id: "royal-gold",
    name: "Royal Gold Collection",
    description:
      "Warm 18k yellow gold, mirror-polished rails, and architectural silhouettes worthy of a private vault.",
    metal: "gold",
    silhouette: "trinity",
    stoneTone: "#eef3ff",
    productId: "trinity-prism",
    accent: "from-gold-500/25 via-amber-900/10 to-ink-950",
  },
  {
    id: "midnight-chrome",
    name: "Midnight Chrome Edition",
    description:
      "Black rhodium, brushed chrome platinum, and diamonds suspended in cinematic negative space.",
    metal: "obsidian",
    silhouette: "solitaire",
    stoneTone: "#dde4ff",
    productId: "noir-monolith",
    accent: "from-ink-600 via-ink-900 to-black",
  },
  {
    id: "rose-gold-elegance",
    name: "Rose Gold Elegance",
    description:
      "Feather-light rose gold rails, continuous pavé, and pieces designed to be worn as a constellation.",
    metal: "rose",
    silhouette: "eternity",
    stoneTone: "#fff0e8",
    productId: "celestine-eternity",
    accent: "from-rose-300/20 via-gold-800/10 to-ink-950",
  },
  {
    id: "celestial-sapphire",
    name: "Celestial Sapphire Collection",
    description:
      "Suspended light on hand-woven chains — sapphires, diamonds, and platinum composed like a private night sky.",
    metal: "platinum",
    silhouette: "pendant",
    stoneTone: "#7da5ff",
    productId: "lumiere-pendant",
    accent: "from-blue-400/15 via-chrome-500/10 to-ink-950",
  },
];

export const CRAFTSMANSHIP = [
  {
    title: "Handcrafted Excellence",
    description:
      "Every piece passes through eight pairs of hands in our Paris atelier — each surface finished by a single artisan.",
  },
  {
    title: "Rare Materials",
    description:
      "Stones sourced through Antwerp and Geneva, metals alloyed to our own specifications for maximum optical fire.",
  },
  {
    title: "Timeless Design Philosophy",
    description:
      "We compose jewelry as emotional architecture — negative space, proportion, and light are our primary materials.",
  },
  {
    title: "Futuristic Detailing",
    description:
      "Microscopic pavé, laser-guided setting, and digital configurators allow infinite permutations without losing soul.",
  },
  {
    title: "Luxury Finishing Standards",
    description:
      "Mirror polish, hand-millegraining, and a final inspection under cinematic light before any piece leaves the Maison.",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Every interaction felt cinematic and unforgettable. The presentation alone defines modern luxury.",
    author: "Sophia Laurent",
    role: "Collector · Paris",
  },
  {
    quote:
      "A breathtaking fusion of technology, elegance, and artistry.",
    author: "Alexander Reed",
    role: "Collector · New York",
  },
  {
    quote:
      "This experience completely redefines how luxury jewelry should be presented online.",
    author: "Isabella Monroe",
    role: "Collector · Milan",
  },
];

export const NAV_ITEMS = [
  { label: "Showroom", href: "#showroom" },
  { label: "Collections", href: "#collections" },
  { label: "Vault", href: "#vault" },
  { label: "Gallery", href: "#gallery" },
  { label: "Story", href: "#story" },
  { label: "Experience", href: "#experience" },
];

export const GALLERY_TILES: {
  id: string;
  title: string;
  caption: string;
  type: ProductType;
  tone: string;
  span: "tall" | "wide" | "square";
  productId?: string;
}[] = [
  {
    id: "gal-1",
    title: "Celestial",
    caption: "Diamond Ring · Halo",
    type: "ring",
    tone: "from-gold-700/40 via-gold-500/10 to-ink-950",
    span: "tall",
    productId: "celestial-diamond-ring",
  },
  {
    id: "gal-2",
    title: "Lumière",
    caption: "Pendant · Sapphire",
    type: "necklace",
    tone: "from-chrome-400/20 via-ink-700/30 to-ink-950",
    span: "wide",
    productId: "lumiere-pendant",
  },
  {
    id: "gal-3",
    title: "Noir",
    caption: "Chrome · Emerald Cut",
    type: "ring",
    tone: "from-ink-700 via-ink-900 to-black",
    span: "square",
    productId: "noir-monolith",
  },
  {
    id: "gal-4",
    title: "Étoile",
    caption: "Bangle · Rose Gold",
    type: "bracelet",
    tone: "from-gold-300/30 via-gold-700/10 to-ink-950",
    span: "square",
    productId: "etoile-bangle",
  },
  {
    id: "gal-5",
    title: "Méridien",
    caption: "Chronograph · 39mm",
    type: "watch",
    tone: "from-ink-700/60 via-gold-800/10 to-ink-950",
    span: "wide",
    productId: "meridien-chronograph",
  },
  {
    id: "gal-6",
    title: "Constellation",
    caption: "Choker · 4.80ct tw",
    type: "necklace",
    tone: "from-chrome-300/20 via-ink-800 to-ink-950",
    span: "tall",
    productId: "constellation-choker",
  },
];
