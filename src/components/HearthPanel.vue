<script setup lang="ts">
import { artifactPath, rooms, type Artifact } from '../data/artifacts'
import { linkAttrs } from '../lib/links'
import DenIcon from './DenIcon.vue'

defineProps<{ artifact: Artifact }>()
</script>

<template>
  <section :id="rooms.flagship.anchor" class="mx-auto max-w-[1240px] scroll-mt-4 px-6 pt-20 pb-10 md:pt-28">
    <!-- gold → violet → gold border -->
    <div class="rounded-[28px] bg-linear-135 from-den-gold/80 via-den-violet/50 to-den-gold/60 p-0.5">
      <div class="flex flex-wrap items-start gap-12 rounded-[26px] bg-den-band p-7 md:p-14">
        <div class="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
          <span class="den-eyebrow text-den-gold">{{ rooms.flagship.eyebrow }}</span>
          <h2 class="m-0 font-display text-[clamp(36px,6vw,52px)] font-bold leading-[1.05] text-den-heading">
            <a :href="artifactPath(artifact.slug)" class="text-den-heading hover:text-den-gold-hover">{{ artifact.name }}</a>
          </h2>
          <p class="den-voice m-0 text-[26px] leading-[1.3]">{{ artifact.voice ?? artifact.tagline }}</p>
          <p class="m-0 max-w-[56ch] text-[17px] leading-[1.65] text-den-text-2">{{ artifact.description }}</p>
          <div class="flex flex-wrap gap-3 pt-2">
            <a v-if="artifact.links.source" v-bind="linkAttrs(artifact.links.source)" class="den-btn">
              <DenIcon name="github" />
              View on GitHub
            </a>
            <a v-if="artifact.links.docs" v-bind="linkAttrs(artifact.links.docs)" class="den-ghost">Read the docs</a>
            <a v-else :href="artifactPath(artifact.slug)" class="den-ghost">See the details</a>
          </div>
        </div>

        <ul class="m-0 grid min-w-0 flex-[1_1_340px] list-none grid-cols-1 gap-3.5 p-0 min-[420px]:grid-cols-2">
          <li
            v-for="feature in artifact.detail?.features"
            :key="feature.name"
            class="flex flex-col gap-1.5 rounded-2xl border border-den-violet/22 bg-den-violet/8 p-[18px]"
          >
            <span class="font-display text-base font-semibold text-den-heading">{{ feature.name }}</span>
            <span class="text-sm leading-[1.45] text-den-muted">{{ feature.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
