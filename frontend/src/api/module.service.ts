import axiosInstance from './axiosInstance';
import type { Module } from '../types';

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Create module request
 */
export interface CreateModule {
  name: string;
  category: string;
  prerequisiteModuleId?: string;
}

/**
 * Update module request
 */
export interface UpdateModule {
  name?: string;
  category?: string;
  prerequisiteModuleId?: string;
}

/**
 * Get all modules for a classroom
 * @param classroomId - Classroom UUID
 * @param params - Pagination parameters (optional)
 * @returns List of modules
 */
export const getModules = async (
  classroomId: string,
  params?: PaginationParams
): Promise<Module[]> => {
  const response = await axiosInstance.get<Module[]>(`/classrooms/${classroomId}/modules`, {
    params,
  });
  return response.data;
};

/**
 * Create a new module in a classroom
 * @param classroomId - Classroom UUID
 * @param data - Module data
 * @returns Created module
 */
export const createModule = async (classroomId: string, data: CreateModule): Promise<Module> => {
  const response = await axiosInstance.post<Module>(`/classrooms/${classroomId}/modules`, data);
  return response.data;
};

/**
 * Update a module
 * @param id - Module UUID
 * @param data - Module data to update
 * @returns Updated module
 */
export const updateModule = async (id: string, data: UpdateModule): Promise<Module> => {
  const response = await axiosInstance.put<Module>(`/modules/${id}`, data);
  return response.data;
};

/**
 * Delete a module
 * @param id - Module UUID
 */
export const deleteModule = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/modules/${id}`);
};
