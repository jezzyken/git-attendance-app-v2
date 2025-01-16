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
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

    generateReport() {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "a4",
    });

    const primaryColor = [165, 42, 42];
    const lightRed = [249, 235, 235];
    const margin = 0.5;

    doc.setFontSize(16);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    const title = "Teachers Report";
    const titleWidth =
      (doc.getStringUnitWidth(title) * 16) / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleXPosition = (pageWidth - titleWidth) / 2;
    doc.text(title, titleXPosition, margin + 0.3);

    if (!this.teachers || this.teachers.length === 0) {
      throw new Error('No teacher data available to generate report');
    }

    const tableData = this.teachers.map((teacher) => {
      try {
        return [
          teacher.teacherId,
          `${teacher.user.firstName} ${teacher.user.middleName || ""} ${
            teacher.user.lastName
          }`,
          teacher.department.name,
          teacher.user.email || "-",
          teacher.user.phoneNo || "-",
          moment(teacher.employmentDate).format("MM/DD/YYYY"),
        ];
      } catch (err) {
        throw new Error(`Error processing teacher data: ${err.message}`);
      }
    });

    doc.autoTable({
      startY: margin + 0.6,
      head: [["ID", "Name", "Department", "Email", "Phone", "Employment"]],
      body: tableData,
      styles: {
        fontSize: 8,
        cellPadding: 0.05,
      },
      headStyles: {
        fillColor: primaryColor,
        textColor: 255,
        fontSize: 9,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: lightRed,
      },
      columnStyles: {
        0: { cellWidth: 0.5 },
        1: { cellWidth: 2 },
        2: { cellWidth: 1 },
        3: { cellWidth: 1.5 },
        4: { cellWidth: 1 },
        5: { cellWidth: 1 },
      },
      margin: {
        top: margin,
        right: margin,
        bottom: margin,
        left: margin,
      },
      tableWidth: "auto",
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      const timestamp = moment().format("MM/DD/YYYY HH:mm:ss");
      doc.text(
        `Generated on: ${timestamp}`,
        margin,
        doc.internal.pageSize.height - margin
      );
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - margin - 1,
        doc.internal.pageSize.height - margin
      );
    }

    const filename = `teachers_report_${moment().format('YYYY-MM-DD_HH-mm')}.pdf`;
    doc.save(filename);
    this.showSnackbarMessage("Report generated successfully!", "success");

  } catch (error) {
    console.error('PDF Generation Error:', error);
    this.showSnackbarMessage(
      `Failed to generate report: ${error.message || 'Unknown error occurred'}`, 
      "error"
    );
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
