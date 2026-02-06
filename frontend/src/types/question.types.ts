/**
 * Question related types (polymorphic question system)
 */

/**
 * Question type enumeration
 */
export enum QuestionType {
  QCM = 'QCM',
  VRAI_FAUX = 'VRAI_FAUX',
  MATCHING = 'MATCHING',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT'
}

/**
 * Option for QCM or VRAI_FAUX questions
 */
export interface QuestionOption {
  textChoice: string;
  isCorrect: boolean;
  displayOrder: number;
}

/**
 * Matching pair for MATCHING questions
 */
export interface MatchingPair {
  itemLeft: string;
  itemRight: string;
}

/**
 * Image zone for IMAGE questions
 */
export interface ImageZone {
  labelName: string;
  x: number;
  y: number;
  radius: number;
}

/**
 * Text configuration for TEXT questions
 */
export interface TextConfig {
  acceptedAnswer: string;
  isCaseSensitive: boolean;
  ignoreSpellingErrors: boolean;
}

/**
 * Base question fields
 */
interface BaseQuestion {
  type: QuestionType;
  contentText: string;
  explanation: string;
  mediaId?: string;
}

/**
 * QCM question
 */
export interface QcmQuestion extends BaseQuestion {
  type: QuestionType.QCM;
  options: QuestionOption[];
}

/**
 * VRAI_FAUX question
 */
export interface VraiFauxQuestion extends BaseQuestion {
  type: QuestionType.VRAI_FAUX;
  options: QuestionOption[];
}

/**
 * MATCHING question
 */
export interface MatchingQuestion extends BaseQuestion {
  type: QuestionType.MATCHING;
  matchingPairs: MatchingPair[];
}

/**
 * IMAGE question
 */
export interface ImageQuestion extends BaseQuestion {
  type: QuestionType.IMAGE;
  imageZones: ImageZone[];
}

/**
 * TEXT question
 */
export interface TextQuestion extends BaseQuestion {
  type: QuestionType.TEXT;
  textConfig: TextConfig;
}

/**
 * Polymorphic question create DTO
 */
export type QuestionCreate = 
  | QcmQuestion 
  | VraiFauxQuestion 
  | MatchingQuestion 
  | ImageQuestion 
  | TextQuestion;
