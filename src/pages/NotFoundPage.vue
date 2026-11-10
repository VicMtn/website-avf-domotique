<script setup lang="ts">
import { useHead } from "@unhead/vue";

useHead({ title: "Page introuvable", meta: [{ name: "robots", content: "noindex" }] });
</script>

<template>
  <section class="wrap py-28 text-center sm:py-36">
    <p class="eyebrow">Erreur 404</p>
    <h1 class="mx-auto mt-4 max-w-xl text-4xl sm:text-5xl">Cette pièce n'existe pas.</h1>
    <p class="lead mx-auto mt-5 max-w-md">La page demandée a été déplacée ou n'a jamais existé.</p>
    <RouterLink to="/" class="btn btn-primary mt-10 px-6">Retour à l'accueil</RouterLink>
  </section>
</template>
