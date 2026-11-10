export interface Member {
  name: string;
  role: string;
  text: string;
  /** Photo à ajouter (src/assets/img/team/…) ; à défaut, l'initiale est affichée */
  photo?: string;
}

export const team: Member[] = [
  {
    name: "Adrian",
    role: "Automation et programmation",
    text: "Automaticien, il conçoit la logique du bâtiment, les liaisons avec les équipements existants et la mise en service.",
  },
  {
    name: "Victorien",
    role: "Informatique et réseau",
    text: "Informaticien, il prend en charge le réseau, l'accès à distance et la cybersécurité de l'installation.",
  },
  {
    name: "Florent",
    role: "Électricité et chantier",
    text: "Électricien, il réalise l'installation et coordonne le chantier avec les autres corps de métier.",
  },
];
