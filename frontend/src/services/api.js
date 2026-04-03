// API Service - Centralized API calls to backend

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.0.155:5000/api';

// Helper to get auth token from localStorage
const getToken = () => localStorage.getItem('authToken');

// Helper to set auth token in localStorage
const setToken = (token) => localStorage.setItem('authToken', token);

// Remove auth token
const removeToken = () => localStorage.removeItem('authToken');

// Generic API request wrapper
const apiCall = async (endpoint, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ========== AUTH ENDPOINTS ==========

export const authAPI = {
  register: async (email, password, name, phone, role) => {
    const response = await apiCall('/auth/register', 'POST', {
      email,
      password,
      name,
      phone,
      role,
    });
    setToken(response.token);
    return response;
  },

  login: async (email, password) => {
    const response = await apiCall('/auth/login', 'POST', {
      email,
      password,
    });
    setToken(response.token);
    return response;
  },

  getMe: async () => {
    return apiCall('/auth/me', 'GET');
  },

  logout: () => {
    removeToken();
  },
};

// ========== PROVIDER ENDPOINTS ==========

export const providerAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.location) params.append('location', filters.location);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);

    const queryString = params.toString();
    return apiCall(`/providers${queryString ? '?' + queryString : ''}`, 'GET');
  },

  getByCategory: async (category) => {
    return apiCall(`/providers/category/${category}`, 'GET');
  },

  getById: async (id) => {
    return apiCall(`/providers/${id}`, 'GET');
  },

  createProvider: async (providerData) => {
    return apiCall('/providers', 'POST', providerData);
  },

  updateProvider: async (id, providerData) => {
    return apiCall(`/providers/${id}`, 'PUT', providerData);
  },

  deleteProvider: async (id) => {
    return apiCall(`/providers/${id}`, 'DELETE');
  },
};

// ========== BOOKING ENDPOINTS ==========

export const bookingAPI = {
  createBooking: async (bookingData) => {
    return apiCall('/bookings', 'POST', bookingData);
  },

  getUserBookings: async () => {
    return apiCall('/bookings', 'GET');
  },

  getProviderBookings: async () => {
    return apiCall('/bookings/provider', 'GET');
  },

  updateBookingStatus: async (id, status) => {
    return apiCall(`/bookings/${id}/status`, 'PUT', { status });
  },

  cancelBooking: async (id) => {
    return apiCall(`/bookings/${id}/cancel`, 'PUT');
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  authAPI,
  providerAPI,
  bookingAPI,
};
