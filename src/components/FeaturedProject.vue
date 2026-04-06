<script setup lang="ts">
import { computed } from 'vue'
import { tierMeta, type DenProject } from '../data/projects'

const props = defineProps<{
  project: DenProject
}>()

const meta = computed(() => tierMeta[props.project.tier])
</script>

<template>
  <a
    :href="project.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group relative block rounded-2xl border border-tier-gilded/30
           bg-gradient-to-br from-den-surface to-den-deeper
           p-8 md:p-10 transition-all duration-300 hover:-translate-y-1"
    :style="{
      boxShadow: '0 0 30px rgba(255, 215, 0, 0.1), inset 0 1px 0 rgba(255, 215, 0, 0.1)',
    }"
    @mouseenter="($event.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(255, 215, 0, 0.2), inset 0 1px 0 rgba(255, 215, 0, 0.15)'"
    @mouseleave="($event.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.1), inset 0 1px 0 rgba(255, 215, 0, 0.1)'"
  >
    <!-- Top badge row -->
    <div class="flex items-center gap-3 mb-4">
      <span class="rounded-full bg-tier-gilded/15 text-tier-gilded px-3 py-1 text-xs font-semibold tracking-wide uppercase">
        Featured
      </span>
      <span class="text-xs text-text-muted font-mono">flagship project</span>
    </div>

    <!-- Title with tier icon -->
    <div class="flex items-center gap-4 mb-2">
      <img
        :src="meta.icon"
        :alt="`${meta.label} tier`"
        class="h-14 w-14 shrink-0 rounded-lg"
      />
      <div>
        <h2 class="font-display text-3xl md:text-4xl text-text-primary group-hover:text-fox-warm transition-colors">
          {{ project.name }}
        </h2>
        <p class="text-text-secondary text-lg max-w-2xl">
          {{ project.tagline }}
        </p>
      </div>
    </div>

    <!-- Description -->
    <p v-if="project.description" class="text-text-muted text-sm mb-6 max-w-2xl leading-relaxed">
      {{ project.description }}
    </p>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2 mb-6">
      <span
        v-for="tag in project.tags"
        :key="tag"
        class="rounded-md bg-den-muted px-2.5 py-1 text-xs text-text-muted"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Action row -->
    <div class="flex items-center gap-4 pt-4 border-t border-den-border text-sm">
      <span class="font-mono uppercase tracking-wider text-tier-gilded/70 group-hover:text-tier-gilded transition-colors">
        [ view on github ]
      </span>
    </div>
  </a>
</template>
