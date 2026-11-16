<script setup lang="ts">
const options = [
  {
    title: "Construction neuve",
    tech: "Loxone Tree",
    text: "Nous intervenons dès les plans, avec votre architecte et les autres corps de métier. Le câblage Tree relie chaque équipement par un simple câble : fiable, et simple à faire évoluer.",
    points: ["Étude intégrée au projet", "Coordination de chantier", "Réserves prévues pour les extensions"],
    filled: true,
  },
  {
    title: "Bâtiment existant",
    tech: "Loxone Air",
    text: "Les produits sans fil Air s'installent sans saignées, dans un logement habité comme dans un commerce en activité. On commence par une pièce ou une fonction, et on étend ensuite.",
    points: ["Pas de murs à ouvrir", "Interventions hors des heures d'ouverture", "Combinable avec du filaire"],
    filled: false,
  },
];
</script>

<template>
  <section class="py-24 lg:py-32" aria-labelledby="build-title">
    <div class="wrap">
      <p class="eyebrow">Neuf ou rénovation</p>
      <h2 id="build-title" class="mt-4 max-w-2xl text-3xl sm:text-4xl lg:text-[2.75rem]">
        Construction ou rénovation, les deux sont possibles.
      </h2>

      <div class="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16">
        <article
          v-for="(o, i) in options"
          :key="o.title"
          v-reveal="i * 100"
          class="rounded-box p-8 sm:p-10"
          :class="o.filled ? 'bg-base-200' : 'border border-line'"
        >
          <p class="text-sm font-medium text-muted">{{ o.tech }}</p>
          <h3 class="mt-2 text-2xl sm:text-3xl">{{ o.title }}</h3>
          <p class="mt-4 text-text">{{ o.text }}</p>
          <ul class="mt-6 space-y-2">
            <li v-for="p in o.points" :key="p" class="flex items-start gap-3">
              <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-base-content" aria-hidden="true" />
              {{ p }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
