using System;

namespace Jellyfin.Plugin.OpenWithVLC
{
    /// <summary>
    /// Manifeste du plugin pour Jellyfin
    /// </summary>
    public static class PluginManifest
    {
        /// <summary>
        /// Nom du plugin
        /// </summary>
        public const string Name = "Open With VLC";

        /// <summary>
        /// GUID unique du plugin
        /// </summary>
        public static readonly Guid Id = Guid.Parse("a8f4c3e2-7b9d-4f1e-8c5a-2d6b9e4f1a3c");

        /// <summary>
        /// Version du plugin
        /// </summary>
        public const string Version = "1.3.0";

        /// <summary>
        /// Description du plugin
        /// </summary>
        public const string Description = "Ajoute un menu contextuel pour ouvrir les médias directement dans VLC en mode Direct Play";
    }
}

