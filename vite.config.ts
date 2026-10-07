import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { artifactPath, artifacts } from './src/data/artifacts'

const SITE = 'https://kitsuneden.net'

const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Writes /artifacts/<slug>/index.html for every registry entry, each a copy
 * of the built shell with its own title, description and canonical URL, so
 * the pages work on a plain static host and unfurl properly when shared.
 * Also adds them to the sitemap.
 */
function artifactPages(): Plugin {
  let outDir = 'dist'

  return {
    name: 'den-artifact-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const shell = readFileSync(resolve(outDir, 'index.html'), 'utf-8')

      for (const artifact of artifacts) {
        const url = `${SITE}${artifactPath(artifact.slug)}`
        const title = escapeAttr(`${artifact.name} — KitsuneDen`)
        const description = escapeAttr(artifact.description ?? artifact.tagline)

        const html = shell
          .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
          .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*"/g, `$1${description}"`)
          .replace(/(<meta (?:property|name)="(?:og:title|twitter:title)" content=")[^"]*"/g, `$1${title}"`)
          .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
          .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)

        const dir = resolve(outDir, `.${artifactPath(artifact.slug)}`)
        mkdirSync(dir, { recursive: true })
        writeFileSync(resolve(dir, 'index.html'), html)

        // Retired slugs get a plain redirect page. The deploy never deletes
        // files, so without this the old page would linger, still wired to
        // an old bundle.
        for (const former of artifact.formerSlugs ?? []) {
          const formerDir = resolve(outDir, `.${artifactPath(former)}`)
          mkdirSync(formerDir, { recursive: true })
          writeFileSync(
            resolve(formerDir, 'index.html'),
            `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="${url}" />
    <meta http-equiv="refresh" content="0; url=${artifactPath(artifact.slug)}" />
  </head>
  <body style="background:#110c1d;color:#f1eaf8;font-family:system-ui,sans-serif">
    <p>This page moved to <a href="${artifactPath(artifact.slug)}" style="color:#e6bd6c">${escapeAttr(artifact.name)}</a>.</p>
  </body>
</html>
`,
          )
        }
      }

      const sitemapPath = resolve(outDir, 'sitemap.xml')
      const entries = artifacts
        .map((a) => `  <url><loc>${SITE}${artifactPath(a.slug)}</loc><priority>0.7</priority></url>`)
        .join('\n')
      const sitemap = readFileSync(sitemapPath, 'utf-8').replace('</urlset>', `${entries}\n</urlset>`)
      writeFileSync(sitemapPath, sitemap)
    },
  }
}

export default defineConfig({
  plugins: [vue(), tailwindcss(), artifactPages()],
})
