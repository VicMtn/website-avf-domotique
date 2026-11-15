<script setup lang="ts">
import { computed, nextTick, reactive, ref, useTemplateRef, watch } from "vue";
import { contactDraft, profiles, projectTypes } from "@/composables/contactDraft";
import { ContactError, sendContactRequest } from "@/services/contact";
import { site } from "@/content/site";

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "success" | "error";

const form = reactive({
  name: "",
  company: "",
  email: "",
  phone: "",
  profile: contactDraft.profile as string,
  project: projectTypes[0] as string,
  message: "",
  /** Champ piège : invisible pour les humains, rempli par les robots */
  website: "",
});

const errors = reactive<Partial<Record<Field, string>>>({});
const status = ref<Status>("idle");
const errorMessage = ref("");
const formEl = useTemplateRef<HTMLFormElement>("formEl");
const doneEl = useTemplateRef<HTMLElement>("doneEl");

// Pré-remplissage depuis les autres sections
watch(
  () => contactDraft.profile,
  (p) => (form.profile = p),
);
watch(
  () => contactDraft.context,
  (ctx) => {
    if (ctx && !form.message.includes(ctx)) form.message = form.message ? `${ctx}\n\n${form.message}` : ctx;
  },
);

function validate(): boolean {
  errors.name = form.name.trim() ? undefined : "Indiquez votre nom.";
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ? undefined
    : "Indiquez une adresse e-mail valide.";
  errors.message = form.message.trim().length >= 10 ? undefined : "Décrivez votre projet en quelques mots.";
  return !errors.name && !errors.email && !errors.message;
}

async function submit() {
  if (status.value === "sending") return;
  if (!validate()) {
    await nextTick();
    formEl.value?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    return;
  }

  status.value = "sending";
  try {
    if (!form.website) {
      const profileLabel = profiles.find((p) => p.value === form.profile)?.label ?? form.profile;
      await sendContactRequest({
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        profile: profileLabel,
        project: form.project,
        message: form.message.trim(),
      });
    }
    status.value = "success";
    await nextTick();
    doneEl.value?.focus();
  } catch (e) {
    status.value = "error";
    errorMessage.value = e instanceof ContactError ? e.message : "Une erreur inattendue s'est produite.";
  }
}

function reset() {
  Object.assign(form, { name: "", company: "", email: "", phone: "", message: "", website: "" });
  contactDraft.context = "";
  status.value = "idle";
}

const mailtoFallback = computed(
  () =>
    `mailto:${site.email}?subject=${encodeURIComponent("Demande de contact")}&body=${encodeURIComponent(form.message)}`,
);
const describedBy = (f: Field) => (errors[f] ? `err-${f}` : undefined);
</script>

<template>
  <div class="rounded-box bg-base-200 p-6 sm:p-8">
    <div v-if="status === 'success'" ref="doneEl" tabindex="-1" role="status" class="outline-none">
      <h3 class="text-2xl">Merci, votre demande est transmise.</h3>
      <p class="mt-3 text-text">Nous vous recontactons sous deux jours ouvrables pour convenir d'une visite.</p>
      <button type="button" class="btn mt-6 border-base-300 btn-outline" @click="reset">Nouvelle demande</button>
    </div>

    <form v-else ref="formEl" class="grid gap-5" novalidate @submit.prevent="submit">
      <div class="grid gap-5 sm:grid-cols-2">
        <label class="block">
          <span class="mb-1.5 block text-sm font-medium">Nom et prénom</span>
          <input
            v-model="form.name"
            type="text"
            name="name"
            autocomplete="name"
            required
            class="input w-full"
            :class="{ 'input-error': errors.name }"
            :aria-invalid="!!errors.name"
            :aria-describedby="describedBy('name')"
          />
          <span v-if="errors.name" :id="'err-name'" class="mt-1 block text-sm text-error">{{ errors.name }}</span>
        </label>
        <label class="block">
          <span class="mb-1.5 block text-sm font-medium">
            Entreprise <span class="font-normal text-muted">(facultatif)</span>
          </span>
          <input v-model="form.company" type="text" name="company" autocomplete="organization" class="input w-full" />
        </label>
        <label class="block">
          <span class="mb-1.5 block text-sm font-medium">E-mail</span>
          <input
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="email"
            required
            class="input w-full"
            :class="{ 'input-error': errors.email }"
            :aria-invalid="!!errors.email"
            :aria-describedby="describedBy('email')"
          />
          <span v-if="errors.email" :id="'err-email'" class="mt-1 block text-sm text-error">{{ errors.email }}</span>
        </label>
        <label class="block">
          <span class="mb-1.5 block text-sm font-medium">
            Téléphone <span class="font-normal text-muted">(facultatif)</span>
          </span>
          <input v-model="form.phone" type="tel" name="phone" autocomplete="tel" class="input w-full" />
        </label>
        <label class="block">
          <span class="mb-1.5 block text-sm font-medium">Vous êtes</span>
          <select v-model="form.profile" name="profile" class="select w-full">
            <option v-for="p in profiles" :key="p.value" :value="p.value">{{ p.label }}</option>
          </select>
        </label>
        <label class="block">
          <span class="mb-1.5 block text-sm font-medium">Type de projet</span>
          <select v-model="form.project" name="project" class="select w-full">
            <option v-for="t in projectTypes" :key="t">{{ t }}</option>
          </select>
        </label>
      </div>

      <label class="block">
        <span class="mb-1.5 block text-sm font-medium">Votre projet</span>
        <textarea
          v-model="form.message"
          name="message"
          rows="5"
          required
          class="textarea w-full"
          :class="{ 'textarea-error': errors.message }"
          placeholder="Surface, pièces ou zones, délais, ce que vous souhaitez automatiser…"
          :aria-invalid="!!errors.message"
          :aria-describedby="describedBy('message')"
        />
        <span v-if="errors.message" :id="'err-message'" class="mt-1 block text-sm text-error">{{
          errors.message
        }}</span>
      </label>

      <!-- Piège à robots -->
      <div class="absolute -left-[9999px]" aria-hidden="true">
        <label
          >Site web <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off"
        /></label>
      </div>

      <div v-if="status === 'error'" role="alert" class="rounded-field border border-error/30 bg-base-100 p-4 text-sm">
        <p class="font-medium text-error">{{ errorMessage }}</p>
        <p class="mt-1 text-text">
          Vous pouvez aussi nous écrire directement à
          <a :href="mailtoFallback" class="underline underline-offset-4">{{ site.email }}</a
          >.
        </p>
      </div>

      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xs text-muted sm:max-w-xs">
          Vos données servent uniquement à répondre à votre demande.
          <RouterLink to="/confidentialite" class="underline underline-offset-4">Confidentialité</RouterLink>
        </p>
        <button type="submit" class="btn px-6 btn-primary" :disabled="status === 'sending'">
          <span v-if="status === 'sending'" class="loading loading-sm loading-spinner" aria-hidden="true" />
          {{ status === "sending" ? "Envoi…" : "Envoyer la demande" }}
        </button>
      </div>
    </form>
  </div>
</template>
