import type { IconName } from "./icons";

export interface Commitment {
  icon: IconName;
  title: string;
  text: string;
  tags?: string[];
}

export const commitments: Commitment[] = [
  {
    icon: "local",
    title: "Local, pas dans le cloud",
    text: "Le Miniserver exécute toute la logique sur place. Sans internet, le bâtiment fonctionne normalement ; seul l'accès à distance attend.",
  },
  {
    icon: "lock",
    title: "Sécurisé dès la conception",
    text: "Le Miniserver fonctionne sur un réseau séparé de vos appareils personnels. L'accès à distance est chiffré, et chaque utilisateur n'a que les droits dont il a besoin.",
  },
  {
    icon: "plug",
    title: "Ouvert aux standards",
    text: "Vos équipements existants se raccordent.",
    tags: ["KNX", "DALI", "DMX", "Modbus", "M-Bus"],
  },
  {
    icon: "grow",
    title: "Évolutif",
    text: "Une pièce, une borne ou une fonction s'ajoutent des années plus tard, sans reprendre l'installation.",
  },
];
