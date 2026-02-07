import axiosInstance from './axiosInstance';
import type { 
  AuthRequest, 
  RegisterStudent, 
  UserResponse
} from '../types';

/**
 * Authentication response with JWT token
 */
export interface AuthResponse {
  token: string;
  user: UserResponse;
}

/**
 * Update profile request
 */
export interface UpdateProfile {
  email?: string;
  avatar?: string;
}

/**
 * Login with email and password
 * @param email - User email
 * @param password - User password
 * @returns JWT token and user data
 */
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/login', {
    email,
    password,
  } as AuthRequest);
  return response.data;
};

/**
 * Register a new student account
 * @param data - Registration data
 * @returns Created user
 */
export const register = async (data: RegisterStudent): Promise<UserResponse> => {
  const response = await axiosInstance.post<UserResponse>('/auth/register', data);
  return response.data;
};

/**
 * Get current user profile
 * @returns User profile with role and level
 */
export const getMe = async (): Promise<UserResponse> => {
  const response = await axiosInstance.get<UserResponse>('/users/me');
  return response.data;
};

/**
 * Update current user profile
 * @param data - Profile data to update (email, avatar)
 * @returns Updated user profile
 */
export const updateProfile = async (data: UpdateProfile): Promise<UserResponse> => {
  const response = await axiosInstance.patch<UserResponse>('/users/me', data);
  return response.data;
};
