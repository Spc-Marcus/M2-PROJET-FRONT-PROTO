import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as adminService from '../api/admin.service';
import { useNotification } from './useNotification';

/**
 * Create user mutation hook (admin only)
 * @returns Mutation for creating a new user
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: adminService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      showSuccess('User created successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to create user');
    },
  });
};

/**
 * Get users query hook (admin only)
 * @param params - Pagination parameters
 * @returns Query for fetching users list
 */
export const useUsers = (params?: adminService.PaginationParams) => {
  return useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: () => adminService.getUsers(params),
  });
};

/**
 * Update user mutation hook (admin only)
 * @returns Mutation for updating a user
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: adminService.UpdateUser }) =>
      adminService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      showSuccess('User updated successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to update user');
    },
  });
};

/**
 * Delete user mutation hook (admin only)
 * @returns Mutation for deleting a user
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: adminService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      showSuccess('User deleted successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to delete user');
    },
  });
};
