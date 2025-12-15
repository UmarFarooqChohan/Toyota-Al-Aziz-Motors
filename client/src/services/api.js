import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    return Promise.reject(error);
  }
);

export const carService = {
  getAllCars: () => api.get('/cars'),
  getCarByKey: (key) => api.get(`/cars/${key}`),
};

export const contactService = {
  submitContact: (data) => {
    console.log('Submitting contact:', data);
    return api.post('/contact', data);
  },
};

export const bookingService = {
  submitBooking: (data) => {
    console.log('Submitting booking:', data);
    return api.post('/booking', data);
  },
};

export default api;
