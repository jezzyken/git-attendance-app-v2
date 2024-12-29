<template>
  <v-container fill-height fluid class="login-container">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="login-card">
          <div class="text-center pt-8">
            <h1 class="text-h4 font-weight-bold welcome-msg mb-4">
              Welcome Back
            </h1>
            <p class="text-subtitle-1 grey--text">Please sign in to continue</p>
          </div>

          <v-card-text class="pt-6">
            <v-form @submit.prevent="handleSubmit" ref="form">
              <v-text-field
                v-model="form.email"
                label="Email"
                name="email"
                prepend-inner-icon="mdi-email"
                type="email"
                filled
                rounded
                dense
                class="custom-field mb-4"
                :error-messages="emailError"
                @input="emailError = ''"
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                label="Password"
                name="password"
                prepend-inner-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                filled
                rounded
                dense
                class="custom-field"
                :error-messages="passwordError"
                @input="passwordError = ''"
              ></v-text-field>

              <v-btn
                block
                color="#a52a2a"
                height="44"
                rounded
                :loading="loading"
                @click="handleSubmit"
                class="font-weight-bold"
                dark
              >
                Sign In
              </v-btn>

              <v-alert
                v-if="error"
                type="error"
                class="mt-4"
                dense
                text
                dismissible
              >
                {{ error }}
              </v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "LoginView",

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showPassword: false,
      emailError: "",
      passwordError: "",
      rules: {
        required: (v) => !!v || "This field is required",
        email: (v) =>
          /.+@.+\..+/.test(v) || "Please enter a valid email address",
      },
      socialLogins: [
        { provider: "google", icon: "mdi-google", color: "red" },
        { provider: "facebook", icon: "mdi-facebook", color: "blue" },
        { provider: "twitter", icon: "mdi-twitter", color: "light-blue" },
      ],
    };
  },

  computed: {
    ...mapState("auth", ["loading", "error"]),
  },

  methods: {
    ...mapActions("auth", ["login", "socialLogin"]),

    async handleSubmit() {
      if (this.$refs.form.validate()) {
        try {
          await this.login(this.form);
        } catch (error) {
          if (error.response?.data?.field === "email") {
            this.emailError = error.response.data.message;
          } else if (error.response?.data?.field === "password") {
            this.passwordError = error.response.data.message;
          } else {
            this.error =
              error.response?.data?.message ||
              "Login failed. Please try again.";
          }
        }
      }
    },

    async handleSocialLogin(provider) {
      try {
        await this.socialLogin(provider);
        this.$router.push("/dashboard");
      } catch (error) {
        this.error = `${provider} login failed. Please try again.`;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  background: linear-gradient(to right, #f5f7fa, #c3cfe2);
  min-height: 100vh;
}

.login-card {
  border-radius: 16px;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
}

.custom-field {
  border-radius: 12px;
}

.custom-field >>> .v-input__slot {
  min-height: 44px;
}

.custom-field >>> .v-text-field__details {
  padding-left: 12px;
}

.v-alert {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.v-btn:not(.v-btn--icon) {
  transition: transform 0.2s ease-in-out;
}

.v-btn:not(.v-btn--icon):hover {
  transform: translateY(-2px);
}

.welcome-msg {
  color: #a52a2a;
}
</style>
