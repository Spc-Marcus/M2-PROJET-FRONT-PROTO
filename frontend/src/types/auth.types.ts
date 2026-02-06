/**
 * Authentication related types
 */

/**
 * User role enumeration
 */
export enum Role {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

/**
 * University level enumeration
 */
export enum Level {
  L1 = 'L1',
  L2 = 'L2',
  L3 = 'L3',
  M1 = 'M1',
  M2 = 'M2'
}

/**
 * Authentication request
 */
export interface AuthRequest {
  email: string;
  password: string;
}

/**
 * Student registration request
 */
export interface RegisterStudent {
  email: string;
  password: string;
  name: string;
  level: Level;
}
