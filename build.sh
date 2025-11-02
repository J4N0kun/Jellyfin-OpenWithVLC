#!/bin/bash

# Script de build pour le plugin Jellyfin OpenWithVLC
# Ce script crée un fichier ZIP prêt à être déployé

set -e

echo "🔨 Build du plugin Jellyfin OpenWithVLC"

# Variables
PLUGIN_NAME="Jellyfin-OpenWithVLC"
VERSION=$(grep -o '"Version": "[^"]*"' plugin.json | cut -d'"' -f4)
BUILD_DIR="build"
DIST_DIR="dist"

# Nettoyage
echo "🧹 Nettoyage des anciens builds..."
rm -rf "$BUILD_DIR" "$DIST_DIR"

# Création des dossiers
echo "📁 Création des dossiers de build..."
mkdir -p "$BUILD_DIR/$PLUGIN_NAME"
mkdir -p "$DIST_DIR"

# Copie des fichiers du plugin
echo "📋 Copie des fichiers du plugin..."
cp plugin.json "$BUILD_DIR/$PLUGIN_NAME/"
cp README.md "$BUILD_DIR/$PLUGIN_NAME/"
cp -r web "$BUILD_DIR/$PLUGIN_NAME/"

# Copier la DLL C# si elle existe
if [ -f "bin/Release/net8.0/OpenWithVLC.dll" ]; then
    echo "📦 Copie de la DLL C#..."
    cp bin/Release/net8.0/OpenWithVLC.dll "$BUILD_DIR/$PLUGIN_NAME/"
    echo "✅ DLL incluse dans le package"
else
    echo "⚠️  Avertissement : DLL non trouvée. Lancez ./build-dotnet.sh d'abord"
    echo "   Le plugin sera un plugin web uniquement (sans backend C#)"
fi

# Création du ZIP
echo "📦 Création de l'archive ZIP..."
cd "$BUILD_DIR"
ZIP_NAME="${PLUGIN_NAME}-v${VERSION}.zip"
zip -r "../$DIST_DIR/$ZIP_NAME" "$PLUGIN_NAME"
cd ..

# Calcul des hashes
echo "🔐 Calcul des hashes..."
sha256sum "$DIST_DIR/$ZIP_NAME" > "$DIST_DIR/$ZIP_NAME.sha256"
md5sum "$DIST_DIR/$ZIP_NAME" > "$DIST_DIR/$ZIP_NAME.md5"

echo "✅ Build terminé avec succès !"
echo "📦 Fichier créé : $DIST_DIR/$ZIP_NAME"
echo "📊 Taille : $(du -h "$DIST_DIR/$ZIP_NAME" | cut -f1)"
echo "🔐 SHA256 : $(cat "$DIST_DIR/$ZIP_NAME.sha256")"
echo "🔐 MD5    : $(cat "$DIST_DIR/$ZIP_NAME.md5")"

