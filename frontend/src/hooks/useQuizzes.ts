import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as quizService from '../api/quiz.service';
import { useNotification } from './useNotification';

/**
 * Get quizzes for a module query hook
 * @param moduleId - Module ID
 * @param params - Pagination parameters
 * @returns Query for fetching quizzes
 */
export const useQuizzes = (
  moduleId: string | undefined,
  params?: quizService.PaginationParams
) => {
  return useQuery({
    queryKey: ['quizzes', moduleId, params],
    queryFn: () => quizService.getQuizzes(moduleId!, params),
    enabled: !!moduleId,
  });
};

/**
 * Create quiz mutation hook
 * @returns Mutation for creating a new quiz
 */
export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: ({ moduleId, data }: { moduleId: string; data: quizService.CreateQuiz }) =>
      quizService.createQuiz(moduleId, data),
    onSuccess: (_, { moduleId }) => {
      queryClient.invalidateQueries({ queryKey: ['quizzes', moduleId] });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      showSuccess('Quiz created successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to create quiz');
    },
  });
};

/**
 * Update quiz mutation hook
 * @returns Mutation for updating a quiz
 */
export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: quizService.UpdateQuiz }) =>
      quizService.updateQuiz(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      showSuccess('Quiz updated successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to update quiz');
    },
  });
};

/**
 * Delete quiz mutation hook
 * @returns Mutation for deleting a quiz
 */
export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: quizService.deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      showSuccess('Quiz deleted successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to delete quiz');
    },
  });
};
