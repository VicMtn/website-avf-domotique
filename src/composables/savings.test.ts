import { describe, expect, it } from "vitest";
import { estimateSavings, formatChf } from "./savings";

describe("estimateSavings", () => {
  it("additionne tous les postes pour une villa avec solaire et voiture", () => {
    const { total, lines } = estimateSavings({ home: "villa", solar: "oui", car: "oui" });
    expect(lines.every((l) => l.applies)).toBe(true);
    expect(total).toBe(520 + 220 + 200 + 70 + 70);
  });

  it("exclut recharge et solaire quand ils ne s'appliquent pas", () => {
    const { total, lines } = estimateSavings({ home: "appartement", solar: "non", car: "non" });
    expect(lines.filter((l) => !l.applies)).toHaveLength(2);
    expect(total).toBe(110 + 30 + 40);
  });

  it("recharge en heures creuses seulement sans solaire", () => {
    const { lines } = estimateSavings({ home: "villa", solar: "non", car: "bientot" });
    expect(lines[0]).toMatchObject({ applies: true, amount: 260 });
  });
});

describe("formatChf", () => {
  it("formate à la suisse", () => {
    expect(formatChf(1080)).toBe("CHF 1’080");
    expect(formatChf(89.6)).toBe("CHF 90");
  });
});
