import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home/index.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { title: "推荐" },
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;