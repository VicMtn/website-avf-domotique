import { reactive } from "vue";
import { segments, type SegmentId } from "@/content/segments";

/** Profils proposés dans le formulaire : les univers + « autre » */
export const profiles = [
  ...segments.map((s) => ({ value: s.id as string, label: s.name })),
  { value: "autre", label: "Architecte, gérance, autre" },
];

export const projectTypes = [
  "Construction neuve",
  "Rénovation",
  "Extension d'une installation Loxone",
  "Maintenance",
] as const;

/**
 * Brouillon partagé entre les sections : choisir un univers ou demander une estimation
 * pré-remplit le formulaire de contact.
 */
export const contactDraft = reactive({
  profile: "residence" as SegmentId | "autre",
  /** Texte ajouté en tête du message (ex. réponses du calculateur) */
  context: "",
});
