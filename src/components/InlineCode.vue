<script setup lang="ts">
import { computed } from 'vue'

/** Renders `backtick` spans in plain data strings as <code>, nothing else */
const props = defineProps<{ text: string }>()

const parts = computed(() => props.text.split('`').map((value, i) => ({ value, code: i % 2 === 1 })))
</script>

<!-- kept on one line: any whitespace between the nodes would show up before punctuation -->
<template><template v-for="(part, i) in parts" :key="i"><code v-if="part.code" class="rounded bg-den-violet/14 px-1.5 py-0.5 font-mono text-[.85em] text-den-lavender">{{ part.value }}</code><template v-else>{{ part.value }}</template></template></template>
