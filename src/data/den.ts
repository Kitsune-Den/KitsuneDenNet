/**
 * Everything on the page that isn't a registry entry: Den Radio broadcasts,
 * the mantel trophies, the offering bowl, and the links that recur in the
 * nav and footer.
 */

export const links = {
  kofi: 'https://ko-fi.com/adainthelab',
  kofiTiers: 'https://ko-fi.com/adainthelab/tiers',
  kofiCommissions: 'https://ko-fi.com/adainthelab/commissions',
  discord: 'https://goodtimes.gg/discord',
  github: 'https://github.com/Kitsune-Den',
  lab: 'https://adainthelab.com',
  skulk: 'https://skulk.ai',
  privacy: '/privacy/',
}

/**
 * Den Radio ~ the strip under the hero. The first entry is what's on air when
 * the page loads, so bump it when a new game version is verified.
 */
export const broadcasts: { label: string; text: string }[] = [
  { label: 'Latest', text: 'Paint & Prints tools updated for 7D2D V3.3 experimental.' },
  { label: 'Mantel', text: 'KitsunePaintUnlocked trended in the Nexus top six.' },
  { label: 'Mantel', text: 'KitsunePaint won Mod of the Week.' },
  { label: 'Fixed', text: 'Kitsune Vehicle Overhaul load-order bug squashed, thanks to a Nexus report.' },
]

/** "On the mantel" ~ tone picks the tile's accent */
export const trophies: { value: string; text: string; tone: 'gold' | 'lavender' | 'foxfire' }[] = [
  {
    value: '255 → 1023',
    text: '7D2D paint textures, after KitsunePaintUnlocked patched five engine layers.',
    tone: 'gold',
  },
  {
    value: 'Top 6',
    text: 'Trending on Nexus — KitsunePaintUnlocked and Kitsune Vehicle Overhaul.',
    tone: 'lavender',
  },
  {
    value: 'MotW',
    text: 'KitsunePaint took Mod of the Week — no Unity required.',
    tone: 'foxfire',
  },
]

/** The offering bowl ~ `featured` gets the gold treatment */
export const offerings: {
  name: string
  price: string
  per: string
  text: string
  cta: string
  href: string
  style: 'plain' | 'featured' | 'dashed'
}[] = [
  {
    name: 'Kit',
    price: '$2',
    per: ' / month',
    text: 'A small fox at the fire. Early word on new releases. Comes with your Discord role.',
    cta: 'Join as Kit',
    href: links.kofiTiers,
    style: 'plain',
  },
  {
    name: 'Nine Tails',
    price: '$6',
    per: ' / month',
    text: 'The inner circle. Vote on what gets built next and try mods before they go live. Comes with your Discord role.',
    cta: 'Join as Nine Tails',
    href: links.kofiTiers,
    style: 'featured',
  },
  {
    name: 'Commissions',
    price: '$20',
    per: ' and up',
    text: 'A mod, a compatibility fix or a server setup, made to order by the den.',
    cta: 'Ask on Ko-fi',
    href: links.kofiCommissions,
    style: 'dashed',
  },
]
