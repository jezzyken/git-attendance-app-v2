import attendanceService from "@/services/attendanceService";

export default {
  namespaced: true,

  state: {
    attendanceRecords: [],
    currentAttendance: null,
    loading: false,
    error: null,
    stats: null,
  },

  getters: {
    attendanceRecords: (state) => state.attendanceRecords,
    currentAttendance: (state) => state.currentAttendance,
    loading: (state) => state.loading,
    error: (state) => state.error,
    stats: (state) => state.stats,
  },

  mutations: {
    SET_ATTENDANCE_RECORDS(state, records) {
      state.attendanceRecords = records;
    },
    SET_CURRENT_ATTENDANCE(state, attendance) {
      state.currentAttendance = attendance;
    },
    ADD_ATTENDANCE(state, attendance) {
      state.attendanceRecords.push(attendance);
    },
    UPDATE_ATTENDANCE(state, updatedAttendance) {
      const index = state.attendanceRecords.findIndex(
        (a) => a._id === updatedAttendance._id
      );
      if (index !== -1) {
        state.attendanceRecords.splice(index, 1, updatedAttendance);
      }
    },
    REMOVE_ATTENDANCE(state, attendanceId) {
      state.attendanceRecords = state.attendanceRecords.filter(
        (a) => a._id !== attendanceId
      );
    },
    SET_STATS(state, stats) {
      state.stats = stats;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
  },

  actions: {
    async fetchAttendanceRecords({ commit }, query = {}) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await attendanceService.getAllAttendance(query);
        console.log(response)
        commit("SET_ATTENDANCE_RECORDS", response.data.data.attendance);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch attendance records"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchAttendanceById({ commit }, id) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await attendanceService.getAttendanceById(id);
        commit("SET_CURRENT_ATTENDANCE", response.data.data.attendance);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch attendance"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchAttendanceBySchedule({ commit }, scheduleId) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await attendanceService.getAttendanceBySchedule(
          scheduleId
        );
        commit("SET_ATTENDANCE_RECORDS", response.data.data.attendance);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch schedule attendance"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchAttendanceStats({ commit }, { scheduleId, startDate, endDate }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await attendanceService.getAttendanceStats(
          scheduleId,
          startDate,
          endDate
        );
        commit("SET_STATS", response.data.data.stats);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch attendance stats"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createAttendance({ commit }, attendanceData) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await attendanceService.createAttendance(
          attendanceData
        );
        commit("ADD_ATTENDANCE", response.data.data.attendance);
        return response.data.data.attendance;
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to create attendance"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateAttendance({ commit }, { id, attendanceData }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await attendanceService.updateAttendance(
          id,
          attendanceData
        );
        commit("UPDATE_ATTENDANCE", response.data.data.attendance);
        return response.data.data.attendance;
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to update attendance"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateStudentAttendance(
      { commit },
      { attendanceId, studentId, status }
    ) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await attendanceService.updateStudentAttendance(
          attendanceId,
          studentId,
          status
        );
        commit("UPDATE_ATTENDANCE", response.data.data.attendance);
        return response.data.data.attendance;
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to update student attendance"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async deleteAttendance({ commit }, id) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        await attendanceService.deleteAttendance(id);
        commit("REMOVE_ATTENDANCE", id);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to delete attendance"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async checkExistingAttendance({ commit }, { classScheduleId, date }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await attendanceService.checkExistingAttendance(
          classScheduleId,
          date
        );
        return response.data.data;
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to check existing attendance"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
};
