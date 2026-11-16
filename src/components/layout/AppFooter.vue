<script setup lang="ts">
import AppLogo from "@/components/ui/AppLogo.vue";
import { nav, site } from "@/content/site";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-base-300 bg-base-100">
    <div class="wrap grid gap-10 py-14 text-sm sm:grid-cols-2 lg:grid-cols-4">
      <div class="lg:col-span-2">
        <AppLogo />
        <p class="mt-4 max-w-xs text-text">
          Installation de domotique Loxone pour particuliers et professionnels. Basés à {{ site.address.city }}, entre
          Lausanne et Genève.
        </p>
      </div>
      <div>
        <p class="font-semibold">Navigation</p>
        <ul class="mt-3 space-y-2 text-text">
          <li v-for="item in nav" :key="item.to">
            <RouterLink :to="item.to" class="nav-link">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </div>
      <div>
        <p class="font-semibold">Contact</p>
        <ul class="mt-3 space-y-2 text-text">
          <li>
            <a :href="`mailto:${site.email}`" class="nav-link">{{ site.email }}</a>
          </li>
          <li>{{ site.address.zip }} {{ site.address.city }} ({{ site.address.canton }})</li>
          <li>Intervention : {{ site.area }}</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-base-300">
      <div class="wrap flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} {{ site.legalName }} · Loxone est une marque de Loxone Electronics GmbH.</p>
        <ul class="flex gap-5">
          <li><RouterLink to="/mentions-legales" class="nav-link">Mentions légales</RouterLink></li>
          <li><RouterLink to="/confidentialite" class="nav-link">Confidentialité</RouterLink></li>
        </ul>
      </div>
    </div>
  </footer>
</template>
