<script setup lang="ts">
import entry from "@/assets/img/entry.jpg?w=480;832&picture";
import AppIcon from "@/components/ui/AppIcon.vue";
import AppPicture from "@/components/ui/AppPicture.vue";
import SectionHeader from "@/components/ui/SectionHeader.vue";
import { commitments } from "@/content/commitments";
</script>

<template>
  <section class="bg-base-200 py-24 lg:py-32" aria-labelledby="engagements-title">
    <div class="wrap">
      <SectionHeader
        id="engagements-title"
        eyebrow="Nos engagements"
        title="Une installation se juge sur dix ans."
        lead="Voici ce que nous garantissons sur chaque projet, du studio à l'atelier."
      />

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        <article v-reveal class="relative min-h-80 overflow-hidden rounded-box md:col-span-2 lg:row-span-2">
          <AppPicture
            :picture="entry"
            alt=""
            sizes="(min-width: 1024px) 36rem, 100vw"
            img-class="absolute inset-0 h-full w-full object-cover"
          />
          <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
          <div class="absolute inset-x-0 bottom-0 p-8 text-white">
            <h3 class="text-2xl">La technique s'efface.</h3>
            <p class="mt-2 max-w-md text-white/85">
              Des commandes sobres, des automatismes justes, une application lisible. Le confort se remarque, pas
              l'installation.
            </p>
          </div>
        </article>

        <article
          v-for="(c, i) in commitments"
          :key="c.title"
          v-reveal="80 + i * 80"
          class="rounded-box bg-base-100 p-7"
        >
          <span class="grid size-10 place-items-center rounded-full bg-base-200">
            <AppIcon :name="c.icon" :size="20" />
          </span>
          <h3 class="mt-5 text-lg">{{ c.title }}</h3>
          <p class="mt-2 text-sm text-text">{{ c.text }}</p>
          <ul v-if="c.tags" class="mt-4 flex flex-wrap gap-1.5">
            <li v-for="t in c.tags" :key="t" class="badge border-base-300 bg-base-200 badge-sm">{{ t }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
