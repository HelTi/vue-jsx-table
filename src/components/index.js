import vueJsxTable from "./vue-jsx-table";
const install = function (Vue) {
  let components = [vueJsxTable];
  components.forEach(function (item) {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { vueJsxTable };

export default {
  install: install,
};
