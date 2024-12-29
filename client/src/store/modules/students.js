import studentService from "@/services/studentService";

export default {
  namespaced: true,

  state: {
    students: [],
    totalStudents: 0,
    loading: false,
    error: null,
  },

  mutations: {
    SET_STUDENTS(state, students) {
      state.students = students;
    },
    SET_TOTAL_STUDENTS(state, total) {
      state.totalStudents = total;
    },
    ADD_STUDENT(state, student) {
      state.students.push(student);
    },
    UPDATE_STUDENT(state, updatedStudent) {
      const index = state.students.findIndex(
        (s) => s._id === updatedStudent._id
      );
      if (index !== -1) {
        state.students.splice(index, 1, updatedStudent);
      }
    },
    REMOVE_STUDENT(state, studentId) {
      state.students = state.students.filter(
        (s) => s._id !== studentId
      );
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },

  actions: {
    async fetchStudents({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await studentService.getStudents();
        commit("SET_STUDENTS", response.data.data.students);
        commit("SET_TOTAL_STUDENTS", response.data.results);
      } catch (error) {
        commit("SET_ERROR", error.response?.data?.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createStudent({ commit }, studentData) {
      commit("SET_LOADING", true);
      try {
        const response = await studentService.createStudent(studentData);
        commit("ADD_STUDENT", response.data.data.student);
        return response.data.data.student;
      } catch (error) {
        commit("SET_ERROR", error.response?.data?.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateStudent({ commit }, { id, studentData }) {
      commit("SET_LOADING", true);
      try {
        const response = await studentService.updateStudent(id, studentData);
        commit("UPDATE_STUDENT", response.data.data.student);
        return response.data.data.student;
      } catch (error) {
        commit("SET_ERROR", error.response?.data?.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async deleteStudent({ commit }, id) {
      commit("SET_LOADING", true);
      try {
        await studentService.deleteStudent(id);
        commit("REMOVE_STUDENT", id);
      } catch (error) {
        commit("SET_ERROR", error.response?.data?.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
};