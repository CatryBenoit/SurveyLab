# 📊 SurveyLab - Plateforme d'Ultra-Sondages et Tier Lists

SurveyLab est une application web moderne (SPA) permettant aux créateurs de concevoir des sondages hautement interactifs (Sliders, Tier Lists, Évaluations, Sélections de médias) et d'analyser les résultats des répondants grâce à un système de filtrage croisé en temps réel.

## 🚀 Fonctionnalités

- **Gestion des utilisateurs :** Inscription, connexion et sécurisation des sessions via JWT (JSON Web Tokens) avec hachage des mots de passe (`bcryptjs`).
- **Éditeur de sondages modulaire :** Interface de création de questionnaires découpée en composants réutilisables, évitant les conflits d'états.
- **Multiples types de questions :**
  - Choix unique (Radio) et Choix multiples (Checkbox)
  - Curseurs dynamiques (Slider / Barre de progression numérique)
  - Évaluations graphiques (Étoiles, Emojis de ressenti)
  - **Tier Lists interactives** (Classement d'éléments de S à D)
- **Isolation des réponses :** Système de rendu dynamique (`ResponseHandler`) garantissant l'étanchéité absolue des données par identifiant unique de question (`_id`).
- **Dashboard Analytique :** Visualisation des statistiques et filtrage croisé (ex: filtrer toutes les réponses selon le choix d'une question spécifique).

---

## 🛠️ Stack Technique

**Back-end (Serveur) :**
- Node.js & Express
- MongoDB & Mongoose (Sous-schémas pour les questions)
- Authentification : JWT & Bcryptjs

**Front-end (Client) :**
- Vue.js 3 (Composition API & `<script setup>`)
- TypeScript
- Vite (Build tool ultra-rapide)
- Axios (Requêtes HTTP)
- Vue Router (Gestion des routes)

---

## 📂 Architecture du Projet

```text
surveylab/
├── backend/                  # Partie Serveur (Node.js/Express)
│   ├── middleware/
│   │   └── auth.js           # Protection des routes par JWT
│   ├── models/
│   │   ├── User.js           # Modèle Utilisateur
│   │   ├── Survey.js         # Schéma Sondage (avec sous-schéma de questions)
│   │   └── Response.js       # Réponses des utilisateurs publics
│   ├── routes/
│   │   ├── auth.js           # Auth routes (Register/Login)
│   │   └── surveyRoute.js    # Logique CRUD, Analytics & Réponses
│   ├── .env                  # Variables d'environnement (MONGO_URI, JWT_SECRET)
│   └── index.js              # Point d'entrée du serveur Express
│
└── client/                   # Partie Client (Vue.js/TypeScript)
    ├── src/
    │   ├── components/
    │   │   ├── OptionEditor.vue       # Gestion unitaire des options (Création)
    │   │   ├── QuestionEditor.vue     # Gestion unitaire des blocs de questions
    │   │   └── responses/             # Composants d'isolation des réponses
    │   │       ├── ResponseHandler.vue # Dispatcher dynamique de rendu
    │   │       ├── TextResponse.vue
    │   │       ├── RadioResponse.vue
    │   │       ├── SliderResponse.vue
    │   │       └── TierListResponse.vue
    │   ├── views/
    │   │   ├── RegisterView.vue       # Page d'inscription
    │   │   ├── LoginView.vue          # Page de connexion
    │   │   ├── DashboardView.vue      # Gestion des sondages du créateur
    │   │   ├── CreateSurveyView.vue   # L'Éditeur complet
    │   │   ├── SurveyView.vue         # Interface publique de réponse (Blindée)
    │   │   └── AnalyticsView.vue      # Tableau de bord des statistiques & filtres
    │   └── router/
    │       └── index.ts               # Configuration de Vue Router
    └── vite.config.ts
```
💻 Installation et Lancement
Prerequis
Avoir Node.js et un cluster MongoDB (local ou Atlas) opérationnels.

1. Configuration du Back-end
Déplacez-vous dans le dossier serveur, installez les dépendances et créez le fichier .env :

Bash
cd server
npm install
touch .env
Dans le fichier .env, ajoutez les variables suivantes :

Extrait de code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
Lancez le serveur en mode développement avec nodemon :

Bash
npx nodemon index.js
Le serveur doit afficher : ✅ Connecté à MongoDB et 🚀 Serveur lancé sur le port 5000.

2. Configuration du Front-end
Ouvrez un nouveau terminal, déplacez-vous dans le dossier client et installez les dépendances :

Bash
cd client
npm install
Lancez le serveur de développement Vite :

Bash
npm run dev
L'application est accessible par défaut sur http://localhost:5173
