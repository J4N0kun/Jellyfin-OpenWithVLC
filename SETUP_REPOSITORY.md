# 🚀 Guide de Configuration du Repository Jellyfin

Ce guide explique comment configurer votre plugin pour qu'il soit installable directement depuis Jellyfin.

## 📋 Table des Matières

- [Prérequis](#prérequis)
- [Configuration GitHub Pages](#configuration-github-pages)
- [Première Release](#première-release)
- [Ajout du Repository dans Jellyfin](#ajout-du-repository-dans-jellyfin)
- [Workflow de Mise à Jour](#workflow-de-mise-à-jour)
- [Dépannage](#dépannage)

## 🔧 Prérequis

- ✅ Repository GitHub créé et configuré
- ✅ Fichiers du projet déjà en place
- ✅ Accès aux Settings du repository

## 🌐 Configuration GitHub Pages

### Étape 1 : Activer GitHub Pages

1. Aller dans les **Settings** de votre repository GitHub
2. Dans le menu latéral, cliquer sur **Pages**
3. Sous **Source**, sélectionner :
   - **Source** : `GitHub Actions` ⚠️ **IMPORTANT : Choisir GitHub Actions, pas "Deploy from a branch"**
4. C'est tout ! Pas besoin de configurer de branche

**Pourquoi GitHub Actions ?**
- Le workflow `.github/workflows/pages.yml` gère automatiquement le déploiement
- Crée une page web d'accueil
- Déploie le manifest.json au bon endroit
- Se met à jour automatiquement à chaque changement

### Étape 2 : Vérifier le Déploiement

Après quelques minutes :

1. Retourner dans **Settings** → **Pages**
2. Vous devriez voir : "Your site is live at `https://j4n0kun.github.io/Jellyfin-OpenWithVLC/`"
3. Vérifier que l'URL du manifest fonctionne :
   ```
   https://j4n0kun.github.io/Jellyfin-OpenWithVLC/repository/manifest.json
   ```

## 🏷️ Première Release

### Méthode Automatique (GitHub Web)

1. Aller dans **Releases** → **Create a new release**
2. Cliquer sur **Choose a tag** → Taper `v1.0.0` → **Create new tag**
3. **Release title** : `v1.0.0`
4. **Description** : Copier depuis `CHANGELOG.md`
5. Cliquer sur **Publish release**

GitHub Actions va automatiquement :
- ✅ Builder le plugin
- ✅ Attacher le ZIP à la release
- ✅ Mettre à jour le manifest.json
- ✅ Déployer sur GitHub Pages

### Méthode Manuelle (Git CLI)

```bash
# 1. S'assurer d'être sur main/master
git checkout main
git pull

# 2. Créer et pousser le tag
git tag v1.0.0
git push origin main --tags

# GitHub Actions fera le reste automatiquement
```

### Vérification

Après 2-3 minutes, vérifier :

1. **Release créée** : `https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases`
2. **ZIP attaché** : `Jellyfin-OpenWithVLC-v1.0.0.zip`
3. **Manifest à jour** : Vérifier `repository/manifest.json` dans le code
4. **GitHub Pages** : Tester l'URL du manifest

## 🎯 Ajout du Repository dans Jellyfin

### Via l'Interface Web

1. Ouvrir **Jellyfin** → **Dashboard** → **Plugins** → **Repositories**
2. Cliquer sur le bouton **+** (Add)
3. Remplir :
   ```
   Repository Name: Open With VLC
   Repository URL: https://j4n0kun.github.io/Jellyfin-OpenWithVLC/repository/manifest.json
   ```
4. **Save**
5. Aller dans **Plugins** → **Catalog**
6. Le plugin **"Open With VLC"** devrait apparaître !
7. Cliquer sur **Install**
8. Redémarrer Jellyfin

### Via le Fichier de Configuration

**Linux** : `/etc/jellyfin/config/config.json`  
**Windows** : `C:\ProgramData\Jellyfin\Server\config\config.json`

Ajouter dans `PluginRepositories` :

```json
{
  "PluginRepositories": [
    {
      "Name": "Open With VLC",
      "Url": "https://j4n0kun.github.io/Jellyfin-OpenWithVLC/repository/manifest.json"
    }
  ]
}
```

Redémarrer le serveur Jellyfin.

## 🔄 Workflow de Mise à Jour

### Pour publier une nouvelle version :

1. **Mettre à jour le code** :
   ```bash
   # Faire vos modifications dans le code
   vim web/js/vlcMenu.js
   ```

2. **Mettre à jour plugin.json** :
   ```json
   {
     "Version": "1.0.1",
     ...
   }
   ```

3. **Mettre à jour CHANGELOG.md** :
   ```markdown
   ## [1.0.1] - 2025-11-03
   
   ### Fixed
   - Correction du bug XYZ
   ```

4. **Commit et tag** :
   ```bash
   git add .
   git commit -m "fix: correction du bug XYZ"
   git tag v1.0.1
   git push origin main --tags
   ```

5. **Automatiquement** :
   - ✅ GitHub Actions build le plugin
   - ✅ Crée la release v1.0.1
   - ✅ Met à jour manifest.json
   - ✅ Déploie sur GitHub Pages

6. **Dans Jellyfin** :
   - Les utilisateurs verront la mise à jour disponible
   - Ils pourront cliquer sur "Update" dans le catalogue

## 🔍 Vérifications

### Vérifier le Manifest

```bash
# Télécharger et vérifier
curl https://j4n0kun.github.io/Jellyfin-OpenWithVLC/repository/manifest.json | jq .

# Vérifier la dernière version
curl https://j4n0kun.github.io/Jellyfin-OpenWithVLC/repository/manifest.json | jq '.[0].versions[0]'
```

### Vérifier le ZIP

```bash
# Télécharger
curl -L -o test.zip https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/download/v1.0.0/Jellyfin-OpenWithVLC-v1.0.0.zip

# Vérifier le contenu
unzip -l test.zip

# Vérifier le checksum
sha256sum test.zip
# Comparer avec le checksum dans manifest.json
```

## 🛠️ Dépannage

### Le manifest n'est pas accessible

**Problème** : `404 Not Found` sur le manifest

**Solutions** :
1. Vérifier que GitHub Pages est activé
2. Attendre 2-3 minutes après le push
3. Vérifier l'URL dans Settings → Pages
4. Forcer un redéploiement : aller dans Actions → Pages → Re-run jobs

### Le plugin n'apparaît pas dans Jellyfin

**Problème** : Le catalogue est vide

**Solutions** :
1. Vérifier l'URL du repository dans Jellyfin
2. Vérifier que le manifest.json est valide (JSON syntax)
3. Vérifier les logs Jellyfin : `/var/log/jellyfin/`
4. Redémarrer Jellyfin
5. Vider le cache navigateur et recharger le Dashboard

### Le manifest ne se met pas à jour

**Problème** : Ancienne version visible après une release

**Solutions** :
1. Vérifier que le workflow `update-manifest.yml` s'est exécuté
2. Voir les logs dans Actions → Update Plugin Manifest
3. Vérifier que le commit a bien été fait
4. Attendre que GitHub Pages redéploie (2-3 min)
5. Forcer le cache :
   ```bash
   curl -H "Cache-Control: no-cache" https://j4n0kun.github.io/.../manifest.json
   ```

### Erreur de checksum

**Problème** : Jellyfin refuse d'installer (checksum mismatch)

**Solutions** :
1. Vérifier que le ZIP n'a pas été modifié
2. Re-générer le checksum :
   ```bash
   sha256sum dist/Jellyfin-OpenWithVLC-v1.0.0.zip
   ```
3. Mettre à jour manuellement le manifest.json
4. Commit et push

## 📊 Structure des Fichiers

Après configuration complète :

```
Jellyfin-OpenWithVLC/
├── .github/
│   └── workflows/
│       ├── build.yml              # Build sur push/PR
│       ├── release.yml            # Release automatique
│       ├── update-manifest.yml    # MAJ manifest sur release
│       └── pages.yml              # Déploiement GitHub Pages
├── repository/
│   ├── manifest.json              # Catalogue Jellyfin (auto-mis à jour)
│   ├── update-manifest.sh         # Script de MAJ manuel
│   └── README.md                  # Doc du repository
├── web/js/vlcMenu.js
├── plugin.json
├── build.sh
└── README.md
```

## ✅ Checklist de Configuration

- [ ] GitHub Pages activé
- [ ] Première release v1.0.0 créée
- [ ] ZIP disponible dans la release
- [ ] manifest.json mis à jour automatiquement
- [ ] URL du manifest accessible publiquement
- [ ] manifest.json valide (tester avec `jq`)
- [ ] Repository ajouté dans Jellyfin
- [ ] Plugin visible dans le catalogue Jellyfin
- [ ] Installation testée
- [ ] Plugin fonctionnel dans Jellyfin Web

## 🎉 Résultat Final

Une fois tout configuré, vos utilisateurs pourront :

1. Ajouter votre repository une seule fois
2. Installer le plugin en un clic depuis Jellyfin
3. Recevoir les mises à jour automatiquement
4. Voir les changelogs dans le catalogue

**URL à partager** :
```
https://j4n0kun.github.io/Jellyfin-OpenWithVLC/repository/manifest.json
```

## 📞 Support

Des questions ? Ouvrez une [Issue](https://github.com/J4N0kun/Jellyfin-OpenWithVLC/issues) !

