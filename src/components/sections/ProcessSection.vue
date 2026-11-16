<script setup lang="ts">
import SectionHeader from "@/components/ui/SectionHeader.vue";
import { steps } from "@/content/process";
</script>

<template>
  <section class="py-24 lg:py-32" aria-labelledby="process-title">
    <div class="wrap">
      <SectionHeader
        id="process-title"
        eyebrow="Déroulement"
        title="Comment ça se passe."
        lead="Quatre étapes, un seul interlocuteur, et vous savez toujours où on en est."
      />
      <ol class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <li v-for="(s, i) in steps" :key="s.title" v-reveal="i * 100" class="border-t border-base-content pt-6">
          <span class="text-sm font-medium text-muted tabular-nums">{{ String(i + 1).padStart(2, "0") }}</span>
          <h3 class="mt-3 text-xl">{{ s.title }}</h3>
          <p class="mt-2 text-text">{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
