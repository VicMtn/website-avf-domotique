<script setup lang="ts">
import { useHead, useSeoMeta } from "@unhead/vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import { site } from "@/content/site";

// Valeurs communes à toutes les pages ; titre, description et URL : usePageMeta() dans chaque page
useHead({ htmlAttrs: { lang: "fr-CH", "data-theme": "avf" } });
useSeoMeta({
  ogSiteName: site.name,
  ogType: "website",
  ogLocale: "fr_CH",
  ogImage: `${site.url}/og-image.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: `${site.name} : ${site.tagline}`,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <a
    href="#contenu"
    class="btn sr-only btn-primary btn-sm focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
  >
    Aller au contenu
  </a>
  <AppHeader />
  <main id="contenu">
    <RouterView />
  </main>
  <AppFooter />
</template>
