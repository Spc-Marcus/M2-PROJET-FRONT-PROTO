# 🚀 Prompt pour Générer le Frontend Complet Duobingo

## 📋 Instructions

Copie et fournis le prompt ci-dessous à GitHub Copilot pour générer l'ensemble du code frontend de l'application Duobingo.

---

## 🎯 PROMPT À FOURNIR

```
Je veux que tu génères l'ensemble du code frontend pour l'application Duobingo en respectant STRICTEMENT la documentation du projet située dans /doc/.

**CONTEXTE DU PROJET :**
- Application de type Duolingo pour l'apprentissage médical gamifié
- 3 rôles : Étudiant, Professeur, Admin
- Architecture : Classroom > Module > Quiz > Questions
- Système de progression avec prérequis, points, streak, badges, leaderboard

**TECHNOLOGIES À UTILISER (déjà installées) :**
- React 18 + TypeScript
- React Router v6
- TanStack Query (React Query)
- Zustand (state management)
- Axios
- React Hook Form + Zod
- TailwindCSS
- Recharts

**STRUCTURE DU PROJET (déjà créée dans /frontend) :**
```
src/
├── api/              # Services API & configuration Axios
├── components/
│   ├── ui/          # Composants UI réutilisables
│   ├── layout/      # Header, Sidebar, Footer
│   └── common/      # Composants métier communs
├── features/        # Features par domaine
│   ├── auth/
│   ├── classroom/
│   ├── module/
│   ├── quiz/
│   ├── session/
│   ├── leaderboard/
│   ├── statistics/
│   └── admin/
├── hooks/           # Custom hooks
├── layouts/         # StudentLayout, TeacherLayout, AdminLayout
├── pages/           # Pages par rôle
├── stores/          # Zustand stores
├── types/           # Types TS & DTOs
└── utils/           # Helpers
```

**📚 DOCUMENTATION DE RÉFÉRENCE :**
Tu DOIS lire et respecter INTÉGRALEMENT :
1. `/doc/endpoints.md` - Tous les endpoints API disponibles
2. `/doc/dto.md` - Structure EXACTE de tous les DTOs
3. `/doc/naming-conventions.md` - Conventions de nommage
4. `/doc/class-diagram.md` - Modèle de données complet

**🎨 EXIGENCES DE DESIGN :**
- Design moderne, épuré, inspiré de Duolingo
- Interface adaptative (mobile-first)
- Couleurs : Primaire bleue (#0ea5e9), succès verte, erreur rouge
- Dark mode supporté via TailwindCSS
- Animations fluides pour les transitions
- Feedback visuel pour toutes les actions utilisateur

**⚙️ FONCTIONNALITÉS À IMPLÉMENTER :**

### 1. AUTHENTIFICATION & ROUTING
- Page Login/Register
- Protection des routes par rôle (STUDENT, TEACHER, ADMIN)
- JWT stocké en localStorage via Zustand
- Intercepteur Axios pour ajouter le token automatiquement
- Redirection automatique selon le rôle après login

### 2. ESPACE ÉTUDIANT
- Dashboard : Progression globale, streak, points, badges
- Liste des cours inscrits (Classrooms)
- Vue détaillée d'un cours : modules disponibles/verrouillés
- Vue module : liste des quiz avec statut (locked/unlocked/completed)
- Session de quiz :
  - Affichage question par question
  - Types : QCM, QROC, Ordre, Appariement, Vrai/Faux
  - Timer si quiz chronométré
  - Feedback immédiat si activé
  - Récapitulatif final avec score
- Leaderboard : classement du cours
- Statistiques personnelles : graphiques de progression, taux de réussite par module
- Gestion du profil (modifier email, avatar)
- Code pour rejoindre un cours

### 3. ESPACE PROFESSEUR
- Dashboard : Vue d'ensemble des cours gérés
- Gestion des Classrooms :
  - Créer/modifier/supprimer un cours
  - Gérer les étudiants (inviter par email, retirer)
  - Gérer les enseignants (ajouter/retirer)
  - Régénérer le code d'accès
- Gestion des Modules :
  - Créer/modifier/supprimer un module
  - Définir les prérequis entre modules
  - Organiser l'ordre des modules
- Gestion des Quiz :
  - Créer/modifier/supprimer un quiz
  - Définir prérequis entre quiz
  - Ajouter/modifier/supprimer des questions
  - Configurer options (chronomètre, feedback, tentatives)
- Statistiques du cours :
  - Taux de réussite par quiz/module
  - Participation des étudiants
  - Graphiques de progression de classe
  - Export CSV des résultats

### 4. ESPACE ADMIN
- Gestion des utilisateurs :
  - Liste paginée de tous les utilisateurs
  - Créer un compte Professeur/Admin
  - Modifier/supprimer un utilisateur
  - Recherche et filtres
- Vue d'ensemble système (statistiques globales)

**🔧 IMPLÉMENTATION TECHNIQUE REQUISE :**

### API Layer (src/api/)
- `axiosInstance.ts` : Configuration Axios avec baseURL et intercepteurs
- `auth.service.ts` : login, register, getMe
- `classroom.service.ts` : CRUD classrooms, gestion membres
- `module.service.ts` : CRUD modules
- `quiz.service.ts` : CRUD quiz
- `question.service.ts` : CRUD questions
- `session.service.ts` : startSession, submitAnswer, finishSession
- `leaderboard.service.ts` : getClassroomLeaderboard
- `statistics.service.ts` : getStudentStats, getClassroomStats
- `admin.service.ts` : gestion utilisateurs

### Types (src/types/)
Créer des interfaces TypeScript pour TOUS les DTOs de `/doc/dto.md` :
- `auth.types.ts`
- `user.types.ts`
- `classroom.types.ts`
- `module.types.ts`
- `quiz.types.ts`
- `question.types.ts`
- `session.types.ts`
- `leaderboard.types.ts`
- `statistics.types.ts`
- `common.types.ts` (PaginatedResponse, ErrorResponse, etc.)

### Stores Zustand (src/stores/)
- `authStore.ts` : user, token, login, logout, isAuthenticated
- `uiStore.ts` : sidebar state, theme, notifications

### Custom Hooks (src/hooks/)
- `useAuth.ts` : hook pour accéder à l'auth store
- `useClassrooms.ts` : TanStack Query pour classrooms
- `useModules.ts` : TanStack Query pour modules
- `useQuizzes.ts` : TanStack Query pour quizzes
- `useSession.ts` : Gestion d'une session de quiz en cours
- `useLeaderboard.ts` : TanStack Query pour leaderboard
- `useStatistics.ts` : TanStack Query pour stats

### Composants UI (src/components/ui/)
Créer des composants réutilisables avec TailwindCSS :
- Button
- Input
- Card
- Modal
- Badge
- ProgressBar
- Loader/Spinner
- Alert/Toast
- Dropdown
- Tabs
- Tooltip
- Avatar

### Layouts (src/layouts/)
- `StudentLayout.tsx` : Sidebar avec navigation étudiant
- `TeacherLayout.tsx` : Sidebar avec navigation professeur
- `AdminLayout.tsx` : Sidebar avec navigation admin
- `AuthLayout.tsx` : Layout pour pages login/register

### Validation avec Zod
- Créer des schémas Zod pour tous les formulaires
- Intégrer avec React Hook Form via `@hookform/resolvers/zod`

**📊 COMPOSANTS SPÉCIAUX À CRÉER :**

1. **QuizSession Component** :
   - Gestion du state de session (question courante, réponses, timer)
   - Rendu dynamique selon le type de question
   - Navigation question précédente/suivante
   - Soumission finale

2. **QuestionRenderer Component** :
   - Rendu conditionnel selon QuestionType (QCM, QROC, ORDER, PAIRING, TRUE_FALSE)
   - Validation des réponses côté client
   - Feedback visuel

3. **ProgressVisualization** :
   - Graphique de progression avec Recharts
   - Affichage des modules complétés vs total
   - Visualisation du streak

4. **LeaderboardTable** :
   - Tableau trié avec classement
   - Highlight de l'utilisateur connecté
   - Avatars et points

**🎯 POINTS CRITIQUES :**

1. **Gestion des Prérequis** :
   - Afficher visuellement les modules/quiz verrouillés
   - Tooltip expliquant quel prérequis manque
   - Désactiver les actions si verrouillé

2. **Gestion d'erreurs** :
   - Afficher les erreurs API de manière user-friendly
   - Toast notifications pour succès/erreurs
   - Retry automatique avec TanStack Query

3. **Performance** :
   - Lazy loading des routes avec React.lazy
   - Pagination pour les longues listes
   - Cache intelligent avec TanStack Query

4. **UX** :
   - Loading states partout
   - Empty states avec illustrations
   - Confirmations avant suppression
   - Breadcrumbs pour navigation

**🔒 SÉCURITÉ :**
- Valider tous les inputs côté client
- Échapper les contenus HTML
- Vérifier les rôles avant affichage des actions
- Logout automatique si token expiré (intercepteur)

**📱 RESPONSIVE :**
- Mobile-first design
- Menu burger sur mobile
- Tables scrollables sur petit écran
- Formulaires adaptés touch

**🚀 LIVRABLES ATTENDUS :**
- Code complet et fonctionnel pour TOUTES les fonctionnalités listées
- Respect STRICT des DTOs et endpoints documentés
- Code TypeScript bien typé (pas de `any`)
- Composants réutilisables et maintenables
- Architecture propre selon la structure définie

Commence par créer la configuration de base (Axios, stores, types), puis implémente feature par feature en commençant par l'authentification, puis l'espace étudiant, puis professeur, puis admin.
```

---

## ⚠️ NOTES IMPORTANTES

1. **Ne modifie pas** la structure de dossiers déjà créée dans `/frontend/src/`
2. **Respecte exactement** les DTOs définis dans `/doc/dto.md`
3. **Utilise tous** les endpoints listés dans `/doc/endpoints.md`
4. **Suis les conventions** de `/doc/naming-conventions.md`

## 📊 Estimation

Ce prompt devrait générer environ :
- 80+ composants React
- 10+ services API
- 30+ types TypeScript
- 8+ pages principales
- 10+ custom hooks
- 3+ layouts

---

**Bon courage ! 🚀**
