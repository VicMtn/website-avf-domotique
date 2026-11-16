<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { usePageMeta } from "@/composables/usePageMeta";
import { faqPage, localBusiness } from "@/content/structuredData";
import HeroSection from "@/components/sections/HeroSection.vue";
import SegmentsSection from "@/components/sections/SegmentsSection.vue";
import DomainsSection from "@/components/sections/DomainsSection.vue";
import DemoSection from "@/components/sections/DemoSection.vue";
import BuildSection from "@/components/sections/BuildSection.vue";
import CommitmentsSection from "@/components/sections/CommitmentsSection.vue";
import ProcessSection from "@/components/sections/ProcessSection.vue";
import TeamSection from "@/components/sections/TeamSection.vue";
import FaqSection from "@/components/sections/FaqSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";

usePageMeta({ title: "" });
useHead({
  script: [
    { type: "application/ld+json", innerHTML: JSON.stringify(localBusiness) },
    { type: "application/ld+json", innerHTML: JSON.stringify(faqPage) },
  ],
});
</script>

<template>
  <HeroSection />
  <SegmentsSection />
  <DomainsSection />
  <DemoSection />
  <BuildSection />
  <CommitmentsSection />
  <ProcessSection />
  <TeamSection />
  <FaqSection />
  <ContactSection />
</template>
