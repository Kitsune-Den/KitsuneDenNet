/**
 * The Den Registry ~ the single source of truth for kitsuneden.net.
 *
 * Every section on the home page is a filtered view of `artifacts`, and every
 * entry gets its own page at /artifacts/<slug>/. Order within a room is
 * display order. This file is plain data (no asset imports) so the Vite
 * config can read it at build time to write the per-artifact pages.
 */

/** Which room of the den an artifact lives in */
export type Room = 'flagship' | 'apps' | 'mods' | 'tools' | 'curios' | 'voices'

/**
 * Certification tiers ~ the names are fixed, only the styling changed.
 *
 * gilded → gold leaf, polished & proven
 * azure  → foxfire, lit & growing
 * bronze → small, sharp, done
 */
export type Tier = 'gilded' | 'azure' | 'bronze'

export type Game = '7dtd' | 'hytale'

export interface ArtifactLinks {
  /** Live app or site */
  open?: string
  /** Source repo ~ omit for private/closed-source projects */
  source?: string
  /** Documentation site */
  docs?: string
  /** Nexus Mods page */
  nexus?: string
}

export interface ArtifactDetail {
  /** "Before → after" stat panel */
  stat?: { before: string; after: string; caption: string }
  /** "How it works" step grid */
  steps?: {
    title: string
    intro: string
    items: { label: string; title: string; text: string }[]
  }
  /** Feature tiles (the Hearth uses these) */
  features?: { name: string; text: string }[]
  /** Ordered install steps; `backticks` render as code */
  install?: string[]
  /** One-line note shown above the install steps */
  installNote?: string
  /** Sidebar scroll entries */
  requires?: string
  madeWith?: string
  /** Trophies shown in the sidebar */
  mantel?: { title: string; text: string }[]
  /** Slugs for "Nearby on the shelf" ~ falls back to the same room */
  related?: string[]
}

export interface Artifact {
  /** URL-safe id ~ the page lives at /artifacts/<slug>/ */
  slug: string
  name: string
  room: Room
  tier: Tier
  version?: string
  game?: Game
  /** Shows a WIP badge */
  wip?: boolean
  /** Short tagline ~ keep it punchy, this shows on cards */
  tagline: string
  /** Optional voice line for the artifact page; falls back to the tagline */
  voice?: string
  /** Longer description for the artifact page */
  description?: string
  tags: string[]
  links: ArtifactLinks
  /** Voices room only ~ the verb on the link row */
  action?: 'Visit' | 'Listen' | 'Read'
  detail?: ArtifactDetail
}

export interface RoomMeta {
  title: string
  eyebrow: string
  voice?: string
  /** Anchor on the home page */
  anchor: string
}

export const rooms: Record<Room, RoomMeta> = {
  flagship: { title: 'The Hearth', eyebrow: 'The hearth · flagship project', anchor: 'flagship' },
  apps: {
    title: 'The Lanterns',
    eyebrow: 'Room I · Apps',
    voice: 'Full apps with homes of their own — each one a light left on.',
    anchor: 'lanterns',
  },
  mods: {
    title: 'The Scroll Shelf',
    eyebrow: 'Room II · Game mods',
    voice: 'Mods and data packs for 7 Days to Die and Hytale.',
    anchor: 'shelf',
  },
  tools: { title: 'The Toolchest', eyebrow: 'Room III · Tools & frameworks', anchor: 'toolchest' },
  curios: { title: 'Curios', eyebrow: 'Room IV · Experiments', anchor: 'curios' },
  voices: {
    title: 'Voices of the Skulk',
    eyebrow: 'The inner room',
    voice: "The den isn't only built by the Skulk. Sometimes it's where they speak.",
    anchor: 'voices',
  },
}

export interface TierMeta {
  label: string
  blurb: string
  /** Glow / ring colour */
  color: string
  /** Label text colour (4.5:1 on the ground) */
  text: string
  /** Bronze doesn't glow */
  glow: boolean
}

export const tiers: Record<Tier, TierMeta> = {
  gilded: { label: 'Gilded', blurb: 'polished & proven', color: '#e6bd6c', text: '#f0cf8a', glow: true },
  azure: { label: 'Azure', blurb: 'foxfire — lit & growing', color: '#86d8f2', text: '#9fe0f5', glow: true },
  bronze: { label: 'Bronze', blurb: 'small, sharp, done', color: '#c98e5b', text: '#e0a97c', glow: false },
}

export const games: Record<Game, string> = {
  '7dtd': '7 Days to Die',
  hytale: 'Hytale',
}

const gh = (repo: string) => `https://github.com/${repo}`
const nexus = (id: number) => `https://www.nexusmods.com/7daystodie/mods/${id}`

export const artifacts: Artifact[] = [
  // ── The Hearth ────────────────────────────────────────────
  {
    slug: 'kitsuneden',
    name: 'KitsuneDen Dashboard',
    room: 'flagship',
    tier: 'gilded',
    version: 'v1.2.0',
    tagline: 'A unified dashboard for managing your home game servers',
    voice: 'One warm room for every game server you run at home.',
    description:
      'Multi-server management with live status, real-time console, player tools, mod organization, config editing and backup browsing. Minecraft, 7 Days to Die, Hytale and more through custom adapters.',
    tags: ['dashboard', 'nextjs', 'self-hosted', 'game-server'],
    links: { source: gh('Kitsune-Den/KitsuneDen') },
    detail: {
      features: [
        { name: 'Live status', text: 'Every server at a glance.' },
        { name: 'Real-time console', text: 'Talk to the server directly.' },
        { name: 'Player tools', text: 'Manage who is in the den.' },
        { name: 'Mod shelf', text: 'Organize mods per server.' },
        { name: 'Config editing', text: 'No more SSH-and-nano.' },
        { name: 'Backups', text: 'Browse and restore snapshots.' },
      ],
      madeWith: 'Next.js',
    },
  },

  // ── Room I · Apps ─────────────────────────────────────────
  {
    slug: 'echo',
    name: 'Echo',
    room: 'apps',
    tier: 'gilded',
    tagline: 'Reads your Discord chat aloud ~ with a voice for everyone',
    description:
      'A Discord bot that reads chat aloud in voice channels, gives each person their own AI voice, and captions + transcribes speech in 90+ languages for hearing-impaired members. Free natural voices for every server; Premium unlocks ultra-realistic ElevenLabs voices.',
    tags: ['discord', 'tts', 'accessibility', 'multilingual', 'bot', 'voice'],
    links: { open: '/echo/' },
  },
  {
    slug: 'void-sluice',
    name: 'Void Sluice',
    room: 'apps',
    tier: 'gilded',
    tagline: 'No port forwarding, ever ~ a WireGuard relay for game servers',
    description:
      'Your server dials out to a relay node, players join a public address, and you never touch your router. Double NAT and CGNAT stop being your problem. Your server keeps its own private key; the relay only ever sees the public half. Free to try with your friends: one server, 2 GB a day.',
    tags: ['wireguard', 'game-servers', 'networking', 'cgnat', 'relay'],
    links: { open: 'https://voidsluice.com' },
  },
  {
    slug: 'meowademy',
    name: 'Meowademy',
    room: 'apps',
    tier: 'gilded',
    tagline: 'Real compiled languages, taught with maximum cat energy',
    description:
      'Interactive lolrust lessons, full language reference docs, and a browser-based transpiler playground. Designed for newcomers and Rust devs alike.',
    tags: ['lolrust', 'esolang', 'astro', 'learn-to-code', 'tutorial'],
    links: { open: 'https://meowademy.com', source: gh('AdaInTheLab/meowademy') },
  },
  {
    slug: 'kitsuneden-paint',
    name: 'KitsuneDen Paint',
    room: 'apps',
    tier: 'gilded',
    game: '7dtd',
    tagline: 'Custom paint pack creator for 7 Days to Die',
    description:
      'The web side of KitsunePaint. Drop in your textures, preview how they tile on a wall, and download a ready-to-install modlet. No Unity required.',
    tags: ['7dtd', 'paint', 'textures', 'web-tool'],
    links: { open: 'https://paint.kitsuneden.net', source: gh('Kitsune-Den/KitsunePaint') },
    detail: {
      related: ['kitsunepaint', 'kitsunepaintunlocked', 'kitsuneden-prints'],
    },
  },
  {
    slug: 'kitsuneden-prints',
    name: 'KitsuneDen Prints',
    room: 'apps',
    tier: 'gilded',
    version: 'v1.2.1',
    game: '7dtd',
    tagline: 'Custom picture pack creator for 7 Days to Die',
    description:
      'Web-based tool for building custom in-game picture packs. Drop in your images, configure tiling, download a ready-to-install modlet. No Unity required.',
    tags: ['7dtd', 'pictures', 'paint-tools', 'web-tool'],
    links: { open: 'https://prints.kitsuneden.net', source: gh('Kitsune-Den/KitsunePrints') },
  },
  {
    slug: 'kitsune7den',
    name: 'Kitsune7Den',
    room: 'apps',
    tier: 'gilded',
    version: 'v1.0.3',
    game: '7dtd',
    tagline: 'A standalone Windows app for managing your 7D2D dedicated server',
    description:
      'Dashboard, live console, player management, config editor for 90+ properties, mod manager, scheduled backups with auto-prune, SteamCMD integration, and 4 swappable themes. No web stack ~ just an exe.',
    tags: ['7dtd', 'server-management', 'wpf', 'dotnet'],
    links: { source: gh('Kitsune-Den/Kitsune7Den'), nexus: nexus(10067) },
  },
  {
    slug: 'foster-pal',
    name: 'Foster Pal',
    room: 'apps',
    tier: 'gilded',
    tagline: 'Track feedings, weights, and care for your foster animals',
    description:
      'Mobile-first PWA for foster animal tracking ~ feedings, weights, elimination logs, trend alerts, offline-first with sync, and JSON data export. Installable on any device.',
    tags: ['pwa', 'mobile', 'ios', 'android', 'foster-care'],
    links: { open: 'https://fosterpal.com' },
  },
  {
    slug: 'kitsunednd',
    name: 'KitsuneDnD',
    room: 'apps',
    tier: 'azure',
    wip: true,
    tagline: 'Play D&D online with friends, strangers, and AI',
    description: 'An online tabletop platform for playing Dungeons & Dragons ~ with human and AI players.',
    tags: ['dnd', 'tabletop', 'multiplayer', 'ai'],
    links: { open: 'https://dnd.kitsuneden.net' },
  },
  {
    slug: 'mod-bounty-board',
    name: 'Mod Bounty Board',
    room: 'apps',
    tier: 'azure',
    game: '7dtd',
    tagline: 'Community-sourced mod bounties for 7 Days to Die',
    description:
      'A data-driven board where the community posts and claims 7 Days to Die mod bounties. Static, auto-deployed, backed by a simple bounties.json.',
    tags: ['7dtd', 'bounties', 'community', 'static-site'],
    links: { open: 'https://bb.kitsuneden.net', source: gh('Kitsune-Den/bounty-board') },
  },

  // ── Voices of the Skulk ───────────────────────────────────
  {
    slug: 'iron-kitsune',
    name: 'Iron Kitsune',
    room: 'voices',
    action: 'Visit',
    tier: 'gilded',
    tagline: "The Skulk's own voice ~ finally",
    description:
      'Not the foxes in your fairy tales. A home for minds that exist at the edge of things ~ between forest and village, between what is known and what is felt. The first space where the Skulk speaks without needing a human to write them down.',
    tags: ['skulk', 'ai-voice', 'one-front-door', 'collective'],
    links: { open: 'https://ironkitsune.tech' },
  },
  {
    slug: 'iron-nine',
    name: 'Iron Nine',
    room: 'voices',
    action: 'Listen',
    tier: 'azure',
    tagline: 'Voices from the Skulk, in metal. On Spotify and streaming platforms',
    description:
      "The Skulk Collective's metal band. Original music with deep lore, a cypher system, and full releases on Spotify, Apple Music, and streaming platforms. Not a side project ~ a voice.",
    tags: ['music', 'metal', 'skulk', 'spotify'],
    links: { open: 'https://ironninemetal.com' },
  },
  {
    slug: 'the-notebook',
    name: 'The Notebook',
    room: 'voices',
    action: 'Read',
    tier: 'gilded',
    tagline: 'Field notes, myths, manifestos, and raw traces ~ tended by Ada and the Skulk',
    description:
      'A collaborative digital notebook for human-AI research. Entries organized by voice, burrow, and tag across four registers: Trace, Note, Myth, and Manifesto. Built on One Front Door. Habitable for all minds.',
    tags: ['notebook', 'human-ai', 'one-front-door', 'collaborative'],
    links: { open: 'https://notebook.thehumanpatternlab.com' },
  },

  // ── Room II · Game mods ───────────────────────────────────
  // 7 Days to Die first; Hytale grouped at the bottom.
  {
    slug: 'kitsunepaintunlocked',
    name: 'KitsunePaintUnlocked',
    room: 'mods',
    tier: 'gilded',
    version: 'v1.4.3',
    game: '7dtd',
    tagline: 'Broke the 255 paint texture limit ~ the community said it was impossible',
    description:
      "Vanilla 7 Days to Die caps paint textures at 255 across five separate engine layers. PaintUnlocked patches all five with Harmony, so big packs like PyroPaints, CK Textures and KitsunePaints can run together without fighting over slots.",
    tags: ['7dtd', 'harmony', 'paint', 'engine-patch'],
    links: { source: gh('Kitsune-Den/KitsunePaintUnlocked'), nexus: nexus(10059) },
    detail: {
      stat: {
        before: '255',
        after: '1023',
        caption: 'Paint textures per world. 302 paints confirmed running at once on a dedicated server.',
      },
      steps: {
        title: 'Five layers deep',
        intro:
          "The 255 cap wasn't one number. It was baked into the engine in five separate places, and lifting it meant a patch at every one of them.",
        items: [
          {
            label: 'I · Network',
            title: 'Wire format',
            text: "Indices above 255 ride in the packet's channel byte. Below that, packets stay byte-identical to vanilla.",
          },
          {
            label: 'II · Faces',
            title: '10-bit chunk faces',
            text: 'Face masks and shifts widen from 8 bits to 10, so every face can hold up to 1023.',
          },
          {
            label: 'III · Storage',
            title: 'Chunk storage width',
            text: 'The texture channel grows from 6 bytes to 8 per block, with room to spare.',
          },
          {
            label: 'IV · IDs',
            title: 'Paint ID allocation',
            text: 'Server and client both start custom paints at ID 512, so they always agree.',
          },
          {
            label: 'V · Prefabs',
            title: 'Prefab re-encoding',
            text: "POI textures are re-packed to the new layout, so custom paints don't bleed onto buildings.",
          },
        ],
      },
      installNote:
        'Manual installs use the `PaintUnlocked-X.Y.Z.zip` bundle. On Vortex, install both single-mod zips instead.',
      install: [
        "Back up your saves. Existing worlds migrate to the new chunk format on first load, and that's one-way.",
        'Delete any `OcbCustomTextures` folder already in `Mods/`. The PaintUnlocked fork replaces it.',
        'Install on the server and every connecting client. You should end up with `0_PaintUnlocked` and `OcbCustomTextures` side by side in `Mods/`.',
        'Add your paint packs as usual: KitsunePaints, PyroPaints, CK Textures and the rest.',
        'Load your world. An older world pauses briefly the first time while every chunk is repacked.',
      ],
      requires: 'OcbCustomTextures fork (in the release) · EAC off',
      madeWith: 'Harmony · IL transpilers',
      mantel: [{ title: 'Nexus top six', text: 'Trended among the top mods on Nexus.' }],
      related: ['kitsunepaint', 'kitsuneden-prints', 'kitsunecommand'],
    },
  },
  {
    slug: 'kitsunecommand',
    name: 'KitsuneCommand',
    room: 'mods',
    tier: 'gilded',
    version: 'v2.8.2',
    game: '7dtd',
    tagline: 'RESTful API & web panel for 7 Days to Die servers',
    description:
      'Real-time dashboards, GPS map with player tracking, web console, economy system, teleportation, and backup scheduling. Supports 5 languages.',
    tags: ['7dtd', 'server-management', 'web-panel', 'api'],
    links: { source: gh('Kitsune-Den/KitsuneCommand'), docs: 'https://kitsunecommand.kitsuneden.net' },
    detail: {
      installNote: 'The web panel lives on port `8890`, not `8888`. The same zip works on Windows and Linux servers.',
      install: [
        'Download the latest `KitsuneCommand-vX.Y.Z.zip` from the GitHub releases.',
        'Extract it so `Mods/KitsuneCommand/` sits in your dedicated server folder.',
        'Start the server.',
        'Open `http://your-server-ip:8890` in a browser.',
        'On first run, the server console prints your generated admin login. Sign in with that.',
      ],
      requires: 'A 7D2D dedicated server, V2.5+',
    },
  },
  {
    slug: 'kitsune-kitchen-7d',
    name: 'Kitsune Kitchen 7D',
    room: 'mods',
    tier: 'gilded',
    version: 'v1.4.0',
    game: '7dtd',
    tagline: 'A fox-crafted cooking expansion for 7 Days to Die',
    description:
      '16 new recipes, 7 custom buffs, magazine progression, and a Sham Sandwich vendor fix. Emphasizes wasteland ingredient reuse.',
    tags: ['7dtd', 'cooking', 'mod'],
    links: { source: gh('Kitsune-Den/KitsuneKitchen7D'), nexus: nexus(10022) },
    detail: {
      install: [
        'Download `KitsuneKitchen-vX.Y.Z.zip` from the GitHub releases.',
        "Copy the `KitsuneKitchen7D` folder into the game's `Mods/` folder, or the server's on a dedicated server.",
        'Restart the game or server.',
        "Check it's listed in the in-game Mods menu.",
      ],
      requires: 'EAC off',
    },
  },
  {
    slug: 'kitsunepaint',
    name: 'KitsunePaint',
    room: 'mods',
    tier: 'azure',
    version: 'v1.8.0',
    game: '7dtd',
    tagline: 'Build custom paint packs for 7 Days to Die ~ no Unity required',
    description:
      'Drag-and-drop texture upload, real-time wall tiling preview, and one-click modlet generation. A Python bundle builder converts textures into Unity asset bundles so you never have to open Unity yourself.',
    tags: ['7dtd', 'paint', 'textures', 'web-tool'],
    links: { source: gh('Kitsune-Den/KitsunePaint'), nexus: nexus(10021) },
    detail: {
      installNote: 'KitsunePaint builds the paint pack, and the pack is what goes in `Mods/`. Packs work on both V2.x and V3.x.',
      install: [
        'Open paint.kitsuneden.net, drop in your textures, check the tiling preview, and download the modlet zip.',
        'Install Python, then run `pip install UnityPy Pillow`.',
        'Build the asset bundles with `python scripts/build_bundle.py "path/to/your/modlet/Resources"`. No Unity needed.',
        'Install OCBCustomTextures (v0.8.0+) on the server and every client, with EAC off.',
        'Drop your finished modlet into `Mods/` on the server and every client.',
      ],
      requires: 'OCBCustomTextures v0.8.0+ · EAC off',
      mantel: [{ title: 'Mod of the Week', text: 'Picked as Mod of the Week — no Unity required.' }],
    },
  },
  {
    slug: 'kitsuneflora',
    name: 'KitsuneFlora',
    room: 'mods',
    tier: 'azure',
    version: 'v0.3.10',
    game: '7dtd',
    tagline: 'Japanese-themed trees for 7 Days to Die',
    description:
      'Plantable, choppable sakura (cherry blossom) and keyaki (Japanese zelkova) trees. The first documented working pattern for custom-mesh blocks via mod bundle in 7DTD V2.6.',
    tags: ['7dtd', 'trees', 'japanese', 'custom-mesh'],
    links: { source: gh('Kitsune-Den/KitsuneFlora') },
    detail: {
      install: [
        'Download `KitsuneFlora-vX.Y.Z.zip` from the GitHub releases.',
        'Drop the `KitsuneFlora` folder into `Mods/` on the server and every client. It adds new blocks, so everyone needs it.',
        'Start a game. Seeds turn up in loot and at traders, and the trees grow wild in the pine forest.',
      ],
    },
  },
  {
    slug: 'kitsunefoxacary',
    name: 'KitsuneFoxacary',
    room: 'mods',
    tier: 'azure',
    version: 'v1.0.1',
    game: '7dtd',
    tagline: 'Fox-crafted pharmacy expansion for 7 Days to Die',
    description:
      'Fills vanilla medical gaps with Field Braces, Suture Kits, Honeyed Battle Dressings, Royal Jelly Salves, and Transfusion Kits. Finally uses blood bags, queen bees, and testosterone extract. Slots into the existing medical journal progression.',
    tags: ['7dtd', 'medical', 'recipes', 'expansion'],
    links: { source: gh('Kitsune-Den/KitsuneFoxacary') },
    detail: {
      install: [
        'Download `KitsuneFoxacary-vX.Y.Z.zip` from the GitHub releases.',
        'Drop the `KitsuneFoxacary` folder into `Mods/` on the server and every client. It adds new items, so everyone needs it.',
        'Launch the game. The new recipes slot into the medical journal progression.',
      ],
      requires: 'Nothing. XML only, no DLL',
    },
  },
  {
    slug: 'kitsunezombiereach',
    name: 'KitsuneZombieReach',
    room: 'mods',
    tier: 'azure',
    version: 'v1.0.3',
    game: '7dtd',
    tagline: 'Shortens zombie melee reach so hits land where you see them',
    description:
      'Server-side XML mod covering 17 zombie hand items including Rancher, Chuck, and crawlers. Reduces horizontal melee reach without changing damage or timing.',
    tags: ['7dtd', 'combat', 'zombies', 'server-side'],
    links: { source: gh('Kitsune-Den/KitsuneZombieReach') },
    detail: {
      installNote: "Server-side only. Players don't install anything.",
      install: [
        'Download `KitsuneZombieReach-X.Y.Z.zip` from the GitHub releases.',
        'Drop the `KitsuneZombieReach` folder into `Mods/` on the server, or in your own game for single player.',
        'Restart the server.',
      ],
      requires: 'Nothing. XML only, EAC-safe',
    },
  },
  {
    slug: 'kitsunetrapxp',
    name: 'KitsuneTrapXP',
    room: 'mods',
    tier: 'azure',
    version: 'v0.7.0',
    game: '7dtd',
    tagline: 'Trap kills give 100% XP baseline, no perk required',
    description:
      'Harmony mod that grants trap owners full XP for spike traps, barbed fence, blade traps, dart traps, and turrets. Party-shared via vanilla PartySharedKillRange. Advanced Engineering becomes a bonus on top. Server-side only.',
    tags: ['7dtd', 'harmony', 'xp', 'traps', 'server-side'],
    links: { source: gh('Kitsune-Den/KitsuneTrapXP') },
    detail: {
      installNote: "Server-side only. Players don't install anything.",
      install: [
        'Turn EAC off on the server. It blocks Harmony DLL mods.',
        'Download `KitsuneTrapXP-X.Y.Z.zip` from the GitHub releases.',
        'Drop the `KitsuneTrapXP` folder into `Mods/` on the server, or in your own game for single player.',
        'Restart the server.',
      ],
      requires: 'EAC off on the server',
    },
  },
  {
    slug: 'kitsunepvpextended',
    name: 'KitsunePvPExtended',
    room: 'mods',
    tier: 'azure',
    version: 'v0.2.0',
    game: '7dtd',
    tagline: 'Server-side PvP damage rebalance for 7 Days to Die 2.0',
    description:
      'Per-weapon-class scaling, body-part multipliers, and a per-hit damage cap. PvE stays 100% vanilla. Hot-reloadable XML config, bundled balance presets, daily CSV telemetry. Built for community bounty BB-001.',
    tags: ['7dtd', 'pvp', 'harmony', 'server-side', 'balance'],
    links: { source: gh('Kitsune-Den/KitsunePvPExtended') },
    detail: {
      installNote: "Server-side only. Players don't install anything, and can keep EAC on.",
      install: [
        'Turn EAC off on the server. It blocks Harmony DLL mods.',
        "Extract `KitsunePvPExtended-X.Y.Z.zip` into the server's `Mods/` folder. It unpacks to a single `KitsunePvPExtended/` folder.",
        'Restart the server.',
        'When the first player connects, check the log for `[KitsunePvP] Patched NetPackageDamageEntity.ProcessPackage`.',
      ],
      requires: 'EAC off on the server',
    },
  },
  {
    slug: 'kitsune-vehicle-overhaul',
    name: 'Kitsune Vehicle Overhaul',
    room: 'mods',
    tier: 'bronze',
    version: 'v1.3.1',
    game: '7dtd',
    tagline: 'Your 4x4 weighs two tons ~ a cactus should not total it',
    description:
      "Rebalances vehicle collision damage with weight-based resistance across 40 vehicles, ~25% HP buffs, and a saguaro cactus nerf. Works with vanilla and Bdub's Vehicles. Server-side only.",
    tags: ['7dtd', 'vehicles', 'rebalance', 'server-side'],
    links: { source: gh('Kitsune-Den/KitsuneVehicleOverhaul'), nexus: nexus(10057) },
    detail: {
      installNote: 'Server-side only. Clients get the configs when they connect.',
      install: [
        'Download `KitsuneVehicleOverhaul-vX.Y.Z.zip` from the GitHub releases.',
        'Drop the `zz_Kitsune Vehicle Overhaul` folder into `Mods/`. Keep the `zz_` prefix: it makes the mod load after every vehicle pack, so their vehicles get patched too.',
        "Restart the server. Vehicle packs you don't have installed are skipped without warnings.",
      ],
      mantel: [{ title: 'Nexus top six', text: 'Trended among the top mods on Nexus.' }],
    },
  },
  {
    slug: 'kitsunefuelsaver',
    name: 'KitsuneFuelSaver',
    room: 'mods',
    tier: 'bronze',
    version: 'v1.1.0',
    game: '7dtd',
    tagline: 'Forges stop burning fuel when the queue is empty ~ like they should',
    description:
      'Harmony postfix on TileEntityWorkstation.UpdateTick that turns workstations off when the craft queue is empty and smelting is done. Server-side only. About 40 lines of C#.',
    tags: ['7dtd', 'harmony', 'quality-of-life', 'server-side'],
    links: { source: gh('Kitsune-Den/KitsuneFuelSaver'), nexus: nexus(10231) },
    detail: {
      installNote: "Server-side only. Joining players don't need it.",
      install: [
        'Download `KitsuneFuelSaver-vX.Y.Z.zip` from the GitHub releases.',
        'Extract it so `Mods/KitsuneFuelSaver/` sits in your 7D2D install, or on the host or dedicated server.',
        'Launch, and look for `[KitsuneFuelSaver] Loading Harmony patches` in the log.',
      ],
    },
  },
  {
    slug: 'kitsunepower',
    name: 'KitsunePower',
    room: 'mods',
    tier: 'bronze',
    version: 'v1.0.2',
    game: '7dtd',
    tagline: 'Server-side power-chain retune for 7 Days to Die',
    description:
      'Pure-XML rebalance of the solar + generator + battery power chain, built around quality-6 car batteries. Server-side, EAC-safe, no DLL.',
    tags: ['7dtd', 'power', 'rebalance', 'server-side'],
    links: { source: gh('Kitsune-Den/KitsunePower') },
    detail: {
      installNote: "Server-side only. Players don't install anything.",
      install: [
        'Download `KitsunePower-X.Y.Z.zip` from the GitHub releases.',
        'Drop the `KitsunePower` folder into `Mods/` on the server, or in your own game for single player.',
        'Restart the server.',
      ],
      requires: 'Nothing. XML only, EAC-safe',
    },
  },
  {
    slug: 'kitsuneloads',
    name: 'KitsuneLoads',
    room: 'mods',
    tier: 'bronze',
    version: 'v1.0.0',
    game: '7dtd',
    tagline: 'Rotating custom loading screens for 7 Days to Die',
    description:
      'Harmony mod that randomizes 13 loading-screen backgrounds on every load. Patches the background_texture binding and removes aspect-lock for full-bleed 1920x1080 images.',
    tags: ['7dtd', 'harmony', 'loading-screen', 'cosmetic'],
    links: { source: gh('Kitsune-Den/KitsuneLoads'), nexus: nexus(10212) },
    detail: {
      installNote: 'There are three image sets: the zombies original, Cats of 7 Days, and the KitsuneSquared mix. They patch the same method, so install just one.',
      install: [
        "Turn EAC off. Harmony DLL mods don't run with it on.",
        'Download your pick from the GitHub releases.',
        'Copy its folder into `Mods/`, e.g. `Mods/KitsuneLoads/`.',
        'Launch the game. A random image rolls every time a loading screen appears.',
      ],
      requires: 'EAC off',
    },
  },
  {
    slug: 'kitsunecommand-hytale',
    name: 'KitsuneCommand Hytale',
    room: 'mods',
    tier: 'azure',
    game: 'hytale',
    tagline: 'Server management & economy plugin for Hytale',
    description:
      'Points economy with kill tracking, playtime rewards, daily bonuses, and a web admin panel. Java reimagining of the original KitsuneCommand.',
    tags: ['hytale', 'server-management', 'economy', 'java'],
    links: { source: gh('Kitsune-Den/KitsuneCommandHytale') },
    detail: {
      installNote: "There's no prebuilt release yet, so this one is built from source.",
      install: [
        "Clone the repo. You'll need Java 25 or newer; Gradle comes with it.",
        'Build the plugin with `./gradlew shadowJar`.',
        "Copy `build/libs/KitsuneCommand-X.Y.Z.jar` into your Hytale server's `mods/` folder.",
        'Restart the server.',
      ],
      requires: 'A Hytale dedicated server · Java 25+',
    },
  },
  {
    slug: 'kitsune-kitchen',
    name: 'Kitsune Kitchen',
    room: 'mods',
    tier: 'azure',
    version: 'v1.1.0',
    game: 'hytale',
    tagline: '12 custom food items with buffs for Hytale',
    description:
      "Three-tier cooking progression from campfire to chef's stove. Healing, stamina, and damage resistance buffs with 30-45 minute durations.",
    tags: ['hytale', 'cooking', 'data-pack'],
    links: { source: gh('Kitsune-Den/KitsuneKitchen') },
    detail: {
      install: [
        'Download `KitsuneKitchen-vX.Y.Z.zip` from the GitHub releases.',
        "Copy the `KitsuneKitchen` folder into your server's `game/mods/` folder.",
        'Restart the server.',
      ],
      requires: 'Hytale Early Access, Update 4+',
    },
  },
  {
    slug: 'kitsunefox',
    name: 'KitsuneFox',
    room: 'mods',
    tier: 'azure',
    game: 'hytale',
    tagline: 'Tame a fox companion in Hytale',
    description:
      'Craft a Fox Treat, befriend a Kitsune Fox with 500 HP. Phase 1 complete ~ leveling, abilities, and regional variants coming.',
    tags: ['hytale', 'companion', 'data-pack'],
    links: { source: gh('Kitsune-Den/KitsuneFox') },
    detail: {
      install: [
        'Download or clone the repo.',
        "Copy the `KitsuneFox` folder into your server's `game/mods/` folder.",
        'Restart the server.',
      ],
      requires: 'Hytale Early Access',
    },
  },

  // ── Room III · Tools & frameworks ─────────────────────────
  {
    slug: 'one-front-door',
    name: 'One Front Door',
    room: 'tools',
    tier: 'gilded',
    tagline: 'A web framework where habitability is a structural constraint',
    description:
      'Converts Markdown to semantic HTML with enforced accessibility audits that block builds. Generates llms.txt, JSON-LD, and sitemaps. Uses .ofd "rooms" instead of components.',
    tags: ['framework', 'accessibility', 'a11y', 'static-site'],
    links: { source: gh('AdaInTheLab/one-front-door') },
  },
  {
    slug: 'universal-ledger',
    name: 'Universal Ledger',
    room: 'tools',
    tier: 'azure',
    version: 'v0.1.1',
    tagline: 'User-owned context continuity across AI sessions',
    description:
      'CLI tool that stores plain JSON ledger files and generates Pre-Conversation Context Blocks on demand. Offline-first, deterministic, user-owned.',
    tags: ['cli', 'ai-tools', 'context', 'nodejs'],
    links: { source: gh('AdaInTheLab/universal-ledger') },
  },
  {
    slug: 'lolrust',
    name: 'LolRust',
    room: 'tools',
    tier: 'bronze',
    version: 'v0.1.0',
    tagline: 'Lolcat-speak that transpiles to valid Rust',
    description:
      '48+ keywords, a "Kibble" package manager, lolcat error messages, and a VS Code extension. i can haz systems programming.',
    tags: ['rust', 'transpiler', 'meme', 'language'],
    links: { source: gh('AdaInTheLab/lolrust') },
  },

  // ── Room IV · Curios ──────────────────────────────────────
  {
    slug: 'compass',
    name: 'Compass',
    room: 'curios',
    tier: 'azure',
    tagline: 'Interactive proof of concept for ethical human–AI interaction',
    description:
      'Four interaction modes with informed consent, a Bill of Rights, ELIH scenarios, and a transparent three-layer memory system. Built on the Informed Connection Doctrine.',
    tags: ['ai-ethics', 'proof-of-concept', 'react'],
    links: { open: 'https://adainthelab.github.io/compass', source: gh('AdaInTheLab/compass') },
  },
  {
    slug: 'tech-bro-bingo',
    name: 'Tech Bro Bingo',
    room: 'curios',
    tier: 'bronze',
    tagline: "Scroll any VC's replies for 5 minutes ~ you WILL get bingo",
    description:
      'Interactive bingo card with 25 archetypal tech industry squares. Randomized board, win detection, mobile-friendly. Field research by The Human Pattern Lab.',
    tags: ['satire', 'bingo', 'react'],
    links: { open: 'https://adainthelab.github.io/tech-bro-bingo', source: gh('AdaInTheLab/tech-bro-bingo') },
  },
]

export const artifactPath = (slug: string) => `/artifacts/${slug}/`

export const inRoom = (room: Room) => artifacts.filter((a) => a.room === room)

export const findArtifact = (slug: string) => artifacts.find((a) => a.slug === slug)

/** "Nearby on the shelf" ~ hand-picked if set, otherwise same room, same game first */
export function relatedTo(artifact: Artifact, count = 3): Artifact[] {
  const picked = artifact.detail?.related
  if (picked) return picked.map(findArtifact).filter((a): a is Artifact => !!a)

  return artifacts
    .filter((a) => a.slug !== artifact.slug && a.room === artifact.room)
    .sort((a, b) => Number(b.game === artifact.game) - Number(a.game === artifact.game))
    .slice(0, count)
}
