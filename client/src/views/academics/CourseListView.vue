<template>
  <v-container fluid>
    <v-card class="my-4" elevation="2">
      <v-card-title class="d-flex align-center py-4">
        <v-icon large color="#d2691e" class="mr-3">mdi-book-education</v-icon>
        <span class="text-h5">Course Management</span>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="options.search"
          prepend-inner-icon="mdi-magnify"
          label="Search courses..."
          single-line
          hide-details
          outlined
          dense
          class="mr-4"
          style="max-width: 300px"
          @keyup.enter="handleSearch"
        ></v-text-field>

        <v-btn
          color="#d2691e"
          dark
          @click="openCreateDialog"
          class="px-5 rounded"
        >
          <v-icon left>mdi-plus</v-icon>
          Add Course
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="courses"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalCourses"
        :footer-props="{
          'items-per-page-options': [5, 10, 25, 50],
          showFirstLastPage: true,
        }"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                color="primary"
                class="mr-1"
                v-bind="attrs"
                v-on="on"
                @click="editCourse(item)"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Course</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                color="error"
                v-bind="attrs"
                v-on="on"
                @click="confirmDelete(item)"
              >
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete Course</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <!-- Create/Edit Dialog -->
    <v-dialog v-model="createDialog" max-width="600px" persistent>
      <v-card>
        <v-card-title
          class="headline white--text d-flex align-center"
          style="background-color: #a52a2a"
        >
          {{ editMode ? "Edit Course" : "Create New Course" }}
        </v-card-title>

        <v-card-text class="pt-4">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.courseName"
              :rules="formRules.courseName"
              label="Course Name"
              required
              outlined
              :error-messages="courseNameError"
            ></v-text-field>

            <v-text-field
              v-model="form.courseCode"
              :rules="formRules.courseCode"
              label="Course Code"
              required
              outlined
              :error-messages="courseCodeError"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions class="pb-4 px-6">
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="closeCreateDialog"
            :disabled="loading"
          >
            Cancel
          </v-btn>
          <v-btn
            color="#d2691e"
            :disabled="!isFormValid"
            :loading="loading"
            @click="handleCreate"
            :dark="isFormValid"
          >
            {{ editMode ? "Save Changes" : "Create Course" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete the course
          <strong>{{ courseToDelete?.courseName }}</strong
          >?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" @click="handleDelete" :loading="loading">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      :timeout="3000"
      top
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showSnackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "CourseListView",
  data: () => ({
    valid: false,
    options: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    createDialog: false,
    deleteDialog: false,
    courseToDelete: null,
    form: {
      courseName: "",
      courseCode: "",
    },
    formRules: {
      courseName: [
        (v) => !!v || "Course name is required",
        (v) =>
          (v && v.length >= 3) || "Course name must be at least 3 characters",
      ],
      courseCode: [
        (v) => !!v || "Course code is required",
        (v) =>
          (v && v.length >= 2) || "Course code must be at least 2 characters",
      ],
    },
    headers: [
      { text: "Course Name", align: "start", value: "courseName" },
      { text: "Course Code", align: "start", value: "courseCode" },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    editMode: false,
    loading: false,
    snackbarColor: "",
    snackbarText: "",
    showSnackbar: false,
    courseNameError: "",
    courseCodeError: "",
  }),

  computed: {
    ...mapState("courses", ["courses", "totalCourses"]),

    isFormValid() {
      return this.valid && this.form?.courseName && this.form?.courseCode;
    },
  },

  methods: {
    ...mapActions("courses", [
      "fetchCourses",
      "createCourse",
      "updateCourse",
      "deleteCourse",
    ]),

    openCreateDialog() {
      this.editMode = false;
      this.createDialog = true;
      this.resetForm();
    },

    closeCreateDialog() {
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
      this.resetForm();
      this.createDialog = false;
    },

    resetForm() {
      this.valid = false;
      this.courseNameError = "";
      this.courseCodeError = "";
      this.form = {
        _id: null,
        courseName: "",
        courseCode: "",
      };

      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
        }
      });
    },

    validateForm() {
      return this.$refs.form && this.$refs.form.validate();
    },

    async handleCreate() {
      if (this.validateForm()) {
        this.loading = true;
        this.courseNameError = "";
        this.courseCodeError = "";

        try {
          if (this.editMode) {
            await this.updateCourse({
              id: this.form._id,
              courseData: this.form,
            });
          } else {
            await this.createCourse(this.form);
          }

          this.showSnackbarMessage(
            `Course ${this.editMode ? "updated" : "created"} successfully!`,
            "success"
          );
          await this.fetchCourses();
          this.closeCreateDialog();
        } catch (error) {
          const errorMessage = error.response?.data?.message || "";
          if (errorMessage.includes("Course name already exists")) {
            this.courseNameError = "This course name already exists";
          } else if (errorMessage.includes("Course code already exists")) {
            this.courseCodeError = "This course code already exists";
          } else {
            this.showSnackbarMessage(
              error.response?.data?.message || "An error occurred!",
              "error"
            );
          }
        } finally {
          this.loading = false;
        }
      }
    },

    editCourse(item) {
      this.editMode = true;
      this.form = {
        _id: item._id,
        courseName: item.courseName,
        courseCode: item.courseCode,
      };
      this.createDialog = true;
    },

    confirmDelete(item) {
      this.courseToDelete = item;
      this.deleteDialog = true;
    },

    async handleDelete() {
      this.loading = true;
      try {
        await this.deleteCourse(this.courseToDelete._id);
        this.showSnackbarMessage("Course deleted successfully!", "success");
        this.fetchCourses();
      } catch (error) {
        this.showSnackbarMessage(
          error.response?.data?.message || "Failed to delete course!",
          "error"
        );
      } finally {
        this.loading = false;
        this.deleteDialog = false;
      }
    },

    showSnackbarMessage(message, color) {
      this.snackbarText = message;
      this.snackbarColor = color;
      this.showSnackbar = true;
    },

    async handleSearch() {
      this.options.page = 1;
      await this.fetchCourses();
    },
  },

  created() {
    this.fetchCourses();
  },
};
</script>
