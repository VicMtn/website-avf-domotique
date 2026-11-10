<script setup lang="ts">
import { site } from "@/content/site";
</script>

<template>
  <section id="contact" class="py-24 lg:py-32" aria-labelledby="contact-title">
    <div class="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <p class="eyebrow">Contact</p>
        <h2 id="contact-title" class="mt-4 text-4xl sm:text-5xl">Parlons de votre projet.</h2>
        <p class="lead mt-6 max-w-md">
          On passe chez vous, on regarde, on écoute. Vous recevez ensuite une offre claire. Sans engagement.
        </p>
      </div>

      <dl class="grid content-start gap-6 sm:grid-cols-2">
        <div class="border-t border-base-300 pt-4">
          <dt class="text-sm text-muted">Téléphone</dt>
          <dd class="mt-1 text-lg font-semibold"><a :href="site.phone.href">{{ site.phone.display }}</a></dd>
        </div>
        <div class="border-t border-base-300 pt-4">
          <dt class="text-sm text-muted">E-mail</dt>
          <dd class="mt-1 text-lg font-semibold break-all">
            <a :href="`mailto:${site.email}`">{{ site.email }}</a>
          </dd>
        </div>
        <div class="border-t border-base-300 pt-4">
          <dt class="text-sm text-muted">Adresse</dt>
          <dd class="mt-1 text-lg font-semibold">{{ site.address.zip }} {{ site.address.city }} ({{ site.address.canton }})</dd>
        </div>
        <div class="border-t border-base-300 pt-4">
          <dt class="text-sm text-muted">Zone d'intervention</dt>
          <dd class="mt-1 text-lg font-semibold">{{ site.area }}</dd>
        </div>
      </dl>
      <!-- Le formulaire de demande arrive à l'étape « Interactif » -->
    </div>
  </section>
</template>
