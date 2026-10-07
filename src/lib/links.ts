/**
 * Attributes for a link that may leave the den. Same-site paths stay in the
 * tab; everything else opens in a new one.
 */
export function linkAttrs(href: string) {
  const external = /^https?:\/\//.test(href) && !href.startsWith('https://kitsuneden.net')
  return external ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }
}
