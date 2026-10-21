/**
 * The Hearth ~ the featured carousel under Den Radio. Slides play in this
 * order, and the first one is what's showing when the page loads. Each slug
 * must be in the registry; the slide takes its name, words and links from
 * there. Images are 1200×675 (16:9) WebP in src/assets/hearth/.
 */

import { findArtifact, type Artifact } from './artifacts'
import kitsunedenImg from '../assets/hearth/kitsuneden.webp'
import kitsuneuiImg from '../assets/hearth/kitsuneui.webp'
import kitsunecommandImg from '../assets/hearth/kitsunecommand.webp'
import paintUnlockedImg from '../assets/hearth/kitsunepaintunlocked.webp'
import echoImg from '../assets/hearth/echo.webp'
import voidSluiceImg from '../assets/hearth/void-sluice.webp'
import peanutGalleryImg from '../assets/hearth/peanut-gallery.webp'

export interface HearthSlide {
  artifact: Artifact
  image: string
  alt: string
}

const slides: { slug: string; image: string; alt: string }[] = [
  {
    slug: 'kitsuneden',
    image: kitsunedenImg,
    alt: 'The KitsuneDen dashboard showing server status, system resources and a live console log',
  },
  {
    slug: 'kitsuneui',
    image: kitsuneuiImg,
    alt: 'The 7 Days to Die main menu as a dark indigo glass rail down the left edge, beside a misty forest cabin at night',
  },
  {
    slug: 'kitsunecommand',
    image: kitsunecommandImg,
    alt: 'The KitsuneCommand web panel on its server control page, with player count, uptime, memory and in-game day',
  },
  {
    slug: 'kitsunepaintunlocked',
    image: paintUnlockedImg,
    alt: 'KitsunePaintUnlocked art: a fox spirit pouring a swirl of paint textures, under the words "The limit has been broken"',
  },
  {
    slug: 'echo',
    image: echoImg,
    alt: 'Echo, a purple fox curled into a crescent',
  },
  {
    slug: 'void-sluice',
    image: voidSluiceImg,
    alt: 'The Void Sluice home page: "No port forwarding. Ever." beside an example relayed Palworld server',
  },
  {
    slug: 'peanut-gallery',
    image: peanutGalleryImg,
    alt: 'Peanut Gallery: Peanut the fox, Mochi the tanuki, Vex the crow, Quill the owl and Wisp the ghost',
  },
]

export const hearth: HearthSlide[] = slides.map(({ slug, ...slide }) => {
  const artifact = findArtifact(slug)
  if (!artifact) throw new Error(`Hearth slide "${slug}" isn't in the registry`)
  return { artifact, ...slide }
})
