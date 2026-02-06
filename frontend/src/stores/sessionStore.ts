import { create } from 'zustand';
import type { QuestionCreate } from '../types/question.types';

export type QuestionDto = QuestionCreate & {
  id: string;
};

interface SessionState {
  sessionId: string | null;
  quizId: string | null;
  questions: QuestionDto[];
  currentQuestionIndex: number;
  answers: Map<string, any>;
  startedAt: Date | null;
  timeElapsed: number;
  startSession: (sessionId: string, quizId: string, questions: QuestionDto[]) => void;
  setCurrentQuestion: (index: number) => void;
  saveAnswer: (questionId: string, answer: any) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  clearSession: () => void;
  updateTimeElapsed: (time: number) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessionId: null,
  quizId: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: new Map(),
  startedAt: null,
  timeElapsed: 0,

  startSession: (sessionId: string, quizId: string, questions: QuestionDto[]) => 
    set({
      sessionId,
      quizId,
      questions,
      currentQuestionIndex: 0,
      answers: new Map(),
      startedAt: new Date(),
      timeElapsed: 0,
    }),

  setCurrentQuestion: (index: number) =>
    set((state) => ({
      currentQuestionIndex: Math.max(0, Math.min(index, state.questions.length - 1)),
    })),

  saveAnswer: (questionId: string, answer: any) =>
    set((state) => {
      const newAnswers = new Map(state.answers);
      newAnswers.set(questionId, answer);
      return { answers: newAnswers };
    }),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1),
    })),

  previousQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
    })),

  clearSession: () =>
    set({
      sessionId: null,
      quizId: null,
      questions: [],
      currentQuestionIndex: 0,
      answers: new Map(),
      startedAt: null,
      timeElapsed: 0,
    }),

  updateTimeElapsed: (time: number) => set({ timeElapsed: time }),
}));
