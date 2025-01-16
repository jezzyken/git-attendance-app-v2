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
              search
            </v-btn>

            <v-btn
              color="success"
              @click="exportToPDF"
              class="px-5 rounded mr-4 ml-2"
            >
              <v-icon left>mdi-file-download</v-icon>
              Generate Report
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
        <template v-slot:item.classSchedule.teacher.user="{ item }">
          {{ getTeacherFullName(item.classSchedule?.teacher?.user) }}
        </template>

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
          <v-row>
            <v-col cols="12" sm="6">
              <strong>Course:</strong>
              {{ selectedAttendanceRecord?.classSchedule?.course?.courseName }}
            </v-col>
            <v-col cols="12" sm="6">
              <strong>Subject:</strong>
              {{
                selectedAttendanceRecord?.classSchedule?.subject?.subjectName
              }}
            </v-col>
            <v-col cols="12" sm="6">
              <strong>Teacher:</strong>
              {{
                getTeacherFullName(
                  selectedAttendanceRecord?.classSchedule?.teacher?.user
                )
              }}
            </v-col>
            <v-col cols="12" sm="6">
              <strong>Date:</strong>
              {{ formatDate(selectedAttendanceRecord?.attendanceDate) }}
            </v-col>
          </v-row>

          <v-simple-table class="mt-4">
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

          <!-- Add print button -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="printAttendanceDetails">
              Print Details
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import XLSX from "xlsx";

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
      { text: "Teacher", value: "classSchedule.teacher.user" },
      { text: "Present", value: "presentCount" },
      { text: "Absent", value: "absentCount" },
      { text: "Late", value: "lateCount" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    selectedAttendanceRecord: null,
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

    getTeacherFullName(user) {
      console.log({ user });
      if (!user) return "-";
      const middleName = user.middleName ? ` ${user.middleName} ` : " ";
      return `${user.firstName}${middleName}${user.lastName}`;
    },

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
      this.selectedAttendanceRecord = item;
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
      try {
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "a4",
        });

        const primaryColor = [165, 42, 42];
        const lightRed = [249, 235, 235];
        const margin = 0.5;

        const pageWidth = doc.internal.pageSize.getWidth();
        const availableWidth = pageWidth - margin * 2;

        doc.setFontSize(16);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        const title = "Attendance Report";
        const titleWidth =
          (doc.getStringUnitWidth(title) * 16) / doc.internal.scaleFactor;
        const titleXPosition = (pageWidth - titleWidth) / 2;
        doc.text(title, titleXPosition, margin + 0.3);

        const tableData = this.filteredAttendance.map((record) => [
          this.formatDate(record.attendanceDate),
          record.classSchedule.course.courseName,
          record.classSchedule.subject?.subjectName || "-",
          this.getTeacherFullName(record.classSchedule.teacher?.user),
          record.presentCount.toString(),
          record.absentCount.toString(),
          record.lateCount.toString(),
        ]);

        doc.autoTable({
          startY: margin + 0.6,
          head: [
            [
              "Date",
              "Course",
              "Subject",
              "Teacher",
              "Present",
              "Absent",
              "Late",
            ],
          ],
          body: tableData,
          styles: {
            fontSize: 8,
            cellPadding: 0.05,
            halign: "left",
          },
          headStyles: {
            fillColor: primaryColor,
            textColor: 255,
            fontSize: 9,
            fontStyle: "bold",
            halign: "center",
          },
          alternateRowStyles: {
            fillColor: lightRed,
          },
          columnStyles: {
            0: { cellWidth: availableWidth * 0.15 },
            1: { cellWidth: availableWidth * 0.2 },
            2: { cellWidth: availableWidth * 0.2 },
            3: { cellWidth: availableWidth * 0.2 },
            4: { cellWidth: availableWidth * 0.08 },
            5: { cellWidth: availableWidth * 0.08 },
            6: { cellWidth: availableWidth * 0.09 },
          },
          margin: {
            left: margin,
            right: margin,
            top: margin,
            bottom: margin,
          },
          tableWidth: availableWidth,
          didDrawPage: (data) => {
            doc.setFontSize(16);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(title, titleXPosition, margin + 0.3);
          },
        });

        doc.setFontSize(8);
        let filterText = "Filters: ";
        try {
          if (this.selectedCourse) {
            const courseName = this.courses.find(
              (c) => c._id === this.selectedCourse
            )?.courseName;
            filterText += `Course: ${courseName || ""}, `;
          }
          if (this.selectedSubject) {
            const subjectName = this.subjects.find(
              (s) => s._id === this.selectedSubject
            )?.subjectName;
            filterText += `Subject: ${subjectName || ""}, `;
          }
          if (this.dateRange.length === 2) {
            filterText += `Date Range: ${this.dateRange.join(" - ")}, `;
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

        const fileName = `attendance_report_${moment().format(
          "YYYY-MM-DD_HH-mm"
        )}.pdf`;
        doc.save(fileName);
      } catch (error) {
        console.error("PDF Generation Error:", error);
        this.$emit("show-error", "Failed to generate PDF report");
      }
    },

    prepareExportData() {
      return this.filteredAttendance.map((record) => ({
        Date: this.formatDate(record.attendanceDate),
        Course: record.classSchedule.course.courseName,
        Subject: record.classSchedule.subject?.subjectName,
        Teacher: this.getTeacherFullName(record.classSchedule.teacher?.user),
        Present: record.presentCount,
        Absent: record.absentCount,
        Late: record.lateCount,
      }));
    },

    printAttendanceDetails() {
      const doc = new jsPDF();
      const primaryColor = [165, 42, 42];
      const lightRed = [249, 235, 235];

      doc.setFontSize(16);
      doc.text("Attendance Details", 14, 15);

      doc.setFontSize(12);
      const headerInfo = [
        `Course: ${this.selectedAttendanceRecord?.classSchedule?.course?.courseName}`,
        `Subject: ${this.selectedAttendanceRecord?.classSchedule?.subject?.subjectName}`,
        `Teacher: ${this.getTeacherFullName(
          this.selectedAttendanceRecord?.classSchedule?.teacher?.user
        )}`,
        `Date: ${this.formatDate(
          this.selectedAttendanceRecord?.attendanceDate
        )}`,
      ];

      headerInfo.forEach((text, index) => {
        doc.text(text, 14, 25 + index * 7);
      });

      const tableData = this.selectedAttendanceDetails.map((record) => [
        `${record.student.user.firstName} ${record.student.user.lastName}`,
        record.status,
        this.formatTime(record.timeRecorded),
        record.notes || "-",
      ]);

      doc.autoTable({
        startY: 52,
        head: [["Student Name", "Status", "Time", "Notes"]],
        body: tableData,
        styles: {
          fontSize: 10,
          textColor: [50, 50, 50],
        },
        headStyles: {
          fillColor: primaryColor,
          textColor: 255,
          fontSize: 11,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: lightRed,
        },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 30 },
          2: { cellWidth: 30 },
          3: { cellWidth: "auto" },
        },
        margin: { top: 20 },
      });

      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        const timestamp = moment().format("MMMM DD, YYYY HH:mm:ss");
        doc.text(
          `Generated on: ${timestamp}`,
          14,
          doc.internal.pageSize.height - 10
        );
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width - 30,
          doc.internal.pageSize.height - 10
        );
      }

      doc.save(
        `attendance_details_${this.formatDate(
          this.selectedAttendanceRecord?.attendanceDate
        )}.pdf`
      );
    },
  },

  async created() {
    await Promise.all([
      this.fetchCourses(),
      this.fetchSubjects(),
      this.fetchAttendance(),
    ]);
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
