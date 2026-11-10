<script setup lang="ts">
import { useHead } from "@unhead/vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import { site } from "@/content/site";

useHead({
  titleTemplate: (title) => (title ? `${title} · ${site.name}` : `${site.name} · ${site.tagline}`),
  htmlAttrs: { lang: "fr-CH", "data-theme": "avf" },
  meta: [
    { name: "description", content: site.description },
    { property: "og:site_name", content: site.name },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "fr_CH" },
  ],
});
</script>

<template>
  <a
    href="#contenu"
    class="btn btn-primary btn-sm sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
  >
    Aller au contenu
  </a>
  <AppHeader />
  <main id="contenu">
    <RouterView />
  </main>
  <AppFooter />
</template>
