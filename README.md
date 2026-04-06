# KitsuneDenNet

The portal site for [kitsuneden.net](https://kitsuneden.net) - a curated showcase of projects built by the skulk.

Not everything makes it here. If it's on the site, it earned its spot.

## Stack

Vue 3 + TypeScript + Tailwind CSS + Vite. Keeps things light and agent-friendly.

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

## Adding a Project

Everything lives in one file: `src/data/projects.ts`. Add an object to the `projects` array and the site picks it up automatically. No other files need to change.

Here's the shape of a project entry:

```typescript
{
  name: 'Your Project Name',
  tagline: 'Short and punchy - this shows on the card',
  description: 'Longer description for the expanded view. Optional but recommended.',
  type: 'source',           // 'source' = links to GitHub, 'deployed' = lives on a subdomain
  tier: 'azure',            // see tier system below
  version: 'v1.0.0',       // optional
  url: 'https://github.com/AdaInTheLab/your-repo',
  repo: 'https://github.com/AdaInTheLab/your-repo',  // optional, omit for private repos
  tags: ['7dtd', 'mod'],
  section: 'game-mods',     // which section it appears in
}
```

### Sections

Projects go into one of four sections. Pick the one that fits:

- `apps` - Full-stack applications with their own homes (subdomains, standalone deploys)
- `game-mods` - Mods and data packs for 7 Days to Die, Hytale, etc.
- `tools` - Developer tools, CLIs, and frameworks
- `experiments` - Proof-of-concepts, satire, and things we made because we could

Order within the array is display order within that section.

### Tiers

Each project gets a certification tier that controls its card glow color:

- **gilded** (gold, `#FFD700`) - The real deal. Polished, significant, a lot of work went into this.
- **azure** (cyan, `#00E5FF`) - AI-enhanced or skulk-assisted. Still solid, just built differently.
- **bronze** (amber, `#CD7F32`) - Good work, maybe earlier stage or smaller scope.
- **gray** (`#8E8E8E`) - Base tier. Community contributions, stubs, starting points.

### Type

- `source` - Links to a GitHub repo. Most mods and tools use this.
- `deployed` - Lives on a subdomain (like `paint.kitsuneden.net`). Set the `url` to the live site and optionally include `webApp`, `appStore`, or `googlePlay` links.

### The Rule

Only projects that live on GitHub under Ada or skulk members make it onto the site. This is a curated portal, not an everything-dump.
