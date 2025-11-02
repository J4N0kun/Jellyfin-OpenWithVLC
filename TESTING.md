# 🧪 Guide de Test - Plugin "Open With VLC"

## 📍 Où Trouver le Menu

### Emplacements Prévus

Le menu **"Ouvrir avec VLC"** doit apparaître dans le **menu contextuel (⋮)** des médias :

1. **Page d'accueil** : sur les vignettes de films/séries
2. **Bibliothèque** : vue grille ou liste
3. **Page de détails** : menu du média principal

### Comment Tester

1. **Installer le plugin** dans Jellyfin
2. Ouvrir **Jellyfin Web** dans votre navigateur
3. Naviguer vers **Films** ou **Séries**
4. Survoler une vignette de média
5. Cliquer sur le bouton **⋮** (trois points)
6. Chercher l'entrée **"Ouvrir avec VLC"**

## ⚠️ Limitations Actuelles

### Problème : Récupération de l'URL

Le code actuel cherche `data-direct-url` sur les éléments HTML, mais **cette attribute n'existe pas par défaut** dans Jellyfin Web.

**Symptôme attendu :**
```
Cliquer sur "Ouvrir avec VLC"
→ Message d'erreur : "Impossible de récupérer l'URL directe."
```

### Solution : Utiliser l'API Jellyfin

Pour que le plugin fonctionne correctement, il faut :

1. Récupérer l'**ID du média** depuis l'élément HTML
2. Utiliser l'**API Jellyfin** pour obtenir l'URL de streaming
3. Construire l'URL de Direct Play

## 🔧 Tests à Effectuer

### Test 1 : Vérifier l'Apparition du Menu

- [ ] Le menu "Ouvrir avec VLC" apparaît dans le menu contextuel
- [ ] Le menu n'apparaît qu'une seule fois (pas de doublons)
- [ ] Le style du menu est cohérent avec les autres entrées

### Test 2 : Tester sur Différents Types de Médias

- [ ] Films
- [ ] Épisodes de série
- [ ] Séries complètes
- [ ] Collections

### Test 3 : Tester dans Différentes Vues

- [ ] Vue grille (bibliothèque)
- [ ] Vue liste
- [ ] Page de détails du média
- [ ] Page d'accueil

### Test 4 : Tester la Récupération d'URL

- [ ] L'URL s'affiche dans le prompt
- [ ] L'URL est correcte et accessible
- [ ] L'URL fonctionne dans VLC

## 🐛 Débogage

### Ouvrir la Console du Navigateur

1. Appuyer sur **F12** dans le navigateur
2. Aller dans l'onglet **Console**
3. Vérifier les erreurs JavaScript

### Vérifier que le Plugin est Chargé

Dans la console :

```javascript
// Vérifier si le script est présent
document.querySelector('script[src*="vlcMenu"]')
```

### Inspecter l'Élément du Menu

1. Cliquer droit sur une vignette → **Inspecter**
2. Chercher `.item-menu-button`
3. Vérifier la structure HTML

### Vérifier les Attributs Disponibles

Dans la console, quand un menu est ouvert :

```javascript
// Trouver l'élément parent
const item = document.querySelector('.item');
console.log(item.dataset); // Affiche tous les data-* attributes
console.log(item.attributes); // Affiche tous les attributs
```

## 📊 Informations Utiles pour Debug

### Structure HTML Attendue (Jellyfin Web)

```html
<div class="item" data-id="abc123" data-type="Movie">
  <div class="cardContent">
    <button class="item-menu-button">⋮</button>
    <div class="menu">
      <ul>
        <li class="menu-item">Lecture</li>
        <li class="menu-item">Informations</li>
        <!-- Notre menu devrait s'ajouter ici -->
        <li class="menu-item">Ouvrir avec VLC</li>
      </ul>
    </div>
  </div>
</div>
```

### API Jellyfin pour Obtenir l'URL

```javascript
// Exemple de construction d'URL de streaming
const itemId = 'abc123'; // ID du média
const serverUrl = window.ApiClient.serverAddress();
const accessToken = window.ApiClient.accessToken();

const streamUrl = `${serverUrl}/Items/${itemId}/Download?api_key=${accessToken}`;
// ou pour le streaming :
const playUrl = `${serverUrl}/Videos/${itemId}/stream?Static=true&api_key=${accessToken}`;
```

## 🎯 Prochaines Améliorations Nécessaires

Pour que le plugin fonctionne correctement, il faudra :

1. **Récupérer l'Item ID** depuis les attributs HTML (`data-id`)
2. **Utiliser l'API Client Jellyfin** (`window.ApiClient`)
3. **Construire l'URL de streaming** avec le bon format
4. **Gérer différents types de médias** (films vs épisodes)
5. **Ajouter la gestion des sous-titres** (optionnel)

## 📝 Rapport de Test

Après vos tests, veuillez noter :

```markdown
### Environnement
- Version Jellyfin Server : 
- Version Jellyfin Web : 
- Navigateur : 
- OS : 

### Résultats
- [ ] Menu visible
- [ ] Pas de doublons
- [ ] URL récupérée
- [ ] URL fonctionnelle dans VLC

### Problèmes Rencontrés
[Décrire ici]

### Console Errors
[Copier les erreurs JavaScript]
```

## 🔗 Ressources

- **API Jellyfin** : https://api.jellyfin.org/
- **Jellyfin Web Client** : https://github.com/jellyfin/jellyfin-web
- **Documentation Plugins** : https://jellyfin.org/docs/general/server/plugins/

---

**Note :** Ce plugin est en version initiale et nécessitera probablement des améliorations pour fonctionner parfaitement avec l'API Jellyfin.

