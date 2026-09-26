# Radio Télé Différence — site officiel

Site statique responsive, en français, kreyòl ayisyen et anglais. Identité bleu royal, rouge, blanc et or. Aucune installation de dépendances, aucun service payant et aucune compilation nécessaires pour GitHub Pages.

## Publier sur GitHub Pages

1. Décompressez le ZIP. Ouvrez le dossier `rtd-radio`.
2. Créez un dépôt GitHub public, par exemple `rtd-radio`.
3. Ajoutez **le contenu du dossier** à la racine du dépôt : `index.html`, `styles.css`, les fichiers JavaScript, le dossier `assets`, etc. `index.html` doit apparaître directement à la racine du dépôt, pas dans un sous-dossier supplémentaire. Conservez aussi `.nojekyll`.
4. Dans le dépôt : **Settings → Pages → Build and deployment → Source → Deploy from a branch**.
5. Sélectionnez la branche **main**, le dossier **/ (root)**, puis **Save**.
6. Attendez la fin du déploiement. L’adresse sera généralement `https://VOTRE-COMPTE.github.io/rtd-radio/`. GitHub peut prendre quelques minutes pour publier.

Les chemins locaux commencent par `./` : le site fonctionne à la racine d’un domaine ou dans un sous-dossier GitHub Pages. Aucun fichier ne dépend d’un chemin local de l’ordinateur.

Guide officiel : [GitHub Pages](https://docs.github.com/en/pages/quickstart).

### Avec Git, si vous le préférez

Dans le dossier `rtd-radio`, après avoir créé un dépôt GitHub vide :

```sh
git init
git add .
git commit -m "Créer le site Radio Télé Différence"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/rtd-radio.git
git push -u origin main
```

Activez ensuite Pages comme indiqué ci-dessus. Aucun dépôt n’a été créé ni publié automatiquement lors de la livraison.

## Consulter en local

Ouvrez `index.html` pour consulter le site. Pour tester le cache hors connexion et les fonctions PWA, utilisez un serveur local, par exemple avec Python installé :

```sh
python -m http.server 8080
```

Ouvrez ensuite `http://localhost:8080/`. La radio nécessite Internet et un clic sur Lecture. Les navigateurs limitent la lecture automatique : c’est volontairement désactivé.

## Le flux radio

Le lecteur utilise actuellement le flux public :

`https://stream.zeno.fm/105053xy1a0uv`

Ce flux est référencé pour Radio Télé Différence de Boston par [TingFM](https://tingfm.com/radio/39603?lang=en) et [RadioStationsUSA](https://radiostationsusa.com/massachusetts/boston/radio-tele-difference-boston/). La [page Zeno de RTD](https://zeno.fm/radio/radio-tele-difference-105-1-fm/) est proposée comme solution de secours externe.

À la vérification du 25 septembre 2026 (heure de Boston), ce flux a transmis des données audio. Le flux `https://stream.zeno.fm/k61dv2xyla0uv`, déduit du point de montage source initial, a renvoyé HTTP 404. Il n’est donc pas utilisé comme premier choix, et aucun passage silencieux vers une station différente n’a été ajouté.

Pour changer le flux, modifiez **uniquement** `RTD_CONFIG.stream` dans `content.js` avec l’URL publique HTTPS d’écoute fournie par Zeno. L’adresse source destinée à l’encodeur, le nom d’utilisateur et le mot de passe ne sont jamais nécessaires aux auditeurs. Aucun mot de passe source n’est inclus dans cette livraison. Le secret partagé précédemment doit être renouvelé dans le compte Zeno.

Le lecteur gère : connexion, lecture, arrêt, volume, temporisation d’environ 20 secondes, erreur réseau et reprise manuelle. Le visuel animé ne s’active que lorsque le navigateur signale la lecture. Il s’agit d’une animation décorative, pas d’une analyse du son. L’heure affichée est celle de Boston, avec changement automatique heure d’été/hiver. Aucune émission « en cours » ni aucun nombre d’auditeurs ne sont inventés.

## Modifier les textes, émissions et actualités

- `index.html` : structure et textes français disponibles dès le chargement.
- `translations.js` : tous les textes FR / HT / EN. Les clés sont partagées entre les langues. Le créole utilise le code standard `ht`, et le sélecteur affiche Kreyòl.
- `styles.css` : couleurs, responsive, typographie, animations et présentation. Les couleurs sont explicites et le rendu ne dépend pas d’une feuille de style externe.
- `content.js` : flux public, liste des programmes et articles.
- `legal.js` : textes de confidentialité et conditions dans les trois langues.
- `app.js` : lecteur, langues, navigation, fenêtres d’information et préférences.
- `assets/` : logo et photographies fournis, favicon et icônes d’application.

Les rubriques actuelles sont des thèmes de la radio, **pas une grille contractuelle d’émissions**. Les horaires et l’actualité n’étant pas fournis, les listes sont vides avec une présentation honnête destinée aux visiteurs.

Ajoutez des émissions confirmées dans `RTD_PROGRAMS`, par exemple :

```js
window.RTD_PROGRAMS = [
  {
    title: { fr: 'Nom confirmé', ht: 'Non konfime', en: 'Confirmed title' },
    detail: {
      fr: 'Lundi à 10 h · heure de Boston',
      ht: 'Lendi a 10 è · lè Boston',
      en: 'Monday at 10 a.m. · Boston time'
    }
  }
];
```

Ajoutez les publications approuvées dans `RTD_ARTICLES` :

```js
window.RTD_ARTICLES = [
  {
    date: '2026-09-25',
    title: { fr: 'Titre', ht: 'Tit', en: 'Title' },
    body: { fr: 'Texte validé.', ht: 'Tèks valide.', en: 'Approved text.' }
  }
];
```

Ces exemples expliquent le format et ne figurent pas dans les listes livrées. Les textes de ces listes sont affichés comme texte simple ; le HTML n’est pas exécuté. Quand une liste est remplie, son message d’attente disparaît. Pour une rédaction à plusieurs personnes, le dépôt peut servir de point de départ à un futur CMS, sans dépendance obligatoire aujourd’hui.

## Images et identité

`logo.png` est le logo original. `fondateur.jpg` est le portrait de Saint Jules Philippe fourni dans la conversation, utilisé dans l’accueil et la présentation. `studio-original.jpg` conserve la deuxième photo telle que reçue (capture avec marges de téléphone). Les icônes 192 et 512 sont des réductions du logo fourni. Aucune photo générique ne remplace le fondateur.

Le menu utilise des icônes vectorielles et les commandes de lecture utilisent du SVG, sans emoji. Les couleurs sont fixes en mode clair, même si l’appareil préfère un thème sombre. Les animations respectent `prefers-reduced-motion`.

## Confidentialité, cookies et contact

Les fenêtres Confidentialité, Conditions et Cookies & préférences sont accessibles dans le pied de page. Les pages `privacy.html` et `terms.html` restent aussi lisibles sans JavaScript. Aucun outil de suivi, aucune police distante et aucun cookie publicitaire ne sont ajoutés par le site.

Le flux Zeno n’est demandé qu’après un clic sur Lecture. Le stockage de la langue et du volume est désactivé par défaut. L’utilisateur peut l’activer, puis le supprimer dans les préférences. Le cache PWA ne contient que les fichiers publics du site. Zeno et GitHub ont leurs propres pratiques, indiquées dans la confidentialité. Les coordonnées ouvrent directement la messagerie ou le téléphone ; aucun formulaire ne prétend envoyer des messages sans service d’envoi.

Les textes décrivent les fonctions livrées. Mettez-les à jour si vous ajoutez des publicités, un formulaire, une newsletter ou une mesure d’audience.

## SEO, partage et application

Le site contient un titre, une description, des balises OpenGraph, des titres structurés, une favicon et un manifeste PWA. Le contenu principal français existe dans le HTML. Les autres langues sont disponibles avec le sélecteur ; elles ne disposent pas encore d’URL distinctes indexables.

Après avoir choisi l’adresse définitive du site, ajoutez dans le `<head>` de `index.html` :

```html
<link rel="canonical" href="https://VOTRE-COMPTE.github.io/rtd-radio/">
<meta property="og:url" content="https://VOTRE-COMPTE.github.io/rtd-radio/">
<meta property="og:image" content="https://VOTRE-COMPTE.github.io/rtd-radio/assets/logo.png">
<meta property="og:image:alt" content="Logo Radio Télé Différence">
```

Les URL absolues de partage ne sont pas inventées avant de connaître votre domaine. Aucun domaine, fichier CNAME ou lien social non confirmé n’a été ajouté.

Le manifeste et le service worker permettent l’installation sur les navigateurs compatibles et le cache des pages publiques. **La radio ne fonctionne pas hors connexion.** Le navigateur décide de proposer ou non l’installation. Après une modification importante, incrémentez `rtd-shell-v1` dans `sw.js` pour nettoyer le cache de la version précédente. Les requêtes en ligne passent d’abord par le réseau afin de récupérer le contenu actuel. Fermez puis rouvrez les onglets si une ancienne version du service worker attend son activation.

## Vérifications avant publication

- Vérifiez les coordonnées, les contenus et le flux dans votre navigateur.
- Conservez les noms et la casse des fichiers ; GitHub Pages distingue majuscules et minuscules.
- Gardez `index.html` et `styles.css` au même niveau et le dossier `assets` complet.
- Ne remplacez pas les chemins `./assets/...` par `/assets/...` dans un dépôt publié en sous-dossier.
- Après publication, testez le lecteur sur votre téléphone. La disponibilité du direct dépend de Zeno et du diffuseur.

Tous les fichiers nécessaires à la publication sont dans ce dossier. Le projet ne contient aucun mot de passe, aucune clé privée, aucun dossier de dépendances et aucune étape de compilation.
