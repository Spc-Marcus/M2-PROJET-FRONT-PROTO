import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin, useAuthStore } from '../../hooks/useAuth';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Role } from '../../types/auth.types';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = getRoleBasedRoute(user.role);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

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

  const onSubmit = async (data: LoginFormData) => {
    await loginMutation.mutateAsync(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">Duobingo</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              {...register('email')}
              type="email"
              label="Email"
              placeholder="student@university.edu"
              error={errors.email?.message}
              disabled={loginMutation.isPending}
            />
          </div>

          <div>
            <Input
              {...register('password')}
              type="password"
              label="Password"
              placeholder="••••••••"
              error={errors.password?.message}
              disabled={loginMutation.isPending}
            />
          </div>

          {loginMutation.isError && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {loginMutation.error?.message || 'Login failed. Please check your credentials.'}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
