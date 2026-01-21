# Duobingo - Prototype Frontend

A functional prototype of the Duobingo educational platform frontend, built with React, TypeScript, and Vite.

## Overview

Duobingo is a learning management system similar to Duolingo, designed for educational institutions. This prototype includes:

- **Authentication**: Login and registration for students
- **Student Features**:
  - Browse and join classrooms
  - View modules and quizzes
  - Take quizzes with various question types (QCM, True/False, Text, Image)
  - Leitner spaced repetition system for review
  - Progress tracking
  
- **Teacher Features**:
  - Create and manage classrooms
  - Create modules and quizzes
  - Create questions with multiple types
  - Manage classroom access codes
  - View student progress

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests

## Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8000`

## Installation

1. Navigate to the project directory:
```bash
cd "Proto Projet M2"
```

2. Install dependencies:
```bash
npm install
```

## Configuration

The API base URL is configured in `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8000/api';
```

Update this URL if your backend API runs on a different port or domain.

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Build the application:
```bash
npm run build
```

The built files will be in the `dist` directory.

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components (future)
├── hooks/           # Custom React hooks
│   └── useAuth.ts   # Authentication hook
├── pages/           # Page components
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── StudentDashboard.tsx
│   ├── TeacherDashboard.tsx
│   ├── ClassroomDetailPage.tsx
│   ├── QuizSessionPage.tsx
│   ├── LeitnerPage.tsx
│   ├── TeacherClassroomPage.tsx
│   └── QuestionManagementPage.tsx
├── services/        # API service layer
│   └── api.ts       # API client with all endpoints
├── types/           # TypeScript type definitions
│   └── index.ts     # DTO types from API documentation
├── App.tsx          # Main app component with routing
└── main.tsx         # Application entry point
```

## API Integration

The application is fully integrated with the backend API documented in `/doc/endpoints.md` and `/doc/dto.md`.

All endpoints are implemented in `src/services/api.ts`:
- Authentication & Users
- Classrooms
- Modules
- Quizzes
- Questions
- Game Sessions
- Leitner System
- Stats & Progress

## User Flows

### Student Flow
1. Register/Login
2. View available classrooms or join with code
3. Browse modules and quizzes
4. Take quizzes (various question types supported)
5. Review with Leitner system
6. Track progress

### Teacher Flow
1. Login
2. Create classroom
3. Add modules to classroom
4. Create quizzes in modules
5. Add questions to quizzes
6. Share classroom code with students
7. Monitor student progress

## Question Types Supported

- **QCM (Multiple Choice)**: Multiple options with one or more correct answers
- **VRAI_FAUX (True/False)**: Binary choice questions
- **TEXT**: Free text input with answer validation
- **IMAGE**: Click on specific zones in an image
- **MATCHING**: Match items from two lists (simplified in prototype)

## Authentication

The app uses JWT token authentication:
- Token is stored in `localStorage`
- Automatically added to all API requests via Axios interceptor
- Automatic redirect to login on 401 responses

## Future Enhancements

- Statistics dashboard for teachers
- Student management (enroll, remove)
- Leaderboard display
- Progress visualization
- Media upload for questions
- Export quiz results
- Admin panel

## API Documentation

Full API documentation is available in:
- `/doc/endpoints.md` - All API endpoints
- `/doc/dto.md` - Data transfer objects

## License

This is a prototype for educational purposes.
