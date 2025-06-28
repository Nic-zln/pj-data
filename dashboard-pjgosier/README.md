# Dashboard Firebase

Un tableau de bord moderne pour visualiser et gérer les données Firebase.

## Configuration requise

- Un compte Firebase
- Un navigateur web moderne
- Un éditeur de code

## Installation

1. Clonez ce dépôt :
```bash
git clone [votre-repo]
cd [votre-repo]
```

2. Configurez Firebase :
   - Créez un nouveau projet sur [Firebase Console](https://console.firebase.google.com)
   - Obtenez vos informations de configuration Firebase
   - Remplacez les valeurs dans `app.js` avec vos propres informations de configuration :
     ```javascript
     const firebaseConfig = {
         apiKey: "VOTRE_API_KEY",
         authDomain: "votre-app.firebaseapp.com",
         projectId: "votre-projet-id",
         storageBucket: "votre-app.appspot.com",
         messagingSenderId: "votre-messaging-sender-id",
         appId: "votre-app-id"
     };
     ```

3. Structure de la base de données Firestore :
   Créez les collections suivantes dans Firestore :
   - `users` : Collection des utilisateurs
   - `data` : Collection des données principales
   - `statistics` : Collection des statistiques globales

## Utilisation

1. Ouvrez `index.html` dans votre navigateur
2. Le dashboard se mettra à jour automatiquement toutes les 30 secondes
3. Les données sont affichées dans trois sections principales :
   - Cartes de statistiques
   - Tableau des données récentes
   - Navigation latérale

## Personnalisation

- Modifiez `styles.css` pour personnaliser l'apparence
- Ajustez les requêtes Firestore dans `app.js` selon vos besoins
- Modifiez la structure HTML dans `index.html` pour ajouter ou supprimer des sections

## Sécurité

- Ne partagez jamais vos clés API Firebase
- Configurez les règles de sécurité Firestore appropriées
- Utilisez l'authentification Firebase si nécessaire

## Support

Pour toute question ou problème, veuillez ouvrir une issue dans le dépôt. 