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

# Création du ZIP
echo "📦 Création de l'archive ZIP..."
cd "$BUILD_DIR"
ZIP_NAME="${PLUGIN_NAME}-v${VERSION}.zip"
zip -r "../$DIST_DIR/$ZIP_NAME" "$PLUGIN_NAME"
cd ..

# Calcul du hash
echo "🔐 Calcul du hash SHA256..."
sha256sum "$DIST_DIR/$ZIP_NAME" > "$DIST_DIR/$ZIP_NAME.sha256"

echo "✅ Build terminé avec succès !"
echo "📦 Fichier créé : $DIST_DIR/$ZIP_NAME"
echo "📊 Taille : $(du -h "$DIST_DIR/$ZIP_NAME" | cut -f1)"
echo "🔐 Hash : $(cat "$DIST_DIR/$ZIP_NAME.sha256")"

