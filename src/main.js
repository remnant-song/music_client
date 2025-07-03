import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import axios from "axios";
import VUEAxios from "vue-axios";
import "./assets/reset.css";

import router from "./router";
import "swiper/css";

import store from "./store";

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as ElIcons from '@element-plus/icons'
const app = createApp(App);
for (const [key, component] of Object.entries(ElIcons)) {
  app.component(key, component)
}
// // 全局注册所有图标
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
// 添加全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue error:', err)
}

// 捕获未处理的Promise拒绝
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason)
  event.preventDefault()
})
app.use(router);
app.use(ElementPlus);
app.use(VUEAxios, axios);
app.use(store);
app.mount("#app");