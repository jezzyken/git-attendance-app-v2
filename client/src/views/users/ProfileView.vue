<template>
  <v-container class="py-6">
    <v-card class="mx-auto" max-width="700" elevation="1">
      <v-card-title class="text-h5 pa-4">Profile Settings</v-card-title>

      <v-card-text class="pa-4">
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12">
              <div class="text-subtitle-1 mb-4">Account Information</div>

              <v-text-field
                v-if="formData.roles !== 'student'"
                v-model="formData.email"
                label="Email Address"
                :rules="emailRules"
                type="email"
                required
                outlined
                dense
                class="mb-2"
              ></v-text-field>

              <v-text-field
                v-model="formData.username"
                label="Username"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-4">
              <div class="text-subtitle-1 mb-4">Change Password</div>

              <v-text-field
                v-model="passwordData.currentPassword"
                label="Current Password"
                :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showCurrentPassword ? 'text' : 'password'"
                :rules="[
                  (v) => {
                    if (this.passwordData.newPassword)
                      return !!v || 'Current password is required';
                    return true;
                  },
                ]"
                @click:append="showCurrentPassword = !showCurrentPassword"
                outlined
                dense
                class="mb-2"
              ></v-text-field>

              <v-text-field
                v-model="passwordData.newPassword"
                label="New Password"
                :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showNewPassword ? 'text' : 'password'"
                :rules="[
                  (v) => {
                    if (this.passwordData.currentPassword)
                      return !!v || 'New password is required';
                    return true;
                  },
                  ...passwordRules,
                ]"
                @click:append="showNewPassword = !showNewPassword"
                outlined
                dense
                class="mb-2"
              ></v-text-field>

              <v-text-field
                v-model="passwordData.confirmPassword"
                label="Confirm New Password"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmPassword ? 'text' : 'password'"
                :rules="[
                  (v) => {
                    if (this.passwordData.newPassword)
                      return !!v || 'Please confirm your password';
                    return true;
                  },
                  (v) => {
                    if (this.passwordData.newPassword)
                      return (
                        v === this.passwordData.newPassword ||
                        'Passwords do not match'
                      );
                    return true;
                  },
                ]"
                @click:append="showConfirmPassword = !showConfirmPassword"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :disabled="!valid"
          @click="updateProfile"
          :loading="loading"
          min-width="120"
        >
          Save Changes
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "UserProfile",

  data: () => ({
    valid: false,
    loading: false,
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
    formData: {
      email: "",
      username: "",
      roles: "",
    },
    passwordData: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    snackbar: {
      show: false,
      text: "",
      color: "success",
    },
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !v || v.length >= 8 || "Password must be at least 8 characters",
    ],
  }),

  mounted() {
    this.fetchUserData();
  },

  methods: {
    ...mapActions("users", ["getUser", "updateUser"]),

    async fetchUserData() {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const response = await this.getUser(user._id);
        const { email, username, roles } = response;
        this.formData = { email, username, roles };
      } catch (error) {
        this.showSnackbar("Error fetching user data", "error");
        console.error("Error fetching user data:", error);
      }
    },

    async updateProfile() {
      if (!this.$refs.form.validate()) return;

      const user = JSON.parse(localStorage.getItem("user"));

      this.loading = true;
      try {
        const updateData = {
          email: this.formData.email,
          username: this.formData.username,
        };

        if (
          this.passwordData.currentPassword &&
          this.passwordData.newPassword
        ) {
          if (
            this.passwordData.newPassword !== this.passwordData.confirmPassword
          ) {
            this.showSnackbar("Passwords do not match", "error");
            return;
          }
          updateData.currentPassword = this.passwordData.currentPassword;
          updateData.newPassword = this.passwordData.newPassword;
        } else if (
          this.passwordData.currentPassword ||
          this.passwordData.newPassword
        ) {
          this.showSnackbar(
            "Both current and new password are required to change password",
            "error"
          );
          return;
        }

        const response = await this.updateUser({
          id: user._id,
          userData: updateData,
        });

        this.showSnackbar("Profile updated successfully", "success");
        this.$emit("profile-updated", response.data);

        this.passwordData.currentPassword = "";
        this.passwordData.newPassword = "";
        this.passwordData.confirmPassword = "";
      } catch (error) {
        this.showSnackbar(
          error.response?.data?.message || "Error updating profile",
          "error"
        );
        console.error("Error updating profile:", error);
      } finally {
        this.loading = false;
      }
    },

    showSnackbar(text, color = "success") {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 4px;
}

.v-text-field {
  font-size: 0.875rem;
}
</style>
