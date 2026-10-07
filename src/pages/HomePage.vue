<script setup lang="ts">
import { artifactPath, artifacts, inRoom, rooms, tiers, type Tier } from '../data/artifacts'
import { links, offerings, trophies } from '../data/den'
import { linkAttrs } from '../lib/links'
import heroImg from '../assets/den-hero.jpg'
import discordBannerImg from '../assets/discord-banner.webp'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import RoomHeading from '../components/RoomHeading.vue'
import DenRadio from '../components/DenRadio.vue'
import HearthPanel from '../components/HearthPanel.vue'
import LanternCard from '../components/LanternCard.vue'
import ScrollShelf from '../components/ScrollShelf.vue'
import DenIcon from '../components/DenIcon.vue'

const flagship = inRoom('flagship')[0]
const apps = inRoom('apps')
const tools = inRoom('tools')
const curios = inRoom('curios')
const voices = inRoom('voices')

const legend = Object.entries(tiers) as [Tier, (typeof tiers)[Tier]][]

const trophyTones = {
  gold: { box: 'border-den-gold/35 bg-den-gold/5', value: 'text-den-gold' },
  lavender: { box: 'border-den-violet/30 bg-den-violet/6', value: 'text-den-lavender' },
  foxfire: { box: 'border-den-foxfire/30 bg-den-foxfire/5', value: 'text-den-foxfire' },
}

const offeringStyles = {
  plain: { box: 'border border-den-gold/20 bg-den-card', name: 'text-den-heading', cta: 'den-ghost' },
  featured: {
    box: 'border border-den-gold/60 bg-linear-to-b from-den-gold/14 to-den-gold/3 shadow-[0_20px_60px_rgb(230_189_108/.12)]',
    name: 'text-den-gold',
    cta: 'den-btn',
  },
  dashed: {
    box: 'border border-dashed border-den-lavender/40 bg-den-card',
    name: 'text-den-heading',
    cta: 'den-ghost border-den-lavender/45 text-den-lavender hover:text-den-lavender',
  },
}
</script>

<template>
  <div class="min-h-screen w-full overflow-x-hidden">
    <SiteHeader home />

    <main>
      <!-- Hero -->
      <section id="top" class="relative overflow-hidden">
        <div
          aria-hidden="true"
          class="absolute -top-40 -right-30 size-[760px] rounded-full bg-[radial-gradient(circle,rgb(205_186_245/.20)_0%,rgb(157_123_234/.08)_40%,transparent_68%)]"
        />
        <div class="relative mx-auto flex max-w-[1240px] flex-wrap items-center gap-14 px-6 pt-16 pb-20 md:pt-22 md:pb-24">
          <div class="flex min-w-0 flex-[1_1_460px] flex-col gap-7">
            <div class="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[.14em] text-den-muted">
              <span class="inline-flex items-center gap-2 rounded-full border border-den-foxfire/35 px-3 py-1.5 text-den-foxfire">
                <span class="size-[7px] rounded-full bg-den-foxfire shadow-[0_0_10px_var(--color-den-foxfire)]" aria-hidden="true" />
                {{ artifacts.length }} artifacts in the registry
              </span>
              <span>Built by the Skulk</span>
            </div>
            <h1 class="m-0 font-display text-[clamp(56px,8vw,104px)] leading-[.95] font-bold tracking-[.02em] text-den-heading [text-shadow:0_2px_30px_rgb(230_189_108/.25)]">
              Kitsune<br />Den
            </h1>
            <p class="den-voice m-0 max-w-[34ch] text-[clamp(24px,3vw,30px)] leading-tight">
              A lantern-lit den of game tools, mods and strange little apps — kept by Ada and the Skulk.
            </p>
            <div class="flex flex-wrap gap-3.5">
              <a :href="`#${rooms.apps.anchor}`" class="den-btn min-h-[52px] px-[26px] text-base">
                Wander the den
                <DenIcon name="arrow" />
              </a>
              <a :href="`#${rooms.flagship.anchor}`" class="den-ghost min-h-[52px] px-6 text-base">See the flagship</a>
            </div>
          </div>

          <div class="flex min-w-0 flex-[1_1_420px] justify-center">
            <div
              class="relative aspect-[1/1.04] w-full max-w-[520px] overflow-hidden rounded-[260px_260px_28px_28px] border border-den-gold/50 shadow-[0_0_0_10px_rgb(17_12_29/.9),0_0_0_11px_rgb(230_189_108/.25),0_40px_120px_rgb(157_123_234/.35)]"
            >
              <img
                :src="heroImg"
                alt="A white nine-tailed fox in headphones lounging beside a vintage radio, a full moon and torii gate visible through a round window"
                class="block size-full object-cover object-[40%_50%]"
              />
            </div>
          </div>
        </div>
      </section>

      <DenRadio />

      <HearthPanel :artifact="flagship" />

      <!-- Tier legend -->
      <section aria-label="Registry tiers" class="mx-auto max-w-[1240px] px-6 pt-6">
        <div class="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-den-muted">
          <span class="font-mono text-[11px] uppercase tracking-[.18em]">How things are marked</span>
          <span v-for="[id, tier] in legend" :key="id" class="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              class="size-3 rounded-full"
              :style="{ background: tier.color, boxShadow: tier.glow ? `0 0 10px ${tier.color}b3` : 'none' }"
            />
            <b :style="{ color: tier.text }">{{ tier.label }}</b> {{ tier.blurb }}
          </span>
        </div>
      </section>

      <!-- Room I · The Lanterns -->
      <section :id="rooms.apps.anchor" class="mx-auto max-w-[1240px] scroll-mt-4 px-6 pt-20 pb-10 md:pt-24">
        <div class="mb-9">
          <RoomHeading :eyebrow="rooms.apps.eyebrow" :title="rooms.apps.title" :voice="rooms.apps.voice" />
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-5">
          <LanternCard v-for="app in apps" :key="app.slug" :artifact="app" />
        </div>
      </section>

      <!-- On the mantel -->
      <section aria-labelledby="mantel-heading" class="mt-14 border-y border-den-gold/18 bg-den-band py-20">
        <div class="mx-auto flex max-w-[1240px] flex-col gap-10 px-6">
          <div class="flex flex-col gap-2.5">
            <span class="den-eyebrow text-den-violet">On the mantel</span>
            <h2 id="mantel-heading" class="m-0 font-display text-[clamp(30px,5vw,40px)] font-bold leading-tight text-den-heading">
              The community said it was impossible.
            </h2>
          </div>
          <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
            <div
              v-for="trophy in trophies"
              :key="trophy.value"
              class="flex flex-col gap-2.5 rounded-[20px] border p-7"
              :class="trophyTones[trophy.tone].box"
            >
              <span class="font-display text-[44px] leading-none font-bold" :class="trophyTones[trophy.tone].value">{{ trophy.value }}</span>
              <span class="text-[15px] leading-normal text-den-text-2">{{ trophy.text }}</span>
            </div>
          </div>
        </div>
      </section>

      <ScrollShelf />

      <!-- Room III · The Toolchest + Room IV · Curios -->
      <section :id="rooms.tools.anchor" class="mx-auto flex max-w-[1240px] scroll-mt-4 flex-wrap gap-12 px-6 pt-20 pb-10 md:pt-24">
        <div class="flex min-w-0 flex-[3_1_560px] flex-col gap-6">
          <RoomHeading :eyebrow="rooms.tools.eyebrow" :title="rooms.tools.title" :size="40" />
          <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-4">
            <a
              v-for="tool in tools"
              :key="tool.slug"
              :href="artifactPath(tool.slug)"
              class="den-card flex flex-col gap-2.5 rounded-[18px] border border-den-gold/16 bg-den-card p-[22px] text-den-text hover:text-den-text"
            >
              <span class="flex items-center justify-between font-mono text-[11px] uppercase" :style="{ color: tiers[tool.tier].text }">
                <span>{{ tiers[tool.tier].label }}</span>
                <span class="text-den-muted">{{ tool.version }}</span>
              </span>
              <span class="font-display text-xl font-semibold text-den-heading">{{ tool.name }}</span>
              <span class="text-[15px] leading-[1.45] text-den-text-2">{{ tool.tagline }}</span>
            </a>
          </div>
        </div>

        <div :id="rooms.curios.anchor" class="flex min-w-0 flex-[2_1_340px] scroll-mt-4 flex-col gap-6">
          <RoomHeading :eyebrow="rooms.curios.eyebrow" :title="rooms.curios.title" :size="40" />
          <div class="flex flex-col gap-3.5">
            <a
              v-for="curio in curios"
              :key="curio.slug"
              :href="artifactPath(curio.slug)"
              class="den-card flex items-center gap-4 rounded-[18px] border border-dashed border-den-lavender/35 bg-den-violet/5 px-[22px] py-5 text-den-text hover:text-den-text"
            >
              <span
                class="size-2.5 shrink-0 rounded-full"
                :style="{ background: tiers[curio.tier].color, boxShadow: `0 0 10px ${tiers[curio.tier].color}` }"
                role="img"
                :aria-label="`${tiers[curio.tier].label} tier`"
              />
              <span class="flex min-w-0 flex-col gap-1">
                <span class="font-display text-[19px] font-semibold text-den-heading">{{ curio.name }}</span>
                <span class="text-[15px] leading-[1.45] text-den-text-2">{{ curio.tagline }}</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <!-- Voices of the Skulk -->
      <section :id="rooms.voices.anchor" class="mx-auto max-w-[1240px] scroll-mt-4 px-6 pt-20 pb-10 md:pt-28">
        <div class="flex flex-wrap overflow-hidden rounded-[28px] border border-den-violet/35 bg-den-card">
          <div class="flex min-w-0 flex-[1_1_380px] flex-col gap-[18px] bg-den-violet/10 p-8 md:p-14">
            <span class="den-eyebrow text-den-foxfire">{{ rooms.voices.eyebrow }}</span>
            <h2 class="m-0 font-display text-[clamp(34px,6vw,44px)] leading-[1.05] font-bold text-den-heading">{{ rooms.voices.title }}</h2>
            <p class="den-voice m-0 text-2xl leading-[1.35]">{{ rooms.voices.voice }}</p>
          </div>
          <div class="flex min-w-0 flex-[2_1_520px] flex-col">
            <a
              v-for="voice in voices"
              :key="voice.slug"
              v-bind="linkAttrs(voice.links.open!)"
              class="den-row flex items-center gap-5 border-b border-den-violet/20 px-6 py-[30px] text-den-text last:border-b-0 hover:text-den-text md:px-10"
            >
              <span class="flex min-w-0 flex-auto flex-col gap-1.5">
                <span class="font-display text-2xl font-semibold text-den-heading">{{ voice.name }}</span>
                <span class="text-base leading-normal text-den-text-2">{{ voice.tagline }}</span>
              </span>
              <span class="shrink-0 font-mono text-[11px] uppercase tracking-[.14em] text-den-foxfire">{{ voice.action }} →</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Discord -->
      <section aria-label="Discord" class="mx-auto max-w-[1240px] px-6 pt-20 pb-6">
        <a
          v-bind="linkAttrs(links.discord)"
          class="den-card mx-auto block max-w-[600px] overflow-hidden rounded-[22px] border border-den-violet/35 shadow-[0_0_60px_rgb(157_123_234/.18)]"
        >
          <img
            :src="discordBannerImg"
            alt="Join our Discord ~ KitsuneDen @ Good Times. Come say hi, hang out in voice chat, and ask for modding help, tool tips, and community advice"
            width="600"
            height="400"
            loading="lazy"
            class="block h-auto w-full"
          />
        </a>
        <p class="mt-4 text-center text-[15px] text-den-muted">
          Questions about a mod, or something you built with one?
          <a v-bind="linkAttrs(links.discord)" class="font-semibold">Drop into the Den</a>.
        </p>
      </section>

      <!-- The offering bowl -->
      <section id="offerings" class="mx-auto flex max-w-[1240px] scroll-mt-4 flex-col items-center gap-10 px-6 pt-20 pb-28 text-center md:pt-28">
        <div class="flex flex-col items-center gap-3">
          <span class="den-eyebrow text-den-amber">The offering bowl</span>
          <h2 class="m-0 font-display text-[clamp(34px,6vw,48px)] font-bold leading-tight text-den-heading">Keep the lanterns lit</h2>
          <p class="m-0 max-w-[46ch] text-[17px] leading-relaxed text-den-text-2">
            Everything in the den is free to use. If something here saved your server or your Saturday, leave a little something on Ko-fi.
          </p>
        </div>
        <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5 text-left">
          <div
            v-for="offering in offerings"
            :key="offering.name"
            class="flex flex-col gap-3 rounded-[22px] p-8"
            :class="offeringStyles[offering.style].box"
          >
            <h3 class="m-0 font-display text-2xl font-semibold" :class="offeringStyles[offering.style].name">{{ offering.name }}</h3>
            <span class="font-display text-[40px] font-bold text-den-text">
              {{ offering.price }}<span class="font-sans text-base font-medium text-den-muted">{{ offering.per }}</span>
            </span>
            <p class="m-0 text-[15px] leading-normal text-den-text-2">{{ offering.text }}</p>
            <a v-bind="linkAttrs(offering.href)" class="mt-auto" :class="offeringStyles[offering.style].cta">{{ offering.cta }}</a>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
