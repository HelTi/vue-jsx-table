import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import vueJsxTable from "../../components";
Vue.use(ElementUI, {
  size: "mini",
});

Vue.use(vueJsxTable);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
