<script setup lang="ts">
import { site } from "@/content/site";
</script>

<template>
  <RouterLink
    to="/"
    class="inline-flex items-center gap-2.5 text-[15px] font-semibold text-base-content"
    :aria-label="`${site.name}, accueil`"
  >
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 16 16 6.5 27 16v10.5H5z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" />
      <circle cx="16" cy="19.5" r="2.6" class="fill-glow" />
    </svg>
    <span>AVF <span class="font-normal text-muted">Domotique</span></span>
  </RouterLink>
</template>
