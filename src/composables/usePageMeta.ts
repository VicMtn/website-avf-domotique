import { useHead, useSeoMeta } from "@unhead/vue";
import { useRoute } from "vue-router";
import { canonicalUrl, site } from "@/content/site";

interface PageMeta {
  /** Vide = titre par défaut du site (accueil) */
  title: string;
  description?: string;
  noindex?: boolean;
}

/** Titre, description, URL canonique et Open Graph d'une page */
export function usePageMeta({ title, description = site.description, noindex = false }: PageMeta) {
  const route = useRoute();
  const url = canonicalUrl(route.path);
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · ${site.tagline}`;

  useHead({
    title: fullTitle,
    // Pas d'URL de référence pour une page exclue de l'index (404, mentions légales)
    link: noindex ? [] : [{ rel: "canonical", href: url }],
  });
  useSeoMeta({
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogUrl: url,
    robots: noindex ? "noindex" : undefined,
  });
}
