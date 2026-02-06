/**
 * Quiz related types
 */

import { type UserSummary } from './user.types';

/**
 * Quiz information
 */
export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  prerequisiteQuizId?: string;
  minScoreToUnlockNext: number;
  questionCount: number;
  isActive: boolean;
  isLocked: boolean;
  createdBy: UserSummary;
  createdAt: string;
}
