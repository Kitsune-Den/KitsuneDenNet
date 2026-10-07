<script setup lang="ts">
import { computed, ref } from 'vue'
import { artifactPath, games, inRoom, rooms, tiers, type Game } from '../data/artifacts'
import { linkAttrs } from '../lib/links'
import DenIcon from './DenIcon.vue'
import RoomHeading from './RoomHeading.vue'

const mods = inRoom('mods')

const game = ref<Game | 'all'>('all')

const filters = computed(() => [
  { id: 'all' as const, label: 'All', count: mods.length },
  ...(Object.keys(games) as Game[]).map((id) => ({
    id,
    label: games[id],
    count: mods.filter((m) => m.game === id).length,
  })),
])

const visible = computed(() => (game.value === 'all' ? mods : mods.filter((m) => m.game === game.value)))
</script>

<template>
  <section :id="rooms.mods.anchor" class="mx-auto max-w-[1240px] scroll-mt-4 px-6 pt-20 pb-10 md:pt-28">
    <div class="mb-8 flex flex-wrap items-end justify-between gap-5">
      <RoomHeading :eyebrow="rooms.mods.eyebrow" :title="rooms.mods.title" :voice="rooms.mods.voice" />
      <div role="group" aria-label="Filter mods by game" class="flex flex-wrap gap-2">
        <button
          v-for="filter in filters"
          :key="filter.id"
          type="button"
          :aria-pressed="game === filter.id"
          class="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-[18px] text-sm transition-colors"
          :class="
            game === filter.id
              ? 'border-den-gold bg-den-gold font-bold text-den-on-gold'
              : 'border-den-gold/30 bg-transparent font-semibold text-den-text hover:border-den-gold/60'
          "
          @click="game = filter.id"
        >
          {{ filter.label }}
          <span class="font-mono text-xs opacity-70">{{ filter.count }}</span>
        </button>
      </div>
    </div>

    <ul class="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,520px),1fr))] gap-x-8 p-0">
      <li
        v-for="mod in visible"
        :key="mod.slug"
        class="den-row flex items-center gap-[18px] rounded-[10px] border-b border-den-gold/12 px-3 py-[18px]"
      >
        <!-- version seal, ringed in the tier colour -->
        <span
          class="flex size-[58px] shrink-0 items-center justify-center rounded-full border-[1.5px] font-mono text-[11px] shadow-[inset_0_0_12px_rgb(0_0_0/.4)]"
          :style="{ color: tiers[mod.tier].text, borderColor: tiers[mod.tier].color }"
          :title="`${tiers[mod.tier].label} tier`"
        >
          <span class="sr-only">{{ tiers[mod.tier].label }} tier, </span>{{ mod.version ?? '—' }}
        </span>
        <div class="flex min-w-0 flex-auto flex-col gap-1">
          <div class="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <a :href="artifactPath(mod.slug)" class="font-display text-[19px] font-semibold text-den-heading hover:text-den-gold-hover">{{ mod.name }}</a>
            <span v-if="mod.game" class="font-mono text-[11px] uppercase tracking-[.08em] text-den-muted">{{ games[mod.game] }}</span>
          </div>
          <span class="text-[15px] leading-[1.45] text-den-text-2">{{ mod.tagline }}</span>
        </div>
        <a
          v-if="mod.links.source"
          v-bind="linkAttrs(mod.links.source)"
          :aria-label="`View code for ${mod.name}`"
          class="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-den-gold/30 hover:border-den-gold/60"
        >
          <DenIcon name="code" />
        </a>
      </li>
    </ul>
  </section>
</template>
