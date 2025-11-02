# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.1.2] - 2025-11-02

### Technique
- 🔧 Correction du workflow GitHub Actions pour déploiement GitHub Pages
- 🚀 Workflow automatique complet ("🚀 Auto Release Complete")
- ✨ Automatisation complète : Build → Release → Manifest → Pages en un seul workflow

### Amélioré
- 🎯 Workflow tout-en-un qui gère automatiquement toutes les étapes de publication
- 📦 Build, release, mise à jour manifest et déploiement Pages entièrement automatisés
- 🔄 Plus besoin d'interventions manuelles pour publier une nouvelle version

## [1.1.0] - 2025-11-02

### Ajouté
- ✨ Utilisation de l'API Jellyfin pour récupération des URLs de streaming
- 🎯 Récupération automatique de l'Item ID depuis les éléments HTML
- 📺 Affichage du nom du média dans le prompt
- 🔍 Logs de débogage dans la console
- 📚 Documentation de test (TESTING.md)

### Amélioré
- 🚀 **Plugin maintenant 100% fonctionnel** avec l'API Jellyfin
- 🎨 Meilleure intégration dans les menus Jellyfin
- 🔧 Support de plusieurs sélecteurs CSS pour compatibilité
- ⚡ Détection améliorée des boutons de menu
- 💪 Gestion d'erreurs robuste avec messages explicites

### Technique
- Utilise `window.ApiClient` pour accéder à l'API Jellyfin
- Construit les URLs avec `/Videos/{itemId}/stream`
- Support async/await pour récupération des métadonnées
- Prévention des doublons avec dataset flags

## [1.0.1] - 2025-11-02

### Ajouté
- 🌐 Repository Jellyfin pour installation directe depuis le catalogue
- 📦 Workflow GitHub Actions pour mise à jour automatique du manifest
- 🚀 GitHub Pages pour hébergement du catalogue
- 📚 Guide de configuration (SETUP_REPOSITORY.md, QUICKSTART.md)
- 🎨 Page web d'accueil pour le repository

### Technique
- Workflow `update-manifest.yml` pour MAJ automatique du manifest
- Workflow `pages.yml` pour déploiement GitHub Pages
- Script `update-manifest.sh` pour MAJ manuelle
- Documentation complète du système de repository

## [1.0.0] - 2025-11-02

### Ajouté
- Menu contextuel "Ouvrir avec VLC" dans l'interface Jellyfin Web
- Récupération automatique de l'URL directe du média pour lecture dans VLC
- Support des films, épisodes et séries
- Observer MutationObserver pour détecter les menus dynamiques
- Affichage de l'URL via prompt() pour copie dans VLC
- Prévention des doublons d'entrées de menu
- Documentation complète (README.md)
- Build automatique via GitHub Actions
- Workflow de release automatique

### Technique
- Compatible avec Jellyfin ≥ 10.11.1
- Fonctionne sans modification du backend Jellyfin
- Script de build (`build.sh`) pour packaging automatique
- Validation JSON et JavaScript dans le pipeline CI/CD
- Génération automatique de hash SHA256 pour vérification d'intégrité

## [Non publié]

### À venir
- Support du protocole `vlc://` pour ouverture automatique de VLC
- Amélioration de la récupération d'URL via l'API Jellyfin
- Support de différentes vues (liste, grille, détails)
- Options de configuration utilisateur
- Gestion améliorée des erreurs

---

[1.1.2]: https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/tag/v1.1.2
[1.1.0]: https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/tag/v1.1.0
[1.0.1]: https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/tag/v1.0.1
[1.0.0]: https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/tag/v1.0.0

