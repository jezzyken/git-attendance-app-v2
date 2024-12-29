<template>
  <v-container fluid>
    <v-card-title class="d-flex align-center py-4">
      <v-icon large color="primary" class="mr-3">mdi-account-school</v-icon>
      <span class="text-h5">Class Schedule Report</span>
    </v-card-title>

    <v-card class="my-4" elevation="2">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="filters.course"
              :items="courses"
              item-text="courseName"
              item-value="_id"
              label="Select Course"
              clearable
              outlined
              dense
              @change="handleCourseChange"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="filters.subject"
              :items="filteredSubjects"
              item-text="subjectName"
              item-value="_id"
              label="Select Subject"
              clearable
              outlined
              dense
              :disabled="!filters.course"
              @change="handleSubjectChange"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="filters.teacher"
              :items="teachers"
              item-text="user.lastName"
              item-value="_id"
              label="Select Teacher"
              clearable
              outlined
              dense
            >
              <template v-slot:selection="{ item }">
                {{ getTeacherName(item) }}
              </template>
              <template v-slot:item="{ item }">
                {{ getTeacherName(item) }}
              </template>
            </v-select>
          </v-col>

          <!-- Week Day Filter -->
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="filters.weekDay"
              :items="weekDays"
              label="Select Day"
              clearable
              outlined
              dense
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="filters.startTime"
              :items="timeSlots"
              item-text="text"
              item-value="value"
              label="Start Time"
              clearable
              outlined
              dense
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="filters.endTime"
              :items="timeSlots"
              item-text="text"
              item-value="value"
              label="End Time"
              clearable
              outlined
              dense
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              color="#d2691e"
              @click="applyFilters"
              :loading="loading"
              class="mr-2"
              dark
            >
              Apply Filters
            </v-btn>
            <v-btn
              color="secondary"
              text
              @click="resetFilters"
              :disabled="loading"
            >
              Reset
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-data-table
        :headers="headers"
        :items="scheduleReports"
        :loading="loading"
        show-expand
        single-expand
        class="elevation-1"
        item-key="_id"
      >
        <template v-slot:item.course="{ item }">
          {{ item.course?.courseName }}
        </template>

        <template v-slot:item.subject="{ item }">
          {{ item.subject?.subjectName }}
        </template>

        <template v-slot:item.teacher="{ item }">
          {{ getTeacherName(item.teacher) }}
        </template>

        <template v-slot:item.weekDays="{ item }">
          <v-chip
            v-for="day in item.weekDays"
            :key="day"
            small
            class="mr-1"
            color="#f4a460"
            dark
          >
            {{ day }}
          </v-chip>
        </template>

        <template v-slot:item.time="{ item }">
          {{ formatTime(item.startTime) }} - {{ formatTime(item.endTime) }}
        </template>

        <template v-slot:item.students="{ item }">
          {{ item.students?.length || 0 }} students
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="pa-0">
            <v-card flat>
              <v-card-title class="subtitle-1 d-flex align-center">
                Students List
                <v-chip class="ml-2" small>
                  {{ item.students?.length || 0 }} students
                </v-chip>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      text
                      class="ml-2"
                      v-bind="attrs"
                      v-on="on"
                      @click.stop="downloadStudentListPDF(item)"
                    >
                      <v-icon left>mdi-file-pdf-box</v-icon>
                      PDF
                    </v-btn>
                  </template>
                  <span>Download PDF</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="success"
                      text
                      class="ml-2"
                      v-bind="attrs"
                      v-on="on"
                      @click.stop="downloadStudentListCSV(item)"
                    >
                      <v-icon left>mdi-file-excel</v-icon>
                      CSV
                    </v-btn>
                  </template>
                  <span>Download CSV</span>
                </v-tooltip>
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense v-if="item.students?.length">
                <v-list-item
                  v-for="student in item.students"
                  :key="student._id"
                >
                  <v-list-item-avatar>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      {{ getStudentName(student) }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Student ID: {{ student.studentId }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-card-text
                v-else
                class="text-center text-subtitle-1 grey--text"
              >
                No students enrolled in this schedule
              </v-card-text>
            </v-card>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "ReportView",

  data: () => ({
    headers: [
      { text: "Course", value: "course" },
      { text: "Subject", value: "subject" },
      { text: "Section", value: "section" },
      { text: "Teacher", value: "teacher" },
      { text: "Days", value: "weekDays" },
      { text: "Time", value: "time" },
      { text: "Students", value: "students" },
      { text: "", value: "data-table-expand" },
    ],
    weekDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    timeSlots: [],
    filters: {
      course: null,
      subject: null,
      teacher: null,
      weekDay: null,
      startTime: null,
      endTime: null,
    },
    downloading: false,
    expandedRow: null,
  }),

  computed: {
    ...mapState({
      courses: (state) => state.courses.courses,
      subjects: (state) => state.subjects.subjects,
      teachers: (state) => state.teachers.teachers,
      loading: (state) => state.reports.loading,
      scheduleReports: (state) => state.reports.scheduleReports.data,
    }),

    filteredSubjects() {
      if (!this.filters.course) return [];
      return this.subjects.filter(
        (subject) =>
          subject.course &&
          subject.course.some((c) => c._id === this.filters.course)
      );
    },
  },

  methods: {
    ...mapActions({
      fetchReports: "reports/fetchScheduleReports",
      fetchCourses: "courses/fetchCourses",
      fetchSubjects: "subjects/fetchSubjects",
      fetchTeachers: "teachers/fetchTeachers",
      updateFilters: "reports/updateFilters",
    }),

    generateTimeSlots() {
      const slots = [];
      const start = moment("07:00", "HH:mm");
      const end = moment("18:00", "HH:mm");

      while (start <= end) {
        slots.push({
          value: start.format("HH:mm"),
          text: start.format("h:mm A"),
        });
        start.add(30, "minutes");
      }

      return slots;
    },

    formatTime(time) {
      return moment(time, "HH:mm").format("h:mm A");
    },

    getTeacherName(teacher) {
      if (!teacher?.user) return "";
      const { firstName, lastName, middleName } = teacher.user;
      return `${lastName}, ${firstName} ${middleName || ""}`.trim();
    },

    getStudentName(student) {
      if (!student?.user) return "";
      const { firstName, lastName, middleName } = student.user;
      return `${lastName}, ${firstName} ${middleName || ""}`.trim();
    },

    handleCourseChange() {
      this.filters.subject = null;
    },

    handleSubjectChange() {
      console.log("subject");
    },

    async applyFilters() {
      await this.updateFilters(this.filters);
    },

    async resetFilters() {
      this.filters = {
        course: null,
        subject: null,
        teacher: null,
        weekDay: null,
        startTime: null,
        endTime: null,
      };
      await this.fetchReports();
    },

    async downloadStudentListPDF(item) {
      try {
        this.downloading = true;

        const headerInfo = [
          { text: "Student List", style: "header" },
          {
            text: [
              `Course: ${item.course?.courseName || "N/A"}\n`,
              `Subject: ${item.subject?.subjectName || "N/A"}\n`,
              `Teacher: ${this.getTeacherName(item.teacher)}\n`,
              `Schedule: ${item.weekDays.join(", ")} | ${this.formatTime(
                item.startTime
              )} - ${this.formatTime(item.endTime)}\n`,
            ],
            style: "subheader",
            margin: [0, 0, 0, 10],
          },
        ];

        const studentData =
          item.students?.map((student, index) => ({
            no: index + 1,
            id: student.studentId || "N/A",
            name: this.getStudentName(student),
          })) || [];

        const docDefinition = {
          content: [
            ...headerInfo,
            {
              table: {
                headerRows: 1,
                widths: ["auto", "auto", "*"],
                body: [
                  ["No.", "Student ID", "Student Name"],
                  ...studentData.map((student) => [
                    student.no,
                    student.id,
                    student.name,
                  ]),
                ],
              },
            },
          ],
          styles: {
            header: {
              fontSize: 12,
              bold: true,
              margin: [0, 0, 0, 5],
            },
            subheader: {
              fontSize: 11,
              margin: [0, 0, 0, 10],
            },
          },
        };

        const filename =
          `student-list-${item.course?.courseName}-${item.subject?.subjectName}`
            .toLowerCase()
            .replace(/\s+/g, "-");

        window.pdfMake.createPdf(docDefinition).download(`${filename}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        this.downloading = false;
      }
    },

    downloadStudentListCSV(item) {
      try {
        this.downloading = true;

        const headerRows = [
          ["Course", item.course?.courseName || "N/A"],
          ["Subject", item.subject?.subjectName || "N/A"],
          ["Teacher", this.getTeacherName(item.teacher)],
          [
            "Schedule",
            `${item.weekDays.join(", ")} | ${this.formatTime(
              item.startTime
            )} - ${this.formatTime(item.endTime)}`,
          ],
          [],
          ["No.", "Student ID", "Student Name"],
        ];

        const studentRows =
          item.students?.map((student, index) => [
            index + 1,
            student.studentId || "N/A",
            this.getStudentName(student),
          ]) || [];

        const csvContent = [...headerRows, ...studentRows]
          .map((row) => row.map((cell) => `"${cell}"`).join(","))
          .join("\n");

        const filename =
          `student-list-${item.course?.courseName}-${item.subject?.subjectName}`
            .toLowerCase()
            .replace(/\s+/g, "-");

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `${filename}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        downloading;
        console.error("Error generating CSV:", error);
      } finally {
        this.downloading = false;
      }
    },

    expandRow(item) {
      this.expandedRow = [item];
    },

    collapseAll() {
      this.expandedRow = [];
    },

    async initialize() {
      this.timeSlots = this.generateTimeSlots();
      try {
        await Promise.all([
          this.fetchCourses(),
          this.fetchSubjects(),
          this.fetchTeachers(),
          this.fetchReports(),
        ]);
      } catch (error) {
        console.error("Failed to initialize report view:", error);
      }
    },
  },

  created() {
    this.initialize();
  },
};
</script>

<style scoped>
.v-data-table ::v-deep .v-data-table__wrapper {
  overflow-x: auto;
}

.v-list-item {
  border-bottom: 1px solid #e0e0e0;
}

.v-list-item:last-child {
  border-bottom: none;
}

@media print {
  .v-btn,
  .v-card-actions,
  .v-select,
  .v-data-table__expand-icon {
    display: none !important;
  }

  .v-data-table {
    border: none !important;
  }

  .v-data-table__wrapper {
    width: 100% !important;
  }

  .v-chip {
    border: 1px solid #ddd !important;
    background-color: transparent !important;
  }
}
</style>
