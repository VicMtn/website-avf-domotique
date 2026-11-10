/**
 * Estimation des économies annuelles (CHF). Ordres de grandeur prudents
 * pour un foyer en Suisse romande, tarif moyen 0,30 CHF/kWh.
 * Montants à ajuster ici uniquement.
 */

export type Home = "appartement" | "villa" | "grande-villa";
export type Solar = "non" | "oui" | "prevu";
export type Car = "non" | "oui" | "bientot";

export interface Answers {
  home: Home;
  solar: Solar;
  car: Car;
}

export interface SavingsLine {
  label: string;
  /** 0 si le poste ne s'applique pas */
  amount: number;
  applies: boolean;
}

/** Chauffage par pièce + abaissement en absence */
const HEATING: Record<Home, number> = { appartement: 110, villa: 220, "grande-villa": 360 };
/** Éclairage selon la présence */
const LIGHTING: Record<Home, number> = { appartement: 40, villa: 70, "grande-villa": 110 };
/** Ombrage automatique (moins de surchauffe, apports d'hiver) */
const SHADING: Record<Home, number> = { appartement: 30, villa: 70, "grande-villa": 120 };
/** Boiler et appareils sur la production solaire */
const SELF_CONSUMPTION: Record<Solar, number> = { non: 0, oui: 200, prevu: 200 };
/** Recharge : heures creuses seules, ou surplus solaire + heures creuses */
const CAR_CHARGING: Record<Solar, number> = { non: 260, oui: 520, prevu: 520 };

export function estimateSavings(a: Answers): { lines: SavingsLine[]; total: number } {
  const hasCar = a.car !== "non";
  const hasSolar = a.solar !== "non";
  const lines: SavingsLine[] = [
    { label: "Recharge de la voiture au bon moment", amount: hasCar ? CAR_CHARGING[a.solar] : 0, applies: hasCar },
    { label: "Chauffage seulement quand vous êtes là", amount: HEATING[a.home], applies: true },
    { label: "Boiler et appareils sur le solaire", amount: SELF_CONSUMPTION[a.solar], applies: hasSolar },
    { label: "Stores qui suivent le soleil", amount: SHADING[a.home], applies: true },
    { label: "Lumières éteintes dans les pièces vides", amount: LIGHTING[a.home], applies: true },
  ];
  const total = lines.reduce((sum, l) => sum + (l.applies ? l.amount : 0), 0);
  return { lines, total };
}

/**
 * « CHF 1’240 » : format suisse, arrondi au franc.
 * Formatage manuel : Intl ne donne pas le même séparateur sous Node et dans les navigateurs,
 * ce qui casserait l'hydratation du HTML pré-rendu.
 */
export function formatChf(amount: number): string {
  const digits = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, "’");
  return `CHF ${digits}`;
}
