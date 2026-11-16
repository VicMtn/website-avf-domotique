<script setup lang="ts">
import ContactForm from "@/components/contact/ContactForm.vue";
import { site } from "@/content/site";

const coords = [
  { label: "E-mail", value: site.email, href: `mailto:${site.email}` },
  { label: "Adresse", value: `${site.address.zip} ${site.address.city} (${site.address.canton})` },
];
</script>

<template>
  <section id="contact" class="bg-base-200 py-24 lg:py-32" aria-labelledby="contact-title">
    <div class="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-5">
        <p class="eyebrow">Contact</p>
        <h2 id="contact-title" class="mt-4 text-4xl sm:text-5xl">Parlons de votre projet.</h2>
        <p class="lead mt-6 max-w-md">
          On passe chez vous, on regarde, on écoute. Vous recevez ensuite une offre claire. Sans engagement.
        </p>
        <dl class="mt-10 grid gap-5">
          <div v-for="c in coords" :key="c.label" class="border-t border-base-300 pt-4">
            <dt class="text-sm text-muted">{{ c.label }}</dt>
            <dd class="mt-1 text-lg font-semibold break-words">
              <a v-if="c.href" :href="c.href" class="hover:underline hover:underline-offset-4">{{ c.value }}</a>
              <template v-else>{{ c.value }}</template>
            </dd>
          </div>
        </dl>
      </div>

      <div v-reveal="100" class="lg:col-span-7">
        <ContactForm />
      </div>
    </div>
  </section>
</template>
