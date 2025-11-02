using System;
using System.Reflection;

namespace Jellyfin.Plugin.OpenWithVLC
{
    /// <summary>
    /// Plugin principal Open With VLC
    /// DLL minimale pour rendre le plugin chargeable par Jellyfin
    /// </summary>
    public class Plugin
    {
        /// <summary>
        /// Point d'entrée du plugin
        /// </summary>
        public static void Initialize()
        {
            Console.WriteLine($"[OpenWithVLC] Plugin version {PluginManifest.Version} initialisé");
            Console.WriteLine($"[OpenWithVLC] Les fichiers web sont disponibles dans le dossier web/");
        }

        /// <summary>
        /// Récupère les informations du plugin
        /// </summary>
        public static string GetInfo()
        {
            return $"{PluginManifest.Name} v{PluginManifest.Version} - {PluginManifest.Description}";
        }
    }
}

