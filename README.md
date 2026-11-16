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

## Charte graphique

Palette, règles d'usage et contrastes : voir [`CHARTE.md`](CHARTE.md).

## Structure

- `src/content/` : textes et données (coordonnées, navigation…). **Les valeurs entre crochets sont à compléter.**
- `src/composables/` : logique partagée (métadonnées, section active, brouillon du formulaire)
- `src/pages/` : une page par route (`routes.ts`)
- `src/components/layout/` : en-tête, pied de page
- `src/components/ui/` : petits composants réutilisables
- `src/assets/main.css` : thème daisyUI `avf` et styles de base
- `public/` : fichiers copiés tels quels (`favicon.svg`, `.htaccess`, `robots.txt`)

## Mise en ligne (Infomaniak)

### Première mise en ligne

1. **Manager Infomaniak > Hébergement** : créer le site `avf-domotique.ch` et noter son **dossier racine** (souvent `/sites/avf-domotique.ch`).
2. **Certificat SSL** : dans les réglages du site, activer le certificat Let's Encrypt pour `avf-domotique.ch` et `www.avf-domotique.ch`, puis l'option qui **force le HTTPS**.
3. **www** : rediriger `www.avf-domotique.ch` vers `avf-domotique.ch` (redirection 301 dans les réglages du site).
4. **Accès** : dans **FTP / SSH**, créer un compte et noter l'hôte, l'utilisateur et le mot de passe.

### À chaque mise à jour

1. Vérifier que `.env.local` contient la clé Web3Forms (elle est intégrée au build).
2. Construire et vérifier :
   ```bash
   npm ci && npm run lint && npm test && npm run build
   npm run preview   # contrôle local de dist/
   ```
3. Envoyer **le contenu** de `dist/` (fichier caché `.htaccess` compris) dans le dossier racine :
   - **SSH / rsync** (recommandé) : essai à blanc avec `-n`, puis envoi réel ; `--delete` retire les anciens fichiers.
     ```bash
     rsync -avzn --delete dist/ UTILISATEUR@HOTE:/sites/avf-domotique.ch/
     rsync -avz  --delete dist/ UTILISATEUR@HOTE:/sites/avf-domotique.ch/
     ```
   - **SFTP** (FileZilla…) : afficher les fichiers cachés, supprimer l'ancien contenu, puis déposer celui de `dist/`.

### Vérifications après mise en ligne

- `https://avf-domotique.ch/`, `/confidentialite/`, `/mentions-legales/` s'affichent ; `http://` et `www` redirigent vers `https://avf-domotique.ch/`.
- Une adresse inexistante (`/test`) affiche la page 404 du site.
- Le formulaire envoie bien un e-mail à `info@avf-domotique.ch` depuis le site en ligne.
- `https://avf-domotique.ch/sitemap.xml` et `/robots.txt` répondent.
- En-têtes : `curl -I https://avf-domotique.ch/` montre `x-content-type-options: nosniff`.
- Aperçu de partage : coller l'URL dans un message (WhatsApp, LinkedIn…) affiche l'image et le titre.

### Ensuite

- **Google Search Console** : ajouter le domaine, puis soumettre `https://avf-domotique.ch/sitemap.xml`.
- **Google Business Profile** : fiche « AVF Domotique » à Etoy, avec le lien vers le site.

## Formulaire de contact

Envoi via [Web3Forms](https://docs.web3forms.com), isolé dans `src/services/contact.ts` (requête JSON).

1. Créer une clé sur https://web3forms.com avec l'adresse `info@avf-domotique.ch`.
2. Copier `.env.example` en `.env.local` et renseigner `VITE_CONTACT_ACCESS_KEY` (la clé est publique par conception).
3. Rebuilder : la clé est intégrée au JavaScript au moment du build.

Sans clé : envoi simulé en développement ; en production, le formulaire affiche une erreur et propose l'e-mail direct.
