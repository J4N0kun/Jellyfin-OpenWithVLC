# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

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

[1.0.0]: https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/tag/v1.0.0

