<script setup lang="ts">
import { computed, ref } from "vue";
import FloorPlanSvg from "@/components/demo/FloorPlanSvg.vue";
import SectionHeader from "@/components/ui/SectionHeader.vue";
import { formatTemp, plans, type Scene } from "@/content/demo";

const planId = ref(plans[0]!.id);
const plan = computed(() => plans.find((p) => p.id === planId.value) ?? plans[0]!);

/** Scène active ; null dès qu'une lumière est changée à la main */
const sceneId = ref<string | null>(null);
const lights = ref<Set<string>>(new Set());
const blinds = ref(0);
const daylight = ref(false);
const temps = ref<Record<string, number>>({});
const alarm = ref(false);
const story = ref("");

function applyScene(scene: Scene) {
  sceneId.value = scene.id;
  lights.value = new Set(scene.lights);
  blinds.value = scene.blinds;
  daylight.value = scene.daylight;
  temps.value = { ...scene.temps };
  alarm.value = scene.alarm;
  story.value = scene.story;
}

function selectPlan(id: string) {
  planId.value = id;
  const p = plan.value;
  applyScene(p.scenes.find((s) => s.id === p.initialScene) ?? p.scenes[0]!);
}

function toggleRoom(roomId: string) {
  const next = new Set(lights.value);
  const on = !next.has(roomId);
  if (on) next.add(roomId);
  else next.delete(roomId);
  lights.value = next;
  sceneId.value = null;
  const name = plan.value.rooms.find((r) => r.id === roomId)?.name ?? "";
  story.value = `${name} : lumière ${on ? "allumée" : "éteinte"} d'un simple appui, comme sur un interrupteur Loxone Touch.`;
}

selectPlan(planId.value);

const status = computed(() => {
  const n = lights.value.size;
  const heatRoom = plan.value.rooms.find((r) => r.id === plan.value.heatRoom);
  return [
    {
      label: "Lumières",
      value: n === 0 ? "Toutes éteintes" : `${n} pièce${n > 1 ? "s" : ""} allumée${n > 1 ? "s" : ""}`,
    },
    {
      label: "Stores",
      value:
        blinds.value === 0 ? "Ouverts" : blinds.value === 1 ? "Fermés" : `Fermés à ${Math.round(blinds.value * 100)} %`,
    },
    { label: "Chauffage", value: `${heatRoom?.name ?? ""} ${formatTemp(temps.value[plan.value.heatRoom] ?? 20)}` },
    { label: "Alarme", value: alarm.value ? "Armée" : "Désarmée" },
  ];
});
</script>

<template>
  <section id="demo" class="bg-base-200 py-24 lg:py-32" aria-labelledby="demo-title">
    <div class="wrap">
      <SectionHeader
        id="demo-title"
        eyebrow="Démo"
        title="Voyez le bâtiment réagir."
        lead="Choisissez un moment de la journée : lumières, stores, chauffage et alarme changent ensemble. Touchez une pièce pour allumer ou éteindre."
      />

      <div v-reveal class="grid gap-6 rounded-box bg-base-100 p-4 sm:p-8 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-7">
          <FloorPlanSvg
            :plan="plan"
            :lights="lights"
            :blinds="blinds"
            :temps="temps"
            :alarm="alarm"
            :daylight="daylight"
            @toggle="toggleRoom"
          />
        </div>

        <div class="flex flex-col gap-6 lg:col-span-5">
          <div role="group" class="tabs tabs-box self-start tabs-sm" aria-label="Type de bâtiment">
            <button
              v-for="p in plans"
              :key="p.id"
              type="button"
              class="tab"
              :class="{ 'tab-active': p.id === planId }"
              :aria-pressed="p.id === planId"
              @click="selectPlan(p.id)"
            >
              {{ p.label }}
            </button>
          </div>

          <div>
            <p class="text-sm font-medium text-muted">Scénario</p>
            <div class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2" role="group" aria-label="Scénarios">
              <button
                v-for="s in plan.scenes"
                :key="s.id"
                type="button"
                class="btn btn-sm"
                :class="s.id === sceneId ? 'btn-primary' : 'border-base-300 btn-outline'"
                :aria-pressed="s.id === sceneId"
                @click="applyScene(s)"
              >
                {{ s.label }}
              </button>
            </div>
          </div>

          <dl class="grid grid-cols-2 gap-px overflow-hidden rounded-field border border-base-300 bg-base-300 text-sm">
            <div v-for="s in status" :key="s.label" class="bg-base-100 p-3">
              <dt class="text-muted">{{ s.label }}</dt>
              <dd class="font-semibold">{{ s.value }}</dd>
            </div>
          </dl>

          <p class="min-h-[4.5em] text-text" aria-live="polite">{{ story }}</p>

          <p class="mt-auto text-xs text-muted">Démonstration : aucun appareil réel n'est piloté.</p>
        </div>
      </div>
    </div>
  </section>
</template>
