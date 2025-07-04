import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home/index.vue";
import Login from '../views/Mine/Login.vue';
import Mine from '../views/Mine/index.vue';

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

    {
    path: "/rank",
    name: "rank",
    component: () => import("../views/Rank/index.vue"),
    meta: { title: "排行" },
  },
    {
    path: "/rank/:value",
    name: "rankDetail",
    component: () => import("../views/Rank/rankDetail.vue"),
    meta: { title: "排行详情" },
  },
    {
    path: "/songlist",
    name: "songlist",
    component: () => import("../views/Songlist/index.vue"),
    meta: { title: "歌单" },
  },
    {
    path: "/songlist/:id",
    name: "songlistDetail",
    component: () => import("../views/Songlist/songlistDetail.vue"),
    meta: { title: "歌单详情" },
  },
    {
    path: "/mine",
    name: "mine",
    component: () => import("../views/Mine/index.vue"),
    meta: { title: "我的" },
  },


    {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "登录" },
  },
    {
    path: "/register",
    name: "register",
    component: () => import("../views/Mine/Register.vue"),
    meta: { title: "注册" },
  },

    {
    path: "/mine/list/:value/:title",
    name: "Like",
    component: () => import("../views/Mine/MineList.vue"),
     meta: { title: "我喜欢的音乐"},
  },

    {
    path: "/createSongList/:listId",
    // path: "/mine/list/:value/:title",
    name: "createSongList",
    component: () => import("../views/Mine/CreateSongList/CreateSongList.vue"),
    meta: { title: "创建歌单" },
  },

    {
    path: "/mine/set/:value",
    // path: "/mine/list/:value/:title",
    name: "Set",
    component: () => import("../views/Mine/Set/SetList.vue"),
    meta: { title: "设置" },
  },

    {
    path: "/search",
    name: "search",
    component: () => import("../views/Search/index.vue"),
    meta: { title: "搜索" },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;