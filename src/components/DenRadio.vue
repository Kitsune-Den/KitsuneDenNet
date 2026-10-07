<script setup lang="ts">
import { computed, ref } from 'vue'
import { broadcasts } from '../data/den'
import radioCover from '../assets/den-radio.jpg'
import DenIcon from './DenIcon.vue'

const ticks = [88, 92, 96, 100, 104, 108]

const index = ref(0)
const broadcast = computed(() => broadcasts[index.value])

/** Spread the stations across the dial, 14% → 80% */
const needle = computed(() => {
  const step = broadcasts.length > 1 ? 66 / (broadcasts.length - 1) : 0
  return `${14 + index.value * step}%`
})

function next() {
  index.value = (index.value + 1) % broadcasts.length
}
</script>

<template>
  <section id="radio" aria-label="Den Radio: latest broadcasts" class="scroll-mt-4 border-y border-den-gold/18 bg-den-band">
    <div class="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-9 gap-y-6 px-6 py-7">
      <div class="flex items-center gap-4">
        <img :src="radioCover" alt="Kitsune Den Radio cover art" width="72" height="72" class="size-[72px] rounded-xl border border-den-gold/45 object-cover" />
        <div class="flex flex-col gap-1">
          <span class="font-mono text-[11px] uppercase tracking-[.18em] text-den-amber">● On air</span>
          <span class="font-display text-lg font-semibold text-den-heading">Den Radio</span>
        </div>
      </div>

      <div class="flex min-w-0 flex-[1_1_420px] flex-col gap-2.5">
        <!-- Tuning dial -->
        <div aria-hidden="true" class="relative h-[22px] overflow-hidden rounded-md border border-den-amber/35 bg-linear-to-b from-[#2a1f12] to-[#3a2a15]">
          <div class="absolute inset-0 flex items-end justify-between px-2.5 pb-[3px] font-mono text-[9px] text-[rgb(242_200_140/.7)]">
            <span v-for="tick in ticks" :key="tick">{{ tick }}</span>
          </div>
          <div
            class="absolute inset-y-0.5 w-0.5 bg-den-needle shadow-[0_0_8px_var(--color-den-needle)] transition-[left] duration-400 ease-out"
            :style="{ left: needle }"
          />
        </div>
        <p aria-live="polite" class="m-0 text-[17px] leading-[1.45] text-den-text">
          <span class="mr-2.5 font-mono text-xs uppercase text-den-muted">{{ broadcast.label }}</span><span class="sr-only">: </span>{{ broadcast.text }}
        </p>
      </div>

      <button
        type="button"
        class="den-ghost min-h-11 cursor-pointer border-den-amber/50 bg-transparent px-[18px] text-sm text-den-gold-hover"
        @click="next"
      >
        <DenIcon name="next" :size="16" />
        Next broadcast
      </button>
    </div>
  </section>
</template>
