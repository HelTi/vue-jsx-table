/**
 * 扩展 VuePress 应用
 */
//  import VueHighlightJS from 'vue-highlight.js';
//  import 'highlight.js/styles/atom-one-dark.css';
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueJsxTable from '../../src/components/index'
console.log('VueJsxTable',VueJsxTable)

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
}) => {
  // ...做一些其他的应用级别的优化
  //  Vue.use(VueHighlightJS)
  Vue.use(Element);
  Vue.use(VueJsxTable)
};
