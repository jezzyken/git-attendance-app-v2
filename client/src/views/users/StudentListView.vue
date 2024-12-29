<template>
  <v-container fluid>
    <v-card class="my-4" elevation="2">
      <v-card-title class="d-flex align-center py-4">
        <v-icon large color="#d2691e" class="mr-3">mdi-account-school</v-icon>
        <span class="text-h5">Student Management</span>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="options.search"
          prepend-inner-icon="mdi-magnify"
          label="Search students..."
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
          Add Student
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="students"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalStudents"
        :footer-props="{
          'items-per-page-options': [5, 10, 25, 50],
          showFirstLastPage: true,
        }"
        class="elevation-1"
      >
        <template v-slot:item.user.fullName="{ item }">
          {{
            `${item.user.lastName}, ${item.user.firstName} ${
              item.user.middleName || ""
            }`
          }}
        </template>

        <template v-slot:item.course="{ item }">
          {{ item.course.courseName }}
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
                @click="editStudent(item)"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Student</span>
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
            <span>Delete Student</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <!-- Create/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="800px" persistent>
      <v-card>
        <v-card-title
          class="headline white--text d-flex align-center"
          style="background-color: #a52a2a"
        >
          {{ editMode ? "Edit Student" : "Add New Student" }}
        </v-card-title>

        <v-card-text class="pt-4">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <v-text-field
                  v-model="form.studentId"
                  :rules="rules.required"
                  label="Student ID"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- Personal Information -->
            <v-subheader class="pl-0">Personal Information</v-subheader>
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <v-text-field
                  v-model="form.lastName"
                  :rules="rules.required"
                  label="Last Name"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field
                  v-model="form.firstName"
                  :rules="rules.required"
                  label="First Name"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field
                  v-model="form.middleName"
                  label="Middle Name"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="4">
                <v-menu
                  ref="dateMenu"
                  v-model="dateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.dateOfBirth"
                      label="Date of Birth"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="rules.required"
                      outlined
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.dateOfBirth"
                    @input="dateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-select
                  v-model="form.gender"
                  :items="['Male', 'Female']"
                  label="Gender"
                  :rules="rules.required"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="form.phoneNo"
                  label="Phone Number"
                  :rules="rules.phone"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Academic Information -->
            <v-subheader class="pl-0">Academic Information</v-subheader>
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <v-select
                  v-model="form.course"
                  :items="courses"
                  item-text="courseName"
                  item-value="_id"
                  label="Course"
                  :rules="rules.required"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-select
                  v-model="form.level"
                  :items="[1, 2, 3, 4]"
                  label="Level"
                  :rules="rules.required"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="form.section"
                  label="Section"
                  :rules="rules.required"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Parent/Guardian Information -->
            <v-subheader class="pl-0">Parent/Guardian Information</v-subheader>
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <v-text-field
                  v-model="form.parentName"
                  label="Parent/Gurdian Name"
                  :rules="rules.required"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field
                  v-model="form.parentNo"
                  label="Parent/Gurdian Contact Number"
                  :rules="rules.phone"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field
                  v-model="form.parentEmail"
                  label="Parent/Gurdian Email"
                  :rules="rules.email"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="form.parentAddress"
                  label="Parent/Gurdian Address"
                  :rules="rules.required"
                  outlined
                  dense
                  rows="2"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="pb-4 px-6">
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="closeDialog"
            :disabled="loading"
          >
            Cancel
          </v-btn>
          <v-btn
            color="#d2691e"
            :disabled="!valid"
            :loading="loading"
            @click="handleSubmit"
            dark
          >
            {{ editMode ? "Save Changes" : "Add Student" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">
          Confirm Delete
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete this student?
          <div class="mt-2">
            <strong>
              {{ studentToDelete?.user?.lastName }},
              {{ studentToDelete?.user?.firstName }}
              {{ studentToDelete?.user?.middleName }}
            </strong>
          </div>
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
    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="3000" top>
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "StudentListView",

  data: () => ({
    valid: false,
    dialog: false,
    deleteDialog: false,
    dateMenu: false,
    options: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    headers: [
      { text: "Student ID", value: "studentId" },
      { text: "Name", value: "user.fullName" },
      { text: "Course", value: "course" },
      { text: "Level", value: "level" },
      { text: "Section", value: "section" },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    form: {
      studentId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      phoneNo: "",
      course: null,
      level: null,
      section: "",
      parentName: "",
      parentNo: "",
      parentEmail: "",
      parentAddress: "",
    },
    rules: {
      required: [(v) => !!v || "This field is required"],
      email: [(v) => !v || /.+@.+\..+/.test(v) || "Please enter a valid email"],
      phone: [
        (v) => {
          if (!v) return true;
          if (v.startsWith("0"))
            return (
              /^0\d{10}$/.test(v) ||
              "Phone number starting with 0 must be 11 digits (e.g., 09123456789)"
            );
          if (v.startsWith("+63"))
            return (
              /^\+63\d{10}$/.test(v) ||
              "Phone number starting with +63 must be followed by 10 digits (e.g., +639123456789)"
            );
          return "Please enter a valid phone number (09123456789 or +639123456789)";
        },
      ],
    },
    editMode: false,
    loading: false,
    studentToDelete: null,
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
  }),

  computed: {
    ...mapState("students", ["students", "totalStudents"]),
    ...mapState("courses", ["courses"]),

    isFormValid() {
      return (
        this.valid &&
        this.form.studentId &&
        this.form.firstName &&
        this.form.lastName &&
        this.form.dateOfBirth &&
        this.form.gender &&
        this.form.course &&
        this.form.level &&
        this.form.section &&
        this.form.parentName &&
        this.form.parentNo &&
        this.form.parentEmail &&
        this.form.parentAddress
      );
    },
  },

  methods: {
    ...mapActions("students", [
      "fetchStudents",
      "createStudent",
      "updateStudent",
      "deleteStudent",
    ]),
    ...mapActions("courses", ["fetchCourses"]),

    resetForm() {
      this.form = {
        studentId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        phoneNo: "",
        course: null,
        level: null,
        section: "",
        parentName: "",
        parentNo: "",
        parentEmail: "",
        parentAddress: "",
      };
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    },

    openCreateDialog() {
      this.editMode = false;
      this.dialog = true;
      this.resetForm();
    },

    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        this.resetForm();
      });
    },

    editStudent(item) {
      this.editMode = true;
      this.form = {
        _id: item._id,
        studentId: item.studentId,
        firstName: item.user.firstName,
        middleName: item.user.middleName,
        lastName: item.user.lastName,
        dateOfBirth: item.user.dateOfBirth,
        gender: item.user.gender,
        phoneNo: item.user.phoneNo,
        course: item.course._id,
        level: item.level,
        section: item.section,
        parentName: item.parentName,
        parentNo: item.parentNo,
        parentEmail: item.parentEmail,
        parentAddress: item.parentAddress,
      };
      this.dialog = true;
    },

    confirmDelete(item) {
      this.studentToDelete = item;
      this.deleteDialog = true;
    },

    async handleSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const studentData = { ...this.form };

          if (this.editMode) {
            await this.updateStudent({
              id: this.form._id,
              studentData,
            });
            this.showSnackbarMessage(
              "Student updated successfully!",
              "success"
            );
          } else {
            await this.createStudent(studentData);
            this.showSnackbarMessage("Student added successfully!", "success");
          }

          this.closeDialog();
          this.fetchStudents();
        } catch (error) {
          console.log(error);
          this.showSnackbarMessage(
            error.response?.data?.message || "An error occurred!",
            "error"
          );
        } finally {
          this.loading = false;
        }
      }
    },

    async handleDelete() {
      this.loading = true;
      try {
        await this.deleteStudent(this.studentToDelete._id);
        this.showSnackbarMessage("Student deleted successfully!", "success");
        this.fetchStudents();
      } catch (error) {
        this.showSnackbarMessage(
          error.response?.data?.message || "Failed to delete student!",
          "error"
        );
      } finally {
        this.loading = false;
        this.deleteDialog = false;
      }
    },

    showSnackbarMessage(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    async handleSearch() {
      this.options.page = 1;
      await this.fetchStudents();
    },

    async loadInitialData() {
      try {
        await Promise.all([this.fetchStudents(), this.fetchCourses()]);
      } catch (error) {
        this.showSnackbarMessage("Failed to load data", "error");
      }
    },
  },

  created() {
    this.loadInitialData();
  },
};
</script>

<style scoped>
.v-data-table ::v-deep .v-data-table__wrapper {
  overflow-x: auto;
}

.form-section {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;
  padding-bottom: 16px;
}

.form-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}
</style>
