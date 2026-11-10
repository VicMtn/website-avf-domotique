<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; updated?: string }>();
</script>

<template>
  <header class="max-w-2xl">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h1 class="mt-4 text-4xl sm:text-5xl">{{ title }}</h1>
    <p v-if="updated" class="mt-4 text-sm text-muted">Dernière mise à jour : {{ updated }}</p>
  </header>
</template>
