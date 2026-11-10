<script setup lang="ts">
/** En-tête de section : surtitre + titre à gauche, chapeau à droite (empilés sur mobile). */
defineProps<{ eyebrow: string; title: string; lead?: string; id?: string }>();
</script>

<template>
  <div class="mb-12 grid items-end gap-6 lg:mb-16 lg:grid-cols-2 lg:gap-16">
    <div>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2 :id="id" class="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">{{ title }}</h2>
    </div>
    <p v-if="lead" class="lead max-w-xl">{{ lead }}</p>
  </div>
</template>
