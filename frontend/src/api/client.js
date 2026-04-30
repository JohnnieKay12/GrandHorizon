import axios from 'axios';

// ✅ USE ENV VARIABLE (IMPORTANT)
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('haven_auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data, // 👈 important (cleaner response)
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('haven_auth_token');
      window.location.href = '/login';
    }

    return Promise.reject(error.response?.data || error.message);
  }
);

export default apiClient;