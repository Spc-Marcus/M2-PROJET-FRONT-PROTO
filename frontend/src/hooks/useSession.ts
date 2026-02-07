import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as sessionService from '../api/session.service';
import { useNotification } from './useNotification';
import type { SubmitAnswer } from '../types';

/**
 * Start session mutation hook
 * @returns Mutation for starting a quiz session
 */
export const useStartSession = () => {
  const { showError } = useNotification();

  return useMutation({
    mutationFn: sessionService.startSession,
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to start session');
    },
  });
};

/**
 * Submit answer mutation hook
 * @returns Mutation for submitting an answer
 */
export const useSubmitAnswer = () => {
  const { showError } = useNotification();

  return useMutation({
    mutationFn: ({ sessionId, data }: { sessionId: string; data: SubmitAnswer }) =>
      sessionService.submitAnswer(sessionId, data),
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to submit answer');
    },
  });
};

/**
 * Finish session mutation hook
 * @returns Mutation for finishing a session
 */
export const useFinishSession = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: sessionService.finishSession,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      queryClient.invalidateQueries({ queryKey: ['progress'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      showSuccess(`Session completed! Score: ${data.totalScore}/${data.maxScore}`);
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to finish session');
    },
  });
};

/**
 * Get session review query hook
 * @param sessionId - Session ID
 * @returns Query for fetching session review
 */
export const useSessionReview = (sessionId: string | undefined) => {
  return useQuery({
    queryKey: ['sessions', sessionId, 'review'],
    queryFn: () => sessionService.getSessionReview(sessionId!),
    enabled: !!sessionId,
  });
};
