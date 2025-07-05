<!-- 搜索 -->
<template>
  <div>
    <div class="back" @click="goBack">
      <el-page-header :icon="ArrowLeft" title="返回" content="搜索" />
    </div>
    <div class="search">
      <el-input
        placeholder="请输入歌曲名称进行搜索"
        v-model="keyword"
        class="input-with-select"
        style="width: 300px; margin-right: 5px"
        clearable
      >
      </el-input>
      <el-button

       @click="search">
        <el-icon><Search /></el-icon>
      </el-button>
    </div>
    <!-- 查询结果 -->
    <div class="result">
      <ul v-if="searchResult.length && clickFlag">
        <li
          v-for="(item, index) in searchResult"
          :key="item.musicId"
          @click="playMusic(item, index)"
        >
          {{ index + 1 }} . {{ item.musicName }}
        </li>
      </ul>
      <div class="nullResult" v-else>
        <p v-if="clickFlag">查询结果为空</p>
        <p v-else></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ArrowLeft, Search } from '@element-plus/icons-vue';

export default {
  name: "search",
  components: { ArrowLeft, Search },
  data() {
    return {
      keyword: "",
      clickFlag: false,
    };
  },
  computed: {
    ...mapGetters(["searchResult"]),
  },
  methods: {
    goBack() {
      this.$router.back();
      this.keyword = "";
      this.clickFlag = false;
    },
    search() {
      this.clickFlag = true;
      this.$store.dispatch("searchMusic", this.keyword);
    },
    playMusic(item, index) {
      this.selectPlay({
        list: this.searchResult,
        index,
      });
    },
    ...mapActions(["selectPlay"]),
  },
};
</script>
<style lang="less" scoped>
.back {
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 200;
  background-color: #fff;
  width: 100%;
  height: 36px;
  padding-top: 15px;
}
.search {
  text-align: center;
}
.result {
  width: 80%;
  margin: 0 auto;
  border-radius: 20px;
  background-color: rgb(247, 247, 247);
  ul {
    padding: 10px 15px;
  }
  li {
    height: 40px;
    line-height: 40px;
    list-style: none;
    margin: 20px 0;
    border-radius: 20px;
    padding-left: 30px;
    background-color: #fff;
  }
}
.nullResult {
  width: 80%;
  height: 40px;
  text-align: center;
  margin: 0 auto;
  line-height: 40px;
  margin-top: 20px;
  font-size: 18px;
  color: #999;
}
</style>