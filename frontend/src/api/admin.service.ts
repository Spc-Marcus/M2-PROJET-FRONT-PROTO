import axiosInstance from './axiosInstance';
import type { 
  UserResponse, 
  Role,
  Level 
} from '../types';

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Create user request
 */
export interface CreateUser {
  email: string;
  password: string;
  name: string;
  role: Role;
  level?: Level;
  department?: string;
}

/**
 * Update user request
 */
export interface UpdateUser {
  email?: string;
  name?: string;
  role?: Role;
  level?: Level;
  department?: string;
}

/**
 * Create a new user (Professor or Admin)
 * @param data - User data
 * @returns Created user
 */
export const createUser = async (data: CreateUser): Promise<UserResponse> => {
  const response = await axiosInstance.post<UserResponse>('/admin/users', data);
  return response.data;
};

/**
 * Get list of users
 * @param params - Pagination parameters (optional)
 * @returns List of users
 */
export const getUsers = async (params?: PaginationParams): Promise<UserResponse[]> => {
  const response = await axiosInstance.get<UserResponse[]>('/admin/users', {
    params,
  });
  return response.data;
};

/**
 * Update a user
 * @param id - User UUID
 * @param data - User data to update
 * @returns Updated user
 */
export const updateUser = async (id: string, data: UpdateUser): Promise<UserResponse> => {
  const response = await axiosInstance.patch<UserResponse>(`/admin/users/${id}`, data);
  return response.data;
};

/**
 * Delete a user
 * @param id - User UUID
 */
export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/admin/users/${id}`);
};
