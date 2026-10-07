<script setup lang="ts">
import { computed } from 'vue'
import { artifactPath, games, relatedTo, rooms, tiers, type Artifact } from '../data/artifacts'
import { linkAttrs } from '../lib/links'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import DenIcon from '../components/DenIcon.vue'
import InlineCode from '../components/InlineCode.vue'

const props = defineProps<{ artifact: Artifact }>()

const tier = computed(() => tiers[props.artifact.tier])
const room = computed(() => rooms[props.artifact.room])
const detail = computed(() => props.artifact.detail ?? {})
const related = computed(() => relatedTo(props.artifact))

/** Long CamelCase names may wrap at their capitals on narrow screens, never mid-word */
const nameParts = computed(() => props.artifact.name.split(/(?<=[a-z])(?=[A-Z])/))

/** First link is the gold pill, the rest are outlines */
const ctas = computed(() => {
  const { open, source, nexus, docs } = props.artifact.links
  const list: { label: string; href: string; icon?: 'code' | 'arrow' }[] = []
  if (open) list.push({ label: 'Open it', href: open, icon: 'arrow' })
  if (source) list.push({ label: 'View code', href: source, icon: 'code' })
  if (nexus) list.push({ label: 'Get it on Nexus', href: nexus })
  if (docs) list.push({ label: 'Read the docs', href: docs })
  return list
})

const scroll = computed(() => {
  const a = props.artifact
  const rows: { term: string; value: string; tone?: string }[] = []
  if (a.game) rows.push({ term: 'Game', value: games[a.game] })
  if (a.version) rows.push({ term: 'Version', value: a.version })
  rows.push({ term: 'Tier', value: tier.value.label, tone: tier.value.text })
  if (detail.value.requires) rows.push({ term: 'Requires', value: detail.value.requires })
  if (detail.value.madeWith) rows.push({ term: 'Made with', value: detail.value.madeWith })
  return rows
})

/** Without written steps, point source-only artifacts at their README */
const readmeFallback = computed(() => !detail.value.install && !props.artifact.links.open && props.artifact.links.source)
</script>

<template>
  <div class="min-h-screen w-full overflow-x-hidden">
    <SiteHeader :room="artifact.room" />

    <main>
      <!-- Hero -->
      <section class="relative overflow-hidden border-b border-den-gold/18">
        <div
          aria-hidden="true"
          class="absolute -top-60 -right-50 size-[720px] rounded-full bg-[radial-gradient(circle,rgb(230_189_108/.16)_0%,rgb(157_123_234/.07)_45%,transparent_70%)]"
        />
        <div class="relative mx-auto flex max-w-[1240px] flex-col gap-7 px-6 pt-12 pb-16 md:pb-22">
          <nav aria-label="Breadcrumb" class="font-mono text-xs tracking-[.1em] text-den-muted">
            <ol class="m-0 flex list-none flex-wrap gap-2 p-0">
              <li><a href="/" class="text-den-muted hover:text-den-gold-hover">The Den</a></li>
              <li aria-hidden="true">/</li>
              <li><a :href="`/#${room.anchor}`" class="text-den-muted hover:text-den-gold-hover">{{ room.title }}</a></li>
              <li aria-hidden="true">/</li>
              <li><span aria-current="page" class="text-den-heading">{{ artifact.name }}</span></li>
            </ol>
          </nav>

          <div class="flex flex-wrap items-center gap-10">
            <!-- tier seal -->
            <div
              class="flex size-[148px] shrink-0 flex-col items-center justify-center gap-1 rounded-full border-2 bg-den-band px-3 text-center"
              :style="{
                borderColor: tier.color,
                boxShadow: `${tier.glow ? `0 0 40px ${tier.color}59, ` : ''}inset 0 0 24px rgb(0 0 0 / .5)`,
              }"
            >
              <span class="font-mono text-[11px] uppercase tracking-[.18em]" :style="{ color: tier.text }">{{ tier.label }}</span>
              <span class="font-display text-[26px] font-bold text-den-heading">{{ artifact.version ?? '—' }}</span>
              <span class="font-mono text-[10px] uppercase leading-tight tracking-[.14em] text-den-muted">
                {{ artifact.game ? games[artifact.game] : room.title }}
              </span>
            </div>

            <div class="flex min-w-0 flex-[1_1_520px] flex-col gap-4">
              <h1 class="m-0 font-display text-[clamp(34px,5.4vw,72px)] leading-none font-bold break-words text-den-heading">
                <template v-for="part in nameParts" :key="part">{{ part }}<wbr /></template>
              </h1>
              <p class="den-voice m-0 max-w-[40ch] text-[clamp(22px,2.6vw,28px)] leading-[1.3]">{{ artifact.voice ?? artifact.tagline }}</p>
              <div v-if="ctas.length" class="flex flex-wrap gap-3 pt-2">
                <a
                  v-for="(cta, i) in ctas"
                  :key="cta.label"
                  v-bind="linkAttrs(cta.href)"
                  class="min-h-[50px]"
                  :class="i === 0 ? 'den-btn px-6' : 'den-ghost px-[22px]'"
                >
                  <DenIcon v-if="i === 0 && cta.icon" :name="cta.icon" />
                  {{ cta.label }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto flex max-w-[1240px] flex-wrap gap-14 px-6 pt-16 pb-10 md:pt-24">
        <div class="flex min-w-0 flex-[3_1_560px] flex-col gap-10">
          <!-- before → after -->
          <div
            v-if="detail.stat"
            class="flex flex-wrap items-center gap-x-10 gap-y-6 rounded-3xl border border-den-gold/35 bg-den-band p-8 md:p-10"
          >
            <div class="flex flex-col gap-1.5">
              <span class="font-mono text-[11px] tracking-[.16em] text-den-muted">BEFORE</span>
              <span class="font-display text-[clamp(52px,8vw,72px)] leading-none font-bold text-[#8f84a6] line-through decoration-den-amber/70">
                {{ detail.stat.before }}
              </span>
            </div>
            <svg width="64" height="24" viewBox="0 0 64 24" fill="none" stroke="#e6bd6c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M2 12h58M50 3l10 9-10 9" />
            </svg>
            <div class="flex flex-col gap-1.5">
              <span class="font-mono text-[11px] tracking-[.16em]" :style="{ color: tiers.gilded.text }">NOW</span>
              <span class="font-display text-[clamp(52px,8vw,72px)] leading-none font-bold text-den-heading [text-shadow:0_0_30px_rgb(230_189_108/.4)]">
                {{ detail.stat.after }}
              </span>
            </div>
            <p class="m-0 flex-[1_1_220px] text-base leading-[1.55] text-den-text-2">{{ detail.stat.caption }}</p>
          </div>

          <div v-if="artifact.description" class="flex flex-col gap-3.5">
            <h2 class="m-0 font-display text-[34px] font-bold text-den-heading">About</h2>
            <p class="m-0 max-w-[62ch] text-[17px] leading-[1.7] text-den-text-2">{{ artifact.description }}</p>
          </div>

          <!-- how it works -->
          <div v-if="detail.steps" class="flex flex-col gap-[18px]">
            <h2 class="m-0 font-display text-[34px] font-bold text-den-heading">{{ detail.steps.title }}</h2>
            <p class="m-0 max-w-[62ch] text-[17px] leading-[1.7] text-den-text-2">{{ detail.steps.intro }}</p>
            <ol class="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-3.5 p-0">
              <li
                v-for="step in detail.steps.items"
                :key="step.label"
                class="flex flex-col gap-2 rounded-[18px] border border-den-violet/25 bg-den-card p-[22px]"
              >
                <span class="font-mono text-xs text-den-foxfire">{{ step.label }}</span>
                <span class="font-display text-[19px] font-semibold text-den-heading">{{ step.title }}</span>
                <span class="text-[15px] leading-normal text-den-muted">{{ step.text }}</span>
              </li>
            </ol>
          </div>

          <!-- feature tiles -->
          <div v-if="detail.features" class="flex flex-col gap-[18px]">
            <h2 class="m-0 font-display text-[34px] font-bold text-den-heading">What's inside</h2>
            <ul class="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-3.5 p-0">
              <li
                v-for="feature in detail.features"
                :key="feature.name"
                class="flex flex-col gap-1.5 rounded-2xl border border-den-violet/22 bg-den-violet/8 p-[18px]"
              >
                <span class="font-display text-base font-semibold text-den-heading">{{ feature.name }}</span>
                <span class="text-sm leading-[1.45] text-den-muted">{{ feature.text }}</span>
              </li>
            </ul>
          </div>

          <!-- install -->
          <div v-if="detail.install" class="flex flex-col gap-3.5">
            <h2 class="m-0 font-display text-[34px] font-bold text-den-heading">Install</h2>
            <p v-if="detail.installNote" class="m-0 max-w-[62ch] text-[17px] leading-[1.7] text-den-text-2">
              <InlineCode :text="detail.installNote" />
            </p>
            <ol class="m-0 flex max-w-[62ch] list-none flex-col gap-3 p-0 [counter-reset:step]">
              <li
                v-for="step in detail.install"
                :key="step"
                class="relative pl-11 text-[17px] leading-[1.6] text-den-text-2 [counter-increment:step] before:absolute before:top-0 before:left-0 before:flex before:size-7 before:items-center before:justify-center before:rounded-full before:border before:border-den-gold/45 before:font-mono before:text-xs before:text-den-gold before:content-[counter(step)]"
              >
                <InlineCode :text="step" />
              </li>
            </ol>
            <p v-if="artifact.links.source" class="m-0 text-[15px] text-den-muted">
              Troubleshooting and the full changelog live in the
              <a v-bind="linkAttrs(`${artifact.links.source}#readme`)" class="font-semibold">README</a>.
            </p>
          </div>
          <div v-else-if="readmeFallback" class="flex flex-col gap-3.5">
            <h2 class="m-0 font-display text-[34px] font-bold text-den-heading">Install</h2>
            <p class="m-0 max-w-[62ch] text-[17px] leading-[1.7] text-den-text-2">
              Install steps live with the code.
              <a v-bind="linkAttrs(`${artifact.links.source}#readme`)" class="font-semibold">Read the README</a>.
            </p>
          </div>
        </div>

        <aside class="flex min-w-0 flex-[2_1_320px] flex-col gap-5" aria-label="About this artifact">
          <div class="flex flex-col gap-[18px] rounded-[22px] border border-den-gold/20 bg-den-card p-7">
            <span class="font-mono text-[11px] tracking-[.18em] text-den-violet">THE SCROLL</span>
            <dl class="m-0 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-[15px]">
              <template v-for="row in scroll" :key="row.term">
                <dt class="text-den-muted">{{ row.term }}</dt>
                <dd class="m-0" :style="{ color: row.tone ?? 'var(--color-den-text)' }">{{ row.value }}</dd>
              </template>
            </dl>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="tag in artifact.tags" :key="tag" class="den-tag">{{ tag }}</span>
            </div>
          </div>

          <div
            v-for="trophy in detail.mantel"
            :key="trophy.title"
            class="flex flex-col gap-2.5 rounded-[22px] border border-den-foxfire/30 bg-den-foxfire/5 p-7"
          >
            <span class="font-mono text-[11px] tracking-[.18em] text-den-foxfire">ON THE MANTEL</span>
            <span class="font-display text-[30px] font-bold text-den-heading">{{ trophy.title }}</span>
            <span class="text-[15px] leading-normal text-den-text-2">{{ trophy.text }}</span>
          </div>
        </aside>
      </section>

      <!-- Nearby on the shelf -->
      <section v-if="related.length" class="mx-auto flex max-w-[1240px] flex-col gap-7 px-6 pt-18 pb-28">
        <div class="flex flex-col gap-2">
          <span class="den-eyebrow text-den-violet">Sits well with</span>
          <h2 class="m-0 font-display text-[34px] font-bold text-den-heading">Nearby on the shelf</h2>
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-[18px]">
          <a
            v-for="other in related"
            :key="other.slug"
            :href="artifactPath(other.slug)"
            class="den-card flex flex-col gap-2.5 rounded-[20px] border border-den-gold/16 bg-den-card p-6 text-den-text hover:text-den-text"
          >
            <span class="font-mono text-[11px] uppercase" :style="{ color: tiers[other.tier].text }">
              {{ tiers[other.tier].label }}<template v-if="other.version"> · {{ other.version }}</template>
            </span>
            <span class="font-display text-[21px] font-semibold text-den-heading">{{ other.name }}</span>
            <span class="text-[15px] leading-normal text-den-text-2">{{ other.tagline }}</span>
          </a>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
