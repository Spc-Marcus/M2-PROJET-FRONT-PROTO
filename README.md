# 🎓 Duobingo - Projet M2

Plateforme d'apprentissage gamifiée type Duolingo pour l'enseignement médical.

## 📂 Structure du Repository

```
M2-PROJET-FRONT-PROTO/
├── doc/                    # 📚 Documentation du projet
│   ├── class-diagram.md    # Diagramme de classes UML
│   ├── dto.md             # Définition de tous les DTOs
│   ├── endpoints.md       # Liste complète des endpoints API
│   └── naming-conventions.md
│
└── frontend/              # 💻 Application React + TypeScript
    ├── src/
    │   ├── api/          # Services API
    │   ├── components/   # Composants réutilisables
    │   ├── features/     # Modules métier
    │   ├── hooks/        # Custom hooks
    │   ├── layouts/      # Layouts
    │   ├── pages/        # Pages/Routes
    │   ├── stores/       # State management (Zustand)
    │   ├── types/        # Types TypeScript
    │   └── utils/        # Utilitaires
    │
    ├── README.md         # Documentation du frontend
    └── PROMPT.md         # 🚀 PROMPT POUR GÉNÉRER LE CODE COMPLET
```

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation Frontend

```bash
cd frontend
npm install
```

### Lancement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📖 Documentation

Toute la documentation technique est dans le dossier `/doc/` :
- **Architecture** : Voir [class-diagram.md](doc/class-diagram.md)
- **API** : Voir [endpoints.md](doc/endpoints.md)
- **DTOs** : Voir [dto.md](doc/dto.md)

## 🤖 Génération du Code Frontend

Le projet frontend est initialisé avec la stack technique complète :
- React 18 + TypeScript
- Vite
- React Router v6
- TanStack Query
- Zustand
- Axios
- React Hook Form + Zod
- TailwindCSS
- Recharts

**Pour générer l'ensemble du code de l'application, consulte :**
👉 [frontend/PROMPT.md](frontend/PROMPT.md)

Ce fichier contient le prompt complet à fournir à GitHub Copilot pour générer tous les composants, services, hooks, pages, etc.

## 🏗️ Stack Technique Complète

### Frontend
- **Framework** : React 18
- **Language** : TypeScript
- **Build** : Vite
- **Routing** : React Router v6
- **State** : Zustand
- **Data Fetching** : TanStack Query
- **HTTP** : Axios
- **Forms** : React Hook Form + Zod
- **Styling** : TailwindCSS
- **Charts** : Recharts

### Backend (Documentation uniquement)
- API REST documentée dans `/doc/endpoints.md`
- DTOs dans `/doc/dto.md`

## 👥 Rôles de l'Application

### 🎓 Étudiant
- Rejoindre des cours via code
- Suivre des modules avec progression
- Passer des quiz (QCM, QROC, Ordre, Appariement, Vrai/Faux)
- Gagner points, badges, streak
- Consulter leaderboard et statistiques

### 👨‍🏫 Professeur
- Créer et gérer des cours (Classrooms)
- Créer des modules pédagogiques
- Créer des quiz avec prérequis
- Gérer les questions (5 types)
- Inviter étudiants et enseignants
- Consulter statistiques de classe

### 🔧 Admin
- Créer comptes Professeurs/Admins
- Gérer tous les utilisateurs
- Vue d'ensemble système

## 🎯 Fonctionnalités Clés

- **Gamification** : Points, Streak, Badges, Leaderboard
- **Progression** : Système de prérequis entre modules et quiz
- **5 Types de Questions** : QCM, QROC, Ordre, Appariement, Vrai/Faux
- **Statistiques** : Graphiques de progression pour étudiants et profs
- **Multi-tentatives** : Configuration flexible par quiz
- **Feedback** : Immédiat ou différé selon configuration

## 📝 Prochaines Étapes

1. ✅ Structure du projet initialisée
2. ⏳ Générer le code avec le prompt dans `frontend/PROMPT.md`
3. ⏳ Connecter à l'API backend
4. ⏳ Tests et ajustements
5. ⏳ Déploiement

---

**Projet réalisé dans le cadre du M2 - 2026**
