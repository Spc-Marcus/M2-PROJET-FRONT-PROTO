import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Role } from './types/auth.types';
import { Loader } from './components/ui/Loader';

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader size="lg" />
  </div>
);

// Auth Pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));

// Student Pages
const StudentDashboard = lazy(() => import('./pages/student/DashboardPage').then(m => ({ default: m.DashboardPage })));
const StudentClassrooms = lazy(() => import('./pages/student/ClassroomsPage').then(m => ({ default: m.ClassroomsPage })));
const StudentClassroomDetail = lazy(() => import('./pages/student/ClassroomDetailPage').then(m => ({ default: m.ClassroomDetailPage })));
const StudentModuleDetail = lazy(() => import('./pages/student/ModuleDetailPage').then(m => ({ default: m.ModuleDetailPage })));
const StudentQuizSession = lazy(() => import('./pages/student/QuizSessionPage').then(m => ({ default: m.QuizSessionPage })));
const StudentLeaderboard = lazy(() => import('./pages/student/LeaderboardPage').then(m => ({ default: m.LeaderboardPage })));
const StudentStatistics = lazy(() => import('./pages/student/StatisticsPage').then(m => ({ default: m.StatisticsPage })));
const StudentProfile = lazy(() => import('./pages/student/ProfilePage').then(m => ({ default: m.ProfilePage })));

// Teacher Pages
const TeacherDashboard = lazy(() => import('./pages/teacher/DashboardPage').then(m => ({ default: m.DashboardPage })));
const TeacherClassrooms = lazy(() => import('./pages/teacher/ClassroomsPage').then(m => ({ default: m.ClassroomsPage })));
const TeacherClassroomDetail = lazy(() => import('./pages/teacher/ClassroomDetailPage').then(m => ({ default: m.ClassroomDetailPage })));
const TeacherCreateClassroom = lazy(() => import('./pages/teacher/CreateClassroomPage').then(m => ({ default: m.CreateClassroomPage })));
const TeacherModuleManagement = lazy(() => import('./pages/teacher/ModuleManagementPage').then(m => ({ default: m.ModuleManagementPage })));
const TeacherQuizManagement = lazy(() => import('./pages/teacher/QuizManagementPage').then(m => ({ default: m.QuizManagementPage })));
const TeacherStatistics = lazy(() => import('./pages/teacher/StatisticsPage').then(m => ({ default: m.StatisticsPage })));
const TeacherProfile = lazy(() => import('./pages/teacher/ProfilePage').then(m => ({ default: m.ProfilePage })));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/DashboardPage').then(m => ({ default: m.DashboardPage })));
const AdminUsers = lazy(() => import('./pages/admin/UsersPage').then(m => ({ default: m.UsersPage })));
const AdminCreateUser = lazy(() => import('./pages/admin/CreateUserPage').then(m => ({ default: m.CreateUserPage })));
const AdminStatistics = lazy(() => import('./pages/admin/StatisticsPage').then(m => ({ default: m.StatisticsPage })));
const AdminProfile = lazy(() => import('./pages/admin/ProfilePage').then(m => ({ default: m.ProfilePage })));

// Common Pages
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Root redirect component
const RootRedirect = () => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const redirectPath = getRoleBasedRoute(user?.role);
  return <Navigate to={redirectPath} replace />;
};

const getRoleBasedRoute = (role?: Role): string => {
  switch (role) {
    case Role.STUDENT:
      return '/student/dashboard';
    case Role.TEACHER:
      return '/teacher/dashboard';
    case Role.ADMIN:
      return '/admin/dashboard';
    default:
      return '/login';
  }
};

// Import authStore for root redirect
import { useAuthStore } from './stores/authStore';

export const router = createBrowserRouter([
  // Root redirect
  {
    path: '/',
    element: <RootRedirect />,
  },
  
  // Public routes
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  
  // Student routes
  {
    path: '/student',
    element: (
      <ProtectedRoute allowedRoles={[Role.STUDENT]}>
        <Navigate to="/student/dashboard" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/dashboard',
    element: (
      <ProtectedRoute allowedRoles={[Role.STUDENT]}>
        <Suspense fallback={<LoadingFallback />}>
          <StudentDashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/classrooms',
    element: (
      <ProtectedRoute allowedRoles={[Role.STUDENT]}>
        <Suspense fallback={<LoadingFallback />}>
          <StudentClassrooms />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/classrooms/:classroomId',
    element: (
      <ProtectedRoute allowedRoles={[Role.STUDENT]}>
        <Suspense fallback={<LoadingFallback />}>
          <StudentClassroomDetail />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/modules/:moduleId',
    element: (
      <ProtectedRoute allowedRoles={[Role.STUDENT]}>
        <Suspense fallback={<LoadingFallback />}>
          <StudentModuleDetail />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/quiz/:quizId/session',
    element: (
      <ProtectedRoute allowedRoles={[Role.STUDENT]}>
        <Suspense fallback={<LoadingFallback />}>
          <StudentQuizSession />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/leaderboard/:classroomId',
    element: (
      <ProtectedRoute allowedRoles={[Role.STUDENT]}>
        <Suspense fallback={<LoadingFallback />}>
          <StudentLeaderboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/statistics',
    element: (
      <ProtectedRoute allowedRoles={[Role.STUDENT]}>
        <Suspense fallback={<LoadingFallback />}>
          <StudentStatistics />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/profile',
    element: (
      <ProtectedRoute allowedRoles={[Role.STUDENT]}>
        <Suspense fallback={<LoadingFallback />}>
          <StudentProfile />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  
  // Teacher routes
  {
    path: '/teacher',
    element: (
      <ProtectedRoute allowedRoles={[Role.TEACHER]}>
        <Navigate to="/teacher/dashboard" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: '/teacher/dashboard',
    element: (
      <ProtectedRoute allowedRoles={[Role.TEACHER]}>
        <Suspense fallback={<LoadingFallback />}>
          <TeacherDashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/teacher/classrooms',
    element: (
      <ProtectedRoute allowedRoles={[Role.TEACHER]}>
        <Suspense fallback={<LoadingFallback />}>
          <TeacherClassrooms />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/teacher/classrooms/create',
    element: (
      <ProtectedRoute allowedRoles={[Role.TEACHER]}>
        <Suspense fallback={<LoadingFallback />}>
          <TeacherCreateClassroom />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/teacher/classrooms/:classroomId',
    element: (
      <ProtectedRoute allowedRoles={[Role.TEACHER]}>
        <Suspense fallback={<LoadingFallback />}>
          <TeacherClassroomDetail />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/teacher/modules',
    element: (
      <ProtectedRoute allowedRoles={[Role.TEACHER]}>
        <Suspense fallback={<LoadingFallback />}>
          <TeacherModuleManagement />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/teacher/quizzes',
    element: (
      <ProtectedRoute allowedRoles={[Role.TEACHER]}>
        <Suspense fallback={<LoadingFallback />}>
          <TeacherQuizManagement />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/teacher/statistics',
    element: (
      <ProtectedRoute allowedRoles={[Role.TEACHER]}>
        <Suspense fallback={<LoadingFallback />}>
          <TeacherStatistics />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/teacher/profile',
    element: (
      <ProtectedRoute allowedRoles={[Role.TEACHER]}>
        <Suspense fallback={<LoadingFallback />}>
          <TeacherProfile />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  
  // Admin routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={[Role.ADMIN]}>
        <Navigate to="/admin/dashboard" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute allowedRoles={[Role.ADMIN]}>
        <Suspense fallback={<LoadingFallback />}>
          <AdminDashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedRoute allowedRoles={[Role.ADMIN]}>
        <Suspense fallback={<LoadingFallback />}>
          <AdminUsers />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/users/create',
    element: (
      <ProtectedRoute allowedRoles={[Role.ADMIN]}>
        <Suspense fallback={<LoadingFallback />}>
          <AdminCreateUser />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/statistics',
    element: (
      <ProtectedRoute allowedRoles={[Role.ADMIN]}>
        <Suspense fallback={<LoadingFallback />}>
          <AdminStatistics />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/profile',
    element: (
      <ProtectedRoute allowedRoles={[Role.ADMIN]}>
        <Suspense fallback={<LoadingFallback />}>
          <AdminProfile />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  
  // 404 Not Found
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);
