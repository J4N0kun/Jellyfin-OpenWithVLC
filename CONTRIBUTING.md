# Guide de Contribution

Merci de votre intérêt pour contribuer au plugin **Jellyfin OpenWithVLC** ! 🎉

## 📋 Code de Conduite

Ce projet suit les principes de respect et d'inclusivité. Soyez courtois et professionnel dans toutes vos interactions.

## 🚀 Comment Contribuer

### 1. Reporter un Bug 🐛

Avant de créer un nouveau rapport de bug :
- Vérifiez que le bug n'a pas déjà été rapporté dans les [Issues](https://github.com/J4N0kun/Jellyfin-OpenWithVLC/issues)
- Testez avec la dernière version du plugin

Pour créer un rapport de bug efficace, incluez :
- **Description claire** du problème
- **Étapes pour reproduire** le bug
- **Comportement attendu** vs **comportement observé**
- **Environnement** :
  - Version de Jellyfin
  - Version du plugin
  - Navigateur et version
  - Système d'exploitation
- **Logs** ou captures d'écran si pertinent

### 2. Proposer une Fonctionnalité 💡

Pour proposer une nouvelle fonctionnalité :
- Ouvrez une [Issue](https://github.com/J4N0kun/Jellyfin-OpenWithVLC/issues) avec le label `enhancement`
- Décrivez clairement le besoin et l'utilité de la fonctionnalité
- Proposez une implémentation si vous en avez une en tête

### 3. Soumettre une Pull Request 🔧

#### Prérequis

- Git
- Bash
- Node.js (pour validation JavaScript)
- jq (pour validation JSON)

#### Processus

1. **Fork** le repository
   ```bash
   # Via GitHub : cliquez sur "Fork"
   ```

2. **Clonez** votre fork
   ```bash
   git clone https://github.com/VOTRE_USERNAME/Jellyfin-OpenWithVLC.git
   cd Jellyfin-OpenWithVLC
   ```

3. **Créez une branche** pour votre fonctionnalité
   ```bash
   git checkout -b feature/ma-super-fonctionnalite
   ```

4. **Faites vos modifications**
   - Suivez les conventions de code existantes
   - Commentez votre code si nécessaire
   - Testez vos changements localement

5. **Testez le build**
   ```bash
   ./build.sh
   ```

6. **Validez** vos fichiers
   ```bash
   # Validation JSON
   jq empty plugin.json
   
   # Validation JavaScript
   node -c web/js/vlcMenu.js
   ```

7. **Committez** vos changements
   ```bash
   git add .
   git commit -m "feat: description de la fonctionnalité"
   ```

8. **Pushez** vers votre fork
   ```bash
   git push origin feature/ma-super-fonctionnalite
   ```

9. **Ouvrez une Pull Request** sur GitHub
   - Décrivez clairement vos changements
   - Référencez les issues liées (ex: `Fixes #42`)
   - Attendez la revue de code

## 📝 Conventions de Code

### JavaScript

- Utilisez le mode strict : `'use strict';`
- Indentation : 4 espaces
- Pas de point-virgule facultatif
- Noms de variables en `camelCase`
- Fonctions : préférez les fonctions nommées pour le debugging
- Commentaires : expliquez le "pourquoi", pas le "quoi"

### Commits

Suivez le format [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `docs:` documentation uniquement
- `style:` formatage, points-virgules manquants, etc.
- `refactor:` refactorisation de code
- `test:` ajout de tests
- `chore:` tâches de maintenance

Exemples :
```
feat: add vlc:// protocol support
fix: prevent duplicate menu entries
docs: update installation instructions
```

### Versioning

Le projet suit le [Semantic Versioning](https://semver.org/) :
- `MAJOR.MINOR.PATCH` (ex: `1.2.3`)
- **MAJOR** : changements incompatibles
- **MINOR** : nouvelles fonctionnalités compatibles
- **PATCH** : corrections de bugs compatibles

## 🧪 Tests

Avant de soumettre une PR :

1. **Test fonctionnel** : testez le plugin dans Jellyfin Web
   - Films
   - Épisodes
   - Séries
   - Différentes vues (liste, grille, détails)

2. **Test de build** : vérifiez que le build fonctionne
   ```bash
   ./build.sh
   ```

3. **Validation** : vérifiez la syntaxe
   ```bash
   jq empty plugin.json
   node -c web/js/vlcMenu.js
   ```

## 📁 Structure du Projet

```
Jellyfin-OpenWithVLC/
├── .github/
│   └── workflows/       # GitHub Actions CI/CD
├── web/
│   └── js/
│       └── vlcMenu.js   # Code principal du plugin
├── plugin.json          # Métadonnées du plugin
├── README.md            # Documentation utilisateur
├── CHANGELOG.md         # Historique des versions
├── CONTRIBUTING.md      # Ce fichier
├── LICENSE              # Licence MIT
├── build.sh             # Script de build
└── .gitignore           # Fichiers à ignorer
```

## 🔄 Workflow de Release

Les releases sont automatisées via GitHub Actions :

1. Mettez à jour `plugin.json` avec la nouvelle version
2. Mettez à jour `CHANGELOG.md` avec les changements
3. Créez un tag Git :
   ```bash
   git tag v1.0.1
   git push origin main --tags
   ```
4. GitHub Actions créera automatiquement la release

## 💬 Questions ?

- **Discussions** : [GitHub Discussions](https://github.com/J4N0kun/Jellyfin-OpenWithVLC/discussions)
- **Issues** : [GitHub Issues](https://github.com/J4N0kun/Jellyfin-OpenWithVLC/issues)

## 🙏 Remerciements

Merci de contribuer à améliorer ce plugin ! Chaque contribution, aussi petite soit-elle, est appréciée.

