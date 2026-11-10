<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { cta } from "@/content/site";

useHead({ title: "" });
</script>

<template>
  <!-- Socle : les sections de la page d'accueil arrivent à l'étape « Contenu » -->
  <section class="wrap py-24 sm:py-32">
    <p class="eyebrow">Domotique Loxone · Vaud, Valais, Genève</p>
    <h1 class="mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
      Une maison qui s'occupe de tout. Installée par des gens qui répondent.
    </h1>
    <p class="lead mt-6 max-w-2xl">
      Lumière, chauffage, stores, accès, alarme et énergie : tout fonctionne ensemble et se règle depuis une seule
      application.
    </p>
    <div class="mt-10 flex flex-wrap items-center gap-4">
      <RouterLink :to="cta.to" class="btn btn-primary px-6">{{ cta.label }}</RouterLink>
    </div>
  </section>
</template>
