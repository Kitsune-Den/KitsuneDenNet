<script setup lang="ts">
import { findArtifact } from './data/artifacts'
import HomePage from './pages/HomePage.vue'
import ArtifactPage from './pages/ArtifactPage.vue'
import LostPage from './pages/LostPage.vue'

/**
 * Two kinds of page, picked by path. The build writes a real
 * /artifacts/<slug>/index.html for every entry (see vite.config.ts), so
 * there's no client router ~ links between pages are plain links.
 */
const match = window.location.pathname.match(/^\/artifacts\/([^/]+)\/?$/)
const artifact = match ? findArtifact(decodeURIComponent(match[1])) : undefined
const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html'

if (artifact) document.title = `${artifact.name} — KitsuneDen`
</script>

<template>
  <ArtifactPage v-if="artifact" :artifact="artifact" />
  <HomePage v-else-if="isHome" />
  <LostPage v-else />
</template>
