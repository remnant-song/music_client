<template>
  <el-header height="50">
    <!-- 菜单导航组件 -->
    <NavMenu />
  </el-header>
  <el-main>
    <router-view v-slot="{ Component }" v-if="isRouterAlive">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </el-main>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue'  // 根据你的路径调整

export default {
  name: "App",
  components: {
    NavMenu,
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
