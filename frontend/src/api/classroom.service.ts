import axiosInstance from './axiosInstance';
import type {
  Classroom,
  ClassroomMembers,
  AddTeacherToClassroom,
  EnrollStudent,
  RegenerateCodeResponse,
  Level,
} from '../types';

/**
 * Create classroom request
 */
export interface CreateClassroom {
  name: string;
  level: Level;
}

/**
 * Update classroom request
 */
export interface UpdateClassroom {
  name?: string;
  level?: Level;
}

/**
 * Join classroom request
 */
export interface JoinClassroom {
  code: string;
}

/**
 * Get all classrooms (filtered by user role)
 * @returns List of classrooms
 */
export const getClassrooms = async (): Promise<Classroom[]> => {
  const response = await axiosInstance.get<Classroom[]>('/classrooms');
  return response.data;
};

/**
 * Create a new classroom
 * @param data - Classroom data (name, level)
 * @returns Created classroom
 */
export const createClassroom = async (data: CreateClassroom): Promise<Classroom> => {
  const response = await axiosInstance.post<Classroom>('/classrooms', data);
  return response.data;
};

/**
 * Get classroom details by ID
 * @param id - Classroom UUID
 * @returns Classroom details
 */
export const getClassroom = async (id: string): Promise<Classroom> => {
  const response = await axiosInstance.get<Classroom>(`/classrooms/${id}`);
  return response.data;
};

/**
 * Update classroom information
 * @param id - Classroom UUID
 * @param data - Data to update (name, level)
 * @returns Updated classroom
 */
export const updateClassroom = async (id: string, data: UpdateClassroom): Promise<Classroom> => {
  const response = await axiosInstance.patch<Classroom>(`/classrooms/${id}`, data);
  return response.data;
};

/**
 * Delete a classroom
 * @param id - Classroom UUID
 */
export const deleteClassroom = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/classrooms/${id}`);
};

/**
 * Get classroom members (teachers and students)
 * @param id - Classroom UUID
 * @param page - Page number (optional)
 * @param limit - Items per page (optional)
 * @returns Classroom members
 */
export const getMembers = async (
  id: string,
  page?: number,
  limit?: number
): Promise<ClassroomMembers> => {
  const response = await axiosInstance.get<ClassroomMembers>(`/classrooms/${id}/members`, {
    params: { page, limit },
  });
  return response.data;
};

/**
 * Add a teacher to the classroom
 * @param classroomId - Classroom UUID
 * @param email - Teacher email
 * @returns Updated classroom
 */
export const addTeacher = async (classroomId: string, email: string): Promise<Classroom> => {
  const response = await axiosInstance.post<Classroom>(
    `/classrooms/${classroomId}/teachers`,
    { email } as AddTeacherToClassroom
  );
  return response.data;
};

/**
 * Remove a teacher from the classroom
 * @param classroomId - Classroom UUID
 * @param teacherId - Teacher UUID
 */
export const removeTeacher = async (classroomId: string, teacherId: string): Promise<void> => {
  await axiosInstance.delete(`/classrooms/${classroomId}/teachers/${teacherId}`);
};

/**
 * Enroll a student in the classroom
 * @param classroomId - Classroom UUID
 * @param email - Student email
 */
export const enrollStudent = async (classroomId: string, email: string): Promise<void> => {
  await axiosInstance.post(`/classrooms/${classroomId}/enroll`, { email } as EnrollStudent);
};

/**
 * Remove a student from the classroom
 * @param classroomId - Classroom UUID
 * @param studentId - Student UUID
 */
export const removeStudent = async (classroomId: string, studentId: string): Promise<void> => {
  await axiosInstance.delete(`/classrooms/${classroomId}/students/${studentId}`);
};

/**
 * Join a classroom using an access code
 * @param classroomId - Classroom UUID
 * @param code - Access code
 * @returns Joined classroom
 */
export const joinClassroom = async (classroomId: string, code: string): Promise<Classroom> => {
  const response = await axiosInstance.post<Classroom>(
    `/classrooms/${classroomId}/join`,
    { code } as JoinClassroom
  );
  return response.data;
};

/**
 * Regenerate classroom access code
 * @param classroomId - Classroom UUID
 * @returns New access code
 */
export const regenerateCode = async (classroomId: string): Promise<RegenerateCodeResponse> => {
  const response = await axiosInstance.post<RegenerateCodeResponse>(
    `/classrooms/${classroomId}/regenerate-code`
  );
  return response.data;
};
