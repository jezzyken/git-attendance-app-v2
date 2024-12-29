import api from './api';

export default {
  getStudents() {
    return api.get('/student');
  },

  getStudent(id) {
    return api.get(`/student/${id}`);
  },

  createStudent(studentData) {
    return api.post('/student', studentData);
  },

  updateStudent(id, studentData) {
    return api.patch(`/student/${id}`, studentData);
  },

  deleteStudent(id) {
    return api.delete(`/student/${id}`);
  }
};