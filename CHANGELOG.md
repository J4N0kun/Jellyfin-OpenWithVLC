# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.4.1] - 2025-11-03

### Corrigé
- 🔧 **CRITIQUE : Userscript attend maintenant que l'API Client Jellyfin soit chargée**
- ❌ Le script ne s'exécutait pas car il vérifiait `window.ApiClient` trop tôt
- ✅ Ajout de `waitForApiClient()` pour attendre le chargement asynchrone de l'API
- ✅ Le plugin s'initialise correctement une fois Jellyfin Web chargé

### Technique
- Fonction `waitForApiClient()` avec retry (50 tentatives max, 200ms d'intervalle)
- Initialisation différée via callback `initPlugin()`
- Logs de debug pour troubleshooting

## [1.4.0] - 2025-11-03

### Ajouté
- 🎯 **Userscript Tampermonkey/Violentmonkey** (`open-with-vlc.user.js`)
- 📦 Installation en un clic sans modifier Jellyfin
- ✅ Méthode d'installation recommandée pour les utilisateurs finaux

### Amélioré
- 📚 Documentation README mise à jour avec méthode Tampermonkey en priorité
- 🔄 Installation simplifiée sans redémarrage du serveur Jellyfin

### Technique
- Script compatible Tampermonkey, Violentmonkey et Userscripts (Safari iOS)
- Auto-détection des pages Jellyfin
- Injection automatique du menu "Ouvrir avec VLC"

## [1.3.2] - 2025-11-02

### Corrigé
- 🔧 **CRITIQUE : Utilisation de MD5 au lieu de SHA256 pour les checksums**
- ❌ Suppression de `sourceUrl` qui causait le téléchargement du mauvais fichier
- ✅ Jellyfin télécharge maintenant depuis `artifacts[0].url` (la release avec DLL)
- ✅ Checksum MD5 correct : installation réussie !

### Technique
- Workflow génère maintenant MD5 et SHA256
- Manifest utilise MD5 pour compatibilité Jellyfin
- `sourceUrl` retiré car Jellyfin le priorise sur artifacts
- Build.sh génère les deux types de checksums

## [1.3.1] - 2025-11-02

### Corrigé
- 🔧 **CRITIQUE : DLL maintenant incluse dans le package ZIP**
- Workflow auto-release lance build-dotnet.sh AVANT build.sh
- Le ZIP contient désormais OpenWithVLC.dll (5 Ko)
- Package complet : DLL + JavaScript + plugin.json

### Technique
- Ajout de l'étape de build .NET dans le workflow
- Affichage du contenu du ZIP pour vérification
- Build Docker de la DLL systématique

## [1.3.0] - 2025-11-02

### Ajouté
- 🎯 **Plugin C# backend** pour compatibilité complète avec Jellyfin
- 🔧 Structure .NET 6.0 avec DLL chargeable par Jellyfin
- 📦 ServiceRegistration pour injection de dépendances
- 📝 Documentation complète du build C#

### Amélioré
- ✅ Plugin maintenant **entièrement compatible** avec le système de plugins Jellyfin
- 🔄 JavaScript injecté automatiquement via le backend C#
- 🏗️ Architecture professionnelle avec backend + frontend

### Technique
- Projet .NET 6.0 (`OpenWithVLC.csproj`)
- Classe `Plugin.cs` héritant de `BasePlugin`
- GUID synchronisé avec `plugin.json`
- Ressources web embarquées dans la DLL

## [1.2.0] - 2025-11-02

### Amélioré
- 🎯 **Synchronisation parfaite** entre tags Git et versions du plugin
- 📦 Version dans plugin.json correspond désormais toujours au tag
- ✨ Workflow automatique entièrement opérationnel

### Technique
- Correction du workflow pour cohérence des versions
- Build automatique, release, manifest et déploiement Pages synchronisés

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

[1.3.2]: https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/tag/v1.3.2
[1.3.1]: https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/tag/v1.3.1
[1.3.0]: https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/tag/v1.3.0
[1.2.0]: https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/tag/v1.2.0
[1.1.2]: https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/tag/v1.1.2
[1.1.0]: https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/tag/v1.1.0
[1.0.1]: https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/tag/v1.0.1
[1.0.0]: https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/tag/v1.0.0

