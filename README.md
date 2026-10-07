# KitsuneDenNet

The portal site for [kitsuneden.net](https://kitsuneden.net) - a curated showcase of projects built by the skulk.

Not everything makes it here. If it's on the site, it earned its spot.

## Stack

Vue 3 + TypeScript + Tailwind CSS + Vite. Keeps things light and agent-friendly.

The look is "The Den at Night": colours, fonts and shared component classes live in `src/style.css`.

## Dev

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Output goes to `dist/`. Deploy that to the VPS web root.

## Adding an Artifact

Everything lives in one file: `src/data/artifacts.ts`. Add an object to the `artifacts` array and the site picks it up automatically: the home page shows it in its room, and the build writes its own page at `/artifacts/<slug>/`. No other files need to change.

Here's the shape of an entry:

```typescript
{
  slug: 'your-project',       // URL-safe, becomes /artifacts/your-project/
  name: 'Your Project Name',
  room: 'mods',               // which room of the den it lives in, see below
  tier: 'azure',              // see tiers below
  version: 'v1.0.0',          // optional, shows on the mod seal and artifact page
  game: '7dtd',               // optional: '7dtd' | 'hytale', drives the mod filter
  tagline: 'Short and punchy - this shows on the card',
  description: 'Longer description for the artifact page. Optional but recommended.',
  tags: ['7dtd', 'mod'],
  links: {
    open: 'https://your-app.kitsuneden.net',              // live app, if it has one
    source: 'https://github.com/Kitsune-Den/your-repo',   // omit for private repos
    docs: 'https://docs.example.com',                     // optional
    nexus: 'https://www.nexusmods.com/7daystodie/mods/1', // optional
  },
}
```

Order within the array is display order within that room.

### Rooms

- `flagship` - The Hearth. KitsuneDen itself, shown big near the top
- `apps` - The Lanterns. Full apps with homes of their own
- `mods` - The Scroll Shelf. Mods and data packs for 7 Days to Die and Hytale
- `tools` - The Toolchest. Developer tools, CLIs, and frameworks
- `curios` - Curios. Proof-of-concepts, satire, and things we made because we could
- `voices` - Voices of the Skulk. Where the Skulk speaks; set `action` to `Visit`, `Listen` or `Read`

### Tiers

- **gilded** (gold leaf) - Polished & proven. A lot of work went into this.
- **azure** (foxfire) - Lit & growing.
- **bronze** - Small, sharp, done.

### Artifact pages

Every entry gets a page built from the same data. For a richer page, add a `detail` object: a before/after `stat`, a "how it works" `steps` grid, `install` steps (wrap file and folder names in backticks), `requires` / `madeWith` for the sidebar, `mantel` trophies, and hand-picked `related` slugs. See KitsunePaintUnlocked for the full set.

Den Radio broadcasts, the mantel trophies on the home page and the Ko-fi offerings live in `src/data/den.ts`. Bump the first broadcast when a new game version is verified.

### The Rule

Only projects that live on GitHub under Ada or skulk members make it onto the site. This is a curated portal, not an everything-dump.
