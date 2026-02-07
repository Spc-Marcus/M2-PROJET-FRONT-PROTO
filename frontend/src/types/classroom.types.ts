/**
 * Classroom and Module related types
 */

import { type UserSummary } from './user.types';
import { type Level } from './auth.types';

/**
 * Classroom (course) information
 */
export interface Classroom {
  id: string;
  name: string;
  level: Level;
  code: string;
  responsibleProfessor: UserSummary;
  otherTeachers: UserSummary[];
  studentCount: number;
}

/**
 * Complete classroom members list
 */
export interface ClassroomMembers {
  classroomId: string;
  responsibleProfessor: UserSummary;
  otherTeachers: UserSummary[];
  students: UserSummary[];
  totalTeachers: number;
  totalStudents: number;
}

/**
 * Request to add a teacher to a classroom
 */
export interface AddTeacherToClassroom {
  email: string;
}

/**
 * Request to enroll a student in a classroom
 */
export interface EnrollStudent {
  email: string;
}

/**
 * Response after regenerating classroom access code
 */
export interface RegenerateCodeResponse {
  classroomId: string;
  newCode: string;
  generatedAt: string;
}

/**
 * Module information
 */
export interface Module {
  id: string;
  classroomId: string;
  name: string;
  category: string;
  prerequisiteModuleId?: string;
  isLocked: boolean;
}
