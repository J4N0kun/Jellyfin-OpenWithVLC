# 🚀 Démarrage Rapide - Repository Jellyfin

## ⚡ En 3 Étapes

### 1️⃣ Activer GitHub Pages

```bash
# Via GitHub Web Interface:
# Settings → Pages → Source: GitHub Actions → Save
# ⚠️ IMPORTANT: Choisir "GitHub Actions", PAS "Deploy from a branch"
```

### 2️⃣ Créer la Première Release

```bash
git tag v1.0.0
git push origin main --tags
# Attendre 2-3 minutes que GitHub Actions termine
```

### 3️⃣ Ajouter dans Jellyfin

```
Repository Name: Open With VLC
Repository URL: https://j4n0kun.github.io/Jellyfin-OpenWithVLC/repository/manifest.json
```

## ✅ C'est Tout !

Votre plugin est maintenant installable directement depuis Jellyfin !

## 📚 Documentation Complète

- **SETUP_REPOSITORY.md** - Guide détaillé de configuration
- **repository/README.md** - Documentation du repository Jellyfin
- **CONTRIBUTING.md** - Guide de contribution

## 🔄 Pour les Prochaines Versions

```bash
# 1. Modifier le code
vim web/js/vlcMenu.js

# 2. Mettre à jour la version
vim plugin.json  # Version: "1.0.1"
vim CHANGELOG.md # Ajouter les changements

# 3. Créer la release
git add .
git commit -m "feat: nouvelle fonctionnalité"
git tag v1.0.1
git push origin main --tags

# GitHub Actions fait le reste automatiquement ! ✨
```

## 🎯 URLs Importantes

- **Repository Manifest** : https://j4n0kun.github.io/Jellyfin-OpenWithVLC/repository/manifest.json
- **GitHub Releases** : https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases
- **GitHub Actions** : https://github.com/J4N0kun/Jellyfin-OpenWithVLC/actions

## 🐛 Problèmes ?

Voir **SETUP_REPOSITORY.md** section Dépannage.
