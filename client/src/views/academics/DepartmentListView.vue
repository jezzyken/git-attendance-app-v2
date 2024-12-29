<template>
  <v-container fluid>
    <v-card class="my-4" elevation="2">
      <v-card-title class="d-flex align-center py-4">
        <v-icon large color="#d2691e" class="mr-3">mdi-office-building</v-icon>
        <span class="text-h5">Department Management</span>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="options.search"
          prepend-inner-icon="mdi-magnify"
          label="Search departments..."
          single-line
          hide-details
          outlined
          dense
          class="mr-4"
          style="max-width: 300px"
          @keyup.enter="handleSearch"
        ></v-text-field>

        <v-btn
          color="#d2691e"
          dark
          @click="openCreateDialog"
          class="px-5 rounded"
        >
          <v-icon left>mdi-plus</v-icon>
          Add Department
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="departments"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalDepartments"
        :footer-props="{
          'items-per-page-options': [5, 10, 25, 50],
          showFirstLastPage: true,
        }"
        class="elevation-1"
        style="border-radius: 8px"
      >
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
                @click="editDepartment(item)"
                aria-label="Edit Department"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Department</span>
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
                aria-label="Delete Department"
              >
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete Department</span>
          </v-tooltip>
        </template>

        <template v-slot:no-data>
          <v-alert type="info" dense text class="ma-2">
            No departments found
          </v-alert>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="createDialog" max-width="600px" persistent>
      <v-card>
        <v-card-title
          class="headline white--text d-flex align-center" style="background-color: #a52a2a"
        >
          {{ editMode ? "Edit Department" : "Create New Department" }}
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-6">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.name"
              :rules="formRules.name"
              label="Department Name"
              required
              outlined
              dense
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="closeCreateDialog">
            Cancel
          </v-btn>
          <v-btn
            color="#d2691e"
            :disabled="!valid"
            :loading="loading"
            @click="handleCreate"
            dark
          >
            {{ editMode ? "Save" : "Create" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">
          Confirm Delete
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete department
          <strong>{{ departmentToDelete?.name }}</strong
          >?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" @click="handleDelete" :loading="loading">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      :timeout="3000"
      top
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showSnackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "DepartmentListView",

  data: () => ({
    valid: false,
    options: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    createDialog: false,
    deleteDialog: false,
    departmentToDelete: null,
    form: { name: "" },
    formRules: {
      name: [(v) => !!v || "Department name is required"],
    },
    headers: [
      { text: "Department Name", align: "start", value: "name" },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    editMode: false,
    loading: false,
    snackbarColor: "",
    snackbarText: "",
    showSnackbar: false,
  }),

  computed: {
    ...mapState("departments", ["departments", "totalDepartments"]),
  },

  methods: {
    ...mapActions("departments", [
      "fetchDepartments",
      "createDepartment",
      "updateDepartment",
      "deleteDepartment",
    ]),

    openCreateDialog() {
      this.editMode = false;
      this.createDialog = true;
      this.form.name = "";
    },

    closeCreateDialog() {
      this.createDialog = false;
      this.form.name = "";
      if (this.$refs.form) this.$refs.form.reset();
    },

    async handleCreate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          if (this.editMode) {
            await this.updateDepartment({
              id: this.form._id,
              departmentData: this.form,
            });
          } else {
            await this.createDepartment(this.form);
          }
          this.showSnackbarMessage(
            `${this.editMode ? "Updated" : "Created"} successfully!`,
            "success"
          );
          this.fetchDepartments();
          this.closeCreateDialog();
        } catch (error) {
          console.log(error);
          this.showSnackbarMessage("An error occurred!", "error");
        } finally {
          this.loading = false;
        }
      }
    },

    editDepartment(item) {
      this.editMode = true;
      this.form = { ...item };
      this.createDialog = true;
    },

    confirmDelete(item) {
      this.departmentToDelete = item;
      this.deleteDialog = true;
    },

    async handleDelete() {
      this.loading = true;
      try {
        await this.deleteDepartment(this.departmentToDelete._id);
        this.showSnackbarMessage("Department deleted!", "success");
        this.fetchDepartments();
      } catch (error) {
        this.showSnackbarMessage("Failed to delete department!", "error");
      } finally {
        this.loading = false;
        this.deleteDialog = false;
      }
    },

    showSnackbarMessage(message, color) {
      this.snackbarText = message;
      this.snackbarColor = color;
      this.showSnackbar = true;
    },

    async handleSearch() {
      this.options.page = 1;
      await this.fetchDepartments();
    },
  },

  created() {
    this.fetchDepartments();
  },
};
</script>

<style scoped>
.my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
