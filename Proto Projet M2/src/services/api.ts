import axios, { AxiosInstance, AxiosError } from 'axios';
import { 
  AuthRequestDto, 
  RegisterStudentDto, 
  UserResponseDto,
  ClassroomDto,
  ModuleDto,
  QuizDto,
  GameSessionStartDto,
  SubmitAnswerDto,
  AnswerResultDto,
  SessionResultDto,
  LeitnerBoxesStatusDto,
  LeitnerSessionStartRequestDto,
  LeitnerSessionStartResponseDto,
  LeitnerSessionResultDto,
  StudentStatsDto,
  LeaderboardEntryDto,
  QuizProgressDto,
  ModuleProgressDto,
  PaginatedResponseDto,
  QuestionCreateDto
} from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth & Users
  async login(data: AuthRequestDto): Promise<{ token: string }> {
    const response = await this.api.post('/auth/login', data);
    return response.data;
  }

  async register(data: RegisterStudentDto): Promise<UserResponseDto> {
    const response = await this.api.post('/auth/register', data);
    return response.data;
  }

  async getMe(): Promise<UserResponseDto> {
    const response = await this.api.get('/users/me');
    return response.data;
  }

  async updateMe(data: Partial<UserResponseDto>): Promise<UserResponseDto> {
    const response = await this.api.patch('/users/me', data);
    return response.data;
  }

  // Classrooms
  async getClassrooms(): Promise<ClassroomDto[]> {
    const response = await this.api.get('/classrooms');
    return response.data;
  }

  async getClassroom(id: string): Promise<ClassroomDto> {
    const response = await this.api.get(`/classrooms/${id}`);
    return response.data;
  }

  async createClassroom(data: { name: string; level: string }): Promise<ClassroomDto> {
    const response = await this.api.post('/classrooms', data);
    return response.data;
  }

  async updateClassroom(id: string, data: { name?: string; level?: string }): Promise<ClassroomDto> {
    const response = await this.api.patch(`/classrooms/${id}`, data);
    return response.data;
  }

  async deleteClassroom(id: string): Promise<void> {
    await this.api.delete(`/classrooms/${id}`);
  }

  async joinClassroom(id: string, code: string): Promise<ClassroomDto> {
    const response = await this.api.post(`/classrooms/${id}/join`, { code });
    return response.data;
  }

  async enrollStudent(classroomId: string, email: string): Promise<void> {
    await this.api.post(`/classrooms/${classroomId}/enroll`, { email });
  }

  async regenerateCode(classroomId: string): Promise<{ newCode: string }> {
    const response = await this.api.post(`/classrooms/${classroomId}/regenerate-code`);
    return response.data;
  }

  // Modules
  async getModules(classroomId: string): Promise<ModuleDto[]> {
    const response = await this.api.get(`/classrooms/${classroomId}/modules`);
    return response.data;
  }

  async createModule(classroomId: string, data: Partial<ModuleDto>): Promise<ModuleDto> {
    const response = await this.api.post(`/classrooms/${classroomId}/modules`, data);
    return response.data;
  }

  async updateModule(id: string, data: Partial<ModuleDto>): Promise<ModuleDto> {
    const response = await this.api.put(`/modules/${id}`, data);
    return response.data;
  }

  async deleteModule(id: string): Promise<void> {
    await this.api.delete(`/modules/${id}`);
  }

  // Quizzes
  async getQuizzes(moduleId: string): Promise<QuizDto[]> {
    const response = await this.api.get(`/modules/${moduleId}/quizzes`);
    return response.data;
  }

  async createQuiz(moduleId: string, data: Partial<QuizDto>): Promise<QuizDto> {
    const response = await this.api.post(`/modules/${moduleId}/quizzes`, data);
    return response.data;
  }

  async updateQuiz(id: string, data: Partial<QuizDto>): Promise<QuizDto> {
    const response = await this.api.put(`/quizzes/${id}`, data);
    return response.data;
  }

  async deleteQuiz(id: string): Promise<void> {
    await this.api.delete(`/quizzes/${id}`);
  }

  // Questions
  async getQuestions(quizId: string): Promise<PaginatedResponseDto<QuestionCreateDto>> {
    const response = await this.api.get(`/quizzes/${quizId}/questions`);
    return response.data;
  }

  async createQuestion(quizId: string, data: QuestionCreateDto): Promise<QuestionCreateDto> {
    const response = await this.api.post(`/quizzes/${quizId}/questions`, data);
    return response.data;
  }

  async updateQuestion(questionId: string, data: QuestionCreateDto): Promise<QuestionCreateDto> {
    const response = await this.api.put(`/questions/${questionId}`, data);
    return response.data;
  }

  async deleteQuestion(questionId: string): Promise<void> {
    await this.api.delete(`/questions/${questionId}`);
  }

  // Game Sessions
  async startSession(quizId: string): Promise<GameSessionStartDto> {
    const response = await this.api.post('/sessions/start', { quizId });
    return response.data;
  }

  async submitAnswer(sessionId: string, data: SubmitAnswerDto): Promise<AnswerResultDto> {
    const response = await this.api.post(`/sessions/${sessionId}/submit-answer`, data);
    return response.data;
  }

  async finishSession(sessionId: string): Promise<SessionResultDto> {
    const response = await this.api.post(`/sessions/${sessionId}/finish`);
    return response.data;
  }

  async getSessionReview(sessionId: string): Promise<any> {
    const response = await this.api.get(`/sessions/${sessionId}/review`);
    return response.data;
  }

  // Leitner System
  async getLeitnerStatus(classroomId: string): Promise<LeitnerBoxesStatusDto> {
    const response = await this.api.get(`/classrooms/${classroomId}/leitner/status`);
    return response.data;
  }

  async startLeitnerSession(
    classroomId: string, 
    data: LeitnerSessionStartRequestDto
  ): Promise<LeitnerSessionStartResponseDto> {
    const response = await this.api.post(`/classrooms/${classroomId}/leitner/start`, data);
    return response.data;
  }

  async submitLeitnerAnswer(sessionId: string, data: SubmitAnswerDto): Promise<AnswerResultDto> {
    const response = await this.api.post(`/leitner/sessions/${sessionId}/submit-answer`, data);
    return response.data;
  }

  async finishLeitnerSession(sessionId: string): Promise<LeitnerSessionResultDto> {
    const response = await this.api.post(`/leitner/sessions/${sessionId}/finish`);
    return response.data;
  }

  async getLeitnerReview(sessionId: string): Promise<any> {
    const response = await this.api.get(`/leitner/sessions/${sessionId}/review`);
    return response.data;
  }

  // Stats & Progress
  async getStudentStats(): Promise<StudentStatsDto> {
    const response = await this.api.get('/stats/student');
    return response.data;
  }

  async getLeaderboard(classroomId: string): Promise<PaginatedResponseDto<LeaderboardEntryDto>> {
    const response = await this.api.get(`/stats/leaderboard/${classroomId}`);
    return response.data;
  }

  async getQuizProgress(quizId: string): Promise<QuizProgressDto> {
    const response = await this.api.get(`/progress/quizzes/${quizId}`);
    return response.data;
  }

  async getModuleProgress(moduleId: string): Promise<ModuleProgressDto> {
    const response = await this.api.get(`/progress/modules/${moduleId}`);
    return response.data;
  }

  async getClassroomProgress(classroomId: string): Promise<ModuleProgressDto[]> {
    const response = await this.api.get(`/progress/classroom/${classroomId}`);
    return response.data;
  }
}

export const apiService = new ApiService();
