/**
 * Central export point for all API services
 */

// Axios instance
export { default as axiosInstance } from './axiosInstance';

// Auth service
export * as authService from './auth.service';

// Classroom service
export * as classroomService from './classroom.service';

// Module service
export * as moduleService from './module.service';

// Quiz service
export * as quizService from './quiz.service';

// Question service
export * as questionService from './question.service';

// Session service
export * as sessionService from './session.service';

// Leitner service
export * as leitnerService from './leitner.service';

// Statistics service
export * as statisticsService from './statistics.service';

// Media service
export * as mediaService from './media.service';

// Admin service
export * as adminService from './admin.service';
