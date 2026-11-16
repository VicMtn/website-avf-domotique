<script setup lang="ts">
import { computed } from "vue";
import { formatTemp, type FloorPlan, type Room } from "@/content/demo";

const props = defineProps<{
  plan: FloorPlan;
  lights: ReadonlySet<string>;
  /** 0 = stores ouverts, 1 = fermés */
  blinds: number;
  temps: Record<string, number>;
  alarm: boolean;
  /** Lumière du jour : tache de soleil devant les fenêtres, réduite par les stores */
  daylight: boolean;
}>();

const emit = defineEmits<{ toggle: [roomId: string] }>();

const isOn = (room: Room) => props.lights.has(room.id);
/** Dégradés de la tache de soleil, du bord de la fenêtre vers l'intérieur */
const SUN_GRADIENTS = [
  { id: "down", x1: 0, y1: 0, x2: 0, y2: 1 },
  { id: "up", x1: 0, y1: 1, x2: 0, y2: 0 },
  { id: "right", x1: 0, y1: 0, x2: 1, y2: 0 },
  { id: "left", x1: 1, y1: 0, x2: 0, y2: 0 },
] as const;

/** Profondeur et évasement de la tache de soleil */
const SUN_DEPTH = 90;
const SUN_SPREAD = 18;

/**
 * Fenêtres enrichies : sens du store (le long de la fenêtre) et tache de soleil
 * projetée vers l'intérieur, déduite de la position sur le plan (viewBox 600×420).
 */
const windows = computed(() =>
  props.plan.windows.map((w) => {
    const horizontal = w.w >= w.h;
    const D = SUN_DEPTH;
    const s = SUN_SPREAD;
    let dir: "down" | "up" | "right" | "left";
    let pts: number[][];
    if (horizontal) {
      dir = w.y < 210 ? "down" : "up";
      const y0 = dir === "down" ? w.y + w.h : w.y;
      const y1 = dir === "down" ? y0 + D : y0 - D;
      pts = [
        [w.x, y0],
        [w.x + w.w, y0],
        [w.x + w.w + s, y1],
        [w.x - s, y1],
      ];
    } else {
      dir = w.x < 300 ? "right" : "left";
      const x0 = dir === "right" ? w.x + w.w : w.x;
      const x1 = dir === "right" ? x0 + D : x0 - D;
      pts = [
        [x0, w.y],
        [x0, w.y + w.h],
        [x1, w.y + w.h + s],
        [x1, w.y - s],
      ];
    }
    return { ...w, horizontal, dir, sun: pts.map((p) => p.join(",")).join(" ") };
  }),
);

const roomLabel = (room: Room) => `${room.name} : lumière ${isOn(room) ? "allumée" : "éteinte"}. Appuyer pour changer.`;
</script>

<template>
  <svg
    class="plan h-auto w-full select-none"
    viewBox="0 0 600 420"
    role="group"
    :aria-label="plan.description"
    :style="{ '--blind': blinds, '--sun': daylight ? 1 - blinds : 0 }"
    :data-alarm="alarm ? 'on' : 'off'"
  >
    <defs>
      <radialGradient id="avf-glow">
        <stop offset="0%" stop-color="var(--color-glow)" stop-opacity=".55" />
        <stop offset="60%" stop-color="var(--color-glow)" stop-opacity=".18" />
        <stop offset="100%" stop-color="var(--color-glow)" stop-opacity="0" />
      </radialGradient>
      <!-- Lumière du jour, dégradé vers l'intérieur de la pièce -->
      <linearGradient
        v-for="g in SUN_GRADIENTS"
        :id="`avf-sun-${g.id}`"
        :key="g.id"
        :x1="g.x1"
        :y1="g.y1"
        :x2="g.x2"
        :y2="g.y2"
      >
        <stop offset="0%" stop-color="var(--color-glow)" stop-opacity=".34" />
        <stop offset="100%" stop-color="var(--color-glow)" stop-opacity="0" />
      </linearGradient>
      <!-- Lamelles : perpendiculaires à la fenêtre -->
      <pattern id="avf-slats-h" width="6" height="420" patternUnits="userSpaceOnUse">
        <rect width="6" height="420" class="slat-bg" />
        <rect x="5" width="1" height="420" class="slat-line" />
      </pattern>
      <pattern id="avf-slats-v" width="600" height="6" patternUnits="userSpaceOnUse">
        <rect width="600" height="6" class="slat-bg" />
        <rect y="5" width="600" height="1" class="slat-line" />
      </pattern>
    </defs>

    <g pointer-events="none">
      <polygon v-for="(w, i) in windows" :key="i" class="sun" :points="w.sun" :fill="`url(#avf-sun-${w.dir})`" />
    </g>

    <g
      v-for="room in plan.rooms"
      :key="room.id"
      class="room cursor-pointer"
      :data-light="isOn(room) ? 'on' : 'off'"
      role="button"
      tabindex="0"
      :aria-pressed="isOn(room)"
      :aria-label="roomLabel(room)"
      @click="emit('toggle', room.id)"
      @keydown.enter.prevent="emit('toggle', room.id)"
      @keydown.space.prevent="emit('toggle', room.id)"
    >
      <rect class="area" :x="room.area.x" :y="room.area.y" :width="room.area.w" :height="room.area.h" />
      <ellipse class="pool" :cx="room.pool.cx" :cy="room.pool.cy" :rx="room.pool.rx" :ry="room.pool.ry" />
      <circle v-for="(b, i) in room.bulbs" :key="i" class="bulb" :cx="b.x" :cy="b.y" :r="b.r ?? 7" />
      <text class="room-label" :x="room.label.x" :y="room.label.y">{{ room.short ?? room.name }}</text>
      <text v-if="room.temp && temps[room.id] !== undefined" class="temp" :x="room.temp.x" :y="room.temp.y">
        {{ formatTemp(temps[room.id]!) }}
      </text>
      <circle v-if="room.alarm" class="alarm-ring" :cx="room.alarm.x" :cy="room.alarm.y" :r="room.alarm.r" />
    </g>

    <g pointer-events="none">
      <template v-for="(w, i) in windows" :key="i">
        <rect class="window" :x="w.x" :y="w.y" :width="w.w" :height="w.h" />
        <rect
          class="blind"
          :class="w.horizontal ? 'blind-h' : 'blind-v'"
          :x="w.x"
          :y="w.y"
          :width="w.w"
          :height="w.h"
          :fill="`url(#avf-slats-${w.horizontal ? 'h' : 'v'})`"
        />
        <rect class="window-frame" :x="w.x" :y="w.y" :width="w.w" :height="w.h" />
      </template>
    </g>

    <g pointer-events="none">
      <path class="wall" :d="plan.walls" />
      <path class="partition" :d="plan.partitions" />
      <path
        v-for="(d, i) in plan.dashed"
        :key="i"
        class="dashed"
        :d="d.d"
        :stroke-dasharray="d.dash"
        :opacity="d.opacity ?? 1"
      />
    </g>
  </svg>
</template>

<style scoped>
.plan {
  --ink: var(--color-base-content);
}
.wall {
  fill: none;
  stroke: var(--ink);
  stroke-width: 6;
  stroke-linecap: square;
}
.partition {
  fill: none;
  stroke: var(--ink);
  stroke-width: 3;
}
.dashed {
  fill: none;
  stroke: var(--ink);
  stroke-width: 1;
}

.room {
  outline: none;
}
.area {
  fill: transparent;
  transition: fill 0.2s;
}
.room:hover .area {
  fill: color-mix(in oklab, var(--ink) 3%, transparent);
}
.room:focus-visible .area {
  fill: color-mix(in oklab, var(--ink) 6%, transparent);
}

.pool {
  fill: url(#avf-glow);
  opacity: 0;
  transition: opacity 0.9s ease;
}
.room[data-light="on"] .pool {
  opacity: 1;
}
.bulb {
  fill: var(--color-base-100);
  stroke: var(--ink);
  stroke-width: 1.5;
  transition: fill 0.4s;
}
.room[data-light="on"] .bulb {
  fill: var(--color-glow);
}

.room-label {
  font-size: 13px;
  fill: var(--ink);
  opacity: 0.7;
}
.temp {
  font-size: 15px;
  font-weight: 600;
  fill: var(--ink);
  font-variant-numeric: tabular-nums;
}

.window {
  fill: var(--color-base-300);
}
.window-frame {
  fill: none;
  stroke: var(--ink);
  stroke-width: 1.5;
}
/* Le store se déploie sur toute la longueur de la fenêtre, lamelles comprises */
.blind {
  transform-box: fill-box;
  transition: transform 1.4s cubic-bezier(0.6, 0.05, 0.3, 1);
}
.blind-h {
  transform-origin: left;
  transform: scaleX(var(--blind, 0));
}
.blind-v {
  transform-origin: top;
  transform: scaleY(var(--blind, 0));
}
.slat-bg {
  fill: var(--color-slate);
}
.slat-line {
  fill: var(--ink);
  opacity: 0.45;
}
.sun {
  opacity: var(--sun, 0);
  transition: opacity 1.4s ease;
}

.alarm-ring {
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 2;
  opacity: 0;
  transition: opacity 0.4s;
}
.plan[data-alarm="on"] .alarm-ring {
  opacity: 1;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  50% {
    opacity: 0.35;
  }
}
</style>
