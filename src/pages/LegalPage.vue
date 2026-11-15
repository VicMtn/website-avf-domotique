<script setup lang="ts">
import { usePageMeta } from "@/composables/usePageMeta";
import PageIntro from "@/components/ui/PageIntro.vue";
import { site } from "@/content/site";

usePageMeta({
  title: "Mentions légales",
  description: `Mentions légales du site ${site.url.replace("https://", "")} : éditeur, hébergement, marques.`,
  noindex: true,
});
</script>

<template>
  <div class="wrap py-20 sm:py-24">
    <PageIntro eyebrow="Informations" title="Mentions légales" updated="novembre 2026" />

    <div class="prose-avf mt-6">
      <h2>Éditeur du site</h2>
      <p>
        <strong>{{ site.legalName }}</strong
        ><br />
        {{ site.address.street }}, {{ site.address.zip }} {{ site.address.city }} ({{ site.address.canton }}), Suisse<br />
        Numéro IDE : {{ site.legal.uid }}<br />
        Inscrite au {{ site.legal.register }}<br />
        Associés gérants : {{ site.legal.managers }}
      </p>
      <p>
        Téléphone : <a :href="site.phone.href">{{ site.phone.display }}</a
        ><br />
        E-mail : <a :href="`mailto:${site.email}`">{{ site.email }}</a>
      </p>

      <h2>Hébergement</h2>
      <p>{{ site.legal.host }}</p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, illustrations et la mise en page de ce site appartiennent à {{ site.legalName }}, sauf mention
        contraire. Toute reproduction nécessite une autorisation écrite préalable.
      </p>

      <h2>Marques</h2>
      <p>
        Loxone, Miniserver, Loxone Tree et Loxone Air sont des marques de Loxone Electronics GmbH.
        {{ site.name }} est une entreprise indépendante qui installe des systèmes Loxone.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Les informations publiées sur ce site sont fournies à titre indicatif. Les estimations d'économies d'énergie
        sont des ordres de grandeur : seule une étude sur place permet un chiffrage précis.
        {{ site.legalName }} décline toute responsabilité quant au contenu des sites externes vers lesquels ce site
        renvoie.
      </p>

      <h2>Protection des données</h2>
      <p>
        Le traitement de vos données personnelles est décrit dans notre
        <RouterLink to="/confidentialite">politique de confidentialité</RouterLink>.
      </p>
    </div>
  </div>
</template>
