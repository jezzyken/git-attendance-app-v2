import teacherService from "@/services/teacherService";

export default {
  namespaced: true,

  state: {
    teachers: [],
    totalTeachers: 0,
    loading: false,
    error: null,
  },

  mutations: {
    SET_TEACHERS(state, teachers) {
      state.teachers = teachers;
    },
    SET_TOTAL_TEACHERS(state, total) {
      state.totalTeachers = total;
    },
    ADD_TEACHER(state, teacher) {
      state.teachers.push(teacher);
    },
    UPDATE_TEACHER(state, updatedTeacher) {
      const index = state.teachers.findIndex(t => t._id === updatedTeacher._id);
      if (index !== -1) {
        state.teachers.splice(index, 1, updatedTeacher);
      }
    },
    REMOVE_TEACHER(state, teacherId) {
      state.teachers = state.teachers.filter(t => t._id !== teacherId);
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },

  actions: {
    async fetchTeachers({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await teacherService.getTeachers();
        console.log({teacher: response.data.data.teachers})
        commit("SET_TEACHERS", response.data.data.teachers);
        commit("SET_TOTAL_TEACHERS", response.data.results);
      } catch (error) {
        console.log(error.response)
        commit("SET_ERROR", error.response?.data?.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createTeacher({ commit }, teacherData) {
      commit("SET_LOADING", true);
      try {
        const response = await teacherService.createTeacher(teacherData);
        commit("ADD_TEACHER", response.data.data.teacher);
        return response.data.data.teacher;
      } catch (error) {
        commit("SET_ERROR", error.response?.data?.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateTeacher({ commit }, { id, teacherData }) {
      commit("SET_LOADING", true);
      try {
        const response = await teacherService.updateTeacher(id, teacherData);
        commit("UPDATE_TEACHER", response.data.data.teacher);
        return response.data.data.teacher;
      } catch (error) {
        commit("SET_ERROR", error.response?.data?.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async deleteTeacher({ commit }, id) {
      commit("SET_LOADING", true);
      try {
        await teacherService.deleteTeacher(id);
        commit("REMOVE_TEACHER", id);
      } catch (error) {
        commit("SET_ERROR", error.response?.data?.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
};