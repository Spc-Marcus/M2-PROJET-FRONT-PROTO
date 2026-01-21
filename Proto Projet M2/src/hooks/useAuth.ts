import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { UserResponseDto } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await apiService.getMe();
          setUser(userData);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const { token } = await apiService.login({ email, password });
    localStorage.setItem('token', token);
    const userData = await apiService.getMe();
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const register = async (data: any) => {
    const userData = await apiService.register(data);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return { user, loading, login, register, logout };
};
