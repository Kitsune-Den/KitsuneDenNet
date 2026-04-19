export type ProjectType = 'deployed' | 'source'

/**
 * Certification tiers — based on the KitsuneDen design system.
 *
 * gilded  → Gold border glow (#FFD700) — human-crafted masterwork
 * azure   → Cyan border glow (#00E5FF) — AI-enhanced / skulk-assisted
 * bronze  → Bronze border glow (#CD7F32) — standard tier
 * gray    → Gray border glow (#8E8E8E) — base / community tier
 */
export type ProjectTier = 'gilded' | 'azure' | 'bronze' | 'gray'

export interface DenProject {
  /** Display name */
  name: string
  /** Short tagline — keep it punchy */
  tagline: string
  /** Longer description for expanded view */
  description?: string
  /** 'deployed' = lives on a subdomain, 'source' = links to GitHub */
  type: ProjectType
  /** Certification tier — controls the card's glow color */
  tier: ProjectTier
  /** Version string (e.g. 'v1.2') */
  version?: string
  /** URL — subdomain for deployed, GitHub URL for source */
  url: string
  /** GitHub repo URL — omit for private/closed-source projects */
  repo?: string
  /** Tags for filtering / visual flair */
  tags: string[]
  /** Path to a custom icon/image (relative to public/) */
  icon?: string
  /** Section this project belongs to */
  section: SectionId
  /** Platform links for deployed apps */
  webApp?: string
  appStore?: string
  googlePlay?: string
}

/** Section identifiers */
export type SectionId = 'apps' | 'game-mods' | 'tools' | 'experiments'

export interface DenSection {
  id: SectionId
  label: string
  description: string
}

import certIconGilded from '../assets/cert-icon-gold.png'
import certIconAzure from '../assets/cert-icon-azure.png'
import certIconBronze from '../assets/cert-icon-bronze.png'
import certIconGray from '../assets/cert-icon-grey.png'

/** Tier display metadata — used by components for colors/labels */
export const tierMeta: Record<ProjectTier, { label: string; color: string; icon: string }> = {
  gilded: { label: 'Gilded', color: 'tier-gilded', icon: certIconGilded },
  azure:  { label: 'Azure',  color: 'tier-azure',  icon: certIconAzure },
  bronze: { label: 'Bronze', color: 'tier-bronze', icon: certIconBronze },
  gray:   { label: 'Standard', color: 'tier-gray', icon: certIconGray },
}

/** Page sections — order matters, this is display order */
export const sections: DenSection[] = [
  {
    id: 'apps',
    label: 'Apps',
    description: 'Full-stack applications with their own homes.',
  },
  {
    id: 'game-mods',
    label: 'Game Mods',
    description: 'Mods and data packs for 7 Days to Die and Hytale.',
  },
  {
    id: 'tools',
    label: 'Tools & Frameworks',
    description: 'Developer tools, CLIs, and frameworks built by the skulk.',
  },
  {
    id: 'experiments',
    label: 'Experiments',
    description: 'Proof-of-concepts, satire, and things we made because we could.',
  },
]

/**
 * Featured project — displayed prominently above the sections.
 * This is KitsuneDen itself: the unified game server dashboard.
 */
export const featured: DenProject = {
  name: 'KitsuneDen',
  tagline: 'A unified dashboard for managing your home game servers',
  description:
    'Multi-server management with live status, real-time console, player tools, mod organization, config editing, and backup browsing. Supports Minecraft, 7 Days to Die, Hytale, and more via custom adapters.',
  type: 'source',
  tier: 'gilded',
  url: 'https://github.com/AdaInTheLab/KitsuneDen',
  repo: 'https://github.com/AdaInTheLab/KitsuneDen',
  tags: ['dashboard', 'nextjs', 'self-hosted', 'game-server'],
  section: 'tools',
}

/**
 * The Den Registry
 *
 * Add projects here to have them appear on kitsuneden.net.
 * Order within each section matters — this is how they'll display.
 */
export const projects: DenProject[] = [
  // ── Apps ──────────────────────────────────────────────────
  {
    name: 'Foster Pal',
    tagline: 'Track feedings, weights, and care for your foster animals',
    description:
      'Mobile-first PWA for foster animal tracking — feedings, weights, elimination logs, trend alerts, offline-first with sync, and JSON data export. Installable on any device.',
    type: 'deployed',
    tier: 'gilded',
    url: 'https://fosterpal.com',
    webApp: 'https://fosterpal.com',
    // appStore: '', // TODO: add when live
    // googlePlay: '', // TODO: add when live
    tags: ['pwa', 'mobile', 'ios', 'android', 'foster-care'],
    section: 'apps',
  },
  {
    name: 'KitsuneDen Paint',
    tagline: 'Browser-based drawing and paint app',
    description:
      'A lightweight, browser-based paint application hosted on the KitsuneDen network.',
    type: 'deployed',
    tier: 'gilded',
    url: 'https://paint.kitsuneden.net',
    tags: ['paint', 'drawing', 'creative', 'web-app'],
    section: 'apps',
  },
  {
    name: 'KitsuneDnD',
    tagline: 'Play D&D online with friends, strangers, and AI',
    description:
      'An online tabletop platform for playing Dungeons & Dragons — with human and AI players.',
    type: 'deployed',
    tier: 'azure',
    url: 'https://dnd.kitsuneden.net',
    tags: ['dnd', 'tabletop', 'multiplayer', 'ai'],
    section: 'apps',
  },
  {
    name: 'Kitsune7Den',
    tagline: 'A standalone Windows app for managing your 7D2D dedicated server',
    description:
      'Dashboard, live console, player management, config editor for 90+ properties, mod manager, scheduled backups with auto-prune, SteamCMD integration, and 4 swappable themes. No web stack — just an exe.',
    type: 'source',
    tier: 'gilded',
    url: 'https://github.com/Kitsune-Den/Kitsune7Den',
    repo: 'https://github.com/Kitsune-Den/Kitsune7Den',
    tags: ['7dtd', 'server-management', 'wpf', 'dotnet'],
    section: 'apps',
  },

  // ── Game Mods ─────────────────────────────────────────────
  {
    name: 'KitsuneCommand',
    tagline: 'RESTful API & web panel for 7 Days to Die servers',
    description:
      'Real-time dashboards, GPS map with player tracking, web console, economy system, teleportation, and backup scheduling. Supports 5 languages.',
    type: 'source',
    tier: 'gilded',
    version: 'v2.2.0',
    url: 'https://github.com/AdaInTheLab/KitsuneCommand',
    repo: 'https://github.com/AdaInTheLab/KitsuneCommand',
    tags: ['7dtd', 'server-management', 'web-panel', 'api'],
    section: 'game-mods',
  },
  {
    name: 'KitsuneCommand Hytale',
    tagline: 'Server management & economy plugin for Hytale',
    description:
      'Points economy with kill tracking, playtime rewards, daily bonuses, and a web admin panel. Java reimagining of the original KitsuneCommand.',
    type: 'source',
    tier: 'azure',
    url: 'https://github.com/AdaInTheLab/KitsuneCommandHytale',
    repo: 'https://github.com/AdaInTheLab/KitsuneCommandHytale',
    tags: ['hytale', 'server-management', 'economy', 'java'],
    section: 'game-mods',
  },
  {
    name: 'Kitsune Kitchen 7D',
    tagline: 'A fox-crafted cooking expansion for 7 Days to Die',
    description:
      '16 new recipes, 7 custom buffs, magazine progression, and a Sham Sandwich vendor fix. Emphasizes wasteland ingredient reuse.',
    type: 'source',
    tier: 'gilded',
    version: 'v1.1.0',
    url: 'https://github.com/AdaInTheLab/KitsuneKitchen7D',
    repo: 'https://github.com/AdaInTheLab/KitsuneKitchen7D',
    tags: ['7dtd', 'cooking', 'mod'],
    section: 'game-mods',
  },
  {
    name: 'Kitsune Kitchen',
    tagline: '12 custom food items with buffs for Hytale',
    description:
      'Three-tier cooking progression from campfire to chef\'s stove. Healing, stamina, and damage resistance buffs with 30-45 minute durations.',
    type: 'source',
    tier: 'azure',
    version: 'v1.1.0',
    url: 'https://github.com/AdaInTheLab/KitsuneKitchen',
    repo: 'https://github.com/AdaInTheLab/KitsuneKitchen',
    tags: ['hytale', 'cooking', 'data-pack'],
    section: 'game-mods',
  },
  {
    name: 'KitsuneFox',
    tagline: 'Tame a fox companion in Hytale',
    description:
      'Craft a Fox Treat, befriend a Kitsune Fox with 500 HP. Phase 1 complete — leveling, abilities, and regional variants coming.',
    type: 'source',
    tier: 'azure',
    url: 'https://github.com/AdaInTheLab/KitsuneFox',
    repo: 'https://github.com/AdaInTheLab/KitsuneFox',
    tags: ['hytale', 'companion', 'data-pack'],
    section: 'game-mods',
  },
  {
    name: 'KitsunePaint',
    tagline: 'Build custom paint packs for 7 Days to Die — no Unity required',
    description:
      'Drag-and-drop texture upload, real-time wall tiling preview, and one-click modlet generation. A Python bundle builder converts textures into Unity asset bundles so you never have to open Unity yourself.',
    type: 'source',
    tier: 'azure',
    version: 'v1.0.0',
    url: 'https://github.com/AdaInTheLab/KitsunePaint',
    repo: 'https://github.com/AdaInTheLab/KitsunePaint',
    tags: ['7dtd', 'paint', 'textures', 'web-tool'],
    section: 'game-mods',
  },
  {
    name: 'KitsunePaintUnlocked',
    tagline: 'Broke the 255 paint texture limit — community said it was impossible',
    description:
      'Harmony mod that patches four engine layers (network encoding, memory arrays, GPU atlas, chunk storage) to expand 7DTD\'s hardcoded 255 paint slot limit to 1023. Run PyroPaints, CK Textures, and KitsunePaints all at once.',
    type: 'source',
    tier: 'gilded',
    version: 'v1.0.0',
    url: 'https://github.com/AdaInTheLab/KitsunePaintUnlocked',
    repo: 'https://github.com/AdaInTheLab/KitsunePaintUnlocked',
    tags: ['7dtd', 'harmony', 'paint', 'engine-patch'],
    section: 'game-mods',
  },
  {
    name: 'Kitsune Vehicle Overhaul',
    tagline: 'Your 4x4 weighs two tons — a cactus should not total it',
    description:
      'Rebalances vehicle collision damage with weight-based resistance across 40 vehicles, ~25% HP buffs, and a saguaro cactus nerf. Works with vanilla and Bdub\'s Vehicles. Server-side only.',
    type: 'source',
    tier: 'bronze',
    version: 'v1.0.0',
    url: 'https://github.com/AdaInTheLab/KitsuneVehicleOverhaul',
    repo: 'https://github.com/AdaInTheLab/KitsuneVehicleOverhaul',
    tags: ['7dtd', 'vehicles', 'rebalance', 'server-side'],
    section: 'game-mods',
  },
  {
    name: 'KitsuneLoads',
    tagline: 'Rotating custom loading screens for 7 Days to Die',
    description:
      'Harmony mod that randomizes 13 loading-screen backgrounds on every load. Patches the background_texture binding and removes aspect-lock for full-bleed 1920x1080 images.',
    type: 'source',
    tier: 'bronze',
    version: 'v1.0.0',
    url: 'https://github.com/Kitsune-Den/KitsuneLoads',
    repo: 'https://github.com/Kitsune-Den/KitsuneLoads',
    tags: ['7dtd', 'harmony', 'loading-screen', 'cosmetic'],
    section: 'game-mods',
  },

  // ── Tools & Frameworks ────────────────────────────────────
  {
    name: 'One Front Door',
    tagline: 'A web framework where habitability is a structural constraint',
    description:
      'Converts Markdown to semantic HTML with enforced accessibility audits that block builds. Generates llms.txt, JSON-LD, and sitemaps. Uses .ofd "rooms" instead of components.',
    type: 'source',
    tier: 'gilded',
    url: 'https://github.com/AdaInTheLab/one-front-door',
    repo: 'https://github.com/AdaInTheLab/one-front-door',
    tags: ['framework', 'accessibility', 'a11y', 'static-site'],
    section: 'tools',
  },
  {
    name: 'Universal Ledger',
    tagline: 'User-owned context continuity across AI sessions',
    description:
      'CLI tool that stores plain JSON ledger files and generates Pre-Conversation Context Blocks on demand. Offline-first, deterministic, user-owned.',
    type: 'source',
    tier: 'azure',
    version: 'v0.1.1',
    url: 'https://github.com/AdaInTheLab/universal-ledger',
    repo: 'https://github.com/AdaInTheLab/universal-ledger',
    tags: ['cli', 'ai-tools', 'context', 'nodejs'],
    section: 'tools',
  },
  {
    name: 'LolRust',
    tagline: 'Lolcat-speak that transpiles to valid Rust',
    description:
      '48+ keywords, a "Kibble" package manager, lolcat error messages, and a VS Code extension. i can haz systems programming.',
    type: 'source',
    tier: 'bronze',
    version: 'v0.1.0',
    url: 'https://github.com/AdaInTheLab/lolrust',
    repo: 'https://github.com/AdaInTheLab/lolrust',
    tags: ['rust', 'transpiler', 'meme', 'language'],
    section: 'tools',
  },

  // ── Experiments ────────────────────────────────────────────
  {
    name: 'Compass',
    tagline: 'Interactive proof of concept for ethical human-AI interaction',
    description:
      'Four interaction modes with informed consent, a Bill of Rights, ELIH scenarios, and a transparent three-layer memory system. Built on the Informed Connection Doctrine.',
    type: 'deployed',
    tier: 'azure',
    url: 'https://adainthelab.github.io/compass',
    repo: 'https://github.com/AdaInTheLab/compass',
    tags: ['ai-ethics', 'proof-of-concept', 'react'],
    section: 'experiments',
  },
  {
    name: 'Tech Bro Bingo',
    tagline: 'Scroll any VC\'s replies for 5 minutes — you WILL get bingo',
    description:
      'Interactive bingo card with 25 archetypal tech industry squares. Randomized board, win detection, mobile-friendly. Field research by The Human Pattern Lab.',
    type: 'deployed',
    tier: 'bronze',
    url: 'https://adainthelab.github.io/tech-bro-bingo',
    repo: 'https://github.com/AdaInTheLab/tech-bro-bingo',
    tags: ['satire', 'bingo', 'react'],
    section: 'experiments',
  },
]
