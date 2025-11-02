# Jellyfin Plugin Repository - Open With VLC

Ce repository contient le catalogue de plugins Jellyfin pour **Open With VLC**.

## 📦 URL du Repository

Pour ajouter ce repository à votre serveur Jellyfin :

```
https://j4n0kun.github.io/Jellyfin-OpenWithVLC/repository/manifest.json
```

Ou si vous utilisez un repository séparé :

```
https://raw.githubusercontent.com/J4N0kun/jellyfin-plugin-repo/main/manifest.json
```

## 🔧 Ajouter le Repository à Jellyfin

### Via l'interface Web

1. Ouvrir **Jellyfin Dashboard** → **Plugins** → **Repositories**
2. Cliquer sur le bouton **+** (Ajouter)
3. Remplir les champs :
   - **Repository Name** : `Open With VLC`
   - **Repository URL** : `https://j4n0kun.github.io/Jellyfin-OpenWithVLC/repository/manifest.json`
4. Cliquer sur **Save**
5. Aller dans **Plugins** → **Catalog**
6. Le plugin **Open With VLC** devrait apparaître !

### Via configuration manuelle

Éditer le fichier de configuration Jellyfin :

**Linux :** `/etc/jellyfin/config.json`  
**Windows :** `C:\ProgramData\Jellyfin\Server\config\config.json`

Ajouter dans la section `PluginRepositories` :

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

Redémarrer Jellyfin.

## 📋 Structure du Repository

```
repository/
├── manifest.json          # Catalogue des plugins
├── update-manifest.sh     # Script pour mettre à jour le manifest
└── README.md             # Ce fichier
```

## 🔄 Mettre à Jour le Manifest

### Méthode automatique (recommandée)

Après avoir créé une release sur GitHub :

```bash
cd repository
./update-manifest.sh 1.0.1 ../dist/Jellyfin-OpenWithVLC-v1.0.1.zip
```

Le script :
- ✅ Calcule le checksum SHA256
- ✅ Extrait le changelog depuis CHANGELOG.md
- ✅ Met à jour manifest.json
- ✅ Préserve les versions précédentes

### Méthode manuelle

Éditer `manifest.json` et ajouter la nouvelle version dans `versions[]` :

```json
{
  "version": "1.0.1",
  "changelog": "Description des changements",
  "targetAbi": "10.11.1.0",
  "sourceUrl": "https://github.com/J4N0kun/Jellyfin-OpenWithVLC/archive/refs/tags/v1.0.1.tar.gz",
  "checksum": "SHA256_DU_ZIP",
  "timestamp": "2025-11-02T20:00:00Z",
  "artifacts": [
    {
      "filename": "Jellyfin-OpenWithVLC-v1.0.1.zip",
      "url": "https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/download/v1.0.1/Jellyfin-OpenWithVLC-v1.0.1.zip",
      "checksum": "SHA256_DU_ZIP"
    }
  ]
}
```

## 🌐 Hébergement

### Option 1 : GitHub Pages (dans le même repository)

1. Activer GitHub Pages dans les settings du repository
2. Source : `main` branch, dossier `/repository`
3. URL : `https://j4n0kun.github.io/Jellyfin-OpenWithVLC/repository/manifest.json`

### Option 2 : Repository séparé (recommandé)

1. Créer un nouveau repository : `jellyfin-plugin-repo`
2. Copier `manifest.json` à la racine
3. Activer GitHub Pages
4. URL : `https://raw.githubusercontent.com/J4N0kun/jellyfin-plugin-repo/main/manifest.json`

Avantages :
- ✅ Séparation des préoccupations
- ✅ Peut héberger plusieurs plugins
- ✅ URL plus propre

### Option 3 : Raw GitHub

Sans GitHub Pages, utiliser l'URL raw :

```
https://raw.githubusercontent.com/J4N0kun/Jellyfin-OpenWithVLC/main/repository/manifest.json
```

⚠️ Peut avoir des problèmes de cache

## 🔐 Checksum

Le checksum est **SHA256** (pas MD5 ni SHA1 comme certains vieux plugins).

Pour calculer :
```bash
sha256sum Jellyfin-OpenWithVLC-v1.0.0.zip
```

## 📝 Format du Manifest

Le `manifest.json` suit la spécification Jellyfin pour les plugin repositories :

```json
[
  {
    "category": "General",
    "guid": "UUID_UNIQUE",
    "name": "Nom du Plugin",
    "description": "Description complète",
    "owner": "Propriétaire",
    "overview": "Résumé court",
    "versions": [
      {
        "version": "1.0.0",
        "changelog": "Notes de version",
        "targetAbi": "10.11.1.0",
        "sourceUrl": "URL du code source",
        "checksum": "SHA256",
        "timestamp": "ISO 8601",
        "artifacts": [
          {
            "filename": "nom-du-fichier.zip",
            "url": "URL de téléchargement",
            "checksum": "SHA256"
          }
        ]
      }
    ]
  }
]
```

## ✅ Validation

Valider le manifest avant de commit :

```bash
jq empty manifest.json && echo "✅ JSON valide"
```

## 🤝 Contribution

Pour ajouter votre plugin à ce repository, ouvrez une Pull Request avec :
- Votre plugin ajouté dans `manifest.json`
- Le ZIP hébergé sur GitHub releases
- Le checksum vérifié

## 📞 Support

- 🐛 [Issues](https://github.com/J4N0kun/Jellyfin-OpenWithVLC/issues)
- 💬 [Discussions](https://github.com/J4N0kun/Jellyfin-OpenWithVLC/discussions)

