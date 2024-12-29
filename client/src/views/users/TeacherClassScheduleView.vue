<template>
  <v-container fluid>
    <!-- Teacher Profile Card -->
    <v-card class="mb-6" elevation="2">
      <v-card-title
        class="d-flex align-center py-4"
        style="background-color: #d2691e"
      >
        <v-icon large color="white" class="mr-3">mdi-account-tie</v-icon>
        <div class="white--text text-h5">Teacher Profile</div>
      </v-card-title>

      <v-card-text class="pa-6">
        <v-row>
          <!-- Basic Info -->
          <v-col cols="12" md="8">
            <div class="text-h4 mb-4" style="color: #d2691e">
              {{ teacherName }}
            </div>

            <div class="mb-2 d-flex align-center">
              <v-icon small color="grey darken-1" class="mr-3"
                >mdi-badge-account</v-icon
              >
              <span class="text-subtitle-1">
                <span class="font-weight-medium">Teacher ID:</span>
                {{ teacherSchedules[0]?.teacher.teacherId }}
              </span>
            </div>
          </v-col>

          <!-- Stats -->
          <v-col cols="12" md="4" class="d-flex">
            <v-card outlined class="flex-grow-1 mr-4">
              <v-card-text class="text-center">
                <div class="text-h4" style="color: #d2691e">
                  {{ totalClasses }}
                </div>
                <div class="text-subtitle-2">Classes</div>
              </v-card-text>
            </v-card>

            <v-card outlined class="flex-grow-1">
              <v-card-text class="text-center">
                <div class="text-h4" style="color: #d2691e">
                  {{ totalStudents }}
                </div>
                <div class="text-subtitle-2">Students</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Schedule Card -->
    <v-card elevation="2">
      <v-card-title
        class="d-flex align-center py-4"
        style="background-color: #d2691e"
      >
        <v-icon large color="white" class="mr-3">mdi-calendar-clock</v-icon>
        <div class="white--text text-h5">Weekly Schedule</div>
        <v-spacer></v-spacer>
        <v-btn
          color="white"
          text
          @click="loadSchedules"
          :loading="loading"
          :disabled="loading"
        >
          <v-icon left>mdi-refresh</v-icon>
          Refresh
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-6">
        <v-row v-if="!loading && !error">
          <v-col v-for="day in weekDays" :key="day" cols="12" md="6" lg="4">
            <v-card
              outlined
              :class="{ 'current-day': isCurrentDay(day) }"
              class="day-card"
            >
              <v-card-title class="py-3" :style="getDayHeaderStyle(day)">
                <v-icon left color="white">{{ getDayIcon(day) }}</v-icon>
                <span class="white--text">{{ day }}</span>
                <v-chip
                  v-if="getSchedulesByDay(day).length"
                  class="ml-2"
                  x-small
                  color="white"
                  text-color="#d2691e"
                >
                  {{ getSchedulesByDay(day).length }}
                </v-chip>
              </v-card-title>

              <v-card-text class="pt-4">
                <v-list dense v-if="getSchedulesByDay(day).length">
                  <v-list-item
                    v-for="schedule in getSchedulesByDay(day)"
                    :key="schedule._id"
                    class="mb-3 schedule-item"
                    :class="{ 'current-class': isCurrentClass(schedule) }"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        style="color: #d2691e"
                        class="font-weight-medium"
                      >
                        {{ schedule.subject.subjectName.toUpperCase() }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="mt-2 d-flex align-center">
                        <v-icon small color="grey darken-1"
                          >mdi-clock-outline</v-icon
                        >
                        <span class="ml-1">
                          {{ formatTime(schedule.startTime) }} -
                          {{ formatTime(schedule.endTime) }}
                        </span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="mt-1 d-flex align-center">
                        <v-icon small color="grey darken-1">mdi-school</v-icon>
                        <span class="ml-1">{{
                          schedule.course.courseName
                        }}</span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="mt-1 d-flex align-center">
                        <v-icon small color="grey darken-1"
                          >mdi-account-group</v-icon
                        >
                        <span class="ml-1">Section {{ schedule.section }}</span>
                        <v-divider vertical class="mx-2"></v-divider>
                        <span
                          >{{ schedule.students?.length || 0 }} Students</span
                        >
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="mt-2">
                        <v-btn
                          small
                          outlined
                          :color="
                            isCurrentClass(schedule) ? 'white' : '#d2691e'
                          "
                          @click="viewAttendance(schedule._id)"
                          class="attendance-btn"
                        >
                          <v-icon left small>mdi-clipboard-check</v-icon>
                          Attendance
                        </v-btn>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-alert v-else type="info" text dense>
                  No classes scheduled
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row
          v-if="loading"
          justify="center"
          align="center"
          style="min-height: 400px"
        >
          <v-col cols="12" class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
              size="64"
            ></v-progress-circular>
            <div class="mt-4 text-subtitle-1 grey--text">
              Loading schedule...
            </div>
          </v-col>
        </v-row>

        <v-row v-if="error" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-alert type="error" text prominent>
              <v-row align="center">
                <v-col class="grow">
                  {{ error }}
                </v-col>
                <v-col class="shrink">
                  <v-btn color="error" text @click="loadSchedules">
                    Try Again
                  </v-btn>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "TeacherClassScheduleView",

  data: () => ({
    weekDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  }),

  computed: {
    ...mapState("schedules", ["loading", "error", "teacherSchedules"]),
    ...mapGetters("schedules", ["getSchedulesByDay", "hasSchedules"]),

    teacherId() {
      return this.$route.params.id;
    },

    teacherName() {
      if (this.teacherSchedules.length > 0) {
        const teacher = this.teacherSchedules[0].teacher;
        return `${teacher.user.lastName}, ${teacher.user.firstName} ${
          teacher.user.middleName || ""
        }`;
      }
      return "";
    },

    totalClasses() {
      return this.teacherSchedules.length;
    },

    totalStudents() {
      return this.teacherSchedules.reduce(
        (total, schedule) => total + (schedule.students?.length || 0),
        0
      );
    },
  },

  methods: {
    ...mapActions("schedules", ["fetchTeacherSchedules"]),

    async loadSchedules() {
      try {
        await this.fetchTeacherSchedules(this.teacherId);
      } catch (error) {
        console.error("Failed to load schedules:", error);
      }
    },

    formatTime(time) {
      return moment(time, "HH:mm").format("h:mm A");
    },

    isCurrentDay(day) {
      return moment().format("dddd") === day;
    },

    getDayHeaderClass(day) {
      return {
        backgroundColor: this.isCurrentDay(day) ? "#f4a460" : "#a52a2a",
      };
    },

    getDayIcon(day) {
      return this.isCurrentDay(day) ? "mdi-calendar-today" : "mdi-calendar";
    },

    viewAttendance(scheduleId) {
      this.$router.push(`/attendance/${scheduleId}`);
    },

    getDayHeaderStyle(day) {
      return {
        backgroundColor: this.isCurrentDay(day) ? "#f4a460" : "#a52a2a",
      };
    },

    isCurrentClass(schedule) {
      const now = moment();
      const startTime = moment(schedule.startTime, "HH:mm");
      const endTime = moment(schedule.endTime, "HH:mm");
      return now.isBetween(startTime, endTime);
    },
  },

  created() {
    this.loadSchedules();
  },

  beforeDestroy() {
    this.$store.commit("schedules/RESET_STATE");
  },
};
</script>

<style scoped>
.day-card {
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
}

.current-day {
  box-shadow: 0 2px 8px rgba(210, 105, 30, 0.2) !important;
}

.schedule-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: all 0.2s ease;
}

.schedule-item:hover {
  background-color: #fff3e0;
  transform: translateY(-2px);
}

.current-class {
  background-color: #fbe9e7;
  border-left: 4px solid #d2691e;
}

.attendance-btn {
  transition: all 0.3s ease;
}

.attendance-btn:hover {
  background-color: #d2691e !important;
  color: white !important;
}

.v-list-item__subtitle {
  display: flex;
  align-items: center;
}

.v-card-title {
  word-break: break-word;
}

.profile-header {
  border-radius: 4px;
}

.profile-header .v-btn.v-btn--outlined {
  border: 1px solid white !important;
}

.profile-header .v-btn.v-btn--outlined:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>
