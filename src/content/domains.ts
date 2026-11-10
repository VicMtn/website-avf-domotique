import type { IconName } from "./icons";

export interface Domain {
  icon: IconName;
  title: string;
  text: string;
}

export const domains: Domain[] = [
  {
    icon: "light",
    title: "Éclairage",
    text: "La lumière s'allume quand vous entrez, s'adapte à l'heure et s'éteint dans les pièces vides. Les luminaires DALI existants s'intègrent.",
  },
  {
    icon: "climate",
    title: "Chauffage et climat",
    text: "Une température par pièce, coordonnée avec la pompe à chaleur. Baisse automatique quand une fenêtre s'ouvre ou que la pièce est vide.",
  },
  {
    icon: "blinds",
    title: "Stores et ombrage",
    text: "Les stores suivent le soleil : fraîcheur en été, chaleur gratuite en hiver. Remontée automatique en cas de vent fort.",
  },
  {
    icon: "access",
    title: "Accès",
    text: "Interphone vidéo, clavier à code, badges NFC. Des droits par personne et par plage horaire, avec un historique des entrées.",
  },
  {
    icon: "security",
    title: "Sécurité",
    text: "Alarme intrusion, détection de fumée et de fuite d'eau, simulation de présence. Une notification sur votre téléphone, où que vous soyez.",
  },
  {
    icon: "audio",
    title: "Audio multiroom",
    text: "Musique par pièce ou par zone, intégrée aux scénarios. La sonnette et les alertes passent aussi par les enceintes.",
  },
  {
    icon: "energy",
    title: "Énergie",
    text: "Autoconsommation solaire, recharge du véhicule, délestage des gros consommateurs et comptage par circuit.",
  },
];
