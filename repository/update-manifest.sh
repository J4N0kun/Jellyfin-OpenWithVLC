#!/bin/bash

# Script pour mettre à jour le manifest.json avec les nouvelles releases
# Usage: ./update-manifest.sh <version> <zip_path>

set -e

VERSION=$1
ZIP_PATH=$2

if [ -z "$VERSION" ] || [ -z "$ZIP_PATH" ]; then
    echo "Usage: $0 <version> <zip_path>"
    echo "Exemple: $0 1.0.0 ../dist/Jellyfin-OpenWithVLC-v1.0.0.zip"
    exit 1
fi

# Vérifier que le ZIP existe
if [ ! -f "$ZIP_PATH" ]; then
    echo "❌ Erreur: Le fichier ZIP n'existe pas: $ZIP_PATH"
    exit 1
fi

# Calculer le checksum SHA256
CHECKSUM=$(sha256sum "$ZIP_PATH" | cut -d' ' -f1)
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "📦 Mise à jour du manifest.json"
echo "  Version: $VERSION"
echo "  Checksum: $CHECKSUM"
echo "  Timestamp: $TIMESTAMP"

# Récupérer le changelog depuis CHANGELOG.md
CHANGELOG="Version $VERSION"
if [ -f "../CHANGELOG.md" ]; then
    # Extraire la section du changelog pour cette version
    CHANGELOG=$(awk "/## \[$VERSION\]/,/## \[/" ../CHANGELOG.md | sed '$d' | tail -n +2 | sed 's/^/  /')
    if [ -z "$CHANGELOG" ]; then
        CHANGELOG="Version $VERSION"
    fi
fi

echo ""
echo "📝 Changelog:"
echo "$CHANGELOG"
echo ""

# Créer une sauvegarde
cp manifest.json manifest.json.backup

# Mettre à jour le manifest avec jq
jq --arg version "$VERSION" \
   --arg checksum "$CHECKSUM" \
   --arg timestamp "$TIMESTAMP" \
   --arg changelog "$CHANGELOG" \
   --arg url "https://github.com/J4N0kun/Jellyfin-OpenWithVLC/releases/download/v$version/Jellyfin-OpenWithVLC-v$version.zip" \
   --arg sourceUrl "https://github.com/J4N0kun/Jellyfin-OpenWithVLC/archive/refs/tags/v$version.tar.gz" \
   '.[0].versions = [
      {
        "version": $version,
        "changelog": $changelog,
        "targetAbi": "10.11.1.0",
        "sourceUrl": $sourceUrl,
        "checksum": $checksum,
        "timestamp": $timestamp,
        "artifacts": [
          {
            "filename": ("Jellyfin-OpenWithVLC-v" + $version + ".zip"),
            "url": $url,
            "checksum": $checksum
          }
        ]
      }
    ] + .[0].versions' manifest.json > manifest.json.tmp

mv manifest.json.tmp manifest.json

echo "✅ Manifest mis à jour avec succès!"
echo ""
echo "🔍 Vérification du manifest:"
jq '.[0].versions[0]' manifest.json

echo ""
echo "📤 N'oubliez pas de:"
echo "  1. Vérifier le manifest.json"
echo "  2. Commit et push vers le repository"
echo "  3. GitHub Pages mettra à jour automatiquement"

