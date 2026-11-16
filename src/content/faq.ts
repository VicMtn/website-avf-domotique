export interface Faq {
  q: string;
  a: string;
}

export const faq: Faq[] = [
  {
    q: "Combien coûte une installation ?",
    a: "Tout dépend de la surface et des fonctions choisies. Un premier projet peut se limiter à l'éclairage et aux stores d'une pièce de vie. Après la visite, nous vous remettons une offre détaillée et gratuite.",
  },
  {
    q: "Pourquoi Loxone plutôt qu'un autre système ?",
    a: "Un seul système et une seule application pour l'éclairage, le climat, les stores, les accès, la sécurité, l'audio et l'énergie. La logique tourne localement, dans le bâtiment, et l'écosystème s'ouvre aux standards du bâtiment.",
  },
  {
    q: "Est-ce possible en rénovation ?",
    a: "Oui. En construction neuve, nous câblons avec Loxone Tree. En rénovation, la gamme sans fil Air évite d'ouvrir les murs. Les deux se combinent.",
  },
  {
    q: "Faut-il tout installer d'un coup ?",
    a: "Non. On peut commencer par une fonction et ajouter le chauffage, l'audio ou la sécurité plus tard, sans rien remplacer.",
  },
  {
    q: "Pouvez-vous intégrer nos équipements existants ?",
    a: "Le plus souvent, oui : pompe à chaleur, climatisation, onduleur solaire, portes de garage, compteurs, automates via Modbus. Nous le vérifions lors de la visite.",
  },
  {
    q: "Que se passe-t-il si internet est coupé ?",
    a: "Rien ne change sur place. Interrupteurs, automatismes et application sur le Wi-Fi restent opérationnels. Seul l'accès à distance attend le retour de la connexion.",
  },
  {
    q: "Mes données restent-elles chez moi ?",
    a: "Oui. La configuration et l'historique sont stockés sur le Miniserver, dans votre bâtiment. L'accès à distance est chiffré et vous décidez qui y a droit.",
  },
  {
    q: "Proposez-vous un contrat de maintenance ?",
    a: "Oui : mises à jour, surveillance à distance, interventions prioritaires et évolutions de la programmation.",
  },
];
