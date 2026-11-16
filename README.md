# avf-domotique.ch

Site vitrine d'AVF Domotique Sàrl (Etoy, VD) : installation de domotique Loxone.

**Stack** : Vue 3 + TypeScript, Vite, Tailwind CSS v4, daisyUI 5, pré-rendu statique avec `vite-ssg`.

## Commandes

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # vérifie les types puis génère le site statique dans dist/
npm run preview    # sert dist/
npm test           # tests unitaires (Vitest)
npm run lint       # ESLint (Vue + TypeScript)
npm run format     # Prettier, tri des classes Tailwind compris
```

## Structure

- `src/content/` : textes et données (coordonnées, navigation…). **Les valeurs entre crochets sont à compléter.**
- `src/composables/` : logique partagée (métadonnées, section active, brouillon du formulaire)
- `src/pages/` : une page par route (`routes.ts`)
- `src/components/layout/` : en-tête, pied de page
- `src/components/ui/` : petits composants réutilisables
- `src/assets/main.css` : thème daisyUI `avf` et styles de base
- `public/` : fichiers copiés tels quels (`favicon.svg`, `.htaccess`, `robots.txt`)

## Mise en ligne

Envoyer **le contenu** de `dist/` à la racine du domaine, y compris le fichier caché `.htaccess`.
Chaque page est générée en HTML (`/mentions-legales/index.html`…), la 404 sous `/404/`.

## Formulaire de contact

Envoi via [Web3Forms](https://docs.web3forms.com), isolé dans `src/services/contact.ts` (requête JSON).

1. Créer une clé sur https://web3forms.com avec l'adresse `info@avf-domotique.ch`.
2. Copier `.env.example` en `.env.local` et renseigner `VITE_CONTACT_ACCESS_KEY` (la clé est publique par conception).
3. Rebuilder : la clé est intégrée au JavaScript au moment du build.

Sans clé : envoi simulé en développement ; en production, le formulaire affiche une erreur et propose l'e-mail direct.
