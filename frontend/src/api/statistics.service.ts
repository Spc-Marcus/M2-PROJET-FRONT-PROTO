import axiosInstance from './axiosInstance';
import type {
  StudentStats,
  PaginatedResponse,
  LeaderboardEntry,
  ProfessorDashboard,
  ModuleProgress,
  QuizProgress,
} from '../types';

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Get current student's global statistics
 * @returns Student statistics
 */
export const getStudentStats = async (): Promise<StudentStats> => {
  const response = await axiosInstance.get<StudentStats>('/stats/student');
  return response.data;
};

/**
 * Get leaderboard for a classroom
 * @param classroomId - Classroom UUID
 * @param params - Pagination parameters (optional)
 * @returns Paginated leaderboard
 */
export const getLeaderboard = async (
  classroomId: string,
  params?: PaginationParams
): Promise<PaginatedResponse<LeaderboardEntry>> => {
  const response = await axiosInstance.get<PaginatedResponse<LeaderboardEntry>>(
    `/stats/leaderboard/${classroomId}`,
    { params }
  );
  return response.data;
};

/**
 * Get professor dashboard for a classroom
 * @param classroomId - Classroom UUID
 * @returns Dashboard with module stats and Leitner stats
 */
export const getProfessorDashboard = async (classroomId: string): Promise<ProfessorDashboard> => {
  const response = await axiosInstance.get<ProfessorDashboard>(`/stats/dashboard/${classroomId}`);
  return response.data;
};

/**
 * Get student progress for a module
 * @param moduleId - Module UUID
 * @returns Module progress
 */
export const getModuleProgress = async (moduleId: string): Promise<ModuleProgress> => {
  const response = await axiosInstance.get<ModuleProgress>(`/progress/modules/${moduleId}`);
  return response.data;
};

/**
 * Get student progress for a quiz
 * @param quizId - Quiz UUID
 * @returns Quiz progress
 */
export const getQuizProgress = async (quizId: string): Promise<QuizProgress> => {
  const response = await axiosInstance.get<QuizProgress>(`/progress/quizzes/${quizId}`);
  return response.data;
};

/**
 * Get student progress for all modules in a classroom
 * @param classroomId - Classroom UUID
 * @returns Progress for all modules
 */
export const getClassroomProgress = async (classroomId: string): Promise<ModuleProgress[]> => {
  const response = await axiosInstance.get<ModuleProgress[]>(
    `/progress/classroom/${classroomId}`
  );
  return response.data;
};

/**
 * Get specific student progress in a classroom (teacher view)
 * @param classroomId - Classroom UUID
 * @param studentId - Student UUID
 * @returns Student progress for all modules
 */
export const getStudentProgress = async (
  classroomId: string,
  studentId: string
): Promise<ModuleProgress[]> => {
  const response = await axiosInstance.get<ModuleProgress[]>(
    `/progress/classroom/${classroomId}/student/${studentId}`
  );
  return response.data;
};
