import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home/index.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { title: "推荐" },
  },
    {
    path: "/singer",
    name: "singer",
    component: () => import("../views/Singer/index.vue"),
    meta: { title: "歌手" },
  },
    {
    path: "/singer/songs/:singerId",
    name: "singerSongs",
    component: () => import("../views/Singer/singerSongs.vue"),
    meta: { title: "歌手歌曲列表" },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;