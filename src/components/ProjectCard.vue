<script setup lang="ts">
import { computed } from 'vue'
import { tierMeta, type DenProject } from '../data/projects'

const props = defineProps<{
  project: DenProject
}>()

const meta = computed(() => tierMeta[props.project.tier])
const isDeployed = computed(() => props.project.type === 'deployed')

/**
 * Tier-specific classes for the card border & glow.
 * We use inline style for the box-shadow since Tailwind
 * can't do arbitrary glow colors from our custom palette cleanly.
 */
const tierStyles = computed(() => {
  const colors: Record<string, { border: string; glow: string }> = {
    gilded: { border: 'border-tier-gilded/40', glow: '0 0 20px rgba(255, 215, 0, 0.15)' },
    azure:  { border: 'border-tier-azure/40',  glow: '0 0 20px rgba(0, 229, 255, 0.15)' },
    bronze: { border: 'border-tier-bronze/40',  glow: '0 0 20px rgba(205, 127, 50, 0.15)' },
    gray:   { border: 'border-tier-gray/30',    glow: 'none' },
  }
  return colors[props.project.tier] ?? colors.gray
})

/**
 * Static class map — Tailwind v4 can't detect dynamically interpolated classes.
 * These must be full literal strings so the compiler picks them up.
 */
const tierBadgeClasses = computed(() => {
  const map: Record<string, string> = {
    'tier-gilded': 'bg-tier-gilded/15 text-tier-gilded',
    'tier-azure':  'bg-tier-azure/15 text-tier-azure',
    'tier-bronze': 'bg-tier-bronze/15 text-tier-bronze',
    'tier-gray':   'bg-tier-gray/15 text-tier-gray',
  }
  return map[meta.value.color] ?? map['tier-gray']
})

const hoverGlow = computed(() => {
  const colors: Record<string, string> = {
    gilded: '0 0 30px rgba(255, 215, 0, 0.3)',
    azure:  '0 0 30px rgba(0, 229, 255, 0.3)',
    bronze: '0 0 30px rgba(205, 127, 50, 0.3)',
    gray:   '0 0 20px rgba(142, 142, 142, 0.15)',
  }
  return colors[props.project.tier] ?? colors.gray
})
</script>

<template>
  <a
    :href="project.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group relative block rounded-xl border bg-den-surface p-5
           transition-all duration-300 hover:-translate-y-1"
    :class="tierStyles.border"
    :style="{ boxShadow: tierStyles.glow }"
    @mouseenter="($event.currentTarget as HTMLElement).style.boxShadow = hoverGlow"
    @mouseleave="($event.currentTarget as HTMLElement).style.boxShadow = tierStyles.glow"
  >
    <!-- Top row: tier badge + version -->
    <div class="flex items-center justify-between mb-3">
      <span
        class="rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase"
        :class="tierBadgeClasses"
      >
        {{ meta.label }}
      </span>
      <span v-if="project.version" class="text-xs text-text-muted font-mono">
        {{ project.version }}
      </span>
    </div>

    <!-- Project name with tier icon -->
    <div class="flex items-start gap-3 mb-1">
      <img
        :src="meta.icon"
        :alt="`${meta.label} tier`"
        class="h-10 w-10 shrink-0 rounded-md mt-0.5"
      />
      <div>
        <h3 class="font-display text-lg text-text-primary group-hover:text-fox-warm transition-colors">
          {{ project.name }}
        </h3>
        <p class="text-sm text-text-secondary leading-relaxed">
          {{ project.tagline }}
        </p>
      </div>
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap gap-1.5 mt-4 mb-4">
      <span
        v-for="tag in project.tags"
        :key="tag"
        class="rounded-md bg-den-muted px-2 py-0.5 text-xs text-text-muted"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Action row -->
    <div class="flex items-center gap-3 pt-3 border-t border-den-border text-xs flex-wrap">
      <span
        class="font-mono uppercase tracking-wider text-text-muted
               group-hover:text-text-secondary transition-colors"
      >
        {{ isDeployed ? '[ open ]' : '[ view code ]' }}
      </span>
      <a
        v-if="isDeployed && project.repo"
        :href="project.repo"
        target="_blank"
        rel="noopener noreferrer"
        class="font-mono uppercase tracking-wider text-text-muted
               hover:text-text-secondary transition-colors"
        @click.stop
      >
        [ source ]
      </a>
      <a
        v-if="project.docs"
        :href="project.docs"
        target="_blank"
        rel="noopener noreferrer"
        class="font-mono uppercase tracking-wider text-text-muted
               hover:text-text-secondary transition-colors"
        @click.stop
      >
        [ docs ]
      </a>
      <a
        v-if="project.appStore"
        :href="project.appStore"
        target="_blank"
        rel="noopener noreferrer"
        class="font-mono uppercase tracking-wider text-text-muted
               hover:text-text-secondary transition-colors"
        @click.stop
      >
        [ ios ]
      </a>
      <a
        v-if="project.googlePlay"
        :href="project.googlePlay"
        target="_blank"
        rel="noopener noreferrer"
        class="font-mono uppercase tracking-wider text-text-muted
               hover:text-text-secondary transition-colors"
        @click.stop
      >
        [ android ]
      </a>
    </div>
  </a>
</template>
