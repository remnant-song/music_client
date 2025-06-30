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
      this.$router.push({ path: "/search" });
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  font-size: 18px;
  margin: 21px 0 10px 15px;
  cursor: pointer;
}
</style>
