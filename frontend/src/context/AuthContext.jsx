import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import apiClient from '../api/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  // ✅ CHECK AUTH ON APP LOAD
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('haven_auth_token');

        if (!token) {
          setIsLoading(false);
          return;
        }

        const res = await apiClient.get('/auth/me');

        if (res.success) {
          setUser(res.user);
        } else {
          localStorage.removeItem('haven_auth_token');
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('haven_auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ LOGIN (EMAIL/PASSWORD)
  const login = useCallback(async (email, password) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });

      if (res.success) {
        localStorage.setItem('haven_auth_token', res.token);
        setUser(res.user);

        return { success: true, user: res.user };
      }

      return { success: false, message: res.message };
    } catch (err) {
      console.error('Login error:', err);
      return {
        success: false,
        message: err?.message || 'Login failed',
      };
    }
  }, []);

  // ✅ REGISTER
  const register = useCallback(async (name, email, password) => {
    try {
      const res = await apiClient.post('/auth/register', {
        name,
        email,
        password,
      });

      if (res.success) {
        localStorage.setItem('haven_auth_token', res.token);
        setUser(res.user);

        return { success: true };
      }

      return { success: false, message: res.message };
    } catch (err) {
      console.error('Register error:', err);
      return {
        success: false,
        message: err?.message || 'Registration failed',
      };
    }
  }, []);

  // ✅ UPDATE PROFILE
  const updateProfile = useCallback(async (formData) => {
    try {
      const res = await apiClient.put('/auth/update-profile', formData);

      if (res.success) {
        setUser(res.user);
        return { success: true };
      }

      return { success: false, message: res.message };
    } catch (err) {
      console.error('Update profile error:', err);
      return {
        success: false,
        message: err?.message || 'Profile update failed',
      };
    }
  }, []);

  // ✅ LOGOUT
  const logout = useCallback(() => {
    localStorage.removeItem('haven_auth_token');
    setUser(null);

    apiClient.post('/auth/logout').catch(() => {});
    window.location.href = '/login';
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isLoading,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}