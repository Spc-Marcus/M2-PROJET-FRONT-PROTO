import { useQuery } from '@tanstack/react-query';
import * as statisticsService from '../api/statistics.service';

/**
 * Get student statistics query hook
 * @returns Query for fetching current student's global statistics
 */
export const useStudentStats = () => {
  return useQuery({
    queryKey: ['statistics', 'student'],
    queryFn: statisticsService.getStudentStats,
  });
};

/**
 * Get leaderboard query hook
 * @param classroomId - Classroom ID
 * @param params - Pagination parameters
 * @returns Query for fetching classroom leaderboard
 */
export const useLeaderboard = (
  classroomId: string | undefined,
  params?: statisticsService.PaginationParams
) => {
  return useQuery({
    queryKey: ['leaderboard', classroomId, params],
    queryFn: () => statisticsService.getLeaderboard(classroomId!, params),
    enabled: !!classroomId,
  });
};

/**
 * Get professor dashboard query hook
 * @param classroomId - Classroom ID
 * @returns Query for fetching professor dashboard
 */
export const useProfessorDashboard = (classroomId: string | undefined) => {
  return useQuery({
    queryKey: ['statistics', 'dashboard', classroomId],
    queryFn: () => statisticsService.getProfessorDashboard(classroomId!),
    enabled: !!classroomId,
  });
};

/**
 * Get module progress query hook
 * @param moduleId - Module ID
 * @returns Query for fetching module progress
 */
export const useModuleProgress = (moduleId: string | undefined) => {
  return useQuery({
    queryKey: ['progress', 'modules', moduleId],
    queryFn: () => statisticsService.getModuleProgress(moduleId!),
    enabled: !!moduleId,
  });
};

/**
 * Get quiz progress query hook
 * @param quizId - Quiz ID
 * @returns Query for fetching quiz progress
 */
export const useQuizProgress = (quizId: string | undefined) => {
  return useQuery({
    queryKey: ['progress', 'quizzes', quizId],
    queryFn: () => statisticsService.getQuizProgress(quizId!),
    enabled: !!quizId,
  });
};

/**
 * Get classroom progress query hook
 * @param classroomId - Classroom ID
 * @returns Query for fetching progress for all modules in classroom
 */
export const useClassroomProgress = (classroomId: string | undefined) => {
  return useQuery({
    queryKey: ['progress', 'classroom', classroomId],
    queryFn: () => statisticsService.getClassroomProgress(classroomId!),
    enabled: !!classroomId,
  });
};

/**
 * Get student progress query hook (teacher view)
 * @param classroomId - Classroom ID
 * @param studentId - Student ID
 * @returns Query for fetching specific student progress
 */
export const useStudentProgress = (
  classroomId: string | undefined,
  studentId: string | undefined
) => {
  return useQuery({
    queryKey: ['progress', 'classroom', classroomId, 'student', studentId],
    queryFn: () => statisticsService.getStudentProgress(classroomId!, studentId!),
    enabled: !!classroomId && !!studentId,
  });
};
