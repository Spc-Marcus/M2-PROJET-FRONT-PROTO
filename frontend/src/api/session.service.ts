import axiosInstance from './axiosInstance';
import type {
  GameSessionStart,
  SubmitAnswer,
  AnswerResult,
  SessionResult,
} from '../types';

/**
 * Session review response
 */
export interface SessionReview {
  sessionId: string;
  quizId: string;
  questions: Array<{
    id: string;
    contentText: string;
    isCorrect: boolean;
    correctAnswer: string | any[];
    explanation: string;
  }>;
}

/**
 * Start a new quiz session
 * @param quizId - Quiz UUID
 * @returns Session data with questions (without correct answers)
 */
export const startSession = async (quizId: string): Promise<GameSessionStart> => {
  const response = await axiosInstance.post<GameSessionStart>('/sessions/start', {
    quizId,
  });
  return response.data;
};

/**
 * Submit an answer during a session
 * @param sessionId - Session UUID
 * @param data - Answer data
 * @returns Result indicating if answer is correct
 */
export const submitAnswer = async (
  sessionId: string,
  data: SubmitAnswer
): Promise<AnswerResult> => {
  const response = await axiosInstance.post<AnswerResult>(
    `/sessions/${sessionId}/submit-answer`,
    data
  );
  return response.data;
};

/**
 * Finish a session and calculate final score
 * @param sessionId - Session UUID
 * @returns Final session result with score
 */
export const finishSession = async (sessionId: string): Promise<SessionResult> => {
  const response = await axiosInstance.post<SessionResult>(`/sessions/${sessionId}/finish`);
  return response.data;
};

/**
 * Get session review with detailed corrections
 * @param sessionId - Session UUID
 * @returns Complete session review with corrections
 */
export const getSessionReview = async (sessionId: string): Promise<SessionReview> => {
  const response = await axiosInstance.get<SessionReview>(`/sessions/${sessionId}/review`);
  return response.data;
};
