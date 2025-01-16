<template>
  <v-container fluid>
    <v-card class="my-4" elevation="2">
      <v-card-title class="d-flex align-center py-4">
        <v-icon large color="primary" class="mr-3">mdi-account-school</v-icon>
        <span class="text-h5">Student Report</span>
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
          <v-col cols="12" md="3">
            <v-select
              v-model="filters.course"
              :items="courses"
              item-text="courseName"
              item-value="_id"
              label="Filter by Course"
              outlined
              dense
              clearable
              prepend-inner-icon="mdi-school"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="filters.level"
              :items="[1, 2, 3, 4]"
              label="Filter by Level"
              outlined
              dense
              clearable
              prepend-inner-icon="mdi-stairs"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="filters.section"
              :items="uniqueSections"
              label="Filter by Section"
              outlined
              dense
              clearable
              prepend-inner-icon="mdi-account-group"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="options.search"
              prepend-inner-icon="mdi-magnify"
              label="Search students..."
              single-line
              hide-details
              outlined
              dense
              @keyup.enter="handleSearch"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-card outlined>
              <v-card-text class="text-center">
                <div class="text-h4 primary--text">{{ totalStudents }}</div>
                <div class="text-subtitle-1">Total Students</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card outlined>
              <v-card-text class="text-center">
                <div class="text-h4 success--text">{{ activeStudents }}</div>
                <div class="text-subtitle-1">Active Students</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card outlined>
              <v-card-text class="text-center">
                <div class="text-h4 info--text">{{ studentsPerCourse }}</div>
                <div class="text-subtitle-1">Students per Course (Avg)</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card outlined>
              <v-card-text class="text-center">
                <div class="text-h4 warning--text">{{ studentsPerLevel }}</div>
                <div class="text-subtitle-1">Students per Level (Avg)</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-data-table
        :headers="headers"
        :items="filteredStudents"
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
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "StudentReportView",

  data: () => ({
    options: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    filters: {
      course: null,
      level: null,
      section: null,
    },
    headers: [
      { text: "Student ID", value: "studentId" },
      { text: "Name", value: "user.fullName" },
      { text: "Course", value: "course.courseName" },
      { text: "Level", value: "level" },
      { text: "Section", value: "section" },
      { text: "Status", value: "user.isActive" },
    ],
    loading: false,
    loadingReport: false,
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
  }),

  computed: {
    ...mapState("students", ["students", "totalStudents"]),
    ...mapState("courses", ["courses"]),

    filteredStudents() {
      let filtered = [...this.students];

      if (this.filters.course) {
        filtered = filtered.filter(
          (student) => student.course._id === this.filters.course
        );
      }

      if (this.filters.level) {
        filtered = filtered.filter(
          (student) => student.level === this.filters.level
        );
      }

      if (this.filters.section) {
        filtered = filtered.filter(
          (student) => student.section === this.filters.section
        );
      }

      return filtered;
    },

    uniqueSections() {
      return [...new Set(this.students.map((student) => student.section))];
    },

    activeStudents() {
      return this.students.filter((student) => student.user.isActive).length;
    },

    studentsPerCourse() {
      if (!this.courses.length) return 0;
      return Math.round(this.totalStudents / this.courses.length);
    },

    studentsPerLevel() {
      const levels = [
        ...new Set(this.students.map((student) => student.level)),
      ];
      if (!levels.length) return 0;
      return Math.round(this.totalStudents / levels.length);
    },
  },

  methods: {
    ...mapActions("students", ["fetchStudents"]),
    ...mapActions("courses", ["fetchCourses"]),

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

    if (!this.filteredStudents || this.filteredStudents.length === 0) {
      throw new Error("No student data available to generate report");
    }

    const pageWidth = doc.internal.pageSize.getWidth();
    const availableWidth = pageWidth - (margin * 2);

    doc.setFontSize(16);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    const title = "Students Report";
    const titleWidth = (doc.getStringUnitWidth(title) * 16) / doc.internal.scaleFactor;
    const titleXPosition = (pageWidth - titleWidth) / 2;
    doc.text(title, titleXPosition, margin + 0.3);

    const tableData = this.filteredStudents.map((student, index) => {
      try {
        return [
          student.studentId,
          `${student.user.lastName}, ${student.user.firstName} ${
            student.user.middleName || ""
          }`.trim(),
          student.course.courseName,
          student.level.toString(),
          student.section,
          student.user.isActive ? "Active" : "Inactive",
        ];
      } catch (err) {
        throw new Error(
          `Error processing student data at index ${index}: ${err.message}`
        );
      }
    });

    doc.autoTable({
      head: [["Student ID", "Name", "Course", "Level", "Section", "Status"]],
      body: tableData,
      styles: {
        fontSize: 8,
        cellPadding: 0.05,
        halign: 'left',
        minCellWidth: 0.5
      },
      headStyles: {
        fillColor: primaryColor,
        textColor: 255,
        fontSize: 9,
        fontStyle: 'bold',
        halign: 'left'
      },
      alternateRowStyles: {
        fillColor: lightRed,
      },
      columnStyles: {
        0: { cellWidth: availableWidth * 0.10 },  
        1: { cellWidth: availableWidth * 0.25 },  
        2: { cellWidth: availableWidth * 0.35 }, 
        3: { cellWidth: availableWidth * 0.10 },  
        4: { cellWidth: availableWidth * 0.10 }, 
        5: { cellWidth: availableWidth * 0.10 }  
      },
      margin: {
        left: margin,
        right: margin,
        top: margin,
        bottom: margin
      },
      tableWidth: pageWidth - (margin * 2),
      horizontalPageBreak: true,
      horizontalPageBreakRepeat: true,
      didDrawPage: (data) => {
        doc.setFontSize(16);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(title, titleXPosition, margin + 0.3);
      }
    });

    doc.setFontSize(8);
    let filterText = "Filters: ";
    try {
      if (this.filters.course) {
        const courseName = this.courses.find(
          (c) => c._id === this.filters.course
        )?.courseName;
        filterText += `Course: ${courseName || ""}, `;
      }
      if (this.filters.level) {
        filterText += `Level: ${this.filters.level}, `;
      }
      if (this.filters.section) {
        filterText += `Section: ${this.filters.section}, `;
      }
      filterText = filterText.endsWith(", ")
        ? filterText.slice(0, -2)
        : filterText;
      if (filterText === "Filters: ") filterText += "None";
    } catch (err) {
      console.warn("Error processing filters:", err);
      filterText += "Error processing filters";
    }

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);

      const timestamp = moment().format("MM/DD/YYYY HH:mm:ss");
      doc.text(
        filterText,
        margin,
        doc.internal.pageSize.height - margin - 0.2
      );
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

    const fileName = `student_report_${moment().format(
      "YYYY-MM-DD_HH-mm"
    )}.pdf`;
    doc.save(fileName);
    this.showSnackbarMessage("Report generated successfully!", "success");
  } catch (error) {
    console.error("PDF Generation Error:", error);
    this.showSnackbarMessage(
      `Failed to generate report: ${
        error.message || "Unknown error occurred"
      }`,
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
      console.log("search");
      // try {
      //   await this.fetchStudents({
      //     page: this.options.page,
      //     itemsPerPage: this.options.itemsPerPage,
      //     search: this.options.search,
      //     filters: this.filters,
      //   });
      // } catch (error) {
      //   this.showSnackbarMessage('Search failed', 'error');
      // }
    },

    async loadInitialData() {
      try {
        this.loading = true;
        await Promise.all([this.fetchStudents(), this.fetchCourses()]);
      } catch (error) {
        this.showSnackbarMessage("Failed to load data", "error");
      } finally {
        this.loading = false;
      }
    },
  },

  watch: {
    options: {
      handler() {
        this.handleSearch();
      },
      deep: true,
    },
    filters: {
      handler() {
        this.options.page = 1;
        this.handleSearch();
      },
      deep: true,
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
</style>
