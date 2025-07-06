<template>
  <el-affix :offset="0">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/">推荐</el-menu-item>
      <el-menu-item index="/singer">歌手</el-menu-item>
      <el-menu-item index="/rank">排行</el-menu-item>
      <el-menu-item index="/songlist">歌单</el-menu-item>
      <el-menu-item index="/mine">我的</el-menu-item>
      <el-icon class="search" @click="toSearch">
        <Search />
      </el-icon>
    </el-menu>
  </el-affix>
</template>

<script>
import { Search } from '@element-plus/icons-vue'

export default {
  name: "NavMenu",
  components: { Search },
  methods: {
    toSearch() {
      // 记录当前页面路径，用于返回时判断
      this.$router.push({ 
        path: "/search",
        query: { from: this.$route.path }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-affix {
  width: 100vw !important;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}
.el-header {
  width: 100vw !important;
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}
.el-menu-demo {
  background: linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%);
  border-radius: 0 0 8px 8px;
  box-shadow: none;
  border: none;
  padding: 0;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
}
.el-menu-demo .el-menu-item {
  font-weight: 500;
  font-size: 0.39rem;
  color: #6366f1;
  background: none;
  border: none;
  transition: color 0.18s, background 0.18s;
  border-radius: 6px;
  margin: 0 2px;
  padding: 0 12px;
  letter-spacing: 0.5px;
  text-shadow: none;
  box-shadow: none;
  border: none;
  position: relative;
  flex: 0 1 auto;
  text-align: center;
  min-width: 0;
}
.el-menu-demo .el-menu-item.is-active,
.el-menu-demo .el-menu-item:hover {
  color: #fff;
  background: #6366f1;
  box-shadow: none;
  border: none;
  transform: none;
  text-shadow: none;
  z-index: 1;
}
.search {
  font-size: 0.39rem;
  margin: 0;
  color: #6366f1;
  background: none;
  border-radius: 50%;
  padding: 4px;
  transition: background 0.18s, color 0.18s;
  vertical-align: middle;
  box-shadow: none;
  border: none;
  align-self: center;
  flex: 0 1 auto;
  text-align: center;
}
.search:hover {
  background: #e0e7ff;
  color: #6366f1;
  box-shadow: none;
  transform: none;
}
.el-menu-demo .el-icon.search {
  margin-left: 0;
}
@media (max-width: 600px) {
  .el-menu-demo {
    border-radius: 0 0 6px 6px;
    min-height: 36px;
    padding: 0;
    max-width: 100vw;
  }
  .el-menu-demo .el-menu-item {
    font-size: 0.33rem;
    padding: 0 6px;
    border-radius: 4px;
  }
  .search {
    font-size: 0.33rem;
    padding: 2px;
    margin-left: 0;
  }
}
.el-menu.el-menu-demo .el-menu-item.is-active {
  background: #e0e7ff !important;
  color: #6366f1 !important;
}
</style>
