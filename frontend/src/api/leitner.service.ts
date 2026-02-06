import axiosInstance from './axiosInstance';
import type {
  LeitnerBoxesStatus,
  LeitnerSessionStartRequest,
  LeitnerSessionStartResponse,
  SubmitAnswer,
  AnswerResult,
  LeitnerSessionResult,
  LeitnerSessionReview,
} from '../types';

/**
 * Get Leitner boxes status for a classroom
 * @param classroomId - Classroom UUID
 * @returns Distribution of questions across 5 Leitner boxes
 */
export const getLeitnerStatus = async (classroomId: string): Promise<LeitnerBoxesStatus> => {
  const response = await axiosInstance.get<LeitnerBoxesStatus>(
    `/classrooms/${classroomId}/leitner/status`
  );
  return response.data;
};

/**
 * Start a new Leitner revision session
 * @param classroomId - Classroom UUID
 * @param questionCount - Number of questions (5, 10, 15, or 20)
 * @returns Session data with questions (without correct answers)
 */
export const startLeitnerSession = async (
  classroomId: string,
  questionCount: number
): Promise<LeitnerSessionStartResponse> => {
  const response = await axiosInstance.post<LeitnerSessionStartResponse>(
    `/classrooms/${classroomId}/leitner/start`,
    { questionCount } as LeitnerSessionStartRequest
  );
  return response.data;
};

/**
 * Submit an answer during a Leitner session
 * @param sessionId - Session UUID
 * @param data - Answer data
 * @returns Result indicating if answer is correct
 */
export const submitLeitnerAnswer = async (
  sessionId: string,
  data: SubmitAnswer
): Promise<AnswerResult> => {
  const response = await axiosInstance.post<AnswerResult>(
    `/leitner/sessions/${sessionId}/submit-answer`,
    data
  );
  return response.data;
};

/**
 * Finish a Leitner session and update boxes
 * @param sessionId - Session UUID
 * @returns Final session result with box movements
 */
export const finishLeitnerSession = async (sessionId: string): Promise<LeitnerSessionResult> => {
  const response = await axiosInstance.post<LeitnerSessionResult>(
    `/leitner/sessions/${sessionId}/finish`
  );
  return response.data;
};

/**
 * Get Leitner session review with detailed corrections
 * @param sessionId - Session UUID
 * @returns Complete session review with corrections and box movements
 */
export const getLeitnerReview = async (sessionId: string): Promise<LeitnerSessionReview> => {
  const response = await axiosInstance.get<LeitnerSessionReview>(
    `/leitner/sessions/${sessionId}/review`
  );
  return response.data;
};
