import api from './api';

export default {
  getSubjects() {
    return api.get('/subject');
  },

  getSubject(id) {
    return api.get(`/subject/${id}`);
  },

  getSubjectByName(subjectName) {
    return api.get(`/subject/name/${subjectName}`);
  },

  createSubject(subjectData) {
    return api.post('/subject', subjectData);
  },

  updateSubject(id, subjectData) {
    return api.patch(`/subject/${id}`, subjectData);
  },

  deleteSubject(id) {
    return api.delete(`/subject/${id}`);
  }
};