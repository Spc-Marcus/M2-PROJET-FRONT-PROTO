// TypeScript types based on API documentation

export type Role = 'STUDENT' | 'TEACHER' | 'ADMIN';
export type Level = 'L1' | 'L2' | 'L3' | 'M1' | 'M2';
export type QuestionType = 'QCM' | 'VRAI_FAUX' | 'MATCHING' | 'IMAGE' | 'TEXT';
export type SessionStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';

// User & Auth
export interface UserResponseDto {
  id: string;
  email: string;
  role: Role;
  studentProfile?: {
    level: Level;
  };
  teacherProfile?: {
    department: string;
  };
}

export interface AuthRequestDto {
  email: string;
  password: string;
}

export interface RegisterStudentDto {
  email: string;
  password: string;
  name: string;
  level: Level;
}

// Classroom
export interface ClassroomDto {
  id: string;
  name: string;
  level: Level;
  code: string;
  responsibleProfessor: UserSummaryDto;
  otherTeachers: UserSummaryDto[];
  studentCount: number;
}

export interface UserSummaryDto {
  id: string;
  email: string;
  name: string;
  role: Role;
}

// Module
export interface ModuleDto {
  id: string;
  classroomId: string;
  name: string;
  category: string;
  prerequisiteModuleId?: string;
  isLocked: boolean;
}

// Quiz
export interface QuizDto {
  id: string;
  moduleId: string;
  title: string;
  prerequisiteQuizId?: string;
  minScoreToUnlockNext: number;
  questionCount: number;
  isActive: boolean;
  isLocked: boolean;
  createdBy: UserSummaryDto;
  createdAt: string;
}

// Question
export interface QuestionOption {
  id?: string;
  textChoice: string;
  isCorrect?: boolean;
  displayOrder: number;
}

export interface MatchingPair {
  leftId?: string;
  rightId?: string;
  itemLeft: string;
  itemRight: string;
}

export interface ImageZone {
  labelName: string;
  x: number;
  y: number;
  radius: number;
}

export interface TextConfig {
  acceptedAnswer: string;
  isCaseSensitive: boolean;
  ignoreSpellingErrors: boolean;
}

export interface QuestionCreateDto {
  type: QuestionType;
  contentText: string;
  explanation: string;
  mediaId?: string;
  options?: QuestionOption[];
  matchingPairs?: MatchingPair[];
  imageZones?: ImageZone[];
  textConfig?: TextConfig;
}

// Session & Gameplay
export interface GameSessionStartDto {
  sessionId: string;
  questions: QuestionResponseDto[];
}

export interface QuestionResponseDto {
  id: string;
  type: QuestionType;
  contentText: string;
  mediaUrl?: string;
  options?: { id: string; textChoice: string }[];
  matchingPairs?: MatchingPair[];
  imageZones?: Omit<ImageZone, 'labelName'>[];
}

export interface SubmitAnswerDto {
  questionId: string;
  type: QuestionType;
  selectedOptionId?: string;
  clickedCoordinates?: { x: number; y: number };
  textResponse?: string;
  matchedPairs?: { leftId: string; rightId: string }[];
}

export interface AnswerResultDto {
  questionId: string;
  isCorrect: boolean;
  message: string;
}

export interface SessionResultDto {
  sessionId: string;
  quizId: string;
  totalScore: number;
  maxScore: number;
  passed: boolean;
  completedAt: string;
}

// Leitner System
export interface LeitnerBoxesStatusDto {
  classroomId: string;
  classroomName: string;
  totalQuestions: number;
  boxes: {
    level: number;
    questionCount: number;
    percentage: number;
    selectionWeight: number;
  }[];
  lastReviewedAt?: string;
}

export interface LeitnerSessionStartRequestDto {
  questionCount: 5 | 10 | 15 | 20;
}

export interface LeitnerSessionStartResponseDto {
  sessionId: string;
  classroomId: string;
  questions: (QuestionResponseDto & { currentBox: number })[];
  selectionDistribution: {
    box1: number;
    box2: number;
    box3: number;
    box4: number;
    box5: number;
  };
}

export interface LeitnerSessionResultDto {
  sessionId: string;
  classroomId: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracyRate: number;
  boxMovements: {
    promoted: number;
    demoted: number;
  };
  newBoxDistribution: {
    box1: number;
    box2: number;
    box3: number;
    box4: number;
    box5: number;
  };
}

// Progress & Stats
export interface QuizProgressDto {
  quizId: string;
  quizTitle: string;
  isCompleted: boolean;
  bestScore: number;
  attemptsCount: number;
  firstAttemptAt?: string;
  lastAttemptAt?: string;
  completedAt?: string;
}

export interface ModuleProgressDto {
  moduleId: string;
  moduleName: string;
  isCompleted: boolean;
  completedAt?: string;
  completedQuizzesCount: number;
  totalQuizzesCount: number;
  completionRate: number;
  quizzes?: {
    quizId: string;
    quizTitle: string;
    isCompleted: boolean;
    bestScore: number;
  }[];
}

export interface StudentStatsDto {
  studentId: string;
  totalCompletedQuizzes: number;
  averageScore: number;
  leitnerMastery: number;
  classroomsProgress: {
    classroomId: string;
    classroomName: string;
    completedQuizzes: number;
    totalQuizzes: number;
    averageScore: number;
    leitnerMastery: number;
  }[];
}

export interface LeaderboardEntryDto {
  rank: number;
  studentId: string;
  studentName: string;
  completedQuizzes: number;
  averageScore: number;
  leitnerMastery: number;
}

// Pagination
export interface PaginatedResponseDto<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Error
export interface ErrorResponseDto {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
}
