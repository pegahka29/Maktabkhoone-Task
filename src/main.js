import Vue from "vue";
import App from "./App.vue";
import {validation} from "./helpers/validation";

Vue.config.productionTip = false;
Vue.prototype.$va = validation
new Vue({
  render: (h) => h(App)
}).$mount("#app");
