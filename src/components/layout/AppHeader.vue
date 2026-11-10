<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import AppLogo from "@/components/ui/AppLogo.vue";
import { cta, nav } from "@/content/site";

const open = ref(false);
const scrolled = ref(false);
const route = useRoute();

const onScroll = () => (scrolled.value = window.scrollY > 8);
onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));

// Referme le menu mobile après navigation
watch(() => route.fullPath, () => (open.value = false));
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b bg-base-100/85 backdrop-blur-xl transition-colors"
    :class="scrolled || open ? 'border-base-300' : 'border-transparent'"
  >
    <nav class="wrap flex h-16 items-center justify-between gap-4" aria-label="Navigation principale">
      <AppLogo />

      <ul class="hidden items-center gap-8 md:flex">
        <li v-for="item in nav" :key="item.to">
          <RouterLink :to="item.to" class="text-sm text-text transition-colors hover:text-base-content">
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>

      <div class="flex items-center gap-2">
        <RouterLink :to="cta.to" class="btn btn-primary btn-sm hidden px-4 sm:inline-flex">{{ cta.label }}</RouterLink>
        <button
          type="button"
          class="btn btn-ghost btn-sm btn-square md:hidden"
          :aria-expanded="open"
          aria-controls="menu-mobile"
          :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'"
          @click="open = !open"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
            <path v-if="!open" d="M4 7h16M4 12h16M4 17h16" />
            <path v-else d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </nav>

    <div v-show="open" id="menu-mobile" class="border-t border-base-300 md:hidden">
      <ul class="wrap flex flex-col py-3">
        <li v-for="item in nav" :key="item.to">
          <RouterLink :to="item.to" class="block py-3 text-lg">{{ item.label }}</RouterLink>
        </li>
        <li class="pt-3 pb-2">
          <RouterLink :to="cta.to" class="btn btn-primary w-full">{{ cta.label }}</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>
