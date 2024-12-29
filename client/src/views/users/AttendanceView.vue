<template>
  <v-container fluid>
    <v-card class="my-4" elevation="2">
      <v-card-title
        class="d-flex align-center py-4"
        style="background-color: #d2691e"
      >
        <v-icon large color="white" class="mr-3">mdi-clipboard-text</v-icon>
        <div class="white--text">
          <div class="text-h5">Attendance Records</div>
          <div class="text-subtitle-2" v-if="attendanceRecords.length">
            {{ attendanceRecords[0].classSchedule.subject.subjectName }} -
            Section {{ attendanceRecords[0].classSchedule.section }}
          </div>
        </div>
        <v-spacer></v-spacer>
        <v-btn
          color="white"
          text
          @click="loadAttendanceRecords"
          :loading="loading"
          :disabled="loading"
        >
          <v-icon left>mdi-refresh</v-icon>
          Refresh
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-6">
        <v-row>
          <v-col cols="12" sm="4">
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="selectedDate"
                  label="Filter by Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                  clearable
                  @click:clear="clearDateFilter"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="selectedDate"
                @input="dateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-data-table
          :headers="headers"
          :items="filteredAttendanceRecords"
          :loading="loading"
          class="mt-4"
          :items-per-page="10"
        >
          <template v-slot:item.studentName="{ item }">
            {{ getStudentName(item.student) }}
          </template>

          <template v-slot:item.studentId="{ item }">
            {{ item.student.studentId }}
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip
              small
              :color="getStatusColor(item.status)"
              text-color="white"
            >
              {{ item.status }}
            </v-chip>
          </template>

          <template v-slot:no-data>
            <v-alert type="info" text dense class="mt-2">
              No attendance records found
            </v-alert>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "AttendanceView",

  data: () => ({
    dateMenu: false,
    selectedDate: null,
    headers: [
      { text: "Student Name", value: "studentName", sortable: true },
      { text: "Student ID", value: "studentId", sortable: true },
      { text: "Status", value: "status", sortable: true },
      { text: "Date", value: "formattedDate", sortable: true },
      { text: "Day", value: "daysOfWeek", sortable: true },
    ],
  }),

  computed: {
    ...mapState("attendances", ["loading", "error", "attendanceRecords"]),

    scheduleId() {
      return this.$route.params.id;
    },

    flattenedAttendanceRecords() {
      return this.attendanceRecords.flatMap((record) =>
        record.attendanceRecords.map((attendance) => ({
          studentName: this.getStudentName(attendance.student),
          studentId: attendance.student.studentId,
          status: attendance.status,
          attendanceDate: record.attendanceDate,
          formattedDate: moment(record.attendanceDate).format("MMMM DD, YYYY"),
          daysOfWeek: record.daysOfWeek,
          student: attendance.student,
        }))
      );
    },

    filteredAttendanceRecords() {
      if (!this.selectedDate) {
        return this.flattenedAttendanceRecords;
      }

      console.log(this.flattenedAttendanceRecords);
      return this.flattenedAttendanceRecords.filter(
        (record) =>
          moment(record.attendanceDate).format("YYYY-MM-DD") ===
          this.selectedDate
      );
    },
  },

  methods: {
    ...mapActions("attendances", ["fetchAttendanceBySchedule"]),

    getStudentName(student) {
      if (!student?.user) return "Unknown Student";
      return `${student.user.lastName}, ${student.user.firstName} ${
        student.user.middleName || ""
      }`.trim();
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

    async loadAttendanceRecords() {
      try {
        await this.fetchAttendanceBySchedule(this.scheduleId);
      } catch (error) {
        console.error("Failed to load attendance records:", error);
      }
    },

    clearDateFilter() {
      this.selectedDate = null;
    },
  },

  created() {
    this.loadAttendanceRecords();
  },
  watch: {
    selectedDate(newDate) {
      console.log("Selected Date:", newDate);
      console.log(
        "Available Dates:",
        this.flattenedAttendanceRecords.map((r) => r.attendanceDate)
      );
    },
  },
};
</script>

<style scoped>
.v-chip {
  text-transform: capitalize;
}

.v-data-table ::v-deep th {
  font-weight: bold !important;
}

.v-data-table ::v-deep td {
  padding: 8px 16px !important;
}
</style>
