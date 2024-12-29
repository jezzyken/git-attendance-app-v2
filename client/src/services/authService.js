import api from './api';

export default {
  login(credentials) {
    return api.post('/auth/login', credentials);
  },
  register(userData) {
    return api.post('/user', userData);
  },
  getCurrentUser() {
    return api.get('/auth/me');
  }
};