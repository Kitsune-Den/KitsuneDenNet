<script setup lang="ts">
import { computed } from 'vue'
import { projects, sections, featured } from './data/projects'
import ProjectCard from './components/ProjectCard.vue'
import FeaturedProject from './components/FeaturedProject.vue'
import EmptyDen from './components/EmptyDen.vue'
import heroImg from './assets/hero.webp'
import logoImg from './assets/logo.webp'

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
