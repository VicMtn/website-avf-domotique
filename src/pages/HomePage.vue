<script setup lang="ts">
import { useHead } from "@unhead/vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import SegmentsSection from "@/components/sections/SegmentsSection.vue";
import DomainsSection from "@/components/sections/DomainsSection.vue";
import BuildSection from "@/components/sections/BuildSection.vue";
import CommitmentsSection from "@/components/sections/CommitmentsSection.vue";
import ProcessSection from "@/components/sections/ProcessSection.vue";
import TeamSection from "@/components/sections/TeamSection.vue";
import FaqSection from "@/components/sections/FaqSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";

useHead({ title: "" });
</script>

<template>
  <HeroSection />
  <SegmentsSection />
  <DomainsSection />
  <!-- Démo interactive (#demo) et économies : étape « Interactif » -->
  <BuildSection />
  <CommitmentsSection />
  <ProcessSection />
  <TeamSection />
  <FaqSection />
  <ContactSection />
</template>
