<template>
  <v-container fluid>
    <v-card class="my-4" elevation="2">
      <v-card-title class="d-flex align-center py-4">
        <v-icon large color="primary" class="mr-3">mdi-teach</v-icon>
        <span class="text-h5">Teacher Report</span>
        <v-spacer></v-spacer>

        <v-btn
          color="success"
          @click="generateReport"
          class="px-5 rounded mr-4"
        >
          <v-icon left>mdi-file-download</v-icon>
          Generate Report
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              v-model="filters.department"
              :items="departments"
              item-text="name"
              item-value="_id"
              label="Filter by Department"
              outlined
              dense
              clearable
              prepend-inner-icon="mdi-domain"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="filters.isActive"
              :items="statusOptions"
              label="Employment Status"
              outlined
              dense
              clearable
              prepend-inner-icon="mdi-account-check"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="options.search"
              prepend-inner-icon="mdi-magnify"
              label="Search teachers..."
              single-line
              hide-details
              outlined
              dense
              @keyup.enter="handleSearch"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-data-table
        :headers="headers"
        :items="filteredTeachers"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalTeachers"
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

        <template v-slot:item.department="{ item }">
          {{ item.department.name }}
        </template>

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
          {{ formatDate(item.employmentDate) }}
        </template>

        <template v-slot:item.user.isActive="{ item }">
          <v-chip
            :color="item.user.isActive ? 'success' : 'grey'"
            small
            text-color="white"
          >
            {{ item.user.isActive ? "Active" : "Inactive" }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>

    <!-- Snackbar for notifications -->
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
  name: "TeacherReportView",

  data: () => ({
    options: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    filters: {
      department: null,
      isActive: null,
    },
    headers: [
      { text: "Teacher ID", value: "teacherId" },
      { text: "Name", value: "user.fullName" },
      { text: "Department", value: "department.name" },
      { text: "Descripttive Title", value: "subjects" },
      { text: "Employment Date", value: "employmentDate" },
      { text: "Status", value: "user.isActive" },
    ],
    loading: false,
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    statusOptions: [
      { text: "Active", value: true },
      { text: "Inactive", value: false },
    ],
  }),

  computed: {
    ...mapState("teachers", ["teachers", "totalTeachers"]),
    ...mapState("departments", ["departments"]),

    filteredTeachers() {
      let filtered = [...this.teachers];

      if (this.filters.department) {
        filtered = filtered.filter(
          (teacher) => teacher.department._id === this.filters.department
        );
      }

      if (this.filters.isActive !== null) {
        filtered = filtered.filter(
          (teacher) => teacher.user.isActive === this.filters.isActive
        );
      }

      return filtered;
    },
  },

  methods: {
    ...mapActions("teachers", ["fetchTeachers"]),
    ...mapActions("departments", ["fetchDepartments"]),

    getStatusColor(status) {
      const colors = {
        Active: "success",
        Inactive: "grey",
        "On Leave": "warning",
      };
      return colors[status] || "grey";
    },

    async generateReport() {
      this.loading = true;
      try {
        this.showSnackbarMessage("Report generated successfully!", "success");
      } catch (error) {
        this.showSnackbarMessage("Failed to generate report", "error");
      } finally {
        this.loading = false;
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

    formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleDateString();
    },

    async loadInitialData() {
      try {
        this.loading = true;
        await Promise.all([this.fetchTeachers(), this.fetchDepartments()]);
      } catch (error) {
        this.showSnackbarMessage("Failed to load data", "error");
      } finally {
        this.loading = false;
      }
    },
  },

  created() {
    this.loadInitialData();
  },
};
</script>
