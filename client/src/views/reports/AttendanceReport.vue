<template>
  <v-container fluid>
    <v-card class="mb-4">
      <!-- <v-card-title>
        Attendance Report
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mx-4"
        ></v-text-field>
      </v-card-title> -->

      <v-card-text>
        <v-row class="mt-3">
          <v-col cols="12" sm="6" md="3">
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  label="Date Range"
                  outlined
                  dense
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dateRange"
                range
                no-title
                @input="dateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="selectedCourse"
              :items="courses"
              item-text="courseName"
              item-value="_id"
              label="Course"
              clearable
              outlined
              dense
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="selectedSubject"
              :items="subjects"
              item-text="subjectName"
              item-value="_id"
              label="Subject"
              outlined
              dense
              clearable
              :disabled="!selectedCourse"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-btn
              color="primary"
              @click="fetchAttendanceData"
              :loading="loading"
            >
              Generate Report
            </v-btn>
            <v-btn
              color="info"
              @click="exportToPDF"
              :disabled="!filteredAttendance.length"
              class="ml-2"
            >
              Export to PDF
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="filteredAttendance"
        :search="search"
        :loading="loading"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)" small>
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:item.attendanceDate="{ item }">
          {{ formatDate(item.attendanceDate) }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="viewAttendanceDetails(item)">
            mdi-eye
          </v-icon>
          <v-icon small class="mr-2" @click="editAttendance(item)">
            mdi-pencil
          </v-icon>
        </template>

        <!-- No Data Message -->
        <template v-slot:no-data> No attendance records found </template>
      </v-data-table>

      <!-- Export Buttons -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn
          color="success"
          @click="exportToExcel"
          :disabled="!filteredAttendance.length"
        >
          Export to Excel
        </v-btn> -->
        <!-- <v-btn
          color="info"
          @click="exportToPDF"
          :disabled="!filteredAttendance.length"
        >
          Export to PDF
        </v-btn> -->
      </v-card-actions>
    </v-card>

    <!-- Details Dialog -->
    <v-dialog v-model="detailsDialog" max-width="800px">
      <v-card>
        <v-card-title>
          Attendance Details
          <v-spacer></v-spacer>
          <v-btn icon @click="detailsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="record in selectedAttendanceDetails"
                  :key="record.student._id"
                >
                  <td>
                    {{
                      `${record.student.user.firstName} ${record.student.user.lastName}`
                    }}
                  </td>
                  <td>
                    <v-chip :color="getStatusColor(record.status)" small>
                      {{ record.status }}
                    </v-chip>
                  </td>
                  <td>{{ formatTime(record.timeRecorded) }}</td>
                  <td>{{ record.notes || "-" }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "AttendanceReport",

  data: () => ({
    search: "",
    dateMenu: false,
    dateRange: [],
    selectedCourse: null,
    selectedSubject: null,
    detailsDialog: false,
    selectedAttendanceDetails: [],
    headers: [
      { text: "Date", value: "attendanceDate" },
      { text: "Course", value: "classSchedule.course.courseName" },
      { text: "Subject", value: "classSchedule.subject.subjectName" },
      { text: "Present", value: "presentCount" },
      { text: "Absent", value: "absentCount" },
      { text: "Late", value: "lateCount" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  computed: {
    ...mapState({
      loading: (state) => state.attendances.loading,
      attendanceRecords: (state) => state.attendances.attendanceRecords,
      courses: (state) => state.courses.courses,
      subjects: (state) => state.subjects.subjects,
    }),

    dateRangeText() {
      return this.dateRange.join(" - ");
    },

    filteredAttendance() {
      return this.attendanceRecords.map((record) => ({
        ...record,
        presentCount: this.getStatusCount(record, "present"),
        absentCount: this.getStatusCount(record, "absent"),
        lateCount: this.getStatusCount(record, "late"),
      }));
    },
  },

  methods: {
    ...mapActions({
      fetchAttendance: "attendances/fetchAttendanceRecords",
      fetchCourses: "courses/fetchCourses",
      fetchSubjects: "subjects/fetchSubjects",
    }),

    async fetchAttendanceData() {
      try {
        const query = {
          startDate: this.dateRange[0],
          endDate: this.dateRange[1],
          course: this.selectedCourse,
          subject: this.selectedSubject,
        };

        await this.fetchAttendance(query);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    },

    getStatusCount(record, status) {
      return record.attendanceRecords.filter((r) => r.status === status).length;
    },

    getStatusColor(status) {
      const colors = {
        present: "success",
        absent: "error",
        late: "warning",
        excused: "info",
      };
      return colors[status] || "grey";
    },

    formatDate(date) {
      return moment(date).format("MMMM DD, YYYY");
    },

    formatTime(time) {
      return moment(time).format("hh:mm A");
    },

    viewAttendanceDetails(item) {
      console.log(item);
      this.selectedAttendanceDetails = item.attendanceRecords;
      this.detailsDialog = true;
    },

    editAttendance(item) {
      this.$router.push(`/attendance/edit/${item._id}`);
    },

    exportToExcel() {
      const data = this.prepareExportData();
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Attendance Report");
      XLSX.writeFile(wb, "attendance_report.xlsx");
    },

    exportToPDF() {
      const doc = new jsPDF();
      const data = this.prepareExportData();

      doc.autoTable({
        head: [Object.keys(data[0])],
        body: data.map(Object.values),
        startY: 20,
        margin: { top: 20 },
        styles: { fontSize: 8 },
      });

      doc.save("attendance_report.pdf");
    },

    prepareExportData() {
      return this.filteredAttendance.map((record) => ({
        Date: this.formatDate(record.attendanceDate),
        Course: record.classSchedule.course.courseName,
        Subject: record.classSchedule.subject?.subjectName,
        Present: record.presentCount,
        Absent: record.absentCount,
        Late: record.lateCount,
      }));
    },
  },

  async created() {
    await Promise.all([this.fetchCourses(), this.fetchSubjects()]);
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 8px;
}

.v-data-table {
  width: 100%;
}
</style>
