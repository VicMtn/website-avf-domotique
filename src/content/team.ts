import type { IconName } from "./icons";

export interface Skill {
  title: string;
  role: string;
  text: string;
  icon: IconName;
}

/** Les trois métiers réunis dans l'équipe */
export const team: Skill[] = [
  {
    title: "L'automaticien",
    role: "Automation et programmation",
    text: "Conçoit la logique du bâtiment, relie les équipements existants et assure la mise en service, fonction par fonction.",
    icon: "automation",
  },
  {
    title: "L'informaticien",
    role: "Informatique et réseau",
    text: "Installe le réseau, sécurise l'accès à distance et veille à la cybersécurité de l'installation.",
    icon: "network",
  },
  {
    title: "L'électricien",
    role: "Électricité et chantier",
    text: "Réalise l'installation électrique et coordonne le chantier avec les autres corps de métier.",
    icon: "energy",
  },
];
