<script setup lang="ts">
import { formatTemp, type FloorPlan, type Room } from "@/content/demo";

const props = defineProps<{
  plan: FloorPlan;
  lights: ReadonlySet<string>;
  /** 0 = stores ouverts, 1 = fermés */
  blinds: number;
  temps: Record<string, number>;
  alarm: boolean;
}>();

const emit = defineEmits<{ toggle: [roomId: string] }>();

const isOn = (room: Room) => props.lights.has(room.id);
const roomLabel = (room: Room) =>
  `${room.name} : lumière ${isOn(room) ? "allumée" : "éteinte"}. Appuyer pour changer.`;
</script>

<template>
  <svg
    class="plan h-auto w-full select-none"
    viewBox="0 0 600 420"
    role="group"
    :aria-label="plan.description"
    :style="{ '--blind': blinds }"
    :data-alarm="alarm ? 'on' : 'off'"
  >
    <defs>
      <radialGradient id="avf-glow">
        <stop offset="0%" stop-color="var(--color-glow)" stop-opacity=".55" />
        <stop offset="60%" stop-color="var(--color-glow)" stop-opacity=".18" />
        <stop offset="100%" stop-color="var(--color-glow)" stop-opacity="0" />
      </radialGradient>
    </defs>

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
      <template v-for="(w, i) in plan.windows" :key="i">
        <rect class="window" :x="w.x" :y="w.y" :width="w.w" :height="w.h" />
        <rect class="blind" :x="w.x" :y="w.y" :width="w.w" :height="w.h" />
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
.wall { fill: none; stroke: var(--ink); stroke-width: 6; stroke-linecap: square; }
.partition { fill: none; stroke: var(--ink); stroke-width: 3; }
.dashed { fill: none; stroke: var(--ink); stroke-width: 1; }

.room { outline: none; }
.area { fill: transparent; transition: fill 0.2s; }
.room:hover .area { fill: color-mix(in oklab, var(--ink) 3%, transparent); }
.room:focus-visible .area { fill: color-mix(in oklab, var(--ink) 6%, transparent); }

.pool { fill: url(#avf-glow); opacity: 0; transition: opacity 0.9s ease; }
.room[data-light="on"] .pool { opacity: 1; }
.bulb { fill: #fff; stroke: var(--ink); stroke-width: 1.5; transition: fill 0.4s; }
.room[data-light="on"] .bulb { fill: var(--color-glow); }

.room-label { font-size: 13px; fill: var(--ink); opacity: 0.7; }
.temp { font-size: 15px; font-weight: 600; fill: var(--ink); font-variant-numeric: tabular-nums; }

.window { fill: #d9e5ec; stroke: var(--ink); stroke-width: 1.5; }
/* La lame descend de 0 à 100 % sur la fenêtre */
.blind {
  fill: var(--color-muted);
  transform-box: fill-box;
  transform-origin: top;
  transform: scaleY(var(--blind, 0));
  transition: transform 1.2s cubic-bezier(0.6, 0.05, 0.3, 1);
}

.alarm-ring { fill: none; stroke: var(--color-accent); stroke-width: 2; opacity: 0; transition: opacity 0.4s; }
.plan[data-alarm="on"] .alarm-ring { opacity: 1; animation: pulse 2s ease-in-out infinite; }
@keyframes pulse {
  50% { opacity: 0.35; }
}
</style>
