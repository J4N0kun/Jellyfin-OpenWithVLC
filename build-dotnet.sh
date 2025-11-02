#!/bin/bash

# Script de build du plugin C# avec Docker
# Utilise l'image officielle .NET 6.0 SDK

set -e

echo "🔨 Build du plugin C# Open With VLC avec Docker"

# Variables
PROJECT_DIR=$(pwd)
BUILD_CONFIG="Release"

echo "📦 Pull de l'image .NET SDK 8.0..."
docker pull mcr.microsoft.com/dotnet/sdk:8.0

echo "🔧 Nettoyage des builds précédents avec Docker..."
docker run --rm \
    -v "$PROJECT_DIR:/src" \
    -w /src \
    mcr.microsoft.com/dotnet/sdk:8.0 \
    sh -c "rm -rf bin obj"

echo "🔨 Restauration des dépendances NuGet..."
docker run --rm \
    -v "$PROJECT_DIR:/src" \
    -w /src \
    -u $(id -u):$(id -g) \
    -e DOTNET_CLI_HOME=/tmp \
    -e HOME=/tmp \
    mcr.microsoft.com/dotnet/sdk:8.0 \
    dotnet restore

echo "🏗️ Build du projet en mode $BUILD_CONFIG..."
docker run --rm \
    -v "$PROJECT_DIR:/src" \
    -w /src \
    -u $(id -u):$(id -g) \
    -e DOTNET_CLI_HOME=/tmp \
    -e HOME=/tmp \
    mcr.microsoft.com/dotnet/sdk:8.0 \
    dotnet build -c $BUILD_CONFIG

echo "✅ Build terminé !"

# Vérifier que la DLL a été créée
if [ -f "bin/Release/net8.0/OpenWithVLC.dll" ]; then
    echo "✅ DLL créée : bin/Release/net8.0/OpenWithVLC.dll"
    ls -lh bin/Release/net8.0/*.dll
else
    echo "❌ Erreur : DLL non trouvée"
    exit 1
fi

echo ""
echo "📦 Fichiers disponibles pour packaging :"
ls -lh bin/Release/net8.0/

