# Charte graphique AVF Domotique

Principe : **sobre et lumineux**. Le blanc domine, l'encre porte le texte, la couleur n'apparaît que là où elle a un sens.

## Palette

| Couleur | Hex       | RGB         | Rôle                                                                                | Jeton (code)                         |
| ------- | --------- | ----------- | ----------------------------------------------------------------------------------- | ------------------------------------ |
| Blanc   | `#FFFFFF` | 255 255 255 | Fond principal, texte sur photo ou sur encre                                        | `base-100`                           |
| Encre   | `#1C2630` | 28 38 48    | Titres, texte, boutons principaux, favicon                                          | `base-content`, `primary`, `neutral` |
| Ardoise | `#6B7782` | 107 119 130 | Icônes, lamelles de store, éléments secondaires, grands textes discrets             | `secondary`, `slate`                 |
| Rouge   | `#D7261E` | 215 38 30   | Accent : lien de navigation actif, alerte (alarme de la démo, erreur de formulaire) | `accent`, `error`                    |
| Ambre   | `#EFA93A` | 239 169 58  | **Lumière uniquement** : lampes et soleil de la démo, point du logo                 | `glow`, `warning`                    |

### Teintes dérivées

Calculées à partir de la palette, pour les fonds, les traits et le texte. Ne pas en créer d'autres.

| Teinte           | Hex       | Construction              | Usage                                  | Jeton      |
| ---------------- | --------- | ------------------------- | -------------------------------------- | ---------- |
| Gris clair       | `#F3F4F5` | Ardoise 8 % sur blanc     | Sections alternées, cartes             | `base-200` |
| Gris moyen       | `#E4E7E9` | Ardoise 18 % sur blanc    | Bordures de cartes, vitrage de la démo | `base-300` |
| Trait            | `#D3D6DA` | Ardoise 30 % sur blanc    | Bordures fines                         | `line`     |
| Texte courant    | `#38424D` | Encre 65 % + ardoise 35 % | Paragraphes, chapeaux                  | `text`     |
| Texte secondaire | `#5F6B76` | Ardoise 85 % + encre 15 % | Surtitres, légendes, mentions          | `muted`    |

L'ardoise pure (`#6B7782`) n'atteint que 4,16:1 sur le gris clair : pour les **petits textes**, utiliser le texte secondaire `#5F6B76`.

## Règles d'usage

1. **Le blanc et le gris clair alternent** d'une section à l'autre. Aucune autre couleur de fond de section.
2. **Le rouge reste petit** : un mot, un trait, une icône d'alerte. Jamais en aplat de section, jamais pour un bouton principal.
3. **L'ambre, c'est la lumière** : il apparaît quand quelque chose s'allume ou quand le soleil entre. Pas d'ambre décoratif.
4. **Les boutons principaux sont en encre** (`btn-primary`), texte blanc.
5. **Sur les photos**, le voile de lisibilité est un dégradé d'encre (`from-neutral/80`), jamais du noir pur.
6. Pas d'autres couleurs, pas de dégradés décoratifs, pas d'ombres portées marquées.

## Contrastes (WCAG)

| Texte                      | Sur blanc | Sur gris clair | Verdict                                         |
| -------------------------- | --------- | -------------- | ----------------------------------------------- |
| Encre `#1C2630`            | 15,3:1    | 13,9:1         | AAA                                             |
| Texte courant `#38424D`    | 10,2:1    | 9,3:1          | AAA                                             |
| Texte secondaire `#5F6B76` | 5,5:1     | 5,0:1          | AA                                              |
| Rouge `#D7261E`            | 5,0:1     | 4,6:1          | AA                                              |
| Ardoise `#6B7782`          | 4,6:1     | 4,2:1          | AA sur blanc ; grands textes seulement sur gris |
| Blanc sur encre            | 15,3:1    |                | AAA                                             |
| Ambre `#EFA93A`            | 2,0:1     |                | Jamais pour du texte                            |

## Typographie

- **Inter** (variable), auto-hébergée. Une seule famille.
- Titres : graisse 600, interlettrage serré (−0,025 em).
- Surtitres : 13 px, capitales, interlettrage +0,06 em, texte secondaire.
- Texte : 16 px, interligne 1,6.

## Logo et favicon

- Logo : maison au trait en encre, point ambre (la lumière allumée), « AVF » en encre et « Domotique » en texte secondaire (`#5F6B76`).
- Favicon : carré arrondi encre, maison blanche, point ambre.

## Où c'est défini

- Couleurs et jetons : `src/assets/main.css` (thème daisyUI `avf` et bloc `@theme`). Toute modification de couleur passe par ce fichier **et** par cette charte.
- Favicon : `public/favicon.svg`. Image de partage : `public/og-image.jpg`.
