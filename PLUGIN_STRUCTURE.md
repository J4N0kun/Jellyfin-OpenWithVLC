# Structure du Plugin Jellyfin - OpenWithVLC

## 📋 Problème Actuel

Le plugin s'installe mais ne se charge pas car **il manque une DLL C# backend**.

Jellyfin nécessite :
- ✅ Une DLL C# (.NET) pour charger le plugin
- ✅ Le JavaScript dans `web/js/`
- ✅ Un fichier `plugin.json`

## 🔧 Solution : Plugin C# Minimal

Il faut créer un projet C# qui :
1. Crée une DLL que Jellyfin peut charger
2. Injecte automatiquement le JavaScript dans l'interface web
3. Fournit un plugin valide compatible avec Jellyfin

## 📁 Structure Requise

```
Jellyfin-OpenWithVLC/
├── OpenWithVLC.csproj          # Projet C# .NET
├── Plugin.cs                   # Classe principale du plugin
├── ServiceRegistration.cs     # Enregistrement des services
├── plugin.json                 # Métadonnées (existe déjà)
└── web/
    └── js/
        └── vlcMenu.js          # Script JavaScript (existe déjà)
```

## 🛠️ Prochaines Étapes

1. Créer le projet C# .NET 6.0
2. Implémenter l'injection de JavaScript
3. Builder la DLL
4. Mettre à jour le build.sh pour inclure la DLL
5. Tester dans Jellyfin

