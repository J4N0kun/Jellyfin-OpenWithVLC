(function() {
    'use strict';

    /**
     * Récupère l'API Client Jellyfin
     */
    function getApiClient() {
        return window.ApiClient || (window.Emby && window.Emby.ApiClient);
    }

    /**
     * Récupère l'Item ID depuis un élément HTML
     */
    function getItemId(element) {
        // Cherche l'item ID dans différents attributs possibles
        if (element.dataset.id) return element.dataset.id;
        if (element.dataset.itemid) return element.dataset.itemid;
        if (element.getAttribute('data-id')) return element.getAttribute('data-id');
        if (element.getAttribute('data-itemid')) return element.getAttribute('data-itemid');
        
        // Cherche dans les parents
        const itemCard = element.closest('[data-id]');
        if (itemCard && itemCard.dataset.id) return itemCard.dataset.id;
        
        return null;
    }

    /**
     * Construit l'URL de streaming direct pour VLC
     */
    function getDirectPlayUrl(itemId) {
        const apiClient = getApiClient();
        if (!apiClient) {
            console.error('[OpenWithVLC] API Client Jellyfin non trouvé');
            return null;
        }

        const serverUrl = apiClient.serverAddress();
        const accessToken = apiClient.accessToken();
        
        if (!serverUrl || !accessToken) {
            console.error('[OpenWithVLC] Serveur ou token non disponible');
            return null;
        }

        // Construire l'URL de streaming direct
        // Utilise l'endpoint /Videos/{itemId}/stream pour le direct play
        const streamUrl = `${serverUrl}/Videos/${itemId}/stream?` + 
            `Static=true&` +
            `mediaSourceId=${itemId}&` +
            `api_key=${accessToken}`;

        return streamUrl;
    }

    /**
     * Récupère les informations du média via l'API
     */
    async function getMediaInfo(itemId) {
        const apiClient = getApiClient();
        if (!apiClient) return null;

        try {
            const item = await apiClient.getItem(apiClient.getCurrentUserId(), itemId);
            return item;
        } catch (error) {
            console.error('[OpenWithVLC] Erreur lors de la récupération du média:', error);
            return null;
        }
    }

    /**
     * Ouvre le média avec VLC
     */
    async function openWithVLC(itemId) {
        if (!itemId) {
            alert('❌ Impossible de récupérer l\'ID du média.');
            return;
        }

        console.log('[OpenWithVLC] Item ID:', itemId);

        // Récupérer l'URL de streaming
        const streamUrl = getDirectPlayUrl(itemId);
        
        if (!streamUrl) {
            alert('❌ Impossible de générer l\'URL de streaming.\n\nVérifiez que vous êtes connecté à Jellyfin.');
            return;
        }

        console.log('[OpenWithVLC] URL de streaming:', streamUrl);

        // Récupérer les infos du média pour un meilleur affichage
        const mediaInfo = await getMediaInfo(itemId);
        const mediaName = mediaInfo ? (mediaInfo.Name || 'Média') : 'Média';

        // Afficher l'URL dans un prompt pour copie dans VLC
        const message = `🎬 ${mediaName}\n\n` +
                       `Copiez cette URL dans VLC :\n` +
                       `Média → Ouvrir un flux réseau\n\n` +
                       `Ou utilisez vlc://open/${encodeURIComponent(streamUrl)}`;

        prompt(message, streamUrl);

        // Optionnel : Tenter d'ouvrir avec le protocole vlc:// si configuré
        // Décommentez la ligne suivante pour essayer l'ouverture automatique
        // window.open(`vlc://${streamUrl}`, '_blank');
    }

    /**
     * Ajoute le bouton "Ouvrir avec VLC" dans les menus
     */
    function addVlcButton() {
        // Cherche tous les boutons de menu (⋮)
        document.querySelectorAll('.itemAction[data-action="menu"], .btnCardMenu, .cardOverlayButton-br').forEach(btn => {
            // Éviter les doublons
            if (btn.dataset.vlcAdded) return;
            btn.dataset.vlcAdded = true;

            // Attendre que le menu soit ouvert
            btn.addEventListener('click', function() {
                setTimeout(() => {
                    addVlcMenuEntry(btn);
                }, 100);
            });
        });

        // Alternative : chercher directement les menus ouverts
        document.querySelectorAll('.menu:not([data-vlc-processed])').forEach(menu => {
            menu.dataset.vlcProcessed = true;
            addVlcMenuEntryToMenu(menu);
        });
    }

    /**
     * Ajoute l'entrée VLC à un menu spécifique
     */
    function addVlcMenuEntry(menuButton) {
        // Trouver le menu popup associé
        const menuId = menuButton.getAttribute('data-menu-id');
        let menu = menuId ? document.getElementById(menuId) : null;
        
        if (!menu) {
            // Chercher le menu dans le DOM
            menu = document.querySelector('.menu.show, .actionsheet-content.show');
        }

        if (menu && !menu.dataset.vlcMenuAdded) {
            menu.dataset.vlcMenuAdded = true;
            addVlcMenuEntryToMenu(menu, menuButton);
        }
    }

    /**
     * Ajoute l'entrée VLC dans un menu
     */
    function addVlcMenuEntryToMenu(menu, sourceButton) {
        // Vérifier si déjà ajouté
        if (menu.querySelector('.vlc-menu-item')) return;

        // Trouver l'Item ID
        let itemId = null;
        if (sourceButton) {
            const card = sourceButton.closest('[data-id]');
            itemId = card ? getItemId(card) : null;
        }

        // Si pas trouvé via le bouton, chercher dans le contexte
        if (!itemId) {
            const contextCard = document.querySelector('[data-id].detailPage-content, [data-id].itemDetailPage');
            itemId = contextCard ? getItemId(contextCard) : null;
        }

        // Créer l'élément de menu
        const vlcItem = document.createElement('button');
        vlcItem.className = 'listItem listItem-button vlc-menu-item';
        vlcItem.setAttribute('is', 'emby-button');
        vlcItem.setAttribute('type', 'button');
        vlcItem.style.cssText = 'display: flex; align-items: center; padding: 0.5em 1em;';
        
        vlcItem.innerHTML = `
            <span class="listItemIcon material-icons" style="margin-right: 1em;">▶</span>
            <div class="listItemBody">
                <div class="listItemBodyText">Ouvrir avec VLC</div>
            </div>
        `;

        vlcItem.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Fermer le menu
            const closeBtn = menu.querySelector('[data-action="close"]');
            if (closeBtn) closeBtn.click();
            
            // Ouvrir avec VLC
            openWithVLC(itemId);
        };

        // Ajouter au menu
        const menuContent = menu.querySelector('.actionSheetContent, .verticalMenu');
        if (menuContent) {
            menuContent.appendChild(vlcItem);
        } else {
            menu.appendChild(vlcItem);
        }

        console.log('[OpenWithVLC] Menu ajouté pour item:', itemId);
    }

    // Observer les changements du DOM pour détecter les nouveaux menus
    const observer = new MutationObserver((mutations) => {
        addVlcButton();
    });

    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });

    // Initialisation au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addVlcButton);
    } else {
        addVlcButton();
    }

    console.log('[OpenWithVLC] Plugin chargé et actif');
})();
