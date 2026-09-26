# Contrôles de livraison

Vérifications effectuées le 25 septembre 2026 (heure de Boston), dans Microsoft Edge sur Windows.

- Rendu contrôlé visuellement sur ordinateur et mobile : bleu royal, rouge et or présents ; images du logo et du fondateur visibles.
- Quinze combinaisons testées : largeurs 320, 390, 768, 1 024 et 1 440 pixels, chacune en français, créole et anglais. Aucun débordement horizontal détecté.
- Images locales chargées ; références locales contrôlées ; aucun chemin d’asset absolu commençant par `/`.
- Aucune erreur JavaScript détectée pendant les parcours testés.
- Lecture audio réelle confirmée : le navigateur atteint l’état de lecture avec une progression de plus de 10 secondes sur le flux public configuré. Arrêter libère la source audio.
- Flux indisponible : message traduit et retour du bouton à l’état de lecture possible. Le lecteur ne prétend pas être en direct en cas d’échec.
- Aucune requête vers Zeno avant action sur Lecture. Aucun stockage de préférence par défaut.
- Activation de la mémorisation : la langue choisie est restaurée après rechargement. Désactivation : suppression des préférences stockées.
- Menu mobile, fenêtre de confidentialité, fermeture avec Échap et liens de contact vérifiés.
- Pages de confidentialité et conditions : trois langues testées ; le contenu français reste disponible sans JavaScript.
- Ajout de programmes et d’articles : rendu testé avec des données temporaires non incluses dans la livraison ; disparition des messages d’attente vérifiée.
- Préférence de réduction des animations respectée.
- Manifeste et icônes présents. Cache PWA vérifié : accueil et confidentialité consultables hors connexion après une première visite ; le flux reste dépendant d’Internet. L’installation par le navigateur n’a pas été testée sur un téléphone physique.

La diffusion dépend de la disponibilité future de Zeno et de RTD. Les tests ne constituent pas un audit exhaustif d’accessibilité ni une garantie de disponibilité continue. Les horaires et articles définitifs pourront être ajoutés dans `content.js`.
