import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('haven_auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('haven_auth_token');
      window.location.href = '/login';
    }

    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/update-profile', data),
};

// Room APIs
export const roomAPI = {
  getAll: (params = {}) => api.get('/rooms', { params }),
  getById: (id) => api.get(`/rooms/${id}`),
  getFeatured: () => api.get('/rooms/featured/list'),
  getByCategory: (category) => api.get(`/rooms/category/${category}`),
  checkAvailability: (id, checkIn, checkOut) => 
    api.get(`/rooms/${id}/availability`, { params: { checkIn, checkOut } }),
}

// Booking APIs
export const bookingAPI = {
  create: (data) => api.post('/bookings', data),
  getById: (id) => api.get(`/bookings/${id}`),
  getByEmail: (email) => api.get(`/bookings/user/${email}`),
  initializePayment: (id) => api.post(`/bookings/${id}/pay`),
  verifyPayment: (reference) => api.post('/bookings/verify-payment', { reference }),
  checkAvailability: (data) => api.post('/bookings/check-availability', data),
  getUserBookings: (email) => api.get(`/bookings/user/${email}`),
}

// Payment APIs
export const paymentAPI = {
  initialize: (data) => api.post('/payments/initialize', data),
  verify: (reference) => api.get(`/payments/verify/${reference}`),
  getStatus: (bookingId) => api.get(`/payments/status/${bookingId}`),
}


export default api
