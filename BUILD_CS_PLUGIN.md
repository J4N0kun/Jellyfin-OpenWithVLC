# 🔧 Guide de Build du Plugin C#

## ⚠️ Problème Actuel

Le plugin s'installe mais ne charge pas car **il manque une DLL C#**. Jellyfin ne peut pas charger un plugin sans DLL backend.

## 📋 Ce Qui Doit Être Fait

### 1. Installer .NET SDK

```bash
# Vérifier si .NET est installé
dotnet --version

# Si non installé (Ubuntu/Debian)
wget https://dot.net/v1/dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh --channel 6.0

# Ajouter au PATH
export PATH="$PATH:$HOME/.dotnet"
```

### 2. Builder le Plugin C#

```bash
cd /home/janokun/git/Jellyfin-OpenWithVLC

# Restaurer les dépendances
dotnet restore

# Builder la DLL
dotnet build -c Release

# La DLL sera dans: bin/Release/net6.0/OpenWithVLC.dll
```

### 3. Modifier build.sh

Il faut inclure la DLL dans le ZIP :

```bash
# Dans build.sh, ajouter :
cp bin/Release/net6.0/OpenWithVLC.dll "$BUILD_DIR/$PLUGIN_NAME/"
```

### 4. Structure du ZIP Final

```
Jellyfin-OpenWithVLC/
├── OpenWithVLC.dll          # ← OBLIGATOIRE !
├── plugin.json
└── web/
    └── js/
        └── vlcMenu.js
```

## 🎯 Alternative : Injection Automatique

Pour que le JavaScript soit injecté automatiquement, il faut :

1. **Créer un fichier de configuration** qui dit à Jellyfin d'injecter le script
2. **Ou utiliser un hook** dans le Plugin.cs pour injecter dans l'HTML

## 📝 Prochaines Étapes

1. ✅ Structure C# créée (Plugin.cs, ServiceRegistration.cs, .csproj)
2. ⏳ Builder la DLL
3. ⏳ Mettre à jour build.sh
4. ⏳ Tester dans Jellyfin

## 🔍 Vérification

Après build et installation :

```bash
# Vérifier que la DLL est dans le ZIP
unzip -l dist/Jellyfin-OpenWithVLC-v1.2.0.zip | grep .dll

# Vérifier les logs Jellyfin
docker logs Jellyfin | grep "OpenWithVLC"
```

Vous devriez voir :
```
[INF] Loaded plugin: Open With VLC 1.2.0.0
```

## ⚠️ Note Importante

Le JavaScript sera accessible via :
```
/web/plugins/OpenWithVLC/js/vlcMenu.js
```

Mais il faudra peut-être un hook pour l'injecter automatiquement dans l'HTML de Jellyfin.

