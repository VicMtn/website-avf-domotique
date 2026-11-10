<script setup lang="ts">
import { computed, reactive } from "vue";
import SectionHeader from "@/components/ui/SectionHeader.vue";
import { cta } from "@/content/site";
import { estimateSavings, formatChf, type Answers } from "@/composables/savings";

interface Question<K extends keyof Answers = keyof Answers> {
  key: K;
  label: string;
  options: { value: Answers[K]; label: string }[];
}

const questions: Question[] = [
  {
    key: "home",
    label: "Vous habitez…",
    options: [
      { value: "appartement", label: "Un appartement" },
      { value: "villa", label: "Une villa" },
      { value: "grande-villa", label: "Une grande villa" },
    ],
  },
  {
    key: "solar",
    label: "Vous avez des panneaux solaires ?",
    options: [
      { value: "non", label: "Non" },
      { value: "oui", label: "Oui" },
      { value: "prevu", label: "C'est prévu" },
    ],
  },
  {
    key: "car",
    label: "Une voiture électrique ?",
    options: [
      { value: "non", label: "Non" },
      { value: "oui", label: "Oui" },
      { value: "bientot", label: "Bientôt" },
    ],
  },
];

const answers = reactive<Answers>({ home: "villa", solar: "oui", car: "oui" });
const result = computed(() => estimateSavings(answers));
</script>

<template>
  <section id="economies" class="py-24 lg:py-32" aria-labelledby="economies-title">
    <div class="wrap">
      <SectionHeader
        id="economies-title"
        eyebrow="Vos économies"
        title="Combien votre maison peut vous faire économiser."
        lead="Trois questions, une réponse en francs. La maison recharge la voiture quand le soleil produit, chauffe quand vous êtes là et éteint ce qui ne sert à rien."
      />

      <div class="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <form class="flex flex-col gap-8 lg:col-span-6" @submit.prevent>
          <fieldset v-for="q in questions" :key="q.key">
            <legend class="font-semibold">{{ q.label }}</legend>
            <div class="mt-3 flex flex-wrap gap-2">
              <input
                v-for="o in q.options"
                :key="o.value"
                v-model="answers[q.key]"
                type="radio"
                class="btn btn-outline border-base-300 checked:btn-primary"
                :name="q.key"
                :value="o.value"
                :aria-label="o.label"
              />
            </div>
          </fieldset>
        </form>

        <div class="rounded-box bg-base-200 p-6 sm:p-8 lg:col-span-6" aria-live="polite">
          <p class="eyebrow">Économie estimée</p>
          <p class="mt-3 text-5xl font-semibold tracking-tight tabular-nums sm:text-6xl">
            {{ formatChf(result.total) }}
          </p>
          <p class="mt-1 text-text">par an, soit {{ formatChf(result.total / 12) }} par mois</p>

          <ul class="mt-8 divide-y divide-base-300 border-y border-base-300 text-sm">
            <li
              v-for="l in result.lines"
              :key="l.label"
              class="flex items-center justify-between gap-4 py-3"
              :class="{ 'text-muted': !l.applies }"
            >
              <span>{{ l.label }}</span>
              <span class="font-semibold tabular-nums">{{ l.applies ? formatChf(l.amount) : "—" }}</span>
            </li>
          </ul>

          <p class="mt-5 text-xs text-muted">
            Ordre de grandeur prudent pour un foyer en Suisse romande, sur la base de 0,30 CHF/kWh. Le chiffrage exact se
            fait chez vous, avec vos factures.
          </p>
          <RouterLink :to="cta.to" class="btn btn-primary mt-6 px-6">Recevoir mon estimation précise</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
