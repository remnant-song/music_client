<template>
  <el-header height="50">
    <!-- 菜单导航组件 -->
    <NavMenu />
  </el-header>
  <el-main class="main-no-gap">
    <router-view v-slot="{ Component }" v-if="isRouterAlive">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </el-main>
    <!--播放器全局组件-->
  <Player />
</template>

<script>
import NavMenu from './components/NavMenu.vue'  // 根据你的路径调整
import Player from "./components/Player.vue";
export default {
  name: "App",
  components: {
    NavMenu,
    Player
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
.main-no-gap {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
