/**
 * Informations de l'entreprise : source unique pour l'en-tête, le pied de page,
 * le contact, les pages légales et le SEO.
 * Les valeurs entre crochets sont à compléter avant la mise en ligne.
 */

export const site = {
  name: "AVF Domotique",
  legalName: "AVF Domotique Sàrl",
  url: "https://avf-domotique.ch",
  tagline: "Domotique Loxone en Suisse romande",
  description:
    "AVF Domotique, Etoy (VD). Installation de domotique Loxone pour villas, appartements, commerces, hôtellerie et bureaux, en Vaud, Valais et Genève.",

  email: "info@avf-domotique.ch",
  address: {
    street: "[Rue et numéro]",
    zip: "1163",
    city: "Etoy",
    canton: "VD",
    country: "CH",
  },
  area: "Vaud, Valais, Genève",
  /** Etoy (VD) */
  geo: { lat: 46.485, lng: 6.42 },

  legal: {
    uid: "[CHE-000.000.000]",
    register: "Registre du commerce du canton de Vaud",
    managers: "[Prénom Nom, Prénom Nom, Prénom Nom]",
    host: "Infomaniak Network SA, Rue Eugène-Marziano 25, 1227 Les Acacias (GE), Suisse",
    formService: "Web3Forms (web3forms.com), édité par Web3Creative, Kerala, Inde ; serveurs aux États-Unis",
  },
} as const;

/** URL publique d'une route ; pages générées en dossiers (/mentions-legales/), d'où la barre finale */
export const canonicalUrl = (path: string) => `${site.url}${path === "/" ? "/" : `${path.replace(/\/$/, "")}/`}`;

export interface NavItem {
  label: string;
  /** Ancre de la page d'accueil */
  to: string;
}

/** Navigation principale : 4 entrées maximum */
export const nav: NavItem[] = [
  { label: "Solutions", to: "/#solutions" },
  { label: "Démo", to: "/#demo" },
  { label: "Équipe", to: "/#equipe" },
  { label: "FAQ", to: "/#faq" },
];

export const cta = { label: "Prendre rendez-vous", to: "/#contact" };
