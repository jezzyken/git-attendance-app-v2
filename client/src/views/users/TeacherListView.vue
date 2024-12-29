<template>
  <v-container fluid>
    <v-card class="my-4" elevation="2">
      <v-card-title class="d-flex align-center py-4">
        <v-icon large color="primary" class="mr-3">mdi-teach</v-icon>
        <span class="text-h5">Teacher Management</span>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="options.search"
          prepend-inner-icon="mdi-magnify"
          label="Search teachers..."
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
          Add Teacher
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="teachers"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalTeachers"
        :footer-props="{
          'items-per-page-options': [5, 10, 25, 50],
          showFirstLastPage: true,
        }"
        class="elevation-1"
      >
        <template v-slot:item.select="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                x-small
                color="#d2691e"
                v-bind="attrs"
                v-on="on"
                @click="selectTeacher(item)"
                dark
              >
                Select
              </v-btn>
            </template>
            <span>View Teacher Details</span>
          </v-tooltip>
        </template>

        <template v-slot:item.user.fullName="{ item }">
          {{
            `${item.user.lastName}, ${item.user.firstName} ${
              item.user.middleName || ""
            }`
          }}
        </template>

        <!-- <template v-slot:item.department="{ item }">
          {{ item.department.name }}
        </template> -->

        <template v-slot:item.subjects="{ item }">
          <v-chip
            v-for="subject in item.subjects"
            :key="subject._id"
            class="mr-1 my-1"
            small
            color="#f4a460"
            dark
          >
            {{ subject.subjectName }}
          </v-chip>
        </template>

        <template v-slot:item.employmentDate="{ item }">
          {{ formatEmploymentDate(item.employmentDate) }}
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
                @click="editTeacher(item)"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Teacher</span>
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
            <span>Delete Teacher</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <!-- Create/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title
          class="headline white--text d-flex align-center"
          style="background-color: #a52a2a"
        >
          {{ editMode ? "Edit Teacher" : "Add New Teacher" }}
        </v-card-title>

        <v-stepper v-model="currentStep" class="elevation-0">
          <v-stepper-header>
            <v-stepper-step :complete="currentStep > 1" step="1">
              Login Info
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="currentStep > 2" step="2">
              Personal Info
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">Subject Selection</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items class="pa-4">
            <v-stepper-content step="1">
              <v-card outlined>
                <v-card-text>
                  <v-form ref="loginForm" v-model="loginValid">
                    <v-select
                      v-if="!editMode"
                      v-model="selectedUser"
                      :items="availableTeacherUsers"
                      item-text="fullName"
                      item-value="_id"
                      label="Select Existing User"
                      outlined
                      clearable
                      :loading="loadingUsers"
                      class="mb-4"
                    >
                      <template v-slot:selection="{ item }">
                        {{ item.lastName }}, {{ item.firstName }}
                        <span class="grey--text">({{ item.email }})</span>
                      </template>
                      <template v-slot:item="{ item }">
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.lastName }}, {{ item.firstName }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ item.email }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </template>
                    </v-select>

                    <v-divider class="my-5" v-if="!editMode"></v-divider>

                    <div v-if="!selectedUser">
                      <div v-if="!editMode" class="subtitle-1 mb-4">
                        Or Create New User
                      </div>
                      <v-text-field
                        v-model="form.email"
                        :rules="rules.email"
                        label="Email"
                        required
                        outlined
                        class="mb-4"
                      ></v-text-field>

                      <v-text-field
                        v-model="form.username"
                        :rules="rules.username"
                        label="Username"
                        required
                        outlined
                        class="mb-4"
                      ></v-text-field>

                      <v-text-field
                        v-if="!editMode"
                        v-model="form.password"
                        :rules="rules.password"
                        label="Password"
                        :type="showPassword ? 'text' : 'password'"
                        required
                        outlined
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                      ></v-text-field>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>

              <v-card-actions class="mt-4">
                <v-btn text color="grey darken-1" @click="closeDialog">
                  Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="nextStep(1)"
                  :disabled="!isStep1Valid"
                >
                  Continue
                </v-btn>
              </v-card-actions>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card outlined>
                <v-card-text>
                  <v-form
                    ref="personalForm"
                    v-model="personalValid"
                    @submit.prevent
                  >
                    <v-row>
                      <v-col cols="12" sm="12" md="4">
                        <v-text-field
                          v-model="form.teacherId"
                          :rules="rules.required"
                          label="Teacher ID"
                          required
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" sm="12" md="4">
                        <v-text-field
                          v-model="form.lastName"
                          :rules="rules.required"
                          label="Last Name"
                          required
                          outlined
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="4">
                        <v-text-field
                          v-model="form.firstName"
                          :rules="rules.required"
                          label="First Name"
                          required
                          outlined
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="4">
                        <v-text-field
                          v-model="form.middleName"
                          label="Middle Name"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" sm="12" md="4">
                        <v-menu
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
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.dateOfBirth"
                            @input="dateMenu = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <v-select
                          v-model="form.gender"
                          :items="['Male', 'Female']"
                          label="Gender"
                          :rules="rules.required"
                          outlined
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <v-text-field
                          v-model="form.phoneNo"
                          label="Phone Number"
                          :rules="rules.phone"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-menu
                          v-model="employmentDateMenu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.employmentDate"
                              label="Employment Date"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :rules="rules.required"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.employmentDate"
                            @input="employmentDateMenu = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>

              <v-card-actions class="mt-4">
                <v-btn text @click="currentStep = 1">Back</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="nextStep(2)"
                  :disabled="!personalValid"
                >
                  Continue
                </v-btn>
              </v-card-actions>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card outlined>
                <v-card-title class="subtitle-1">Select Subjects</v-card-title>
                <v-card-text>
                  <v-select
                    v-model="selectedSubjects"
                    :items="subjects"
                    item-text="subjectName"
                    item-value="_id"
                    label="Select Subjects"
                    multiple
                    chips
                    outlined
                  >
                    <template v-slot:selection="{ item }">
                      <v-chip small>{{ item.subjectName }}</v-chip>
                    </template>
                  </v-select>

                  <v-alert
                    v-if="selectedSubjects.length === 0"
                    type="warning"
                    text
                    class="mt-4"
                  >
                    Please select at least one subject
                  </v-alert>
                </v-card-text>
              </v-card>

              <v-card-actions class="mt-4">
                <v-btn text @click="currentStep = 2">Back</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="#d2691e"
                  @click="handleSubmit"
                  :loading="loading"
                  :disabled="!selectedSubjects.length"
                  dark
                >
                  {{ editMode ? "Save Changes" : "Create Teacher" }}
                </v-btn>
              </v-card-actions>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this teacher?
          <div class="mt-2">
            <strong>
              {{ teacherToDelete?.user?.lastName }},
              {{ teacherToDelete?.user?.firstName }}
              {{ teacherToDelete?.user?.middleName }}
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
import moment from "moment";

export default {
  name: "TeacherListView",

  data: () => ({
    dialog: false,
    deleteDialog: false,
    dateMenu: false,
    employmentDateMenu: false,
    currentStep: 1,
    loginValid: false,
    personalValid: false,
    options: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    headers: [
      { text: "Select", value: "select", sortable: false, width: "80px" },
      { text: "Teacher ID", value: "teacherId" },
      { text: "Name", value: "user.fullName" },
      // { text: "Department", value: "department.name" },
      { text: "Descriptive Title", value: "subjects" },
      { text: "Employment Date", value: "employmentDate" },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    form: {
      teacherId: "",
      email: "",
      username: "",
      password: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      phoneNo: "",
      department: null,
      subjects: [],
      employmentDate: "",
    },
    rules: {
      required: [(v) => !!v || "This field is required"],
      email: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Please enter a valid email",
      ],
      username: [
        (v) => !!v || "Username is required",
        (v) => (v && v.length >= 4) || "Username must be at least 4 characters",
      ],
      password: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must be at least 6 characters",
      ],
      phone: [
        (v) => !v || /^\d{11}$/.test(v) || "Please enter a valid phone number",
      ],
    },
    editMode: false,
    loading: false,
    teacherToDelete: null,
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    selectedSubjects: [],
    selectedUser: null,
    loadingUsers: false,
    showPassword: false,
    dateMenu: false,
    employmentDateMenu: false,
    loading: false,
  }),

  computed: {
    ...mapState("teachers", ["teachers", "totalTeachers"]),
    ...mapState("departments", ["departments"]),
    ...mapState("subjects", ["subjects"]),
    ...mapState("users", ["users"]),

    isStep1Valid() {
      if (this.editMode) {
        return (
          (!this.form.email || this.form.email.match(/.+@.+\..+/)) &&
          (!this.form.username || this.form.username.length >= 4)
        );
      }
      return (
        this.selectedUser ||
        (this.form.email &&
          this.form.username &&
          !this.editMode &&
          this.form.password)
      );
    },

    availableTeacherUsers() {
      return this.users
        .filter(
          (user) =>
            user.roles === "teacher" &&
            !this.teachers.some((teacher) => teacher.user._id === user._id)
        )
        .map((user) => ({
          ...user,
          fullName: `${user.lastName}, ${user.firstName}`,
        }));
    },
  },

  methods: {
    ...mapActions("teachers", [
      "fetchTeachers",
      "createTeacher",
      "updateTeacher",
      "deleteTeacher",
    ]),
    ...mapActions("departments", ["fetchDepartments"]),
    ...mapActions("subjects", ["fetchSubjects"]),
    ...mapActions("users", ["fetchUsers"]),

    formatEmploymentDate(date) {
      return date ? moment(date).format("YYYY-MM-DD") : "N/A";
    },

    resetForm() {
      this.selectedUser = null;
      this.selectedSubjects = [];
      this.form = {
        teacherId: "",
        email: "",
        username: "",
        password: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        phoneNo: "",
        department: null,
        subjects: [],
        employmentDate: "",
      };
      this.currentStep = 1;
      if (this.$refs.loginForm) this.$refs.loginForm.resetValidation();
      if (this.$refs.personalForm) this.$refs.personalForm.resetValidation();
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

    nextStep(step) {
      if (step === 1 && this.$refs.loginForm.validate()) {
        this.currentStep = 2;
      } else if (step === 2 && this.$refs.personalForm.validate()) {
        this.currentStep = 3;
      }
    },

    editTeacher(item) {
      this.editMode = true;
      this.selectedSubjects = item.subjects.map((s) => s._id);
      this.form = {
        _id: item._id,
        teacherId: item.teacherId,
        email: item.user.email,
        username: item.user.username,
        firstName: item.user.firstName,
        middleName: item.user.middleName,
        lastName: item.user.lastName,
        dateOfBirth: item.user.dateOfBirth
          ? moment(item.user.dateOfBirth).format("YYYY-MM-DD")
          : "",
        gender: item.user.gender,
        phoneNo: item.user.phoneNo,
        // department: item.department._id,
        subjects: item.subjects.map((s) => s._id),
        employmentDate: item.employmentDate
          ? moment(item.employmentDate).format("YYYY-MM-DD")
          : "",
      };
      this.currentStep = 1;
      this.dialog = true;
    },

    confirmDelete(item) {
      this.teacherToDelete = item;
      this.deleteDialog = true;
    },

    async handleSubmit() {
      if (!this.selectedSubjects.length) {
        this.showSnackbarMessage(
          "Please select at least one subject",
          "warning"
        );
        return;
      }

      this.loading = true;
      try {
        const teacherData = {
          ...this.form,
          subjects: this.selectedSubjects,
          existingUserId: this.selectedUser,
        };

        if (this.editMode) {
          delete teacherData.password;
          await this.updateTeacher({
            id: this.form._id,
            teacherData,
          });
          this.showSnackbarMessage("Teacher updated successfully!", "success");
        } else {
          await this.createTeacher(teacherData);
          this.showSnackbarMessage("Teacher created successfully!", "success");
        }

        this.closeDialog();
        this.fetchTeachers();
      } catch (error) {
        this.showSnackbarMessage(
          error.response?.data?.message || "An error occurred!",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },

    async handleDelete() {
      this.loading = true;
      try {
        await this.deleteTeacher(this.teacherToDelete._id);
        this.showSnackbarMessage("Teacher deleted successfully!", "success");
        this.fetchTeachers();
      } catch (error) {
        this.showSnackbarMessage(
          error.response?.data?.message || "Failed to delete teacher!",
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
      await this.fetchTeachers();
    },

    async loadInitialData() {
      try {
        this.loadingUsers = true;
        await Promise.all([
          this.fetchTeachers(),
          this.fetchDepartments(),
          this.fetchSubjects(),
          this.fetchUsers(),
        ]);
      } catch (error) {
        this.showSnackbarMessage("Failed to load data", "error");
      } finally {
        this.loadingUsers = false;
      }
    },

    selectTeacher(item) {
      this.$router.push({
        name: "Class Schedule",
        params: { id: item._id },
      });
    },
  },

  watch: {
    selectedUser(userId) {
      if (userId) {
        const user = this.users.find((u) => u._id === userId);
        if (user) {
          this.form = {
            ...this.form,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            phoneNo: user.phoneNo,
          };
        }
      } else {
        this.resetForm();
      }
    },
  },

  created() {
    this.loadInitialData();
  },
};
</script>

<style scoped>
.v-expansion-panels {
  max-height: 400px;
  overflow-y: auto;
}

.subject-selection {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 16px;
}
</style>
