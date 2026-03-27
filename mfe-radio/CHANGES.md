# UndergroundRadio — Améliorations apportées (Groupe 6)

## Logique métier (UndergroundRadio.jsx)

### Nouveaux événements écoutés

#### `hospital:alert` — { status, generator }
Si le générateur est coupé (`generator: false`), la radio bascule sur 91.3 FM et diffuse une alerte hôpital.

#### `crowd:panic` — { level, trending }
Si le niveau de panique dépasse 70, la radio bascule sur 666.6 FM avec le hashtag trending dans le message.

### Nouvelles commandes hacker gérées
- `blackout` → alerte réseau sur 91.3 FM, couleur rouge
- `drones` → alerte essaim sur 87.7 FM, couleur orange

### Amélioration de `weather:change`
Utilisation du champ `toxicity` pour adapter le message :
- `toxicity > 50` → `⚠️ AIR TOXIQUE CRITIQUE (X%). Ne sortez pas.`
- sinon → message d'alerte classique

### Correction de `isCrisis`
```js
// AVANT — rouge même pendant les messages de paix (love = 88.8 FM)
const isCrisis = frequency !== '87.7';

// APRÈS — basé sur la couleur du thème
const isCrisis = themeColor === 'red' || themeColor === 'orange';
```

### Cleanup complet
Tous les `on()` ont leur `unsub()` dans le `return` du `useEffect` :
```js
return () => {
  unsubWeather();
  unsubPower();
  unsubHacker();
  unsubPanic();
  unsubHospital();
};
```

---

## Animations (UndergroundRadio.css)

### Fond qui pulse en crise
Le composant entier pulse entre bleu nuit et rouge sombre à 0.8s, avec halo rouge externe.
```css
.underground-radio.crisis {
  animation: crisis-pulse 0.8s ease-in-out infinite;
}
```

### ON AIR dot s'emballe en crise
Le point et le texte "ON AIR" clignotent à 0.3s en rouge vif en mode crise.
```css
.underground-radio.crisis .on-air {
  animation: pulse 0.3s infinite;
  color: #ff2d2d;
}
```

---

## Tests de contrat (contract.test.js)

Deux tests vérifient que `radio:broadcast` respecte le contrat de l'Event Bus :

### Test 1 — payload d'urgence
Vérifie que `message` (string), `frequency` (string) et `isEmergency` (boolean) sont bien présents.

### Test 2 — message non urgent
Vérifie que `isEmergency` peut valoir `false` (ex : commande `love`).

```bash
cd mfe-radio && npm test
```

---
