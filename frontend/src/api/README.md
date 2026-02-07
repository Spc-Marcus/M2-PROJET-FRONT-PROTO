# API Services Layer

Complete API services layer for the Duobingo frontend application, implementing all endpoints from the backend API.

## Configuration

The API base URL is configured via environment variable:

```env
VITE_API_URL=http://localhost:8080/api
```

## Architecture

### Axios Instance (`axiosInstance.ts`)

Central Axios configuration with:
- Base URL from environment variable
- JWT token interceptor (automatically adds token from localStorage)
- Error response interceptor (handles 401 unauthorized)
- Request/response logging in development mode

### Service Files

All services are organized by domain:

## Services

### Authentication (`auth.service.ts`)

```typescript
import { authService } from '@/api';

// Login
const response = await authService.login(email, password);
localStorage.setItem('token', response.token);

// Register student
const user = await authService.register({
  email, password, name, level
});

// Get current user
const currentUser = await authService.getMe();

// Update profile
const updatedUser = await authService.updateProfile({
  email, avatar
});
```

### Classroom Management (`classroom.service.ts`)

```typescript
import { classroomService } from '@/api';

// Get all classrooms
const classrooms = await classroomService.getClassrooms();

// Create classroom
const classroom = await classroomService.createClassroom({
  name: 'Anatomie L1',
  level: Level.L1
});

// Get classroom details
const classroom = await classroomService.getClassroom(id);

// Update classroom
const updated = await classroomService.updateClassroom(id, {
  name: 'New Name'
});

// Delete classroom
await classroomService.deleteClassroom(id);

// Get members
const members = await classroomService.getMembers(id, page, limit);

// Add teacher
await classroomService.addTeacher(classroomId, teacherEmail);

// Remove teacher
await classroomService.removeTeacher(classroomId, teacherId);

// Enroll student
await classroomService.enrollStudent(classroomId, studentEmail);

// Remove student
await classroomService.removeStudent(classroomId, studentId);

// Join classroom (student)
const classroom = await classroomService.joinClassroom(classroomId, code);

// Regenerate code
const response = await classroomService.regenerateCode(classroomId);
```

### Module Management (`module.service.ts`)

```typescript
import { moduleService } from '@/api';

// Get modules
const modules = await moduleService.getModules(classroomId, { page, limit });

// Create module
const module = await moduleService.createModule(classroomId, {
  name: 'Module 1',
  category: 'Anatomy',
  prerequisiteModuleId: 'uuid'
});

// Update module
const updated = await moduleService.updateModule(id, data);

// Delete module
await moduleService.deleteModule(id);
```

### Quiz Management (`quiz.service.ts`)

```typescript
import { quizService } from '@/api';

// Get quizzes
const quizzes = await quizService.getQuizzes(moduleId, { page, limit });

// Create quiz
const quiz = await quizService.createQuiz(moduleId, {
  title: 'Quiz 1',
  minScoreToUnlockNext: 12,
  isActive: true
});

// Update quiz
const updated = await quizService.updateQuiz(id, data);

// Delete quiz
await quizService.deleteQuiz(id);

// Import quiz from file
const quiz = await quizService.importQuiz(file);
```

### Question Management (`question.service.ts`)

```typescript
import { questionService } from '@/api';

// Get questions (teacher only, includes answers)
const response = await questionService.getQuestions(quizId, { page, limit });

// Create question
const question = await questionService.createQuestion(quizId, {
  type: QuestionType.QCM,
  contentText: 'Question text',
  options: [...],
  explanation: 'Explanation'
});

// Update question
const updated = await questionService.updateQuestion(id, data);

// Delete question
await questionService.deleteQuestion(id);
```

### Quiz Sessions (`session.service.ts`)

```typescript
import { sessionService } from '@/api';

// Start session
const session = await sessionService.startSession(quizId);

// Submit answer
const result = await sessionService.submitAnswer(sessionId, {
  questionId,
  type: QuestionType.QCM,
  selectedOptionId: 'uuid'
});

// Finish session
const result = await sessionService.finishSession(sessionId);

// Get review
const review = await sessionService.getSessionReview(sessionId);
```

### Leitner System (`leitner.service.ts`)

```typescript
import { leitnerService } from '@/api';

// Get Leitner status
const status = await leitnerService.getLeitnerStatus(classroomId);

// Start Leitner session
const session = await leitnerService.startLeitnerSession(classroomId, 10);

// Submit answer
const result = await leitnerService.submitLeitnerAnswer(sessionId, data);

// Finish session
const result = await leitnerService.finishLeitnerSession(sessionId);

// Get review
const review = await leitnerService.getLeitnerReview(sessionId);
```

### Statistics (`statistics.service.ts`)

```typescript
import { statisticsService } from '@/api';

// Student stats
const stats = await statisticsService.getStudentStats();

// Leaderboard
const leaderboard = await statisticsService.getLeaderboard(classroomId, { page, limit });

// Professor dashboard
const dashboard = await statisticsService.getProfessorDashboard(classroomId);

// Module progress
const progress = await statisticsService.getModuleProgress(moduleId);

// Quiz progress
const progress = await statisticsService.getQuizProgress(quizId);

// Classroom progress
const progress = await statisticsService.getClassroomProgress(classroomId);

// Student progress (teacher view)
const progress = await statisticsService.getStudentProgress(classroomId, studentId);
```

### Media Management (`media.service.ts`)

```typescript
import { mediaService } from '@/api';

// Upload media
const response = await mediaService.uploadMedia(file);
// Returns: { mediaId: 'uuid', url: 'http://...' }

// Get media list
const media = await mediaService.getMedia({ page, limit });

// Delete media
await mediaService.deleteMedia(id);

// Get orphaned media (admin)
const orphaned = await mediaService.getOrphanedMedia();
```

### Admin (`admin.service.ts`)

```typescript
import { adminService } from '@/api';

// Create user
const user = await adminService.createUser({
  email, password, name, role, level, department
});

// Get users
const users = await adminService.getUsers({ page, limit });

// Update user
const updated = await adminService.updateUser(id, data);

// Delete user
await adminService.deleteUser(id);
```

## Usage

Import services from the central export:

```typescript
import { authService, classroomService, quizService } from '@/api';
```

Or import individual services:

```typescript
import * as authService from '@/api/auth.service';
```

## Error Handling

All services return Promises that reject on error. Handle errors with try/catch:

```typescript
try {
  const user = await authService.login(email, password);
  // Success
} catch (error) {
  // Handle error
  console.error(error.response.data);
}
```

Automatic handling:
- 401 Unauthorized: Automatically clears token and redirects to login
- All errors are logged in development mode

## TypeScript Support

All services are fully typed with TypeScript. Import types from `@/types`:

```typescript
import type { 
  Classroom, 
  Quiz, 
  QuestionCreate,
  UserResponse 
} from '@/types';
```

## Security Summary

✅ All API services have been security scanned with CodeQL
✅ No security vulnerabilities found
✅ JWT tokens are stored in localStorage (standard practice)
✅ Automatic token cleanup on 401 responses
✅ All file uploads use FormData with proper content-type headers
