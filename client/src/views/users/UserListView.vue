<template>
  <v-container>
    <v-card elevation="2">
      <!-- Header Section -->
      <v-card-title class="d-flex align-center py-3">
        <v-icon large color="#d2691e" class="mr-2">mdi-account-group</v-icon>
        <span class="text-h5">User Management</span>
        <v-spacer></v-spacer>

        <!-- Search Field -->
        <v-text-field
          v-model="options.search"
          prepend-inner-icon="mdi-magnify"
          label="Search users..."
          single-line
          hide-details
          outlined
          dense
          class="mr-4"
          style="max-width: 300px"
          @keyup.enter="handleSearch"
        ></v-text-field>

        <!-- Add User Button -->
        <v-btn color="#d2691e" dark @click="openCreateDialog" class="px-4">
          <v-icon left>mdi-plus</v-icon>
          Add User
        </v-btn>
      </v-card-title>

      <!-- Data Table -->
      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        :options.sync="options"
        :footer-props="{
          'items-per-page-options': [5, 10, 25, 50],
          showFirstLastPage: true,
        }"
        class="elevation-1"
      >
        <!-- Custom Column Slots -->
        <template v-slot:item.roles="{ item }">
          <v-chip
            small
            :color="getRoleColor(item.roles)"
            text-color="white"
            label
          >
            {{ item.roles }}
          </v-chip>
        </template>

        <template v-slot:item.isActive="{ item }">
          <v-chip
            small
            :color="item.isActive ? 'success' : 'error'"
            text-color="white"
            label
          >
            {{ item.isActive ? "Active" : "Inactive" }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="item.roles !== 'admin'"
                icon
                small
                :color="item.isActive ? 'warning' : 'success'"
                class="mr-1"
                v-bind="attrs"
                v-on="on"
                @click="toggleStatus(item)"
                :loading="item._id === updatingId"
              >
                <v-icon small>{{
                  item.isActive ? "mdi-block-helper" : "mdi-check-circle"
                }}</v-icon>
              </v-btn>
            </template>
            <span>{{ item.isActive ? "Deactivate" : "Activate" }} User</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="item.roles !== 'admin'"
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
            <span>Delete User</span>
          </v-tooltip>
        </template>

        <!-- No Data/Loading States -->
        <template v-slot:no-data>
          <v-alert type="info" dense text> No users found </v-alert>
        </template>

        <template v-slot:progress>
          <v-overlay absolute color="white">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-overlay>
        </template>
      </v-data-table>
    </v-card>

    <!-- Create/Edit User Dialog -->
    <v-dialog v-model="createDialog" max-width="600px" persistent>
      <v-card>
        <v-card-title
          class="headline white--text d-flex align-center"
          style="background-color: #a52a2a"
        >
          {{ editMode ? "Edit User" : "Create New User" }}
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-6">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  :rules="formRules.email"
                  label="Email"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="form.username"
                  :rules="formRules.username"
                  label="Username"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12" v-if="!editMode">
                <v-text-field
                  v-model="form.password"
                  :rules="formRules.password"
                  label="Password"
                  type="password"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="form.roles"
                  :items="roleOptions"
                  :rules="formRules.roles"
                  label="Role"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>
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

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">
          Confirm Delete
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete user
          <strong>{{ userToDelete?.email }}</strong
          >? This action cannot be undone.
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

    <!-- Snackbar for notifications -->
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
  name: "UserListView",

  data: () => ({
    valid: false,
    options: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    createDialog: false,
    deleteDialog: false,
    userToDelete: null,
    showError: false,
    showSnackbar: false,
    snackbarText: "",
    snackbarColor: "success",
    form: {
      email: "",
      password: "",
      roles: "",
      username: "",
    },
    repeatPassword: "",
    editMode: false,
    roleOptions: ["admin", "teacher"],
    formRules: {
      email: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      password: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 4) || "Password must be at least 4 characters",
      ],
      roles: [(v) => !!v || "Role is required"],
      username: [
        (v) => !!v || "Username is required",
        (v) => (v && v.length >= 3) || "Username must be at least 3 characters",
        (v) =>
          /^[a-zA-Z0-9_]+$/.test(v) ||
          "Username can only contain letters, numbers and underscore",
      ],
    },
    headers: [
      {
        text: "Email",
        align: "start",
        value: "email",
      },
      {
        text: "Username",
        align: "start",
        value: "username",
      },
      {
        text: "Roles",
        value: "roles",
        sortable: false,
      },
      {
        text: "Status",
        value: "isActive",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "end",
      },
    ],
    viewDialog: false,
    selectedUser: null,
    updatingId: null,
  }),

  computed: {
    ...mapState("users", ["users", "loading", "error"]),

    users() {
      return this.$store.state.users.users || [];
    },
    repeatPasswordRules() {
      return [
        (v) => !!v || "Please confirm password",
        (v) => (!!v && v === this.form.password) || "Passwords must match",
      ];
    },
  },

  methods: {
    ...mapActions("users", [
      "fetchUsers",
      "createUser",
      "deleteUser",
      "toggleUserStatus",
    ]),

    getRoleColor(role) {
      switch (role) {
        case "admin":
          return "#b22222";
        case "teacher":
          return "#d2691e";
        default:
          return "#d2b48c";
      }
    },

    openCreateDialog() {
      this.createDialog = true;
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.reset();
        }
      });
    },

    closeCreateDialog() {
      this.createDialog = false;
      this.form = {
        email: "",
        password: "",
        username: "",
        roles: "",
      };
      this.repeatPassword = "";
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    },

    async handleCreate() {
      if (this.$refs.form.validate()) {
        try {
          await this.createUser({
            ...this.form,
          });
          this.closeCreateDialog();
          await this.fetchUsers();
          this.showMessage("User created successfully");
        } catch (error) {
          this.showMessage(this.error, "error");
        }
      }
    },

    editUser(item) {
      this.$router.push(`/users/${item._id}/edit`);
    },

    confirmDelete(item) {
      this.userToDelete = item;
      this.deleteDialog = true;
    },

    async handleDelete() {
      if (!this.userToDelete) return;

      try {
        await this.deleteUser(this.userToDelete._id);
        this.deleteDialog = false;
        this.userToDelete = null;
        await this.fetchUsers();
        this.showMessage("User created successfully");
      } catch (error) {
        this.showError = true;
        this.showMessage(this.error, "error");
      }
    },

    viewUser(user) {
      this.selectedUser = user;
      this.viewDialog = true;
    },
    async toggleStatus(user) {
      try {
        this.updatingId = user._id;
        await this.toggleUserStatus(user._id);
        await this.fetchUsers();
        this.showMessage(
          `User ${user.isActive ? "deactivated" : "activated"} successfully`
        );
      } catch (error) {
        this.showMessage(this.error, "error");
        this.showError = true;
      } finally {
        this.updatingId = null;
      }
    },
    showMessage(text, color = "success") {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.showSnackbar = true;
    },
  },

  async created() {
    try {
      await this.fetchUsers();
    } catch (error) {
      this.showError = true;
    }
  },

  watch: {
    options: {
      handler() {
        this.fetchUsers();
      },
      deep: true,
    },
    "form.email": {
      handler(newEmail) {
        if (newEmail) {
          const randomStr = Math.random().toString(36).substring(2, 8);
          this.form.username = `user_${randomStr}`;
        } else {
          this.form.username = "";
        }
      },
    },
  },
};
</script>
