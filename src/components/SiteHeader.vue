<script setup lang="ts">
import type { Room } from '../data/artifacts'
import { links } from '../data/den'
import { linkAttrs } from '../lib/links'

/**
 * On the home page the nav jumps between rooms; elsewhere it links back to
 * them. `room` lights up the link for the room you're standing in.
 */
const props = defineProps<{
  home?: boolean
  room?: Room
}>()

const base = props.home ? '' : '/'

const navLinks: { label: string; anchor: string; rooms: Room[] }[] = [
  { label: 'Apps', anchor: 'lanterns', rooms: ['apps', 'flagship'] },
  { label: 'Mods', anchor: 'shelf', rooms: ['mods'] },
  { label: 'Tools', anchor: 'toolchest', rooms: ['tools', 'curios'] },
  { label: 'The Skulk', anchor: 'voices', rooms: ['voices'] },
  { label: 'Den Radio', anchor: 'radio', rooms: [] },
]
</script>

<template>
  <header class="relative z-[2] border-b border-den-gold/18 bg-den-ground/82">
    <div class="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-[18px]">
      <a :href="home ? '#top' : '/'" class="flex items-center gap-3 text-den-text hover:text-den-text" aria-label="KitsuneDen home">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#e6bd6c" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 4 L12 13 L22 13 L30 4 L28 18 L17 30 L6 18 Z" />
          <path d="M12 19 L15 21 M22 19 L19 21" />
          <path d="M15.5 25 L17 26.5 L18.5 25" />
        </svg>
        <span class="font-display text-[22px] font-bold tracking-[.06em]">KitsuneDen</span>
      </a>

      <nav aria-label="Rooms of the den" class="flex flex-wrap items-center gap-x-[22px] gap-y-1 text-sm font-semibold tracking-[.02em]">
        <a
          v-for="link in navLinks"
          :key="link.anchor"
          :href="`${base}#${link.anchor}`"
          class="inline-flex min-h-11 items-center hover:text-den-gold-hover"
          :class="room && link.rooms.includes(room) ? 'text-den-heading' : 'text-den-lavender'"
        >
          {{ link.label }}
        </a>
        <a v-bind="linkAttrs(links.kofi)" class="den-btn min-h-11 px-[18px] font-semibold">Leave an offering</a>
      </nav>
    </div>
  </header>
</template>
