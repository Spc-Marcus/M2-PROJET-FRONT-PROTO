/**
 * Authentication related types
 */

/**
 * User role enumeration
 */
export const Role = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN'
} as const;

export type Role = typeof Role[keyof typeof Role];

/**
 * University level enumeration
 */
export const Level = {
  L1: 'L1',
  L2: 'L2',
  L3: 'L3',
  M1: 'M1',
  M2: 'M2'
} as const;

export type Level = typeof Level[keyof typeof Level];

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
