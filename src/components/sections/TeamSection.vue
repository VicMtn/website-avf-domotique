<script setup lang="ts">
import SectionHeader from "@/components/ui/SectionHeader.vue";
import { team } from "@/content/team";
</script>

<template>
  <section id="equipe" class="py-24 lg:py-32" aria-labelledby="equipe-title">
    <div class="wrap">
      <SectionHeader
        id="equipe-title"
        eyebrow="Équipe"
        title="Trois amis, trois métiers."
        lead="Vous parlez directement à ceux qui viennent chez vous : pas de sous-traitance, pas de centre d'appel."
      />
      <div class="grid gap-4 md:grid-cols-3">
        <article v-for="m in team" :key="m.name" class="rounded-box border border-base-300 p-7">
          <img
            v-if="m.photo"
            :src="m.photo"
            :alt="`Portrait de ${m.name}`"
            loading="lazy"
            class="size-16 rounded-full object-cover"
          />
          <span
            v-else
            class="grid size-16 place-items-center rounded-full bg-base-200 text-xl font-semibold"
            aria-hidden="true"
          >
            {{ m.name.charAt(0) }}
          </span>
          <h3 class="mt-6 text-xl">{{ m.name }}</h3>
          <p class="text-sm font-medium text-muted">{{ m.role }}</p>
          <p class="mt-4 text-text">{{ m.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
