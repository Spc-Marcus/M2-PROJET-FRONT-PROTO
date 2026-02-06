/**
 * Leitner spaced repetition system types
 */

import { QuestionType } from './question.types';
import { SessionQuestionOption } from './session.types';

/**
 * Leitner box information
 */
export interface LeitnerBox {
  level: number;
  questionCount: number;
  percentage: number;
  selectionWeight: number;
}

/**
 * Leitner boxes status for a classroom
 */
export interface LeitnerBoxesStatus {
  classroomId: string;
  classroomName: string;
  totalQuestions: number;
  boxes: LeitnerBox[];
  lastReviewedAt?: string;
}

/**
 * Request to start a Leitner review session
 */
export interface LeitnerSessionStartRequest {
  questionCount: number;
}

/**
 * Distribution of selected questions by box
 */
export interface SelectionDistribution {
  box1: number;
  box2: number;
  box3: number;
  box4: number;
  box5: number;
}

/**
 * Leitner session question (extends base question with currentBox)
 */
export interface LeitnerSessionQuestion {
  id: string;
  type: QuestionType;
  contentText: string;
  mediaUrl?: string;
  currentBox: number;
  options?: SessionQuestionOption[];
}

/**
 * Leitner session start response
 */
export interface LeitnerSessionStartResponse {
  sessionId: string;
  classroomId: string;
  questions: LeitnerSessionQuestion[];
  selectionDistribution: SelectionDistribution;
}

/**
 * Box movements after session
 */
export interface BoxMovements {
  promoted: number;
  demoted: number;
}

/**
 * Box distribution after session
 */
export interface BoxDistribution {
  box1: number;
  box2: number;
  box3: number;
  box4: number;
  box5: number;
}

/**
 * Leitner session result
 */
export interface LeitnerSessionResult {
  sessionId: string;
  classroomId: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracyRate: number;
  boxMovements: BoxMovements;
  newBoxDistribution: BoxDistribution;
}

/**
 * Answer detail for session review
 */
export interface LeitnerAnswerDetail {
  questionId: string;
  questionText: string;
  isCorrect: boolean;
  previousBox: number;
  newBox: number;
  correctAnswer: string | any[];
  explanation: string;
}

/**
 * Session summary
 */
export interface LeitnerSessionSummary {
  totalQuestions: number;
  correctAnswers: number;
  accuracyRate: number;
}

/**
 * Leitner session review (detailed correction)
 */
export interface LeitnerSessionReview {
  sessionId: string;
  classroomId: string;
  answers: LeitnerAnswerDetail[];
  summary: LeitnerSessionSummary;
}
