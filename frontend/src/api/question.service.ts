import axiosInstance from './axiosInstance';
import type {
  QuestionCreate,
  PaginatedResponse,
} from '../types';

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Get all questions for a quiz (with answers - teacher only)
 * @param quizId - Quiz UUID
 * @param params - Pagination parameters (optional)
 * @returns Paginated list of questions
 */
export const getQuestions = async (
  quizId: string,
  params?: PaginationParams
): Promise<PaginatedResponse<QuestionCreate>> => {
  const response = await axiosInstance.get<PaginatedResponse<QuestionCreate>>(
    `/quizzes/${quizId}/questions`,
    { params }
  );
  return response.data;
};

/**
 * Create a new question in a quiz
 * @param quizId - Quiz UUID
 * @param data - Question data
 * @returns Created question
 */
export const createQuestion = async (
  quizId: string,
  data: QuestionCreate
): Promise<QuestionCreate> => {
  const response = await axiosInstance.post<QuestionCreate>(
    `/quizzes/${quizId}/questions`,
    data
  );
  return response.data;
};

/**
 * Update a question
 * @param id - Question UUID
 * @param data - Question data to update
 * @returns Updated question
 */
export const updateQuestion = async (
  id: string,
  data: QuestionCreate
): Promise<QuestionCreate> => {
  const response = await axiosInstance.put<QuestionCreate>(`/questions/${id}`, data);
  return response.data;
};

/**
 * Delete a question
 * @param id - Question UUID
 */
export const deleteQuestion = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/questions/${id}`);
};
