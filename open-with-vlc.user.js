// ==UserScript==
// @name         Jellyfin - Open With VLC
// @namespace    https://github.com/J4N0kun/Jellyfin-OpenWithVLC
// @version      1.5.2
// @description  Ajoute un menu contextuel "Ouvrir avec VLC" dans Jellyfin Web pour lancer les médias directement dans VLC
// @author       J4N0kun
// @match        https://*/*
// @match        http://*/*
// @icon         https://raw.githubusercontent.com/jellyfin/jellyfin-web/master/src/assets/img/icon-transparent.svg
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Récupère l'API Client Jellyfin
     */
    function getApiClient() {
        return window.ApiClient || (window.Emby && window.Emby.ApiClient);
    }

    /**
     * Attend que l'API Client Jellyfin soit disponible
     */
    function waitForApiClient(callback, maxAttempts = 50) {
        let attempts = 0;
        const interval = setInterval(() => {
            attempts++;
            const apiClient = getApiClient();
            
            if (apiClient) {
                clearInterval(interval);
                callback();
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                console.log('[OpenWithVLC] API Client Jellyfin non trouvé après', maxAttempts, 'tentatives');
            }
        }, 200); // Vérifier toutes les 200ms
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
     * Affiche une notification toast Jellyfin
     */
    function showNotification(message, isError = false) {
        // Utiliser l'API de notification Jellyfin si disponible
        if (window.Emby && window.Emby.Notifications) {
            window.Emby.Notifications.show({
                message: message,
                type: isError ? 'error' : 'success'
            });
        } else if (window.Dashboard && window.Dashboard.alert) {
            window.Dashboard.alert(message);
        } else {
            // Fallback : console
            console.log('[OpenWithVLC]', message);
        }
    }

    /**
     * Affiche une boîte de dialogue personnalisée avec l'URL
     */
    function showVlcDialog(mediaName, streamUrl) {
        const vlcUrl = `vlc://${streamUrl}`;
        
        // Créer le backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'vlc-backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            z-index: 9999;
        `;

        // Créer le dialogue
        const dialog = document.createElement('div');
        dialog.className = 'dialog vlc-dialog';
        dialog.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #181818;
            border-radius: 8px;
            padding: 2em;
            max-width: 600px;
            width: 90%;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            pointer-events: auto;
        `;
        
        // Empêcher la propagation des clics sur le dialogue
        dialog.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Titre
        const title = document.createElement('h2');
        title.style.cssText = 'margin-top: 0; color: #fff;';
        title.textContent = `🎬 ${mediaName}`;

        // Message de confirmation
        const message = document.createElement('p');
        message.style.color = '#ccc';
        message.textContent = 'URL de streaming copiée dans le presse-papiers !';

        // Conteneur du champ URL
        const urlContainer = document.createElement('div');
        urlContainer.style.margin = '1.5em 0';

        const label = document.createElement('label');
        label.style.cssText = 'color: #aaa; display: block; margin-bottom: 0.5em;';
        label.textContent = 'Collez cette URL dans VLC :';

        const input = document.createElement('input');
        input.type = 'text';
        input.readOnly = true;
        input.value = streamUrl;
        input.style.cssText = `
            width: 100%;
            padding: 0.75em;
            background: #252525;
            border: 1px solid #444;
            border-radius: 4px;
            color: #fff;
            font-family: monospace;
            font-size: 0.9em;
            cursor: text;
        `;
        input.addEventListener('click', function() {
            this.select();
        });

        urlContainer.appendChild(label);
        urlContainer.appendChild(input);

        // Conteneur des boutons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.margin = '1.5em 0';

        // Bouton "Ouvrir dans VLC"
        const vlcLink = document.createElement('a');
        vlcLink.href = vlcUrl;
        vlcLink.style.cssText = `
            display: inline-block;
            padding: 0.75em 1.5em;
            background: #00A4DC;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin-right: 1em;
            cursor: pointer;
        `;
        vlcLink.textContent = '▶ Ouvrir dans VLC';

        // Bouton "Fermer"
        const closeBtn = document.createElement('button');
        closeBtn.style.cssText = `
            padding: 0.75em 1.5em;
            background: #444;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        `;
        closeBtn.textContent = 'Fermer';
        closeBtn.type = 'button';

        buttonContainer.appendChild(vlcLink);
        buttonContainer.appendChild(closeBtn);

        // Astuce
        const tip = document.createElement('p');
        tip.style.cssText = 'color: #888; font-size: 0.85em; margin-bottom: 0;';
        tip.textContent = '💡 Astuce : VLC → Média → Ouvrir un flux réseau';

        // Assembler le dialogue
        dialog.appendChild(title);
        dialog.appendChild(message);
        dialog.appendChild(urlContainer);
        dialog.appendChild(buttonContainer);
        dialog.appendChild(tip);

        backdrop.appendChild(dialog);

        // Fonction de fermeture
        const closeDialog = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            console.log('[OpenWithVLC] Fermeture du dialogue');
            backdrop.remove();
        };

        // Événements avec capture pour contourner les handlers Jellyfin
        closeBtn.addEventListener('click', closeDialog, true);
        closeBtn.addEventListener('mousedown', closeDialog, true);
        
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                closeDialog(e);
            }
        }, true);

        // Ajouter au DOM
        document.body.appendChild(backdrop);
    }

    /**
     * Ouvre le média avec VLC
     */
    async function openWithVLC(itemId) {
        if (!itemId) {
            showNotification('❌ Impossible de récupérer l\'ID du média.', true);
            return;
        }

        console.log('[OpenWithVLC] Item ID:', itemId);

        // Récupérer l'URL de streaming
        const streamUrl = getDirectPlayUrl(itemId);
        
        if (!streamUrl) {
            showNotification('❌ Impossible de générer l\'URL de streaming.', true);
            return;
        }

        console.log('[OpenWithVLC] URL de streaming:', streamUrl);

        // Récupérer les infos du média pour un meilleur affichage
        const mediaInfo = await getMediaInfo(itemId);
        const mediaName = mediaInfo ? (mediaInfo.Name || 'Média') : 'Média';

        // Copier l'URL dans le presse-papiers
        try {
            await navigator.clipboard.writeText(streamUrl);
            console.log('[OpenWithVLC] URL copiée dans le presse-papiers');
        } catch (err) {
            console.warn('[OpenWithVLC] Impossible de copier dans le presse-papiers:', err);
        }

        // Afficher la boîte de dialogue personnalisée
        showVlcDialog(mediaName, streamUrl);
    }

    /**
     * Ajoute le bouton "Ouvrir avec VLC" dans les menus
     */
    function addVlcButton() {
        // Cherche tous les boutons de menu (⋮) des cartes média
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

        // Note: On ne traite plus les menus existants au chargement
        // pour éviter d'ajouter l'entrée VLC aux menus du header/navigation
    }

    /**
     * Ajoute l'entrée VLC à un menu spécifique
     */
    function addVlcMenuEntry(menuButton) {
        // Récupérer l'itemId AVANT d'ouvrir le menu
        const card = menuButton.closest('[data-id]');
        const itemId = card ? getItemId(card) : null;

        if (!itemId) {
            console.log('[OpenWithVLC] Pas d\'itemId sur le bouton menu');
            return;
        }

        // Attendre que le menu s'ouvre et lui injecter l'itemId
        setTimeout(() => {
            // Chercher le menu actionSheet ouvert
            const menu = document.querySelector('.actionSheet.opened, .actionsheet.opened, .dialog.opened');
            
            if (menu && !menu.dataset.vlcMenuAdded) {
                menu.dataset.vlcMenuAdded = true;
                menu.dataset.vlcItemId = itemId; // Stocker l'itemId dans le menu
                addVlcMenuEntryToMenu(menu, itemId);
            }
        }, 150); // Attendre que le menu soit complètement rendu
    }

    /**
     * Ajoute l'entrée VLC dans un menu
     */
    function addVlcMenuEntryToMenu(menu, itemId) {
        // Vérifier si déjà ajouté
        if (menu.querySelector('.vlc-menu-item')) return;

        // Ne pas ajouter le menu si on n'a pas d'itemId valide
        if (!itemId) {
            console.log('[OpenWithVLC] Pas d\'itemId fourni, menu ignoré');
            return;
        }

        // Créer l'élément de menu dans le style Jellyfin actionSheet
        const vlcItem = document.createElement('button');
        vlcItem.className = 'listItem listItem-button actionSheetMenuItem emby-button vlc-menu-item';
        vlcItem.setAttribute('is', 'emby-button');
        vlcItem.setAttribute('type', 'button');
        vlcItem.setAttribute('data-id', 'openwithvlc');
        
        vlcItem.innerHTML = `
            <span class="actionsheetMenuItemIcon listItemIcon listItemIcon-transparent material-icons play_arrow" aria-hidden="true"></span>
            <div class="listItemBody actionsheetListItemBody">
                <div class="listItemBodyText actionSheetItemText">Ouvrir avec VLC</div>
            </div>
        `;

        vlcItem.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Fermer le menu ET son backdrop
            menu.classList.remove('opened');
            
            // Supprimer aussi le backdrop (fond sombre)
            const backdrop = document.querySelector('.dialogBackdrop, .backdrop');
            if (backdrop) {
                backdrop.remove();
            }
            
            // Supprimer le menu
            setTimeout(() => {
                menu.remove();
            }, 100);
            
            // Ouvrir avec VLC
            openWithVLC(itemId);
        };

        // Ajouter au menu (chercher le conteneur de boutons)
        const menuScroller = menu.querySelector('.actionSheetScroller, .verticalMenu');
        if (menuScroller) {
            // Ajouter après le bouton "Copier l'URL du flux" si présent
            const copyStreamBtn = menuScroller.querySelector('[data-id="copy-stream"]');
            if (copyStreamBtn) {
                copyStreamBtn.parentNode.insertBefore(vlcItem, copyStreamBtn.nextSibling);
            } else {
                // Sinon ajouter en début de menu
                menuScroller.insertBefore(vlcItem, menuScroller.firstChild);
            }
            console.log('[OpenWithVLC] Menu ajouté pour item:', itemId);
        } else {
            console.log('[OpenWithVLC] Conteneur de menu non trouvé');
        }
    }

    /**
     * Initialise le plugin une fois l'API Client disponible
     */
    function initPlugin() {
        console.log('[OpenWithVLC] Plugin chargé et actif');

        // Observer les changements du DOM pour détecter les nouveaux menus
        const observer = new MutationObserver((mutations) => {
            addVlcButton();
        });

        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });

        // Initialisation immédiate
        addVlcButton();
    }

    // Attendre que l'API Client Jellyfin soit disponible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            waitForApiClient(initPlugin);
        });
    } else {
        waitForApiClient(initPlugin);
    }
})();

