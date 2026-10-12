<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { artifactPath, rooms, type Artifact } from '../data/artifacts'
import type { HearthSlide } from '../data/hearth'
import { linkAttrs } from '../lib/links'
import DenIcon from './DenIcon.vue'

const props = defineProps<{ slides: HearthSlide[] }>()

/** How long each slide stays up before the next one */
const DWELL_MS = 8000

const index = ref(0)
/** Off for good once someone picks a slide, pauses, or prefers less motion */
const playing = ref(false)
/** Hover or keyboard focus holds the current slide without stopping play */
const held = ref(false)

let timer: number | undefined

function show(i: number) {
  index.value = (i + props.slides.length) % props.slides.length
}

/** Any hands-on choice stops the rotation, so it never moves under someone */
function pick(i: number) {
  playing.value = false
  show(i)
}

function togglePlay() {
  playing.value = !playing.value
}

function tick() {
  if (playing.value && !held.value && !document.hidden) show(index.value + 1)
}

onMounted(() => {
  if (props.slides.length < 2) return
  playing.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  timer = window.setInterval(tick, DWELL_MS)
})

onBeforeUnmount(() => window.clearInterval(timer))

/** Only a real mouse holds the slide; a tap fires enter with no leave and would stick */
function onPointer(event: PointerEvent, over: boolean) {
  if (event.pointerType === 'mouse') held.value = over
}

function onFocusOut(event: FocusEvent) {
  const section = event.currentTarget as HTMLElement
  if (!section.contains(event.relatedTarget as Node | null)) held.value = false
}

/** The flagship keeps its own eyebrow; everything else is a guest at the hearth */
const eyebrow = (artifact: Artifact) =>
  artifact.room === 'flagship' ? rooms.flagship.eyebrow : 'The hearth · featured'

/** Break points inside CamelCase names, so "KitsunePaintUnlocked" can wrap on a narrow column */
const nameParts = (name: string) => name.split(/(?<=[a-z])(?=[A-Z])/)

const current = computed(() => props.slides[index.value])
</script>

<template>
  <section
    :id="rooms.flagship.anchor"
    aria-roledescription="carousel"
    aria-label="Featured in the den"
    class="mx-auto max-w-[1240px] scroll-mt-4 px-6 pt-20 pb-10 md:pt-28"
    @pointerenter="onPointer($event, true)"
    @pointerleave="onPointer($event, false)"
    @focusin="held = true"
    @focusout="onFocusOut"
  >
    <!-- gold → violet → gold border -->
    <div class="rounded-[28px] bg-linear-135 from-den-gold/80 via-den-violet/50 to-den-gold/60 p-0.5">
      <div class="flex flex-col gap-8 rounded-[26px] bg-den-band p-7 md:p-14">
        <!-- Every slide sits in the same grid cell, so the panel is as tall as
             the tallest one and never jumps when they change -->
        <div class="grid">
          <div
            v-for="(slide, i) in slides"
            :key="slide.artifact.slug"
            role="group"
            aria-roledescription="slide"
            :aria-label="`${i + 1} of ${slides.length}: ${slide.artifact.name}`"
            :inert="i !== index"
            class="flex flex-wrap items-center gap-12 transition-opacity duration-500 ease-out [grid-area:1/1]"
            :class="i === index ? 'opacity-100' : 'invisible opacity-0'"
          >
            <div class="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
              <span class="den-eyebrow text-den-gold">{{ eyebrow(slide.artifact) }}</span>
              <h2 class="m-0 font-display text-[clamp(36px,6vw,52px)] font-bold leading-[1.05] text-den-heading">
                <a :href="artifactPath(slide.artifact.slug)" class="text-den-heading hover:text-den-gold-hover"
                  ><template v-for="(part, j) in nameParts(slide.artifact.name)" :key="j"><wbr v-if="j" />{{ part }}</template></a
                >
              </h2>
              <p class="den-voice m-0 text-[26px] leading-[1.3]">{{ slide.artifact.voice ?? slide.artifact.tagline }}</p>
              <p class="m-0 max-w-[56ch] text-[17px] leading-[1.65] text-den-text-2">{{ slide.artifact.description }}</p>
              <div class="flex flex-wrap gap-3 pt-2">
                <a v-if="slide.artifact.links.open" v-bind="linkAttrs(slide.artifact.links.open)" class="den-btn">
                  Take a look
                  <DenIcon name="arrow" />
                </a>
                <a v-else-if="slide.artifact.links.source" v-bind="linkAttrs(slide.artifact.links.source)" class="den-btn">
                  <DenIcon name="github" />
                  View on GitHub
                </a>
                <a v-if="slide.artifact.links.docs" v-bind="linkAttrs(slide.artifact.links.docs)" class="den-ghost">Read the docs</a>
                <a v-else :href="artifactPath(slide.artifact.slug)" class="den-ghost">See the details</a>
              </div>
            </div>

            <div
              class="min-w-0 flex-[1_1_380px] overflow-hidden rounded-2xl border border-den-violet/30 shadow-[0_24px_70px_rgb(157_123_234/.22)]"
            >
              <img
                :src="slide.image"
                :alt="slide.alt"
                width="1200"
                height="675"
                :loading="i === 0 ? 'eager' : 'lazy'"
                class="block aspect-video h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div v-if="slides.length > 1" class="flex flex-wrap items-center justify-between gap-4 border-t border-den-violet/20 pt-6">
          <div class="flex items-center gap-1">
            <button
              v-for="(slide, i) in slides"
              :key="slide.artifact.slug"
              type="button"
              :aria-label="`Show ${slide.artifact.name}`"
              :aria-current="i === index ? 'true' : undefined"
              class="group grid size-8 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0"
              @click="pick(i)"
            >
              <span
                class="block h-2 rounded-full transition-[width,background-color] duration-300"
                :class="i === index ? 'w-6 bg-den-gold' : 'w-2 bg-den-violet/45 group-hover:bg-den-lavender'"
              />
            </button>
          </div>

          <div class="flex items-center gap-2.5">
            <span class="sr-only" aria-live="polite">{{ playing ? '' : `Showing ${current.artifact.name}` }}</span>
            <button
              type="button"
              :aria-label="playing ? 'Pause the rotation' : 'Play the rotation'"
              class="den-ghost min-h-11 cursor-pointer bg-transparent px-3.5"
              @click="togglePlay"
            >
              <DenIcon :name="playing ? 'pause' : 'play'" :size="16" />
            </button>
            <button type="button" aria-label="Previous" class="den-ghost min-h-11 cursor-pointer bg-transparent px-3.5" @click="pick(index - 1)">
              <DenIcon name="prev" :size="16" />
            </button>
            <button type="button" aria-label="Next" class="den-ghost min-h-11 cursor-pointer bg-transparent px-3.5" @click="pick(index + 1)">
              <DenIcon name="next" :size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
