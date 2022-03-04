import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "element-ui";

function abc() {
  return "this is abc";
}

function testFun() {
  var name = "potter";
  let age = 1;
  // console.log(name, age, abc());
}
testFun();

export default new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
