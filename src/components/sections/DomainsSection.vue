<script setup lang="ts">
import AppIcon from "@/components/ui/AppIcon.vue";
import { domains } from "@/content/domains";
</script>

<template>
  <section id="solutions" class="py-24 lg:py-32" aria-labelledby="solutions-title">
    <div class="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div class="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
        <p class="eyebrow">Solutions</p>
        <h2 id="solutions-title" class="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">
          Tout ce que le bâtiment fait pour vous.
        </h2>
        <p class="lead mt-5 max-w-md">
          Un seul système pour tout le bâtiment. Chaque fonction sait ce que font les autres, et chacune peut être
          ajoutée plus tard sans rien remplacer.
        </p>
      </div>

      <ul class="divide-y divide-base-300 border-y border-base-300 lg:col-span-7">
        <li v-for="d in domains" :key="d.title" class="grid grid-cols-[2.75rem_1fr] gap-x-5 py-7">
          <span class="grid size-11 place-items-center rounded-full bg-base-200">
            <AppIcon :name="d.icon" />
          </span>
          <div>
            <h3 class="text-xl">{{ d.title }}</h3>
            <p class="mt-2 text-text">{{ d.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
