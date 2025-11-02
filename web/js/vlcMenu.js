(function() {
    'use strict';

    function addVlcButton() {
        document.querySelectorAll('.item-menu-button').forEach(btn => {
            if (btn.dataset.vlcAdded) return;
            btn.dataset.vlcAdded = true;

            const vlcItem = document.createElement('li');
            vlcItem.className = 'menu-item';
            vlcItem.innerText = 'Ouvrir avec VLC';
            vlcItem.style.cursor = 'pointer';

            vlcItem.onclick = function(e) {
                e.stopPropagation();
                const item = btn.closest('.item');
                if (!item) return;

                const mediaUrl = item.getAttribute('data-direct-url') ||
                                 (item.dataset && item.dataset.directUrl);
                if (!mediaUrl) {
                    alert('Impossible de récupérer l\'URL directe. Utilisez "Copier le lien direct".');
                    return;
                }

                // Ouvre VLC via protocole personnalisé ou prompt
                // Ex: vlc://URL si protocole VLC configuré
                prompt("Copiez cette URL dans VLC ou votre script open_vlc.bat :", mediaUrl);
            };

            const menu = btn.closest('.menu');
            if (menu) {
                menu.appendChild(vlcItem);
            }
        });
    }

    const observer = new MutationObserver(addVlcButton);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('load', addVlcButton);
})();
