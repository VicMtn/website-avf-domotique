<script setup lang="ts">
import { computed, ref } from "vue";
import AppPicture from "@/components/ui/AppPicture.vue";
import SectionHeader from "@/components/ui/SectionHeader.vue";
import { segments, type SegmentId } from "@/content/segments";
import { contactDraft } from "@/composables/contactDraft";

const activeId = ref<SegmentId>("residence");

function select(id: SegmentId) {
  activeId.value = id;
  contactDraft.profile = id;
}
const active = computed(() => segments.find((s) => s.id === activeId.value) ?? segments[0]);
</script>

<template>
  <section id="pour-qui" class="bg-base-200 py-24 lg:py-32" aria-labelledby="pour-qui-title">
    <div class="wrap">
      <SectionHeader
        id="pour-qui-title"
        eyebrow="Pour qui"
        title="Ce que ça change, selon qui vous êtes."
        lead="Une maison, une boutique, un restaurant ou des bureaux n'ont pas les mêmes journées. Choisissez la vôtre."
      />

      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4" role="group" aria-label="Choisir un type de bâtiment">
        <button
          v-for="s in segments"
          :key="s.id"
          type="button"
          :aria-pressed="s.id === activeId"
          aria-controls="segment-detail"
          class="group relative aspect-[4/5] overflow-hidden rounded-box text-left outline-offset-4 sm:aspect-[4/3] lg:aspect-[3/4]"
          @click="select(s.id)"
        >
          <AppPicture
            :picture="s.image"
            alt=""
            sizes="(min-width: 1024px) 17rem, 50vw"
            img-class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span class="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
          <span
            class="absolute inset-0 rounded-box ring-inset transition"
            :class="s.id === activeId ? 'ring-2 ring-base-100' : 'ring-0'"
          />
          <span class="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
            <span class="block text-lg font-semibold">{{ s.name }}</span>
            <span class="block text-sm text-white/80">{{ s.examples }}</span>
          </span>
        </button>
      </div>

      <div
        id="segment-detail"
        class="mt-6 grid gap-6 rounded-box bg-base-100 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12"
        aria-live="polite"
      >
        <div class="lg:col-span-7">
          <p class="eyebrow">{{ active.name }} · {{ active.examples }}</p>
          <h3 class="mt-3 text-2xl sm:text-3xl">{{ active.title }}</h3>
          <p class="mt-4 text-text">{{ active.text }}</p>
          <dl class="mt-8 grid gap-6 sm:grid-cols-2">
            <div v-for="p in active.points" :key="p.title" class="border-t border-base-300 pt-4">
              <dt class="font-semibold">{{ p.title }}</dt>
              <dd class="mt-1 text-sm text-text">{{ p.text }}</dd>
            </div>
          </dl>
        </div>
        <aside class="rounded-box bg-base-200 p-6 lg:col-span-5 lg:self-start">
          <p class="eyebrow">Projet type</p>
          <p class="mt-3 text-text">{{ active.caseStudy }}</p>
          <ul class="mt-5 flex flex-wrap gap-2" aria-label="Matériel Loxone utilisé">
            <li v-for="g in active.gear" :key="g" class="badge badge-ghost border-base-300 bg-base-100">{{ g }}</li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
</template>
