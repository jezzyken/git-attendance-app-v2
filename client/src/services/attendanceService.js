import api from './api';

export default {
  getAllAttendance(query = {}) {
    return api.get('/attendance', { params: query });
  },

  getAttendanceById(id) {
    return api.get(`/attendance/${id}`);
  },

  createAttendance(attendanceData) {
    return api.post('/attendance', attendanceData);
  },

  updateAttendance(id, attendanceData) {
    return api.put(`/attendance/${id}`, attendanceData);
  },

  deleteAttendance(id) {
    return api.delete(`/attendance/${id}`);
  },

  getAttendanceBySchedule(scheduleId) {
    return api.get(`/attendance/schedule/${scheduleId}`);
  },

  getAttendanceByDateRange(startDate, endDate) {
    return api.get('/attendance/date-range', {
      params: { startDate, endDate }
    });
  },

  getStudentAttendance(studentId, startDate, endDate) {
    return api.get(`/attendance/student/${studentId}`, {
      params: { startDate, endDate }
    });
  },

  updateStudentAttendance(attendanceId, studentId, status) {
    return api.patch(`/attendance/${attendanceId}/student/${studentId}`, {
      status
    });
  },

  getAttendanceStats(scheduleId, startDate, endDate) {
    return api.get(`/attendance/stats/${scheduleId}`, {
      params: { startDate, endDate }
    });
  },

  checkExistingAttendance(classScheduleId, date) {
    return api.get('/attendance/check', {
      params: { classScheduleId, date }
    });
  }
};