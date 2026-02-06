import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/useAuth';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Level } from '../../types/auth.types';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  level: z.enum([Level.L1, Level.L2, Level.L3, Level.M1, Level.M2], {
    message: 'Please select a level',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    await registerMutation.mutateAsync(registerData);
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const levelOptions = Object.values(Level).map((level) => ({
    value: level,
    label: level,
  }));

  const handleLevelChange = (value: string | string[]) => {
    const levelValue = Array.isArray(value) ? value[0] : value;
    setSelectedLevel(levelValue);
    setValue('level', levelValue as Level, { shouldValidate: true });
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-4">
            Your account has been created. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">Duobingo</h1>
          <p className="text-gray-600">Create your student account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Input
              {...register('name')}
              type="text"
              label="Full Name"
              placeholder="John Doe"
              error={errors.name?.message}
              disabled={registerMutation.isPending}
            />
          </div>

          <div>
            <Input
              {...register('email')}
              type="email"
              label="Email"
              placeholder="student@university.edu"
              error={errors.email?.message}
              disabled={registerMutation.isPending}
            />
          </div>

          <div>
            <Select
              label="Academic Level"
              options={levelOptions}
              value={selectedLevel}
              onChange={handleLevelChange}
              error={errors.level?.message}
              disabled={registerMutation.isPending}
              fullWidth
            />
          </div>

          <div>
            <Input
              {...register('password')}
              type="password"
              label="Password"
              placeholder="••••••••"
              error={errors.password?.message}
              disabled={registerMutation.isPending}
            />
          </div>

          <div>
            <Input
              {...register('confirmPassword')}
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              disabled={registerMutation.isPending}
            />
          </div>

          {registerMutation.isError && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {registerMutation.error?.message || 'Registration failed. Please try again.'}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
