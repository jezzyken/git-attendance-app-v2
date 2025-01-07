import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";
import VueApexCharts from "vue-apexcharts";
import VueMask from "v-mask";

Vue.config.productionTip = false;

Vue.use(VueApexCharts);
Vue.use(VueMask);
Vue.component("apexchart", VueApexCharts);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
