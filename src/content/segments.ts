import type { Picture } from "vite-imagetools";
import kitchen from "@/assets/img/kitchen.jpg?w=400;640&picture";
import shop from "@/assets/img/shop.jpg?w=400;500&picture";
import dining from "@/assets/img/dining.jpg?w=400;640&picture";
import office from "@/assets/img/office.jpg?w=400;500&picture";

export type SegmentId = "residence" | "commerce" | "hotellerie" | "entreprise";

export interface Segment {
  id: SegmentId;
  name: string;
  examples: string;
  image: Picture;
  title: string;
  text: string;
  points: { title: string; text: string }[];
  /** Projet type */
  caseStudy: string;
  gear: string[];
}

export const segments: Segment[] = [
  {
    id: "residence",
    name: "Résidences",
    examples: "Villas, appartements, PPE",
    image: kitchen,
    title: "Plus de confort au quotidien, moins d'énergie gaspillée.",
    text: "En construction comme en rénovation, l'installation suit votre façon de vivre. Les interrupteurs restent des interrupteurs ; la maison s'occupe du reste.",
    points: [
      {
        title: "Climat par pièce",
        text: "Coordonné avec votre pompe à chaleur, avec un mode éco automatique en votre absence.",
      },
      { title: "Solaire en priorité", text: "Boiler, chauffage et véhicule alimentés d'abord par vos panneaux." },
      { title: "Lumière et ombrage", text: "Scénarios par moment de la journée, stores réglés sur le soleil." },
      { title: "Sécurité", text: "Alarme, fumée, fuite d'eau et interphone vidéo sur votre téléphone." },
    ],
    caseStudy:
      "Villa familiale rénovée : régulation par pièce sur la pompe à chaleur existante, stores selon l'ensoleillement, éclairage par présence dans les circulations, recharge solaire du véhicule.",
    gear: ["Miniserver Compact", "Touch Pure Flex", "Valve Actuator", "Presence Sensor", "Wallbox"],
  },
  {
    id: "commerce",
    name: "Commerces",
    examples: "Boutiques, showrooms, agences",
    image: shop,
    title: "Votre point de vente s'ouvre et se ferme d'un seul geste.",
    text: "Vitrine, éclairage de vente, climat, alarme et accès du personnel suivent vos horaires d'ouverture. Vous gagnez du temps matin et soir, et vous maîtrisez vos consommations.",
    points: [
      {
        title: "Éclairage selon les horaires",
        text: "Vitrine mise en valeur le soir, extinction automatique la nuit.",
      },
      { title: "Ouverture et fermeture", text: "Lumière, climat, stores et alarme pilotés par un badge." },
      { title: "Accès du personnel", text: "Badges par employé et par plage horaire, historique des entrées." },
      { title: "Suivi énergétique", text: "Vous voyez ce que consomment l'éclairage, le froid et la climatisation." },
    ],
    caseStudy:
      "Boutique en vieille ville : scénario d'ouverture au badge, vitrine programmée jusqu'à 22 h, climatisation coupée à la fermeture, alerte en cas d'intrusion.",
    gear: ["NFC Code Touch", "LED Spot RGBW", "AC Control Air", "Energy Meter", "Intercom"],
  },
  {
    id: "hotellerie",
    name: "Hôtellerie",
    examples: "Bars, restaurants, hôtels",
    image: dining,
    title: "La juste ambiance à chaque moment du service.",
    text: "Du café du matin au dernier verre, lumière, musique et climat suivent le rythme de l'établissement. L'équipe se consacre aux clients, pas aux interrupteurs.",
    points: [
      { title: "Ambiances par moment", text: "Midi, soirée, événement : lumière et musique changent d'un geste." },
      { title: "Audio par zone", text: "Salle, terrasse et sanitaires avec des volumes distincts." },
      { title: "Qualité de l'air", text: "Ventilation selon le CO₂ et l'affluence." },
      { title: "Chambres prêtes", text: "Climat et lumière d'accueil activés à l'arrivée du client." },
    ],
    caseStudy:
      "Bar à cocktails : quatre ambiances programmées, audio multiroom salle et terrasse, extraction pilotée par le CO₂, scénario de fermeture qui éteint tout et arme l'alarme.",
    gear: ["Audioserver", "Install Speaker", "LED Pendulum Slim", "Touch Pure Flex CO₂", "Leaf"],
  },
  {
    id: "entreprise",
    name: "Bureaux et industrie",
    examples: "Bureaux, cabinets, ateliers, halles",
    image: office,
    title: "Des locaux qui s'adaptent à l'occupation réelle.",
    text: "Lumière et climat suivent la présence et la lumière du jour, l'accès se gère par badge. Issus de l'automation, nous dialoguons aussi avec vos automates et vos compteurs.",
    points: [
      { title: "Présence et lumière du jour", text: "Rien ne reste allumé ni chauffé dans un bureau vide." },
      { title: "Contrôle d'accès", text: "Badges par collaborateur ou par équipe, interphone vidéo à l'accueil." },
      { title: "Comptage énergétique", text: "Consommation par zone, par ligne ou par machine." },
      { title: "Intégration Modbus", text: "Échange de données avec automates et équipements techniques." },
    ],
    caseStudy:
      "Cabinet de douze postes : présence et lumière du jour par zone, deux salles de réunion avec scénarios, accès par badge, rapport mensuel de consommation.",
    gear: ["Presence Sensor", "NFC Code Touch", "DALI Extension", "Modbus Extension", "Energy Meter 3-Phase"],
  },
];
