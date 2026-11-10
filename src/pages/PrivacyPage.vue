<script setup lang="ts">
import { usePageMeta } from "@/composables/usePageMeta";
import PageIntro from "@/components/ui/PageIntro.vue";
import { site } from "@/content/site";

usePageMeta({
  title: "Politique de confidentialité",
  description: `Comment ${site.legalName} traite vos données personnelles, conformément à la nLPD.`,
});
</script>

<template>
  <div class="wrap py-20 sm:py-24">
    <PageIntro eyebrow="Protection des données" title="Politique de confidentialité" updated="novembre 2026" />

    <!-- À faire relire avant la mise en ligne -->
    <div class="prose-avf mt-6">
      <p>
        Cette politique explique quelles données personnelles nous traitons lorsque vous visitez ce site ou nous
        contactez, conformément à la loi fédérale sur la protection des données (nLPD).
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        {{ site.legalName }}, {{ site.address.street }}, {{ site.address.zip }} {{ site.address.city }}, Suisse.<br />
        Contact : <a :href="`mailto:${site.email}`">{{ site.email }}</a>
      </p>

      <h2>Données collectées</h2>
      <h3>Lors de votre visite</h3>
      <p>
        Ce site ne dépose <strong>aucun cookie</strong> et n'utilise aucun outil de mesure d'audience ni de suivi
        publicitaire. Les polices de caractères sont hébergées avec le site : aucune requête n'est envoyée à un service
        tiers lors du chargement des pages.
      </p>
      <p>
        Comme tout serveur web, notre hébergeur enregistre des journaux techniques (adresse IP, date, page demandée,
        navigateur) pour assurer la sécurité et le bon fonctionnement du site. Ces journaux sont conservés pour une
        durée limitée et ne servent pas à vous identifier.
      </p>
      <h3>Lorsque vous nous contactez</h3>
      <p>Via le formulaire, par e-mail ou par téléphone, nous recevons les données que vous nous transmettez :</p>
      <ul>
        <li>nom et prénom, entreprise le cas échéant ;</li>
        <li>adresse e-mail et numéro de téléphone ;</li>
        <li>description de votre projet et informations sur votre bâtiment.</li>
      </ul>

      <h2>Finalités</h2>
      <p>
        Ces données servent uniquement à répondre à votre demande, à organiser une visite, à établir une offre et, si
        vous devenez client, à exécuter et suivre l'installation. Elles ne sont ni vendues, ni utilisées à des fins
        publicitaires.
      </p>

      <h2>Destinataires</h2>
      <p>Vos données peuvent être traitées par les prestataires suivants, uniquement pour les besoins décrits ici :</p>
      <ul>
        <li>hébergement du site et de la messagerie : {{ site.legal.host }} ;</li>
        <li>transmission du formulaire de contact : {{ site.legal.formService }}.</li>
      </ul>

      <h2>Durée de conservation</h2>
      <p>
        Les demandes sans suite sont supprimées au plus tard deux ans après notre dernier échange. Les données liées à
        un mandat sont conservées pendant la durée légale applicable aux documents commerciaux et comptables (dix ans,
        art. 958f CO).
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez à tout moment demander l'accès à vos données, leur rectification ou leur suppression, en écrivant à
        <a :href="`mailto:${site.email}`">{{ site.email }}</a>. Vous pouvez également vous adresser au Préposé fédéral
        à la protection des données et à la transparence (PFPDT).
      </p>
    </div>
  </div>
</template>
