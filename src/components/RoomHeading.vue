<script setup lang="ts">
/** Eyebrow + Cinzel heading + optional voice line, shared by every room */
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    voice?: string
    /** Heading size in px */
    size?: number
    /** Eyebrow colour class */
    tone?: string
  }>(),
  { size: 44, tone: 'text-den-violet' },
)
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <span class="den-eyebrow" :class="tone">{{ eyebrow }}</span>
    <h2 class="m-0 font-display font-bold leading-[1.05] text-den-heading" :style="{ fontSize: `clamp(32px, 6vw, ${size}px)` }">
      {{ title }}
    </h2>
    <p v-if="voice" class="den-voice m-0 text-[22px] leading-snug">{{ voice }}</p>
  </div>
</template>
