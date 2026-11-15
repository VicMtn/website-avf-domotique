<script setup lang="ts">
import living from "@/assets/img/living.jpg?w=480;832&picture";
import AppPicture from "@/components/ui/AppPicture.vue";
import { cta } from "@/content/site";

const proofs = [
  { title: "Trois métiers", text: "Électricien, automaticien et informaticien, dans la même équipe." },
  { title: "Clés en main", text: "De l'étude à la mise en service, puis le suivi." },
  { title: "Local", text: "Basés à Etoy, entre Lausanne et Genève." },
];
</script>

<template>
  <section class="wrap pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28" aria-labelledby="hero-title">
    <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-6">
        <p class="eyebrow">Domotique Loxone · Vaud, Valais, Genève</p>
        <h1 id="hero-title" class="mt-5 text-4xl sm:text-5xl xl:text-[3.5rem]">
          Une maison qui s'occupe de tout. Installée par des gens qui répondent.
        </h1>
        <p class="lead mt-6 max-w-xl">
          Lumière, chauffage, stores, accès, alarme et énergie fonctionnent ensemble et se règlent depuis une seule
          application. Nous installons Loxone chez les particuliers comme chez les professionnels, et nous restons
          joignables après.
        </p>
        <div class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <RouterLink :to="cta.to" class="btn px-6 btn-primary">{{ cta.label }}</RouterLink>
          <RouterLink to="/#pour-qui" class="group inline-flex items-center gap-1.5 font-medium">
            Ce que ça change pour vous
            <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">→</span>
          </RouterLink>
        </div>
      </div>

      <figure class="lg:col-span-6">
        <AppPicture
          :picture="living"
          alt="Séjour lumineux avec cheminée centrale et grandes baies vitrées donnant sur un lac"
          sizes="(min-width: 1024px) 34rem, calc(100vw - 2rem)"
          eager
          img-class="aspect-[4/5] w-full rounded-box bg-base-200 object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
        />
      </figure>
    </div>

    <dl class="mt-16 grid gap-8 border-t border-base-300 pt-10 sm:grid-cols-3 lg:mt-20">
      <div v-for="p in proofs" :key="p.title">
        <dt class="font-semibold">{{ p.title }}</dt>
        <dd class="mt-1 text-sm text-text">{{ p.text }}</dd>
      </div>
    </dl>
  </section>
</template>
