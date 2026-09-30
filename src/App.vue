<script setup lang="ts">
import { computed } from 'vue'
import { projects, sections, featured } from './data/projects'
import ProjectCard from './components/ProjectCard.vue'
import FeaturedProject from './components/FeaturedProject.vue'
import EmptyDen from './components/EmptyDen.vue'
import heroImg from './assets/hero.webp'
import logoImg from './assets/logo.webp'
import discordBannerImg from './assets/discord-banner.webp'

const artifactCount = computed(() => projects.length + 1) // +1 for featured

/** Projects grouped by section, preserving registry order */
const projectsBySection = computed(() => {
  return sections.map((section) => ({
    ...section,
    projects: projects.filter((p) => p.section === section.id),
  }))
})
</script>

<template>
  <div class="min-h-screen bg-den-dark font-sans">
    <!-- Header -->
    <header class="relative border-b border-den-border overflow-hidden">
      <!-- Hero background — kitsune lantern art -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          :src="heroImg"
          alt=""
          aria-hidden="true"
          class="w-[600px] max-w-none opacity-15 blur-[1px] select-none"
        />
      </div>
      <!-- Gradient overlays to blend hero into the dark bg -->
      <div class="absolute inset-0 bg-gradient-to-b from-den-dark/60 via-transparent to-den-dark pointer-events-none" />

      <div class="relative mx-auto max-w-5xl px-6 py-14 text-center">
        <!-- Logo + wordmark -->
        <div class="mb-4 flex items-center justify-center gap-3">
          <img
            :src="logoImg"
            alt="KitsuneDen fox logo"
            class="h-14 w-14 md:h-16 md:w-16 drop-shadow-[0_0_12px_rgba(255,215,0,0.3)]"
          />
          <h1 class="font-display text-5xl md:text-6xl tracking-wide">
            <span class="text-tier-gilded">Kitsune</span><span class="text-text-primary">Den</span>
          </h1>
        </div>

        <!-- Compatibility pill ~ bump the text when a new game version is verified. -->
        <div class="mb-5 flex justify-center">
          <span class="inline-flex items-center gap-2 rounded-full border border-fox-orange/40 bg-fox-orange/10 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-fox-warm">
            <span class="h-1.5 w-1.5 rounded-full bg-fox-orange animate-pulse" aria-hidden="true" />
            Paint &amp; Prints tools updated for 7DTD V3.3 experimental
          </span>
        </div>

        <p class="text-text-secondary text-lg max-w-xl mx-auto mb-4">
          A curated collection of projects, mods, and artifacts — built by the skulk.
        </p>

        <!-- Registry status -->
        <p v-if="artifactCount > 0" class="text-sm text-text-muted font-mono">
          Registry Status:
          <span class="text-tier-gilded">{{ artifactCount }} Certified Artifact{{ artifactCount !== 1 ? 's' : '' }}</span>
        </p>
      </div>
    </header>

    <!-- Main content -->
    <main class="mx-auto max-w-5xl px-6 py-12">
      <template v-if="projects.length">
        <!-- Featured project -->
        <section class="mb-16">
          <FeaturedProject :project="featured" />
        </section>

        <!-- Sections -->
        <section
          v-for="group in projectsBySection"
          :key="group.id"
          class="mb-16 last:mb-0"
        >
          <!-- Section header -->
          <div class="mb-6">
            <h2 class="font-display text-2xl text-text-primary mb-1">
              {{ group.label }}
            </h2>
            <p class="text-sm text-text-muted">
              {{ group.description }}
            </p>
          </div>

          <!-- Project grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ProjectCard
              v-for="project in group.projects"
              :key="project.name"
              :project="project"
            />
          </div>
        </section>
      </template>

      <!-- Empty state -->
      <EmptyDen v-else />
    </main>

    <!-- Discord callout -->
    <section class="border-t border-den-border">
      <div class="mx-auto max-w-5xl px-6 py-14">
        <a
          href="https://goodtimes.gg/discord"
          target="_blank"
          rel="noopener noreferrer"
          title="Join the KitsuneDen @ Good Times Discord"
          class="group block overflow-hidden mx-auto max-w-[600px] rounded-2xl border border-purple-500/30 shadow-[0_0_60px_rgba(168,85,247,0.15)] transition-all duration-300 hover:border-purple-400/60 hover:shadow-[0_0_80px_rgba(168,85,247,0.35)]"
        >
          <img
            :src="discordBannerImg"
            alt="Join our Discord ~ KitsuneDen @ Good Times. Come say hi, hang out in voice chat, and ask for modding help, tool tips, and community advice"
            loading="lazy"
            class="w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </a>
        <p class="mt-3 text-center text-xs text-text-muted">
          Questions about a mod, or something you built with one?
          <a
            href="https://goodtimes.gg/discord"
            target="_blank"
            rel="noopener noreferrer"
            class="text-purple-400 transition-colors hover:text-purple-300"
          >Drop into the Den</a>.
        </p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-den-border mt-auto">
      <div class="mx-auto max-w-5xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-sm text-text-muted">
          &copy; {{ new Date().getFullYear() }} KitsuneDen
        </p>
        <nav class="flex items-center gap-4 text-sm text-text-muted">
          <a
            href="https://skulk.ai"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-tier-gilded transition-colors"
          >
            skulk.ai
          </a>
          <span class="text-den-border">&middot;</span>
          <a
            href="https://adainthelab.com"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-tier-gilded transition-colors"
          >
            adainthelab.com
          </a>
          <span class="text-den-border">&middot;</span>
          <a
            href="https://github.com/AdaInTheLab"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-tier-gilded transition-colors"
          >
            GitHub
          </a>
          <span class="text-den-border">&middot;</span>
          <a
            href="/privacy/"
            class="hover:text-tier-gilded transition-colors"
          >
            Privacy
          </a>
          <span class="text-den-border">&middot;</span>
          <a
            href="https://ko-fi.com/T6T57VRO7"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-fox-warm transition-colors"
          >
            ☕ Support on Ko-fi
          </a>
        </nav>
      </div>
    </footer>
  </div>
</template>
