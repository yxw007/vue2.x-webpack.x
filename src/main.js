import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App";

export default new Vue({
  el: "#app",
  router: router,
  store,
  render: (h) => h(App),
});
