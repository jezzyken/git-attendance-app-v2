<template>
  <v-container fluid>
    <v-card class="my-4" elevation="2">
      <v-card-title
        class="headline white--text d-flex align-center"
        style="background-color: #a52a2a"
      >
        {{ isEditMode ? "Edit Schedule" : "Create New Schedule" }}
        <v-spacer></v-spacer>
        <v-btn icon dark @click="$router.go(-1)">
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
              ></v-select>
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
              ></v-select>
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
              <v-btn
                color="primary"
                outlined
                @click="studentDialog = true"
                class="mb-2"
              >
                Select Students
                <v-chip class="ml-2" small v-if="form.students.length">
                  {{ form.students.length }} selected
                </v-chip>
              </v-btn>

              <div v-if="form.students.length" class="student-chips">
                <v-chip
                  v-for="studentId in form.students"
                  :key="studentId"
                  small
                  class="mr-1 mb-1"
                  close
                  @click:close="removeStudent(studentId)"
                >
                  {{
                    getStudentName(students.find((s) => s._id === studentId))
                  }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="pb-4 px-6">
        <v-btn text color="grey darken-1" @click="$router.go(-1)">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="#d2691e"
          :disabled="!isFormValid"
          :loading="loading"
          @click="handleSubmit"
          :dark="isFormValid"
        >
          {{ isEditMode ? "Save Changes" : "Create Schedule" }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Student Selection Dialog -->
    <v-dialog v-model="studentDialog" max-width="900px" persistent>
      <v-card>
        <v-card-title class="headline d-flex align-center">
          Select Students
          <v-spacer></v-spacer>
          <v-text-field
            v-model="studentSearch"
            append-icon="mdi-magnify"
            label="Search students"
            single-line
            hide-details
            outlined
            dense
            class="mx-4"
            style="max-width: 300px"
          ></v-text-field>
          <v-select
            v-model="selectedCourse"
            :items="courses"
            item-text="courseName"
            item-value="_id"
            label="Filter by Course"
            clearable
            outlined
            dense
            hide-details
            style="max-width: 200px"
          ></v-select>
        </v-card-title>

        <v-card-text>

        <v-data-table
  v-model="selectedStudents"
  :headers="studentHeaders"
  :items="filteredStudents"
  show-select
  item-key="_id"
  :loading="loading"
  dense
>
  <!-- Update the name column template -->
  <template v-slot:item.name="{ item }">
    {{ getStudentName(item) }}
  </template>

  <template v-slot:item.course.courseCode="{ item }">
    {{ item.course?.courseCode || 'N/A' }}
  </template>

  <template v-slot:item.level="{ item }">
    {{ item.level || 'N/A' }}
  </template>
</v-data-table>
        </v-card-text>

        <v-card-actions class="pb-4 px-6">
          <v-btn text @click="cancelStudentSelection">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="confirmStudentSelection">
            Confirm Selection
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

export default {
  name: "ScheduleFormView",

  data: () => ({
    valid: false,
    studentDialog: false,
    studentSearch: "",
    selectedCourse: null,
    selectedStudents: [],
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
  }),

  computed: {
    ...mapState("schedules", ["schedules", "loading"]),
    ...mapState("courses", ["courses"]),
    ...mapState("subjects", ["subjects"]),
    ...mapState("teachers", ["teachers"]),
    ...mapState("students", ["students"]),

    isEditMode() {
      return !!this.$route.params.id;
    },

    studentHeaders() {
      return [
        { text: "Student ID", value: "studentId" },
        { text: 'Name', value: 'name', sortable: true },
        { text: "Course", value: "course.courseCode" },
        { text: "Year Level", value: "yearLevel" },
      ];
    },

    filteredStudents() {
  let filtered = [...this.students];
  
  // Apply course filter
  if (this.selectedCourse) {
    filtered = filtered.filter(student => 
      student.course?._id === this.selectedCourse
    );
  }
  
  // Apply search filter if search text exists
  if (this.studentSearch) {
    const searchText = this.studentSearch.toLowerCase();
    filtered = filtered.filter(student => {
      const searchFields = [
        student.studentId,
        student.user?.firstName,
        student.user?.middleName,
        student.user?.lastName,
        student.course?.courseCode,
        student.section,
        student.level?.toString()
      ];
      
      return searchFields.some(field => 
        field && field.toString().toLowerCase().includes(searchText)
      );
    });
  }
  
  return filtered;
},

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
    ]),
    ...mapActions("courses", ["fetchCourses"]),
    ...mapActions("subjects", ["fetchSubjects"]),
    ...mapActions("teachers", ["fetchTeachers"]),
    ...mapActions("students", ["fetchStudents"]),

    removeStudent(studentId) {
      this.form.students = this.form.students.filter((id) => id !== studentId);
      this.selectedStudents = this.selectedStudents.filter(
        (student) => student._id !== studentId
      );
    },

    cancelStudentSelection() {
      this.studentDialog = false;
      this.selectedStudents = [
        ...this.form.students.map((id) =>
          this.students.find((s) => s._id === id)
        ),
      ].filter(Boolean);
    },

    confirmStudentSelection() {
      this.form.students = this.selectedStudents.map((student) => student._id);
      this.studentDialog = false;
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
      if (!student?.user) return "Unknown Student";
      return `${student.user.lastName || ""}, ${student.user.firstName || ""} ${
        student.user.middleName || ""
      }`.trim();
    },

    getTeacherName(teacher) {
      if (!teacher?.user) return "Unknown Teacher";
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
      this.form.subject = null;
      this.form.teacher = null;
    },

    handleSubjectChange() {
      if (!this.form.subject) {
        this.form.teacher = null;
      }
    },

    async loadScheduleData() {
      if (this.isEditMode) {
        const schedule = this.schedules.find(
          (s) => s._id === this.$route.params.id
        );
        if (schedule) {
          this.form = {
            course: schedule.course?._id || null,
            subject: schedule.subject?._id || null,
            section: schedule.section || "",
            teacher: schedule.teacher?._id || null,
            weekDays: [...(schedule.weekDays || [])],
            startTime: schedule.startTime || null,
            endTime: schedule.endTime || null,
            students: schedule.students?.map((student) => student._id) || [],
          };
          this.selectedStudents = schedule.students || [];
        }
      }
    },

    async handleSubmit() {
      if (this.$refs.form.validate()) {
        try {
          const scheduleData = { ...this.form };

          if (this.isEditMode) {
            await this.updateSchedule({
              id: this.$route.params.id,
              scheduleData,
            });
            this.showSnackbar("Schedule updated successfully!", "success");
          } else {
            await this.createSchedule(scheduleData);
            this.showSnackbar("Schedule created successfully!", "success");
          }

          this.$router.push("/schedules");
        } catch (error) {
          this.showSnackbar(
            error.response?.data?.message || "An error occurred!",
            "error"
          );
        }
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
        await this.loadScheduleData();
      } catch (error) {
        this.showSnackbar("Failed to load data", "error");
      }
    },
  },

  created() {
    this.timeSlots = this.generateTimeSlots();
    this.loadInitialData();
  },

  watch: {
    studentDialog(val) {
      if (val) {
        this.selectedStudents = [
          ...this.form.students.map((id) =>
            this.students.find((s) => s._id === id)
          ),
        ].filter(Boolean);
        this.studentSearch = "";
        this.selectedCourse = null;
      }
    },
  },
};
</script>

<style scoped>
.v-select ::v-deep .v-select__selections {
  min-height: 30px;
}

.v-select ::v-deep .v-chip {
  margin: 2px;
}

.v-select ::v-deep .v-list-item--link {
  padding-left: 8px;
}

.student-chips {
  max-height: 120px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
}

.v-card-title {
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 600px) {
  .v-card-title {
    flex-direction: column;
  }

  .v-card-title .v-text-field,
  .v-card-title .v-select {
    max-width: 100% !important;
  }
}

.v-data-table ::v-deep .v-data-table__wrapper {
  overflow-x: auto;
}
</style>
