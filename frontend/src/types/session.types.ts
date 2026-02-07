/**
 * Quiz session and gameplay types
 */

import { type QuestionType } from './question.types';

/**
 * Session status enumeration
 */
export const SessionStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  ABANDONED: 'ABANDONED'
} as const;

export type SessionStatus = typeof SessionStatus[keyof typeof SessionStatus];

/**
 * Option for session questions (without correct answer)
 */
export interface SessionQuestionOption {
  id: string;
  textChoice: string;
}

/**
 * Coordinates for IMAGE questions
 */
export interface Coordinates {
  x: number;
  y: number;
}

/**
 * Base session question
 */
interface BaseSessionQuestion {
  id: string;
  type: QuestionType;
  contentText: string;
  mediaUrl?: string;
}

/**
 * Session QCM/VRAI_FAUX question
 */
export interface SessionQcmQuestion extends BaseSessionQuestion {
  type: 'QCM' | 'VRAI_FAUX';
  options: SessionQuestionOption[];
}

/**
 * Session TEXT question
 */
export interface SessionTextQuestion extends BaseSessionQuestion {
  type: 'TEXT';
}

/**
 * Session IMAGE question
 */
export interface SessionImageQuestion extends BaseSessionQuestion {
  type: 'IMAGE';
}

/**
 * Session MATCHING question
 */
export interface SessionMatchingQuestion extends BaseSessionQuestion {
  type: 'MATCHING';
}

/**
 * Polymorphic session question
 */
export type SessionQuestion = 
  | SessionQcmQuestion 
  | SessionTextQuestion 
  | SessionImageQuestion 
  | SessionMatchingQuestion;

/**
 * Game session start response
 */
export interface GameSessionStart {
  sessionId: string;
  questions: SessionQuestion[];
}

/**
 * Matched pair for MATCHING answer submission
 */
export interface MatchedPair {
  leftId: string;
  rightId: string;
}

/**
 * Answer submission request
 */
export interface SubmitAnswer {
  questionId: string;
  type: QuestionType;
  selectedOptionId?: string;
  clickedCoordinates?: Coordinates;
  textResponse?: string;
  matchedPairs?: MatchedPair[];
}

/**
 * Answer result response
 */
export interface AnswerResult {
  questionId: string;
  isCorrect: boolean;
  message: string;
}

/**
 * Session result after completion
 */
export interface SessionResult {
  sessionId: string;
  quizId: string;
  totalScore: number;
  maxScore: number;
  passed: boolean;
  completedAt: string;
}
