<script setup lang="ts">
import { computed } from 'vue'
import { artifactPath, tiers, type Artifact } from '../data/artifacts'
import { linkAttrs } from '../lib/links'

const props = defineProps<{ artifact: Artifact }>()

const tier = computed(() => tiers[props.artifact.tier])

/** Open, Source, Nexus ~ whichever the artifact has */
const actions = computed(() => {
  const { open, source, nexus } = props.artifact.links
  const list: { label: string; href: string; primary: boolean }[] = []
  if (open) list.push({ label: 'Open →', href: open, primary: true })
  if (source) list.push({ label: 'Source', href: source, primary: !open })
  if (nexus) list.push({ label: 'Nexus', href: nexus, primary: false })
  return list
})
</script>

<template>
  <article class="den-card relative flex flex-col gap-3.5 overflow-hidden rounded-[20px] border border-den-gold/16 bg-den-card p-[26px]">
    <!-- tier-coloured lantern glow on the top edge -->
    <div
      aria-hidden="true"
      class="absolute top-0 left-[26px] h-[3px] w-16 rounded-b-[3px]"
      :style="{ background: tier.color, boxShadow: tier.glow ? `0 0 18px ${tier.color}` : 'none' }"
    />
    <div class="flex items-center justify-between gap-2.5">
      <span class="font-mono text-[11px] uppercase tracking-[.14em]" :style="{ color: tier.text }">{{ tier.label }}</span>
      <span v-if="artifact.wip" class="rounded-md border border-dashed border-den-amber/60 px-2 py-[3px] font-mono text-[11px] text-den-amber">WIP</span>
    </div>
    <h3 class="m-0 font-display text-2xl font-semibold">
      <a :href="artifactPath(artifact.slug)" class="text-den-heading hover:text-den-gold-hover">{{ artifact.name }}</a>
    </h3>
    <p class="m-0 grow text-base leading-normal text-den-text-2">{{ artifact.tagline }}</p>
    <div class="flex flex-wrap gap-1.5">
      <span v-for="tag in artifact.tags.slice(0, 3)" :key="tag" class="den-tag">{{ tag }}</span>
    </div>
    <div class="flex flex-wrap gap-x-[18px] border-t border-den-gold/12 pt-3 text-sm font-bold">
      <a
        v-for="action in actions"
        :key="action.label"
        v-bind="linkAttrs(action.href)"
        class="inline-flex min-h-11 items-center"
        :class="action.primary ? '' : 'text-den-lavender hover:text-den-gold-hover'"
        :aria-label="`${action.label.replace(' →', '')} ${artifact.name}`"
      >
        {{ action.label }}
      </a>
    </div>
  </article>
</template>
