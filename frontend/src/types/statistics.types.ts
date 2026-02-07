/**
 * Statistics and progression types
 */

/**
 * Completed module record
 */
export interface CompletedModule {
  studentId: string;
  moduleId: string;
  completedAt: string;
}

/**
 * Completed quiz record
 */
export interface CompletedQuiz {
  studentId: string;
  quizId: string;
  completedAt: string;
}

/**
 * Quiz progress statistics
 */
export interface QuizProgress {
  quizId: string;
  quizTitle: string;
  isCompleted: boolean;
  bestScore: number;
  attemptsCount: number;
  firstAttemptAt?: string;
  lastAttemptAt?: string;
  completedAt?: string;
}

/**
 * Module progress statistics
 */
export interface ModuleProgress {
  moduleId: string;
  moduleName: string;
  isCompleted: boolean;
  completedAt?: string;
  completedQuizzesCount: number;
  totalQuizzesCount: number;
  completionRate: number;
  quizzes?: QuizProgress[];
}

/**
 * Classroom progress for a student
 */
export interface ClassroomProgress {
  classroomId: string;
  classroomName: string;
  completedQuizzes: number;
  totalQuizzes: number;
  averageScore: number;
  leitnerMastery: number;
}

/**
 * Student statistics
 */
export interface StudentStats {
  studentId: string;
  totalCompletedQuizzes: number;
  averageScore: number;
  leitnerMastery: number;
  classroomsProgress: ClassroomProgress[];
}

/**
 * Hardest question information
 */
export interface HardestQuestion {
  questionText: string;
  failureRate: number;
}

/**
 * Module statistics for professor dashboard
 */
export interface ModuleStats {
  moduleName: string;
  averageScore: number;
  completionRate: number;
  alertStudents: string[];
  hardestQuestions: HardestQuestion[];
}

/**
 * Leitner statistics for professor dashboard
 */
export interface LeitnerStats {
  totalActiveStudents: number;
  averageMastery: number;
  studentsInBox5: number;
}

/**
 * Professor dashboard data
 */
export interface ProfessorDashboard {
  classroomId: string;
  modulesStats: ModuleStats[];
  leitnerStats: LeitnerStats;
}

/**
 * Leaderboard entry
 */
export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  completedQuizzes: number;
  averageScore: number;
  leitnerMastery: number;
}
