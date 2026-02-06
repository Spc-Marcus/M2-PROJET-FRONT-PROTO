import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';
import * as authService from '../api/auth.service';
import { useNotification } from './useNotification';

/**
 * Re-export auth store for direct access
 */
export { useAuthStore };

/**
 * Login mutation hook
 * @returns Mutation for logging in a user
 */
export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const { showSuccess, showError } = useNotification();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (data) => {
      login(data.token, data.user);
      queryClient.invalidateQueries();
      showSuccess('Login successful!');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Login failed');
    },
  });
};

/**
 * Register mutation hook
 * @returns Mutation for registering a new student
 */
export const useRegister = () => {
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      showSuccess('Registration successful! Please login.');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Registration failed');
    },
  });
};

/**
 * Get current user query hook
 * @returns Query for fetching current user profile
 */
export const useGetMe = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authService.getMe,
    enabled: isAuthenticated,
    onSuccess: (data) => {
      setUser(data);
    },
  });
};

/**
 * Update profile mutation hook
 * @returns Mutation for updating user profile
 */
export const useUpdateProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const { showSuccess, showError } = useNotification();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (data) => {
      setUser(data);
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      showSuccess('Profile updated successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to update profile');
    },
  });
};

/**
 * Logout helper hook
 * @returns Function to logout user
 */
export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  const { showSuccess } = useNotification();

  return () => {
    logout();
    queryClient.clear();
    showSuccess('Logged out successfully');
  };
};
