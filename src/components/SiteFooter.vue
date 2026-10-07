<script setup lang="ts">
import { links } from '../data/den'
import { linkAttrs } from '../lib/links'

const elsewhere = [
  { label: 'GitHub', href: links.github },
  { label: 'The Human Pattern Lab', href: links.lab },
  { label: 'skulk.ai', href: links.skulk },
  { label: 'Ko-fi', href: links.kofi },
  { label: 'Discord', href: links.discord },
  { label: 'Privacy', href: links.privacy },
]
</script>

<template>
  <footer class="border-t border-den-gold/18 bg-den-footer">
    <div class="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6 px-6 py-12">
      <div class="flex flex-col gap-1.5">
        <span class="font-display text-xl font-bold text-den-heading">KitsuneDen</span>
        <span class="den-voice text-lg text-den-muted">Built by the Skulk, under a full moon.</span>
      </div>
      <nav aria-label="Elsewhere" class="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        <a v-for="link in elsewhere" :key="link.label" v-bind="linkAttrs(link.href)" class="inline-flex min-h-11 items-center">
          {{ link.label }}
        </a>
      </nav>
    </div>
  </footer>
</template>
