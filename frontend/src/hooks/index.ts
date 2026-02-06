/**
 * Custom hooks for Duobingo application
 * Integrates Zustand stores with TanStack Query
 */

// Authentication hooks
export {
  useAuthStore,
  useLogin,
  useRegister,
  useGetMe,
  useUpdateProfile,
  useLogout,
} from './useAuth';

// Classroom management hooks
export {
  useClassrooms,
  useClassroom,
  useCreateClassroom,
  useUpdateClassroom,
  useDeleteClassroom,
  useClassroomMembers,
  useAddTeacher,
  useRemoveTeacher,
  useEnrollStudent,
  useRemoveStudent,
  useJoinClassroom,
  useRegenerateCode,
} from './useClassrooms';

// Module management hooks
export {
  useModules,
  useCreateModule,
  useUpdateModule,
  useDeleteModule,
} from './useModules';

// Quiz management hooks
export {
  useQuizzes,
  useCreateQuiz,
  useUpdateQuiz,
  useDeleteQuiz,
} from './useQuizzes';

// Question management hooks
export {
  useQuestions,
  useCreateQuestion,
  useUpdateQuestion,
  useDeleteQuestion,
} from './useQuestions';

// Quiz session hooks
export {
  useStartSession,
  useSubmitAnswer,
  useFinishSession,
  useSessionReview,
} from './useSession';

// Leitner system hooks
export {
  useLeitnerStatus,
  useStartLeitnerSession,
  useSubmitLeitnerAnswer,
  useFinishLeitnerSession,
  useLeitnerReview,
} from './useLeitner';

// Statistics hooks
export {
  useStudentStats,
  useLeaderboard,
  useProfessorDashboard,
  useModuleProgress,
  useQuizProgress,
  useClassroomProgress,
  useStudentProgress,
} from './useStatistics';

// Media upload hooks
export {
  useUploadMedia,
  useMedia,
  useDeleteMedia,
  useOrphanedMedia,
} from './useMedia';

// Admin hooks
export {
  useCreateUser,
  useUsers,
  useUpdateUser,
  useDeleteUser,
} from './useAdmin';

// Notification helper
export { useNotification } from './useNotification';
