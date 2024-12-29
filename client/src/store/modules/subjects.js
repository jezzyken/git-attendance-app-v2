import subjectService from "@/services/subjectService";

export default {
  namespaced: true,

  state: {
    subjects: [],
    currentSubject: null,
    loading: false,
    error: null,
  },

  getters: {
    subjects: (state) => state.subjects,
    currentSubject: (state) => state.currentSubject,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },

  mutations: {
    SET_SUBJECTS(state, subjects) {
      state.subjects = subjects;
    },
    SET_CURRENT_SUBJECT(state, subject) {
      state.currentSubject = subject;
    },
    ADD_SUBJECT(state, subject) {
      state.subjects.push(subject);
    },
    UPDATE_SUBJECT(state, updatedSubject) {
      const index = state.subjects.findIndex(
        (s) => s._id === updatedSubject._id
      );
      if (index !== -1) {
        state.subjects.splice(index, 1, updatedSubject);
      }
    },
    REMOVE_SUBJECT(state, subjectId) {
      state.subjects = state.subjects.filter((s) => s._id !== subjectId);
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
    async fetchSubjects({ commit }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await subjectService.getSubjects();
        commit("SET_SUBJECTS", response.data.data.subjects);
        return response;
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch subjects"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchSubject({ commit }, id) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await subjectService.getSubject(id);
        commit("SET_CURRENT_SUBJECT", response.data.data.subject);
        return response;
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to fetch subject"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createSubject({ commit }, subjectData) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await subjectService.createSubject(subjectData);
        commit("ADD_SUBJECT", response.data.data.subject);
        return response;
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to create subject"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateSubject({ commit }, { id, subjectData }) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        const response = await subjectService.updateSubject(id, subjectData);
        commit("UPDATE_SUBJECT", response.data.data.subject);
        return response;
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to update subject"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async deleteSubject({ commit }, id) {
      try {
        commit("SET_LOADING", true);
        commit("CLEAR_ERROR");
        await subjectService.deleteSubject(id);
        commit("REMOVE_SUBJECT", id);
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "Failed to delete subject"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
};
