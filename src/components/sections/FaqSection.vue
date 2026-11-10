<script setup lang="ts">
import { faq } from "@/content/faq";
</script>

<template>
  <section id="faq" class="bg-base-200 py-24 lg:py-32" aria-labelledby="faq-title">
    <div class="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-4">
        <p class="eyebrow">Questions fréquentes</p>
        <h2 id="faq-title" class="mt-4 text-3xl sm:text-4xl">Ce que l'on nous demande.</h2>
      </div>
      <div class="divide-y divide-base-300 border-y border-base-300 lg:col-span-8">
        <details v-for="(f, i) in faq" :key="f.q" name="faq" class="collapse collapse-plus rounded-none" :open="i === 0">
          <summary class="collapse-title px-0 text-lg font-semibold">{{ f.q }}</summary>
          <div class="collapse-content px-0 text-text">
            <p>{{ f.a }}</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>
