import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import apiClient from '../api/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('haven_auth_token');

      if (token) {
        try {
          const response = await apiClient.get('/auth/me');
          if (response.data.success) {
            setUser(response.data.user);
          }
        } catch (error) {
          localStorage.removeItem('haven_auth_token');
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('haven_auth_token', token);
        setUser(user);

        return { success: true, message: response.data.message };
      }

      return { success: false, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || 'Login failed. Please try again.',
      };
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      const response = await apiClient.post('/auth/register', {
        name,
        email,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('haven_auth_token', token);
        setUser(user);

        return { success: true, message: response.data.message };
      }

      return { success: false, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          'Registration failed. Please try again.',
      };
    }
  }, []);

  const googleLogin = useCallback(async (credential) => {
    try {
      const response = await apiClient.post('/auth/google', { credential });

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('haven_auth_token', token);
        setUser(user);

        return { success: true, message: response.data.message };
      }

      return { success: false, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          'Google login failed. Please try again.',
      };
    }
  }, []);

  const updateProfile = useCallback(async (formData) => {
    try {
      const response = await apiClient.put('/auth/update-profile', formData);
  
      if (response.data.success) {
        setUser(response.data.user); // ✅ THIS is the magic (no reload)
        return { success: true, message: response.data.message };
      }
  
      return { success: false, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || 'Profile update failed',
      };
    }
  }, []);

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
        googleLogin,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}