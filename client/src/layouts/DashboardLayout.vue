<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :mini-variant.sync="mini"
      width="240"
      mini-variant-width="64"
      :temporary="$vuetify.breakpoint.mobile"
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#a52a2a">mdi-home-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content v-if="!mini">
            <v-list-item-title>GIT Attendance</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <template v-for="item in menuItems">
          <!-- Regular menu item -->
          <v-list-item
            v-if="!item.children"
            :key="item.title"
            :to="item.to"
            link
            class="drawer-item"
            :class="{ 'active-item': $route.path === item.to }"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content v-if="!mini">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- Group with sub-items -->
          <v-list-group
            v-else
            :key="item.title"
            :prepend-icon="item.icon"
            class="drawer-item"
            :value="isGroupActive(item)"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="child in item.children"
              :key="child.title"
              :to="child.to"
              link
              class="drawer-sub-item"
              :class="{ 'active-item': $route.path === child.to }"
            >
              <v-list-item-icon>
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content v-if="!mini">
                <v-list-item-title>{{ child.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="#a52a2a" dark>
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>GIT Attendance System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in accountMenu"
            :key="item.title"
            @click="handleAction(item.action)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DashboardLayout",

  data: () => ({
    drawer: true,
    mini: false,
    menuItems: [
      { title: "Dashboard", icon: "mdi-view-dashboard", to: "/dashboard" },
      {
        title: "Academics",
        icon: "mdi-school",
        children: [
          {
            title: "Class Schedules",
            icon: "mdi-calendar-clock",
            to: "/academics/schedules",
          },
          {
            title: "Subjects",
            icon: "mdi-book-open-variant",
            to: "/academics/subjects",
          },
          {
            title: "Courses",
            icon: "mdi-book-multiple",
            to: "/academics/courses",
          },
          // {
          //   title: "Departments",
          //   icon: "mdi-domain",
          //   to: "/academics/departments",
          // },
        ],
      },
      { title: "Teachers", icon: "mdi-account-tie", to: "/teachers" },
      { title: "Students", icon: "mdi-account-group", to: "/students" },
      { title: "Users", icon: "mdi-account-multiple", to: "/users" },
      { title: "Reports", icon: "mdi-file-chart", to: "/reports" },
    ],
    accountMenu: [
      {
        title: "Profile",
        icon: "mdi-account",
        action: "goToProfile",
      },
      {
        title: "Logout",
        icon: "mdi-logout",
        action: "logout",
      },
    ],
  }),

  methods: {
    ...mapActions("auth", ["logout"]),

    isGroupActive(item) {
      if (!item.children) return false;
      return item.children.some((child) => this.$route.path === child.to);
    },

    toggleDrawer() {
      if (this.$vuetify.breakpoint.mobile) {
        this.drawer = !this.drawer;
      } else {
        this.mini = !this.mini;
        this.drawer = true;
      }
    },

    goToProfile() {
      this.$router.push({ name: "Profile" });
    },

    handleAction(action) {
      if (this[action]) {
        this[action]();
      }
    },
  },

  watch: {
    $route() {
      if (this.$vuetify.breakpoint.mobile) {
        this.drawer = false;
      }
    },
  },
};
</script>

<style>
.active-item {
  background-color: rgba(165, 42, 42, 0.12) !important;
  color: #a52a2a !important;
}

.active-item .v-icon {
  color: #a52a2a !important;
}

.v-list-group--active > .v-list-group__header {
  background-color: rgba(165, 42, 42, 0.08) !important;
}

.v-list-group--active
  > .v-list-group__header
  .v-list-group__header__prepend-icon {
  color: #a52a2a !important;
}

.v-list-group--active > .v-list-group__header .v-list-item__title {
  color: #a52a2a !important;
}

.drawer-sub-item.active-item {
  background-color: rgba(165, 42, 42, 0.12) !important;
  color: #a52a2a !important;
  margin-left: 8px !important;
  border-radius: 0 4px 4px 0 !important;
}

.drawer-item:hover,
.drawer-sub-item:hover {
  background-color: rgba(165, 42, 42, 0.04) !important;
}

.v-list-group--active
  > .v-list-group__header
  .v-list-group__header__append-icon {
  color: #a52a2a !important;
}

.v-list-item,
.v-icon,
.v-list-item__title {
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out !important;
}
</style>
