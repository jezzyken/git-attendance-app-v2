<template>
  <v-container fluid>
    <v-card class="my-4" elevation="2">
      <v-card-title class="d-flex align-center py-4">
        <v-icon large color="#d2691e" class="mr-3">mdi-book</v-icon>
        <span class="text-h5">Subject Management</span>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search subjects..."
          single-line
          hide-details
          outlined
          dense
          class="mr-4"
          style="max-width: 300px"
        ></v-text-field>

        <v-btn
          color="#d2691e"
          dark
          @click="openCreateDialog"
          class="px-5 rounded"
        >
          <v-icon left>mdi-plus</v-icon>
          Add Subject
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="subjects"
        :loading="loading"
        :search="search"
        class="elevation-1"
        :custom-filter="customFilter"
      >
        <template v-slot:item.course="{ item }">
          <v-chip
            v-for="course in item.course"
            :key="course._id"
            class="mr-1 my-1"
            small
            color="#f4a460"
            dark
          >
            {{ course.courseCode }}
          </v-chip>
        </template>

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
                @click="editSubject(item)"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Subject</span>
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
            <span>Delete Subject</span>
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
          {{ editMode ? "Edit Subject" : "Create New Subject" }}
        </v-card-title>

        <v-card-text class="pt-4">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.subjectName"
              :rules="formRules.subjectName"
              label="Descriptive Title"
              required
              outlined
              :error-messages="subjectNameError"
            ></v-text-field>

            <v-text-field
              v-model="form.catNo"
              :rules="formRules.catNo"
              label="CAT No"
              required
              outlined
            ></v-text-field>

            <v-select
              v-model="form.semester"
              :items="['first', 'second']"
              :rules="formRules.semester"
              label="Semester"
              required
              outlined
            ></v-select>

            <v-select
              v-model="form.academicYear"
              :items="academicYears"
              :rules="formRules.academicYear"
              label="Academic Year"
              required
              outlined
            ></v-select>

            <v-select
              v-model="form.course"
              :items="courseOptions"
              item-text="courseName"
              item-value="_id"
              label="Select Courses"
              multiple
              chips
              outlined
            ></v-select>
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
            {{ editMode ? "Save Changes" : "Create Subject" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete the subject
          <strong>{{ subjectToDelete?.subjectName }}</strong
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
  name: "SubjectListView",

  data: () => ({
    valid: false,
    search: "",
    createDialog: false,
    deleteDialog: false,
    subjectToDelete: null,
    courseOptions: [],
    academicYears: ["2023-2024", "2024-2025", "2025-2026", "2027-2028"],
    form: {
      subjectName: "",
      catNo: "",
      academicYear: "",
      semester: "",
      course: [],
    },
    formRules: {
      subjectName: [
        (v) => !!v || "Subject name is required",
        (v) =>
          (v && v.length >= 3) || "Subject name must be at least 3 characters",
      ],
      catNo: [(v) => !!v || "CAT No is required"],
      academicYear: [(v) => !!v || "Academic Year is required"],
      semester: [(v) => !!v || "Semester Year is required"],
    },
    headers: [
      { text: "Descriptive Title", align: "start", value: "subjectName" },
      { text: "CAT No", align: "start", value: "catNo" },
      { text: "Semester", align: "start", value: "semester" },
      { text: "Academic Year", align: "start", value: "academicYear" },
      { text: "Courses", align: "start", value: "course" },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    editMode: false,
    loading: false,
    snackbarColor: "",
    snackbarText: "",
    showSnackbar: false,
    subjectNameError: "",
  }),

  computed: {
    ...mapState("subjects", ["subjects", "totalSubjects"]),

    isFormValid() {
      return Boolean(this.valid && this.form?.subjectName);
    },
  },

  methods: {
    ...mapActions("subjects", [
      "fetchSubjects",
      "createSubject",
      "updateSubject",
      "deleteSubject",
    ]),
    ...mapActions("courses", ["fetchCourses"]),

    customFilter(value, search, item) {
      if (!search) return true;

      search = search.toString().toLowerCase();
      if (item.subjectName?.toLowerCase().includes(search)) return true;
      if (item.catNo?.toLowerCase().includes(search)) return true;
      if (item.semester?.toLowerCase().includes(search)) return true;
      if (item.academicYear?.toLowerCase().includes(search)) return true;
      if (
        item.course?.some(
          (course) =>
            course.courseCode?.toLowerCase().includes(search) ||
            course.courseName?.toLowerCase().includes(search)
        )
      )
        return true;

      return false;
    },

    async loadCourseOptions() {
      try {
        await this.fetchCourses();
        this.courseOptions = this.$store.state.courses.courses;
      } catch (error) {
        this.showSnackbarMessage("Failed to load courses", "error");
      }
    },

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
      this.subjectNameError = "";
      this.form = {
        _id: null,
        subjectName: "",
        catNo: "",
        semester: "",
        academicYear: "",
        course: [],
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
        this.subjectNameError = "";

        try {
          if (this.editMode) {
            await this.updateSubject({
              id: this.form._id,
              subjectData: this.form,
            });
          } else {
            await this.createSubject(this.form);
          }

          this.showSnackbarMessage(
            `Subject ${this.editMode ? "updated" : "created"} successfully!`,
            "success"
          );
          await this.fetchSubjects();
          this.closeCreateDialog();
        } catch (error) {
          if (error.response?.data?.message.includes("already exists")) {
            this.subjectNameError = "This subject name already exists";
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

    editSubject(item) {
      this.editMode = true;
      this.form = {
        _id: item._id,
        subjectName: item.subjectName,
        catNo: item.catNo || "",
        semester: item.semester || "",
        academicYear: item.academicYear || "",
        course: item.course ? item.course.map((c) => c._id) : [],
      };
      this.createDialog = true;
    },

    confirmDelete(item) {
      this.subjectToDelete = item;
      this.deleteDialog = true;
    },

    async handleDelete() {
      this.loading = true;
      try {
        await this.deleteSubject(this.subjectToDelete._id);
        this.showSnackbarMessage("Subject deleted successfully!", "success");
        this.fetchSubjects();
      } catch (error) {
        this.showSnackbarMessage(
          error.response?.data?.message || "Failed to delete subject!",
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
  },

  async created() {
    await Promise.all([this.fetchSubjects(), this.loadCourseOptions()]);
  },
};
</script>
