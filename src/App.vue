<script setup lang="ts">
import { artifactPath, findArtifact, findByFormerSlug } from './data/artifacts'
import HomePage from './pages/HomePage.vue'
import ArtifactPage from './pages/ArtifactPage.vue'
import LostPage from './pages/LostPage.vue'

/**
 * Two kinds of page, picked by path. The build writes a real
 * /artifacts/<slug>/index.html for every entry (see vite.config.ts), so
 * there's no client router ~ links between pages are plain links.
 */
const match = window.location.pathname.match(/^\/artifacts\/([^/]+)\/?$/)
const slug = match ? decodeURIComponent(match[1]) : undefined
const artifact = slug ? findArtifact(slug) : undefined

// A retired slug forwards to the entry it was merged into. The build also
// writes a static redirect page there; this covers the dev server.
const movedTo = slug && !artifact ? findByFormerSlug(slug) : undefined
if (movedTo) window.location.replace(artifactPath(movedTo.slug))
const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html'

if (artifact) document.title = `${artifact.name} — KitsuneDen`
</script>

<template>
  <ArtifactPage v-if="artifact" :artifact="artifact" />
  <HomePage v-else-if="isHome" />
  <LostPage v-else-if="!movedTo" />
</template>
