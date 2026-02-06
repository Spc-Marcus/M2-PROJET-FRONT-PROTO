# TypeScript Types - Duobingo Frontend

This directory contains comprehensive TypeScript type definitions for the Duobingo API, organized by domain.

## File Organization

### `common.types.ts`
Generic types used across the application:
- `PaginatedResponse<T>` - Wrapper for paginated list responses
- `PaginationInfo` - Pagination metadata
- `ErrorResponse` - Standard error format

### `auth.types.ts`
Authentication and authorization types:
- `Role` - User role enum (STUDENT, TEACHER, ADMIN)
- `Level` - University level enum (L1, L2, L3, M1, M2)
- `AuthRequest` - Login credentials
- `RegisterStudent` - Student registration data

### `user.types.ts`
User profile types:
- `UserResponse` - Complete user information
- `UserSummary` - User summary for lists
- `StudentProfile` - Student-specific data
- `TeacherProfile` - Teacher-specific data

### `classroom.types.ts`
Classroom and module management:
- `Classroom` - Course information
- `ClassroomMembers` - Complete member list
- `Module` - Module (chapter) information
- `AddTeacherToClassroom`, `EnrollStudent` - Management requests
- `RegenerateCodeResponse` - Code regeneration response

### `quiz.types.ts`
Quiz definitions:
- `Quiz` - Quiz metadata and configuration

### `question.types.ts`
Polymorphic question system:
- `QuestionType` - Question type enum (QCM, VRAI_FAUX, MATCHING, IMAGE, TEXT)
- `QuestionCreate` - Polymorphic union type for question creation
- Specific question types: `QcmQuestion`, `VraiFauxQuestion`, `MatchingQuestion`, `ImageQuestion`, `TextQuestion`
- Support types: `QuestionOption`, `MatchingPair`, `ImageZone`, `TextConfig`

### `session.types.ts`
Quiz gameplay and session management:
- `SessionStatus` - Session state enum
- `GameSessionStart` - Session initialization response
- `SessionQuestion` - Polymorphic question (without answers)
- `SubmitAnswer` - Answer submission request
- `AnswerResult` - Immediate answer feedback
- `SessionResult` - Final session results

### `leitner.types.ts`
Spaced repetition system (Leitner boxes):
- `LeitnerBoxesStatus` - Distribution across 5 boxes
- `LeitnerSessionStartRequest/Response` - Review session initialization
- `LeitnerSessionResult` - Session outcome with box movements
- `LeitnerSessionReview` - Detailed correction and explanations
- `LeitnerBox`, `BoxMovements`, `BoxDistribution` - Supporting types

### `statistics.types.ts`
Progress tracking and analytics:
- `CompletedModule`, `CompletedQuiz` - Completion markers
- `QuizProgress`, `ModuleProgress` - Progress statistics
- `StudentStats` - Student performance overview
- `ProfessorDashboard` - Teacher analytics
- `LeaderboardEntry` - Ranking information
- `ClassroomProgress` - Per-course progression

### `media.types.ts`
File upload management:
- `Media` - Uploaded file metadata

### `index.ts`
Central export point - re-exports all types for convenient importing.

## Usage

Import types from the central index:

\`\`\`typescript
import { 
  UserResponse, 
  Quiz, 
  QuestionType, 
  LeitnerBoxesStatus 
} from '@/types';
\`\`\`

Or from specific files:

\`\`\`typescript
import { Quiz } from '@/types/quiz.types';
import { LeitnerBoxesStatus } from '@/types/leitner.types';
\`\`\`

## Key Design Patterns

### Polymorphic Types
Questions and session questions use discriminated unions with the `type` field:

\`\`\`typescript
type QuestionCreate = 
  | QcmQuestion 
  | VraiFauxQuestion 
  | MatchingQuestion 
  | ImageQuestion 
  | TextQuestion;
\`\`\`

This allows TypeScript to narrow types automatically:

\`\`\`typescript
if (question.type === QuestionType.QCM) {
  // TypeScript knows question.options is available
  console.log(question.options);
}
\`\`\`

### Enums
Used for fixed value sets to ensure type safety:

\`\`\`typescript
enum Role {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}
\`\`\`

### Optional Fields
Marked with `?` to indicate fields that may not always be present:

\`\`\`typescript
interface Module {
  prerequisiteModuleId?: string; // Optional
}
\`\`\`

## API Alignment

All types are based on the official DTO documentation at `/doc/dto.md` and use:
- **camelCase** for field names (matching JSON API contract)
- **ISO 8601** strings for dates/timestamps
- **UUID** strings for identifiers
- **Exact field names** from the API specification

## Notes

- Types are readonly by default - consider using `Readonly<T>` utility type where immutability is critical
- No runtime validation included - consider adding Zod/Yup schemas for validation
- All date/time fields are strings (ISO 8601 format) - parse to Date objects as needed
- UUID fields are strings - no special UUID type used
