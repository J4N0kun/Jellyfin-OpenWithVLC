# Jellyfin OpenWithVLC Plugin

![Build Status](https://github.com/J4N0kun/Jellyfin-OpenWithVLC/workflows/Build%20Plugin/badge.svg)
![Version](https://img.shields.io/github/v/release/J4N0kun/Jellyfin-OpenWithVLC)
![License](https://img.shields.io/github/license/J4N0kun/Jellyfin-OpenWithVLC)

## 📝 Objectif

Ajoute un menu contextuel **"Ouvrir avec VLC"** dans Jellyfin Web pour lancer les médias directement dans VLC en mode Direct Play.

### ✨ Fonctionnalités

- ✅ Menu contextuel intégré dans l'interface Jellyfin Web
- ✅ Compatible avec films, épisodes et séries
- ✅ Récupération automatique de l'URL directe du média
- ✅ Aucune modification du backend Jellyfin requise
- ✅ Détection dynamique des menus (MutationObserver)
- ✅ Prévention des doublons d'entrées
- ✅ Compatible Jellyfin ≥ 10.11.1

## 📦 Installation

### Méthode 1 : Userscript Tampermonkey/Violentmonkey (⭐ Simple et portable)

**Installation rapide sans modifier Jellyfin :**

1. **Installer une extension de userscript** dans votre navigateur :
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Edge, Safari)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)
   - [Userscripts](https://apps.apple.com/app/userscripts/id1463298887) (Safari iOS)
2. **Cliquer sur ce lien** pour installer le script :
   - 📥 [Install Open With VLC.user.js](https://raw.githubusercontent.com/J4N0kun/Jellyfin-OpenWithVLC/main/open-with-vlc.user.js)
3. Confirmer l'installation dans Tampermonkey/Violentmonkey
4. **Rafraîchir Jellyfin Web** (Ctrl+Shift+R)

✅ **Avantages** :
- ✅ Aucune modification du serveur Jellyfin
- ✅ Fonctionne immédiatement sans redémarrage
- ✅ Portable entre navigateurs
- ✅ Survit aux mises à jour de Jellyfin
- ✅ Facile à désactiver/désinstaller

### Méthode 2 : Via le Repository Jellyfin (installation serveur)

Installation directe depuis le catalogue Jellyfin :

1. Ouvrir **Jellyfin Dashboard** → **Plugins** → **Repositories**
2. Cliquer sur **+** pour ajouter un repository
3. Remplir les champs :
   - **Repository Name** : `Open With VLC`
   - **Repository URL** : `https://j4n0kun.github.io/Jellyfin-OpenWithVLC/repository/manifest.json`
4. Cliquer sur **Save**
5. Aller dans **Plugins** → **Catalog**
6. Chercher **"Open With VLC"** et cliquer sur **Install**
7. Redémarrer Jellyfin

✅ **Avantage** : Mises à jour automatiques disponibles dans Jellyfin !

### Méthode 3 : Installation manuelle depuis GitHub

1. Télécharger la dernière version depuis [Releases](https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases)
2. Ouvrir Jellyfin Web → **Dashboard** → **Plugins** → **Install Plugin** → **From Disk**
3. Sélectionner le fichier ZIP téléchargé
4. Redémarrer Jellyfin si nécessaire

### Méthode 4 : Build manuel

```bash
# Cloner le repository
git clone https://github.com/J4N0kun/Jellyfin-OpenWithVLC.git
cd Jellyfin-OpenWithVLC

# Lancer le build
chmod +x build.sh
./build.sh

# Le plugin sera disponible dans dist/Jellyfin-OpenWithVLC-v1.0.0.zip
```

## 🎯 Utilisation

1. Ouvrir **Jellyfin Web** et naviguer vers un film ou épisode
2. Cliquer sur le **menu contextuel** (`…`)
3. Sélectionner **"Ouvrir avec VLC"**
4. Copier l'URL affichée et la coller dans VLC :
   - **VLC Desktop** : Média → Ouvrir un flux réseau
   - **VLC Mobile** : Ouvrir un flux réseau

### 💡 Astuce

Pour une ouverture automatique dans VLC, vous pouvez configurer le protocole `vlc://` dans votre navigateur (fonctionnalité à venir).

## 🔧 Développement

### Structure du projet

```
Jellyfin-OpenWithVLC/
├── plugin.json              # Métadonnées du plugin
├── open-with-vlc.user.js    # Userscript Tampermonkey
├── README.md                # Documentation
├── CHANGELOG.md             # Historique des versions
├── build.sh                 # Script de build
├── .github/
│   └── workflows/
│       ├── build.yml        # CI/CD pour builds automatiques
│       └── release.yml      # Workflow de release
└── web/
    └── js/
        └── vlcMenu.js       # Code principal du plugin
```

### Prérequis

- `bash`
- `zip`
- `jq` (pour validation JSON)
- `node` (pour validation JavaScript)

### Build local

```bash
./build.sh
```

Le plugin sera généré dans `dist/` avec :
- `Jellyfin-OpenWithVLC-v1.0.0.zip` : Archive du plugin
- `Jellyfin-OpenWithVLC-v1.0.0.zip.sha256` : Hash de vérification

### CI/CD avec GitHub Actions

Le projet utilise GitHub Actions pour :

#### 🔨 Build automatique (`build.yml`)
- Déclenché sur chaque push/PR vers `main`, `master`, `develop`
- Valide la syntaxe JSON et JavaScript
- Génère le package ZIP
- Publie les artifacts (disponibles 30 jours)

#### 🚀 Release automatique (`release.yml`)
- Déclenché lors de la création d'un tag `v*.*.*`
- Build et validation
- Création automatique de la release GitHub
- Publication du ZIP et du hash SHA256

### Créer une release

```bash
# 1. Mettre à jour la version dans plugin.json
# 2. Mettre à jour le CHANGELOG.md
# 3. Commit et tag
git add .
git commit -m "Release v1.0.1"
git tag v1.0.1
git push origin main --tags
```

GitHub Actions créera automatiquement la release avec les artifacts.

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit les changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📋 Roadmap

- [ ] Support du protocole `vlc://` pour ouverture automatique
- [ ] Amélioration de la récupération d'URL via l'API Jellyfin
- [ ] Support de toutes les vues (liste, grille, détails)
- [ ] Options de configuration utilisateur
- [ ] Support multilingue
- [ ] Gestion améliorée des erreurs

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- Équipe Jellyfin pour l'excellent serveur média
- VideoLAN pour VLC Media Player

## 📞 Support

- 🐛 [Signaler un bug](https://github.com/J4N0kun/Jellyfin-OpenWithVLC/issues)
- 💡 [Demander une fonctionnalité](https://github.com/J4N0kun/Jellyfin-OpenWithVLC/issues)
- 💬 [Discussions](https://github.com/J4N0kun/Jellyfin-OpenWithVLC/discussions)
