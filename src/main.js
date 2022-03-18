import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "element-ui";

export default new Vue({
	el: "#app",
	router,
	store,
	render: (h) => h(App),
});
