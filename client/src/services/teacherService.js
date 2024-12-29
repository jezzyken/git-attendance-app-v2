  import api from './api';

export default {
  getTeachers() {
    return api.get('/teacher');
  },

  getTeacher(id) {
    return api.get(`/teacher/${id}`);
  },

  createTeacher(teacherData) {
    return api.post('/teacher', teacherData);
  },

  updateTeacher(id, teacherData) {
    return api.patch(`/teacher/${id}`, teacherData);
  },

  deleteTeacher(id) {
    return api.delete(`/teacher/${id}`);
  }
};