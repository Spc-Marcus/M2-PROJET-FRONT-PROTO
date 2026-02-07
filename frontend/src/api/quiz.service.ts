import axiosInstance from './axiosInstance';
import type { Quiz } from '../types';

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Create quiz request
 */
export interface CreateQuiz {
  title: string;
  prerequisiteQuizId?: string;
  minScoreToUnlockNext: number;
  isActive: boolean;
}

/**
 * Update quiz request
 */
export interface UpdateQuiz {
  title?: string;
  prerequisiteQuizId?: string;
  minScoreToUnlockNext?: number;
  isActive?: boolean;
}

/**
 * Get all quizzes for a module
 * @param moduleId - Module UUID
 * @param params - Pagination parameters (optional)
 * @returns List of quizzes
 */
export const getQuizzes = async (
  moduleId: string,
  params?: PaginationParams
): Promise<Quiz[]> => {
  const response = await axiosInstance.get<Quiz[]>(`/modules/${moduleId}/quizzes`, {
    params,
  });
  return response.data;
};

/**
 * Create a new quiz in a module
 * @param moduleId - Module UUID
 * @param data - Quiz data
 * @returns Created quiz
 */
export const createQuiz = async (moduleId: string, data: CreateQuiz): Promise<Quiz> => {
  const response = await axiosInstance.post<Quiz>(`/modules/${moduleId}/quizzes`, data);
  return response.data;
};

/**
 * Update a quiz
 * @param id - Quiz UUID
 * @param data - Quiz data to update
 * @returns Updated quiz
 */
export const updateQuiz = async (id: string, data: UpdateQuiz): Promise<Quiz> => {
  const response = await axiosInstance.put<Quiz>(`/quizzes/${id}`, data);
  return response.data;
};

/**
 * Delete a quiz
 * @param id - Quiz UUID
 */
export const deleteQuiz = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/quizzes/${id}`);
};

/**
 * Import quiz from PowerPoint/Excel file
 * @param file - File to import
 * @returns Created quiz
 */
export const importQuiz = async (file: File): Promise<Quiz> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<Quiz>('/quizzes/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
