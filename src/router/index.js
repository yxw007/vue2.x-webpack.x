import "core-js/stable";
import "regenerator-runtime/runtime";
import "@/style/index.scss";

import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

Vue.use(Router);

export default new Router({
	routes,
	mode: "history",
	base: `/dist`,
	scrollBehavior: () => ({ y: 0 }),
});
