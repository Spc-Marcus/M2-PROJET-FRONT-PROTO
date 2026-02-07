import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as questionService from '../api/question.service';
import { useNotification } from './useNotification';

/**
 * Get questions for a quiz query hook
 * @param quizId - Quiz ID
 * @param params - Pagination parameters
 * @returns Query for fetching questions
 */
export const useQuestions = (
  quizId: string | undefined,
  params?: questionService.PaginationParams
) => {
  return useQuery({
    queryKey: ['questions', quizId, params],
    queryFn: () => questionService.getQuestions(quizId!, params),
    enabled: !!quizId,
  });
};

/**
 * Create question mutation hook
 * @returns Mutation for creating a new question
 */
export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: ({ quizId, data }: { quizId: string; data: any }) =>
      questionService.createQuestion(quizId, data),
    onSuccess: (_, { quizId }) => {
      queryClient.invalidateQueries({ queryKey: ['questions', quizId] });
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      showSuccess('Question created successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to create question');
    },
  });
};

/**
 * Update question mutation hook
 * @returns Mutation for updating a question
 */
export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      questionService.updateQuestion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      showSuccess('Question updated successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to update question');
    },
  });
};

/**
 * Delete question mutation hook
 * @returns Mutation for deleting a question
 */
export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: questionService.deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      showSuccess('Question deleted successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to delete question');
    },
  });
};
