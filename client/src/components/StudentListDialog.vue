<template>
  <v-dialog v-model="show" max-width="800px">
    <v-card>
      <v-card-title class="headline d-flex align-center">
        Student List
        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="schedule.students || []"
          dense
          :items-per-page="10"
        >
          <template v-slot:item.fullName="{ item }">
            {{ getStudentName(item) }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "StudentListDialog",

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    schedule: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    headers: [
      { text: "Student ID", value: "studentId" },
      { text: "Student Name", value: "fullName" },
    ],
  }),

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },

  methods: {
    getStudentName(student) {
      if (!student?.user) return "Unknown Student";
      return `${student.user.lastName || ""}, ${student.user.firstName || ""} ${
        student.user.middleName || ""
      }`.trim();
    },

    close() {
      this.show = false;
    },
  },
};
</script>
