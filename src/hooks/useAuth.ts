import { useState, useEffect } from 'react';
import { apiService, User } from '@/lib/api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const { user } = await apiService.getCurrentUser();
        setUser(user);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName: string, username: string) => {
    try {
      const response = await apiService.register({
        username,
        email,
        password,
        displayName
      });
      setUser(response.user);
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };

  const signIn = async (emailOrUsername: string, password: string) => {
    try {
      const response = await apiService.login(emailOrUsername, password);
      setUser(response.user);
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };

  const signOut = async () => {
    try {
      apiService.logout();
      setUser(null);
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };

  return {
    user,
    session: user ? { user } : null,
    loading,
    signUp,
    signIn,
    signOut
  };
};