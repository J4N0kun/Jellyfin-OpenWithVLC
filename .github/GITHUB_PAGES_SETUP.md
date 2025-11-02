# 🌐 Configuration GitHub Pages - Guide Visuel

## 📍 Étape par Étape

### 1. Accéder aux Settings

1. Aller sur votre repository GitHub : `https://github.com/J4N0kun/Jellyfin-OpenWithVLC`
2. Cliquer sur **⚙️ Settings** (en haut à droite)

### 2. Ouvrir GitHub Pages

1. Dans le menu de gauche, descendre jusqu'à la section **Code and automation**
2. Cliquer sur **📄 Pages**

### 3. Configurer la Source ⚠️ IMPORTANT

Vous verrez une section **"Build and deployment"** avec :

#### ✅ CONFIGURATION CORRECTE :

```
Source: [GitHub Actions ▼]
```

**Sélectionnez : GitHub Actions**

#### ❌ NE PAS CHOISIR :

```
Source: [Deploy from a branch ▼]
  Branch: [main ▼] [/ (root) ▼]
```

**Ne choisissez PAS "Deploy from a branch"**

---

## 🤔 Pourquoi GitHub Actions ?

| Méthode | Avantage | Inconvénient |
|---------|----------|--------------|
| **GitHub Actions** ✅ | • Déploiement automatique<br>• Page d'accueil personnalisée<br>• Contrôle total du contenu<br>• Workflow `.github/workflows/pages.yml` | Nécessite un workflow (déjà créé ✅) |
| **Deploy from a branch** ❌ | Simple | • Déploie TOUT le repository<br>• Pas de personnalisation<br>• Dossier `repository/` pas à la racine web |

## 🎯 Ce Qui Se Passe Après Configuration

Une fois **GitHub Actions** sélectionné :

1. **Automatiquement**, à chaque push de fichiers dans `repository/` :
   - ✅ Le workflow `pages.yml` se déclenche
   - ✅ Copie `manifest.json` et `README.md`
   - ✅ Crée une page HTML d'accueil
   - ✅ Déploie sur `https://j4n0kun.github.io/Jellyfin-OpenWithVLC/`

2. **Vérification** :
   - Aller dans **Actions** (onglet en haut)
   - Voir le workflow "Deploy to GitHub Pages"
   - Attendre qu'il devienne vert ✅

3. **Test** :
   - Ouvrir : `https://j4n0kun.github.io/Jellyfin-OpenWithVLC/`
   - Vérifier : `https://j4n0kun.github.io/Jellyfin-OpenWithVLC/repository/manifest.json`

## 📊 Comparaison Visuelle

### ✅ CORRECT - GitHub Actions

```
Build and deployment

Source
  GitHub Actions      [Sélectionné]
  ────────────────
  Use a workflow to deploy files from your repository

[Configure] [View runs]
```

### ❌ INCORRECT - Deploy from a branch

```
Build and deployment

Source
  Deploy from a branch    [Ne PAS sélectionner]
  ────────────────────
  
Branch
  main        / (root)    [Save]
```

## 🔄 Que Faire si Vous Avez Déjà "Deploy from a branch" ?

Pas de problème ! Changez simplement :

1. Retourner dans **Settings** → **Pages**
2. Cliquer sur le menu déroulant **Source**
3. Sélectionner **GitHub Actions**
4. Attendre 2-3 minutes
5. Le prochain push déclenchera le bon workflow

## ✅ Vérification Finale

Après configuration, vous devriez voir :

```
✅ Your site is live at https://j4n0kun.github.io/Jellyfin-OpenWithVLC/

Build and deployment

Source: GitHub Actions
Last deployed by github-actions
```

## 🐛 Dépannage

### "Je ne vois pas l'option GitHub Actions"

**Solution** : GitHub Pages doit être activé pour les GitHub Actions
1. Vérifier que le repository est public (ou que vous avez GitHub Pro pour les privés)
2. Vérifier que GitHub Actions est activé : **Settings** → **Actions** → **General** → **Allow all actions**

### "Le workflow ne se déclenche pas"

**Solution** :
1. Aller dans **Actions** → Vérifier qu'il n'y a pas d'erreurs
2. Vérifier que le fichier `.github/workflows/pages.yml` existe
3. Faire un push pour déclencher manuellement :
   ```bash
   git commit --allow-empty -m "trigger pages"
   git push
   ```

### "404 sur le manifest.json"

**Solution** :
1. Attendre 2-3 minutes après le déploiement
2. Vérifier dans **Actions** que le workflow est terminé (vert ✅)
3. Vider le cache du navigateur : Ctrl+Shift+R
4. Vérifier l'URL : `https://USERNAME.github.io/REPO/repository/manifest.json`

## 🎉 Succès !

Une fois que vous voyez :
- ✅ Site déployé
- ✅ `manifest.json` accessible
- ✅ Workflow vert dans Actions

Vous pouvez passer à l'étape suivante : créer votre première release !

---

**📚 Retour au guide :** [SETUP_REPOSITORY.md](../SETUP_REPOSITORY.md)

