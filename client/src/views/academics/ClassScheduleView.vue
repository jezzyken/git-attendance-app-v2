<template>
  <v-container fluid>
    <v-card class="my-4" elevation="2">
      <v-card-title class="d-flex align-center py-4">
        <v-icon large color="#d2691e" class="mr-3">mdi-calendar-clock</v-icon>
        <span class="text-h5">Class Schedule Management</span>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search schedules..."
          single-line
          hide-details
          outlined
          dense
          class="mr-4"
          style="max-width: 300px"
        ></v-text-field>

        <v-btn
          color="#d2691e"
          dark
          @click="openCreateDialog"
          class="px-5 rounded"
        >
          <v-icon left>mdi-plus</v-icon>
          Add Schedule
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="filteredSchedules"
        :loading="loading"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:item.teacher="{ item }">
          {{ item.teacher ? getTeacherName(item.teacher) : "Unknown Teacher" }}
        </template>

        <template v-slot:item.weekDays="{ item }">
          <v-chip
            v-for="day in item.weekDays"
            :key="day"
            small
            class="mr-1 mb-1"
            color="#f4a460"
            dark
          >
            {{ day }}
          </v-chip>
        </template>

        <template v-slot:item.time="{ item }">
          {{ item.startTime }} - {{ item.endTime }}
        </template>

        <template v-slot:item.students.length="{ item }">
          <v-btn
            small
            text
            color="primary"
            @click="openStudentListDialog(item)"
          >
            {{ item.students.length }} students
          </v-btn>
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
                @click="editSchedule(item)"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Schedule</span>
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
            <span>Delete Schedule</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="800px" persistent>
      <v-card>
        <v-card-title
          class="headline white--text d-flex align-center"
          style="background-color: #a52a2a"
        >
          {{ editMode ? "Edit Schedule" : "Create New Schedule" }}
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-4">
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="form.course"
                  :items="courses"
                  item-text="courseName"
                  item-value="_id"
                  label="Course"
                  :rules="rules.required"
                  outlined
                  dense
                  @change="handleCourseChange"
                >
                </v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="form.subject"
                  :items="filteredSubjects"
                  item-text="subjectName"
                  item-value="_id"
                  label="Descriptive Title"
                  :rules="rules.required"
                  outlined
                  dense
                  :disabled="!form.course"
                  @change="handleSubjectChange"
                >
                </v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.section"
                  label="Section"
                  :rules="rules.required"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="form.teacher"
                  :items="filteredTeachers"
                  item-text="fullName"
                  item-value="_id"
                  label="Teacher"
                  :rules="rules.required"
                  outlined
                  dense
                  :disabled="!form.subject"
                >
                  <template v-slot:item="{ item }">
                    {{ getTeacherName(item) }}
                  </template>
                  <template v-slot:selection="{ item }">
                    {{ getTeacherName(item) }}
                  </template>
                </v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="form.weekDays"
                  :items="weekDays"
                  label="Week Days"
                  multiple
                  chips
                  :rules="rules.required"
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="form.startTime"
                  :items="timeSlots"
                  item-text="text"
                  item-value="value"
                  label="Start Time"
                  :rules="rules.required"
                  outlined
                  dense
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="form.endTime"
                  :items="timeSlots"
                  item-text="text"
                  item-value="value"
                  label="End Time"
                  :rules="timeRules"
                  outlined
                  dense
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="form.students"
                  :items="students"
                  item-text="user.lastName"
                  item-value="_id"
                  label="Students"
                  multiple
                  chips
                  outlined
                  dense
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index < 3" small>
                      {{ getStudentName(item) }}
                    </v-chip>
                    <span
                      v-else-if="index === 3"
                      class="grey--text text-caption"
                    >
                      (+{{ form.students.length - 3 }} others)
                    </span>
                  </template>

                  <template v-slot:item="{ item, attrs, on }">
                    <v-list-item v-bind="attrs" v-on="on">
                      <template v-slot:default="{ active }">
                        <v-list-item-action>
                          <v-checkbox :input-value="active"></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ getStudentName(item) }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            ID: {{ item.studentId }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="pb-4 px-6">
          <v-btn text color="grey darken-1" @click="closeDialog">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="#d2691e"
            :disabled="!isFormValid"
            :loading="loading"
            @click="handleSubmit"
            :dark="isFormValid"
          >
            {{ editMode ? "Save Changes" : "Create Schedule" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">Confirm Delete</v-card-title>
        <v-card-text
          >Are you sure you want to delete this schedule?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="handleDelete" :loading="loading">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <student-list-dialog
      v-model="studentListDialog"
      :schedule="selectedSchedule || {}"
      :all-students="students"
      :loading="loading"
    />

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      top
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import StudentListDialog from "@/components/StudentListDialog.vue";

export default {
  name: "ClassScheduleView",
  components: {
    StudentListDialog,
  },
  data: () => ({
    valid: false,
    dialog: false,
    deleteDialog: false,
    search: "",
    editMode: false,
    scheduleToDelete: null,
    form: {
      course: null,
      subject: null,
      section: "",
      teacher: null,
      weekDays: [],
      startTime: null,
      endTime: null,
      students: [],
    },
    headers: [
      { text: "Course", value: "course.courseName" },
      { text: "Descriptive Title", value: "subject.subjectName" },
      { text: "Section", value: "section" },
      { text: "Teacher", value: "teacher" },
      { text: "Days", value: "weekDays" },
      { text: "Time", value: "time", sortable: false },
      { text: "Students", value: "students.length" },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
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
    rules: {
      required: [(v) => !!v || "This field is required"],
    },
    snackbar: {
      show: false,
      text: "",
      color: "",
    },
    timeSlots: [],
    studentListDialog: false,
    selectedSchedule: null,
  }),

  computed: {
    ...mapState("schedules", ["schedules", "loading"]),
    ...mapState("courses", ["courses"]),
    ...mapState("subjects", ["subjects"]),
    ...mapState("teachers", ["teachers"]),
    ...mapState("students", ["students"]),

    filteredSubjects() {
      if (!this.form.course) return [];
      return this.subjects.filter(
        (subject) =>
          subject.course &&
          subject.course.some((c) => c._id === this.form.course)
      );
    },

    filteredTeachers() {
      if (!this.form.subject) return [];
      return this.teachers.filter((teacher) =>
        teacher.subjects.some((s) => s._id === this.form.subject)
      );
    },

    filteredSchedules() {
      return this.schedules.filter(
        (schedule) => schedule.teacher && schedule.teacher.user
      );
    },

    timeRules() {
      return [
        (v) => !!v || "End time is required",
        (v) => {
          if (!this.form.startTime || !v) return true;
          return (
            this.isTimeAfter(v, this.form.startTime) ||
            "End time must be after start time"
          );
        },
      ];
    },

    isFormValid() {
      return (
        this.valid &&
        this.form.course &&
        this.form.subject &&
        this.form.weekDays.length > 0 &&
        this.form.startTime &&
        this.form.endTime &&
        this.isTimeAfter(this.form.endTime, this.form.startTime)
      );
    },
  },

  methods: {
    ...mapActions("schedules", [
      "fetchSchedules",
      "createSchedule",
      "updateSchedule",
      "deleteSchedule",
    ]),
    ...mapActions("courses", ["fetchCourses"]),
    ...mapActions("subjects", ["fetchSubjects"]),
    ...mapActions("teachers", ["fetchTeachers"]),
    ...mapActions("students", ["fetchStudents"]),

    openStudentListDialog(schedule) {
      this.selectedSchedule = schedule;
      this.studentListDialog = true;
    },

    generateTimeSlots() {
      const slots = [];
      const start = moment("07:30", "HH:mm");
      const end = moment("20:30", "HH:mm");

      while (start <= end) {
        slots.push({
          value: start.format("HH:mm"),
          text: start.format("h:mm A"),
        });
        start.add(30, "minutes");
      }

      return slots;
    },

    getStudentName(student) {
      if (!student?.user) {
        return "Unknown Student";
      }
      return `${student.user.lastName || ""}, ${student.user.firstName || ""} ${
        student.user.middleName || ""
      }`.trim();
    },

    getTeacherName(teacher) {
      if (!teacher?.user) {
        return "Unknown Teacher";
      }
      return `${teacher.user.lastName || ""}, ${teacher.user.firstName || ""} ${
        teacher.user.middleName || ""
      }`.trim();
    },

    isTimeAfter(time1, time2) {
      const [hours1, minutes1] = time1.split(":").map(Number);
      const [hours2, minutes2] = time2.split(":").map(Number);

      if (hours1 > hours2) return true;
      if (hours1 === hours2) return minutes1 > minutes2;
      return false;
    },

    handleCourseChange() {
      console.log("Selected course:", this.form.course);
      console.log("All subjects:", this.subjects);
      console.log("Filtered subjects:", this.filteredSubjects);
      this.form.subject = null;
      this.form.teacher = null;
    },

    handleSubjectChange() {
      if (!this.form.subject) {
        this.form.teacher = null;
      }
    },

    resetForm() {
      this.form = {
        course: null,
        subject: null,
        section: "",
        teacher: null,
        weekDays: [],
        startTime: null,
        endTime: null,
        students: [],
      };
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
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

    editSchedule(item) {
      console.log(item);
      this.editMode = true;
      this.form = {
        _id: item._id,
        course: item.course?._id || null,
        subject: item.subject?._id || null,
        section: item.section || "",
        teacher: item.teacher?._id || null,
        weekDays: [...(item.weekDays || [])],
        startTime: item.startTime || null,
        endTime: item.endTime || null,
        students: item.students?.map((student) => student._id) || [],
      };
      this.dialog = true;
    },

    confirmDelete(item) {
      this.scheduleToDelete = item;
      this.deleteDialog = true;
    },

    async handleSubmit() {
      if (this.$refs.form.validate()) {
        try {
          const scheduleData = { ...this.form };

          if (this.editMode) {
            await this.updateSchedule({
              id: this.form._id,
              scheduleData,
            });
            this.showSnackbar("Schedule updated successfully!", "success");
          } else {
            await this.createSchedule(scheduleData);
            this.showSnackbar("Schedule created successfully!", "success");
          }

          this.closeDialog();
          this.fetchSchedules();
        } catch (error) {
          this.showSnackbar(
            error.response?.data?.message || "An error occurred!",
            "error"
          );
        }
      }
    },

    async handleDelete() {
      try {
        await this.deleteSchedule(this.scheduleToDelete._id);
        this.showSnackbar("Schedule deleted successfully!", "success");
        this.deleteDialog = false;
        this.fetchSchedules();
      } catch (error) {
        this.showSnackbar(
          error.response?.data?.message || "Failed to delete schedule!",
          "error"
        );
      }
    },

    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text,
        color,
      };
    },

    async loadInitialData() {
      try {
        await Promise.all([
          this.fetchSchedules(),
          this.fetchCourses(),
          this.fetchSubjects(),
          this.fetchTeachers(),
          this.fetchStudents(),
        ]);
      } catch (error) {
        this.showSnackbar("Failed to load data", "error");
      }
    },
  },

  created() {
    this.timeSlots = this.generateTimeSlots();
    this.loadInitialData();
  },
};
</script>

<style scoped>
.v-data-table ::v-deep .v-data-table__wrapper {
  overflow-x: auto;
}

.time-picker-width {
  max-width: 290px;
}

.v-select ::v-deep .v-select__selections {
  min-height: 30px;
}

.v-select ::v-deep .v-chip {
  margin: 2px;
}

.v-select ::v-deep .v-list-item--link {
  padding-left: 8px;
}
</style>
