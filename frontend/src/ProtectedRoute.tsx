import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { Role } from './types/auth.types';
import { Loader } from './components/ui/Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, initialize } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    initialize();
    setIsInitialized(true);
  }, [initialize]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    const redirectPath = getRoleBasedRoute(user.role);
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

const getRoleBasedRoute = (role: Role): string => {
  switch (role) {
    case Role.STUDENT:
      return '/student/dashboard';
    case Role.TEACHER:
      return '/teacher/dashboard';
    case Role.ADMIN:
      return '/admin/dashboard';
    default:
      return '/';
  }
};
