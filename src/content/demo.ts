/**
 * Démo interactive : plans (géométrie SVG, viewBox 600×420) et scènes.
 * Repris du prototype avf.v1 (plan maison + commerce).
 */

export interface Point {
  x: number;
  y: number;
}

export interface Room {
  id: string;
  name: string;
  /** Étiquette affichée sur le plan si le nom est trop long */
  short?: string;
  /** Zone cliquable */
  area: { x: number; y: number; w: number; h: number };
  /** Halo de lumière */
  pool: { cx: number; cy: number; rx: number; ry: number };
  bulbs: (Point & { r?: number })[];
  label: Point;
  /** Position de la température ; absente = pas de régulation affichée */
  temp?: Point;
  /** Anneau d'alarme (détecteur) */
  alarm?: Point & { r: number };
}

export interface Scene {
  id: string;
  label: string;
  lights: string[];
  /** 0 = stores ouverts, 1 = fermés */
  blinds: number;
  /** Soleil dehors : la lumière du jour entre par les fenêtres non ombragées */
  daylight: boolean;
  temps: Record<string, number>;
  alarm: boolean;
  story: string;
}

export interface FloorPlan {
  id: string;
  label: string;
  description: string;
  rooms: Room[];
  windows: { x: number; y: number; w: number; h: number }[];
  walls: string;
  partitions: string;
  /** Tracés pointillés (portes, limites) */
  dashed: { d: string; dash: string; opacity?: number }[];
  /** Pièce affichée dans le résumé « Chauffage » */
  heatRoom: string;
  initialScene: string;
  scenes: Scene[];
}

export const plans: FloorPlan[] = [
  {
    id: "maison",
    label: "Maison",
    description: "Plan d'une maison de cinq pièces montrant l'état des lumières, des stores et du chauffage.",
    rooms: [
      {
        id: "sejour",
        name: "Séjour",
        area: { x: 20, y: 20, w: 320, h: 230 },
        pool: { cx: 180, cy: 135, rx: 170, ry: 125 },
        bulbs: [{ x: 180, y: 135 }],
        label: { x: 36, y: 232 },
        temp: { x: 270, y: 232 },
      },
      {
        id: "cuisine",
        name: "Cuisine",
        area: { x: 340, y: 20, w: 240, h: 180 },
        pool: { cx: 460, cy: 110, rx: 130, ry: 100 },
        bulbs: [{ x: 460, y: 110 }],
        label: { x: 356, y: 184 },
        temp: { x: 510, y: 184 },
      },
      {
        id: "chambre",
        name: "Chambre",
        area: { x: 340, y: 200, w: 240, h: 200 },
        pool: { cx: 460, cy: 300, rx: 130, ry: 110 },
        bulbs: [{ x: 460, y: 300 }],
        label: { x: 356, y: 384 },
        temp: { x: 510, y: 384 },
      },
      {
        id: "sdb",
        name: "Salle de bain",
        short: "Bains",
        area: { x: 180, y: 250, w: 160, h: 150 },
        pool: { cx: 260, cy: 325, rx: 90, ry: 85 },
        bulbs: [{ x: 260, y: 325 }],
        label: { x: 194, y: 384 },
        temp: { x: 272, y: 384 },
      },
      {
        id: "entree",
        name: "Entrée",
        area: { x: 20, y: 250, w: 160, h: 150 },
        pool: { cx: 100, cy: 325, rx: 90, ry: 85 },
        bulbs: [{ x: 100, y: 325 }],
        label: { x: 36, y: 384 },
        alarm: { x: 100, y: 325, r: 22 },
      },
    ],
    windows: [
      { x: 70, y: 14, w: 200, h: 14 },
      { x: 400, y: 14, w: 120, h: 14 },
      { x: 572, y: 250, w: 14, h: 110 },
      { x: 14, y: 60, w: 14, h: 140 },
    ],
    walls: "M20 20 H70 M270 20 H400 M520 20 H580 V250 M580 360 V400 H20 V200 M20 60 V20",
    partitions:
      "M340 20 V140 M340 180 V250 M340 300 V400 M340 200 H420 M470 200 H580 M20 250 H60 M110 250 H340 M180 250 V300 M180 345 V400",
    dashed: [{ d: "M60 400 A44 44 0 0 1 104 356", dash: "3 3" }],
    heatRoom: "sejour",
    initialScene: "soiree",
    scenes: [
      {
        id: "matin",
        label: "Matin",
        lights: ["cuisine", "sdb"],
        blinds: 0,
        daylight: true,
        temps: { sejour: 21, cuisine: 20, chambre: 19, sdb: 23 },
        alarm: false,
        story: "6 h 45 : la salle de bain est déjà chaude, les stores s'ouvrent et la cuisine s'éclaire doucement.",
      },
      {
        id: "depart",
        label: "Je pars",
        lights: [],
        blinds: 0.6,
        daylight: true,
        temps: { sejour: 17, cuisine: 17, chambre: 17, sdb: 17 },
        alarm: true,
        story:
          "Un appui sur le Touch de l'entrée : tout s'éteint, le chauffage passe en éco, les stores ombragent et l'alarme s'arme.",
      },
      {
        id: "soiree",
        label: "Soirée",
        lights: ["sejour", "cuisine", "entree"],
        blinds: 1,
        daylight: false,
        temps: { sejour: 21.5, cuisine: 21, chambre: 19, sdb: 22 },
        alarm: false,
        story: "À la tombée du jour, les stores descendent et le séjour passe en lumière chaude.",
      },
      {
        id: "nuit",
        label: "Nuit",
        lights: [],
        blinds: 1,
        daylight: false,
        temps: { sejour: 18, cuisine: 17, chambre: 18, sdb: 19 },
        alarm: true,
        story:
          "Bonne nuit : toutes les lumières s'éteignent, la maison baisse le chauffage et surveille portes et fenêtres.",
      },
    ],
  },
  {
    id: "commerce",
    label: "Commerce",
    description: "Plan d'un commerce avec surface de vente, vitrine, réserve, bureau et sanitaires.",
    rooms: [
      {
        id: "vente",
        name: "Surface de vente",
        area: { x: 20, y: 20, w: 380, h: 300 },
        pool: { cx: 210, cy: 165, rx: 190, ry: 150 },
        bulbs: [
          { x: 130, y: 165 },
          { x: 290, y: 165 },
        ],
        label: { x: 36, y: 304 },
        temp: { x: 334, y: 304 },
      },
      {
        id: "vitrine",
        name: "Vitrine",
        area: { x: 20, y: 320, w: 380, h: 80 },
        pool: { cx: 190, cy: 362, rx: 185, ry: 55 },
        bulbs: [
          { x: 110, y: 360, r: 6 },
          { x: 200, y: 360, r: 6 },
          { x: 290, y: 360, r: 6 },
        ],
        label: { x: 36, y: 384 },
        alarm: { x: 372, y: 374, r: 16 },
      },
      {
        id: "reserve",
        name: "Réserve",
        area: { x: 400, y: 20, w: 180, h: 180 },
        pool: { cx: 490, cy: 105, rx: 100, ry: 95 },
        bulbs: [{ x: 490, y: 105 }],
        label: { x: 416, y: 184 },
        temp: { x: 518, y: 184 },
      },
      {
        id: "bureau",
        name: "Bureau",
        area: { x: 400, y: 200, w: 180, h: 130 },
        pool: { cx: 490, cy: 262, rx: 100, ry: 70 },
        bulbs: [{ x: 490, y: 258 }],
        label: { x: 416, y: 316 },
        temp: { x: 518, y: 316 },
      },
      {
        id: "sanitaires",
        name: "Sanitaires",
        area: { x: 400, y: 330, w: 180, h: 70 },
        pool: { cx: 490, cy: 365, rx: 95, ry: 40 },
        bulbs: [{ x: 545, y: 362, r: 6 }],
        label: { x: 416, y: 384 },
      },
    ],
    windows: [
      { x: 120, y: 14, w: 180, h: 14 },
      { x: 40, y: 392, w: 300, h: 14 },
      { x: 572, y: 220, w: 14, h: 90 },
    ],
    walls: "M120 20 H20 V400 H40 M340 400 H350 M395 400 H580 V310 M580 220 V20 H300",
    partitions: "M400 20 V140 M400 180 V240 M400 280 V400 M400 200 H580 M400 330 H470 M520 330 H580",
    dashed: [
      { d: "M20 320 H400", dash: "2 5", opacity: 0.5 },
      { d: "M350 400 A45 45 0 0 1 395 355", dash: "3 3" },
    ],
    heatRoom: "vente",
    initialScene: "ouverture",
    scenes: [
      {
        id: "ouverture",
        label: "Ouverture",
        lights: ["vente", "vitrine", "bureau"],
        blinds: 0,
        daylight: true,
        temps: { vente: 20, reserve: 16, bureau: 21 },
        alarm: false,
        story:
          "8 h 45 : le badge du premier employé désarme l'alarme, la boutique s'éclaire et le chauffage est déjà à température.",
      },
      {
        id: "journee",
        label: "Journée",
        lights: ["vente", "vitrine"],
        blinds: 0.5,
        daylight: true,
        temps: { vente: 20, reserve: 16, bureau: 21 },
        alarm: false,
        story:
          "Plein soleil : les stores ombragent la vitrine sans cacher les produits, l'éclairage s'ajuste à la lumière du jour.",
      },
      {
        id: "fermeture",
        label: "Fermeture",
        lights: ["vitrine"],
        blinds: 0,
        daylight: false,
        temps: { vente: 16, reserve: 15, bureau: 16 },
        alarm: true,
        story: "19 h : un badge en sortant. Tout s'éteint sauf la vitrine, allumée jusqu'à 22 h, et l'alarme s'arme.",
      },
      {
        id: "nuit",
        label: "Nuit",
        lights: [],
        blinds: 1,
        daylight: false,
        temps: { vente: 15, reserve: 14, bureau: 15 },
        alarm: true,
        story:
          "La nuit, la vitrine s'éteint et les stores se ferment. En cas d'intrusion, l'alerte arrive sur votre téléphone.",
      },
    ],
  },
];

/** « 21,5° » ; formatage manuel pour un rendu identique sous Node (pré-rendu) et dans le navigateur */
export const formatTemp = (t: number): string => `${String(Math.round(t * 10) / 10).replace(".", ",")}°`;
