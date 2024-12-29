<template>
  <v-container fluid>
    <v-card-title class="d-flex align-center py-4">
      <v-icon large color="primary" class="mr-3">mdi-file-chart</v-icon>
      <span class="text-h5">Reports</span>
    </v-card-title>

    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="report in reportTypes"
        :key="report.id"
      >
        <v-card
          class="report-card"
          :class="{ selected: isSelected(report.id) }"
          @click="selectReport(report)"
        >
          <v-card-text class="text-center pa-4">
            <v-icon x-large :color="report.color">{{ report.icon }}</v-icon>
            <div class="text-h6 mt-3">{{ report.title }}</div>
            <div class="text-subtitle-2 grey--text">
              {{ report.description }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  name: "Reports",

  data: () => ({
    reportTypes: [
      {
        id: "teachers",
        title: "Teacher List",
        description: "Comprehensive teacher directory with details",
        icon: "mdi-teach",
        color: "blue",
        route: "TeacherReport",
      },
      {
        id: "students",
        title: "Student List",
        description: "Complete student enrollment records",
        icon: "mdi-account-group",
        color: "green",
        route: "StudentReport",
      },
      {
        id: "schedules",
        title: "Class Schedule",
        description: "Complete class schedules and timetables",
        icon: "mdi-calendar-clock",
        color: "purple",
        route: "ScheduleReport",
      },
      {
        id: "attendances",
        title: "Attendance List",
        description: "Student attendance records and statistics",
        icon: "mdi-account-check",
        color: "orange",
        route: "AttendanceReport",
      },
    ],
  }),

  methods: {
    selectReport(report) {
      const targetPath = `/reports/${report.id}`;
      if (this.$route.path !== targetPath) {
        this.$router.push(targetPath);
      }
    },

    isSelected(reportId) {
      return this.$route.path === `/reports/${reportId}`;
    },
  },
};
</script>

<style scoped>
.report-card {
  cursor: pointer;
  transition: all 0.2s ease;
  height: 100%;
}

.report-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.report-card.selected {
  border: 2px solid var(--v-primary-base);
}
</style>
