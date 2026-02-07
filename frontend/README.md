# Duobingo - Frontend

Application React + TypeScript pour la plateforme d'apprentissage gamifiée Duobingo.

## 🚀 Stack Technique

- **React 18** avec TypeScript
- **Vite** - Build tool & dev server
- **React Router v6** - Routing
- **TanStack Query** - Data fetching & caching
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hook Form + Zod** - Forms & validation
- **TailwindCSS** - Styling
- **Recharts** - Graphiques et statistiques

## 📁 Architecture du Projet

```
src/
├── api/              # Configuration Axios & services API
├── components/       # Composants réutilisables
│   ├── ui/          # Composants UI de base (Button, Input, Card, etc.)
│   ├── layout/      # Composants de mise en page
│   └── common/      # Composants communs métier
├── features/        # Modules fonctionnels (par domaine métier)
│   ├── auth/        # Authentification
│   ├── classroom/   # Gestion des cours
│   ├── module/      # Modules pédagogiques
│   ├── quiz/        # Quiz et questions
│   ├── session/     # Sessions de quiz
│   ├── leaderboard/ # Classements
│   ├── statistics/  # Statistiques
│   └── admin/       # Administration
├── hooks/           # Custom React hooks
├── layouts/         # Layouts principaux (Student, Teacher, Admin)
├── pages/           # Pages/Routes de l'application
│   ├── auth/        # Pages d'authentification
│   ├── student/     # Espace étudiant
│   ├── teacher/     # Espace professeur
│   ├── admin/       # Espace administration
│   └── public/      # Pages publiques
├── stores/          # Zustand stores
├── types/           # Types TypeScript & DTOs
└── utils/           # Fonctions utilitaires
```

## 🛠️ Installation

```bash
npm install
```

## 🏃 Démarrage

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## 📝 Scripts Disponibles

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Preview du build de production
- `npm run lint` - Linter le code

## 🔗 Configuration de l'API

Créer un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:8080/api
```

## 📚 Conventions de Code

- **Nommage** : Voir `/doc/naming-conventions.md`
- **DTOs** : Définis dans `/src/types` basés sur `/doc/dto.md`
- **Endpoints** : Référence dans `/doc/endpoints.md`
