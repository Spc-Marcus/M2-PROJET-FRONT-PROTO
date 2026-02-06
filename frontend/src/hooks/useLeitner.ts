import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as leitnerService from '../api/leitner.service';
import { useNotification } from './useNotification';
import type { SubmitAnswer } from '../types';

/**
 * Get Leitner status query hook
 * @param classroomId - Classroom ID
 * @returns Query for fetching Leitner boxes status
 */
export const useLeitnerStatus = (classroomId: string | undefined) => {
  return useQuery({
    queryKey: ['leitner', 'status', classroomId],
    queryFn: () => leitnerService.getLeitnerStatus(classroomId!),
    enabled: !!classroomId,
  });
};

/**
 * Start Leitner session mutation hook
 * @returns Mutation for starting a Leitner revision session
 */
export const useStartLeitnerSession = () => {
  const { showError } = useNotification();

  return useMutation({
    mutationFn: ({ classroomId, questionCount }: { classroomId: string; questionCount: number }) =>
      leitnerService.startLeitnerSession(classroomId, questionCount),
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to start Leitner session');
    },
  });
};

/**
 * Submit Leitner answer mutation hook
 * @returns Mutation for submitting an answer in Leitner session
 */
export const useSubmitLeitnerAnswer = () => {
  const { showError } = useNotification();

  return useMutation({
    mutationFn: ({ sessionId, data }: { sessionId: string; data: SubmitAnswer }) =>
      leitnerService.submitLeitnerAnswer(sessionId, data),
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to submit answer');
    },
  });
};

/**
 * Finish Leitner session mutation hook
 * @returns Mutation for finishing a Leitner session
 */
export const useFinishLeitnerSession = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: leitnerService.finishLeitnerSession,
    onSuccess: (data, sessionId) => {
      queryClient.invalidateQueries({ queryKey: ['leitner', 'status'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      queryClient.invalidateQueries({ queryKey: ['progress'] });
      showSuccess(`Leitner session completed! Score: ${data.correctAnswers}/${data.totalQuestions}`);
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to finish Leitner session');
    },
  });
};

/**
 * Get Leitner session review query hook
 * @param sessionId - Session ID
 * @returns Query for fetching Leitner session review
 */
export const useLeitnerReview = (sessionId: string | undefined) => {
  return useQuery({
    queryKey: ['leitner', 'sessions', sessionId, 'review'],
    queryFn: () => leitnerService.getLeitnerReview(sessionId!),
    enabled: !!sessionId,
  });
};
