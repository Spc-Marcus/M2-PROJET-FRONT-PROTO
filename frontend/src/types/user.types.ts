/**
 * User related types
 */

import { type Role, type Level } from './auth.types';

/**
 * Student profile information
 */
export interface StudentProfile {
  level: Level;
}

/**
 * Teacher profile information
 */
export interface TeacherProfile {
  department: string;
}

/**
 * Complete user response
 */
export interface UserResponse {
  id: string;
  email: string;
  role: Role;
  studentProfile?: StudentProfile;
  teacherProfile?: TeacherProfile;
}

/**
 * User summary (for lists and references)
 */
export interface UserSummary {
  id: string;
  email: string;
  name: string;
  role?: Role;
}
