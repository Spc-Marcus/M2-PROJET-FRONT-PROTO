import { create } from 'zustand';
import type { UserResponse } from '../types/user.types';

interface AuthState {
  user: UserResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: UserResponse) => void;
  logout: () => void;
  setUser: (user: UserResponse) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (token: string, user: UserResponse) => {
    localStorage.setItem('duobingo_token', token);
    localStorage.setItem('duobingo_user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('duobingo_token');
    localStorage.removeItem('duobingo_user');
    set({ token: null, user: null, isAuthenticated: false });
  },

  setUser: (user: UserResponse) => {
    localStorage.setItem('duobingo_user', JSON.stringify(user));
    set({ user });
  },

  initialize: () => {
    const token = localStorage.getItem('duobingo_token');
    const userStr = localStorage.getItem('duobingo_user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as UserResponse;
        set({ token, user, isAuthenticated: true });
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('duobingo_token');
        localStorage.removeItem('duobingo_user');
      }
    }
  },
}));
