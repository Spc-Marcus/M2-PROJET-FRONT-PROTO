import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as classroomService from '../api/classroom.service';
import { useNotification } from './useNotification';

/**
 * Get all classrooms query hook
 * @returns Query for fetching all classrooms
 */
export const useClassrooms = () => {
  return useQuery({
    queryKey: ['classrooms'],
    queryFn: classroomService.getClassrooms,
  });
};

/**
 * Get single classroom query hook
 * @param id - Classroom ID
 * @returns Query for fetching classroom details
 */
export const useClassroom = (id: string | undefined) => {
  return useQuery({
    queryKey: ['classrooms', id],
    queryFn: () => classroomService.getClassroom(id!),
    enabled: !!id,
  });
};

/**
 * Create classroom mutation hook
 * @returns Mutation for creating a new classroom
 */
export const useCreateClassroom = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: classroomService.createClassroom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classrooms'] });
      showSuccess('Classroom created successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to create classroom');
    },
  });
};

/**
 * Update classroom mutation hook
 * @returns Mutation for updating a classroom
 */
export const useUpdateClassroom = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: classroomService.UpdateClassroom }) =>
      classroomService.updateClassroom(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['classrooms'] });
      queryClient.invalidateQueries({ queryKey: ['classrooms', id] });
      showSuccess('Classroom updated successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to update classroom');
    },
  });
};

/**
 * Delete classroom mutation hook
 * @returns Mutation for deleting a classroom
 */
export const useDeleteClassroom = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: classroomService.deleteClassroom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classrooms'] });
      showSuccess('Classroom deleted successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to delete classroom');
    },
  });
};

/**
 * Get classroom members query hook
 * @param id - Classroom ID
 * @param page - Page number
 * @param limit - Items per page
 * @returns Query for fetching classroom members
 */
export const useClassroomMembers = (id: string | undefined, page?: number, limit?: number) => {
  return useQuery({
    queryKey: ['classrooms', id, 'members', page, limit],
    queryFn: () => classroomService.getMembers(id!, page, limit),
    enabled: !!id,
  });
};

/**
 * Add teacher mutation hook
 * @returns Mutation for adding a teacher to classroom
 */
export const useAddTeacher = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: ({ classroomId, email }: { classroomId: string; email: string }) =>
      classroomService.addTeacher(classroomId, email),
    onSuccess: (_, { classroomId }) => {
      queryClient.invalidateQueries({ queryKey: ['classrooms', classroomId] });
      queryClient.invalidateQueries({ queryKey: ['classrooms', classroomId, 'members'] });
      showSuccess('Teacher added successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to add teacher');
    },
  });
};

/**
 * Remove teacher mutation hook
 * @returns Mutation for removing a teacher from classroom
 */
export const useRemoveTeacher = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: ({ classroomId, teacherId }: { classroomId: string; teacherId: string }) =>
      classroomService.removeTeacher(classroomId, teacherId),
    onSuccess: (_, { classroomId }) => {
      queryClient.invalidateQueries({ queryKey: ['classrooms', classroomId] });
      queryClient.invalidateQueries({ queryKey: ['classrooms', classroomId, 'members'] });
      showSuccess('Teacher removed successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to remove teacher');
    },
  });
};

/**
 * Enroll student mutation hook
 * @returns Mutation for enrolling a student in classroom
 */
export const useEnrollStudent = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: ({ classroomId, email }: { classroomId: string; email: string }) =>
      classroomService.enrollStudent(classroomId, email),
    onSuccess: (_, { classroomId }) => {
      queryClient.invalidateQueries({ queryKey: ['classrooms', classroomId] });
      queryClient.invalidateQueries({ queryKey: ['classrooms', classroomId, 'members'] });
      showSuccess('Student enrolled successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to enroll student');
    },
  });
};

/**
 * Remove student mutation hook
 * @returns Mutation for removing a student from classroom
 */
export const useRemoveStudent = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: ({ classroomId, studentId }: { classroomId: string; studentId: string }) =>
      classroomService.removeStudent(classroomId, studentId),
    onSuccess: (_, { classroomId }) => {
      queryClient.invalidateQueries({ queryKey: ['classrooms', classroomId] });
      queryClient.invalidateQueries({ queryKey: ['classrooms', classroomId, 'members'] });
      showSuccess('Student removed successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to remove student');
    },
  });
};

/**
 * Join classroom mutation hook
 * @returns Mutation for joining a classroom with code
 */
export const useJoinClassroom = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: ({ classroomId, code }: { classroomId: string; code: string }) =>
      classroomService.joinClassroom(classroomId, code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classrooms'] });
      showSuccess('Joined classroom successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to join classroom');
    },
  });
};

/**
 * Regenerate code mutation hook
 * @returns Mutation for regenerating classroom access code
 */
export const useRegenerateCode = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: classroomService.regenerateCode,
    onSuccess: (_, classroomId) => {
      queryClient.invalidateQueries({ queryKey: ['classrooms', classroomId] });
      showSuccess('Access code regenerated successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to regenerate code');
    },
  });
};
