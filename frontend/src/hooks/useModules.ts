import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as moduleService from '../api/module.service';
import { useNotification } from './useNotification';

/**
 * Get modules for a classroom query hook
 * @param classroomId - Classroom ID
 * @param params - Pagination parameters
 * @returns Query for fetching modules
 */
export const useModules = (
  classroomId: string | undefined,
  params?: moduleService.PaginationParams
) => {
  return useQuery({
    queryKey: ['modules', classroomId, params],
    queryFn: () => moduleService.getModules(classroomId!, params),
    enabled: !!classroomId,
  });
};

/**
 * Create module mutation hook
 * @returns Mutation for creating a new module
 */
export const useCreateModule = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: ({ classroomId, data }: { classroomId: string; data: moduleService.CreateModule }) =>
      moduleService.createModule(classroomId, data),
    onSuccess: (_, { classroomId }) => {
      queryClient.invalidateQueries({ queryKey: ['modules', classroomId] });
      queryClient.invalidateQueries({ queryKey: ['classrooms', classroomId] });
      showSuccess('Module created successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to create module');
    },
  });
};

/**
 * Update module mutation hook
 * @returns Mutation for updating a module
 */
export const useUpdateModule = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: moduleService.UpdateModule }) =>
      moduleService.updateModule(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      showSuccess('Module updated successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to update module');
    },
  });
};

/**
 * Delete module mutation hook
 * @returns Mutation for deleting a module
 */
export const useDeleteModule = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: moduleService.deleteModule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      showSuccess('Module deleted successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to delete module');
    },
  });
};
