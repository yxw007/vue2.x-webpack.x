import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import { cube } from "@/utils/math";

console.log("cube:", cube(5));

export default new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
