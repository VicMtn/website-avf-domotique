<script setup lang="ts">
import AppIcon from "@/components/ui/AppIcon.vue";
import SectionHeader from "@/components/ui/SectionHeader.vue";
import { team } from "@/content/team";
</script>

<template>
  <section id="equipe" class="bg-base-200 py-24 lg:py-32" aria-labelledby="equipe-title">
    <div class="wrap">
      <SectionHeader
        id="equipe-title"
        eyebrow="Équipe"
        title="Trois amis, trois métiers."
        lead="Une installation domotique demande trois compétences : nous les réunissons dans la même équipe. Vous parlez directement à ceux qui viennent chez vous, de la première visite au suivi."
      />
      <div class="grid gap-4 md:grid-cols-3">
        <article v-for="(m, i) in team" :key="m.title" v-reveal="i * 100" class="rounded-box bg-base-100 p-7">
          <span class="grid size-14 place-items-center rounded-full bg-base-200">
            <AppIcon :name="m.icon" :size="24" />
          </span>
          <h3 class="mt-6 text-xl">{{ m.title }}</h3>
          <p class="text-sm font-medium text-muted">{{ m.role }}</p>
          <p class="mt-4 text-text">{{ m.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
