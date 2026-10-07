<script setup lang="ts">
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
</script>

<template>
  <div class="flex min-h-screen w-full flex-col overflow-x-hidden">
    <SiteHeader />
    <main class="mx-auto flex max-w-[1240px] flex-auto flex-col items-center justify-center gap-5 px-6 py-28 text-center">
      <span class="den-eyebrow text-den-violet">Off the map</span>
      <h1 class="m-0 font-display text-[clamp(36px,6vw,56px)] font-bold text-den-heading">This scroll isn't on the shelf</h1>
      <p class="den-voice m-0 max-w-[36ch] text-2xl">Maybe it was moved to another room, or the foxes are still writing it.</p>
      <a href="/" class="den-btn mt-3">Back to the den</a>
    </main>
    <SiteFooter />
  </div>
</template>
