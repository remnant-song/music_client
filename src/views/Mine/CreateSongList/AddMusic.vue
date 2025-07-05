<!-- 添加音乐弹窗 -->
<template>
  <div>
    <el-dialog
      title="添加歌曲"
      v-model="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <div class="search">
        <el-input
          placeholder="请输入歌曲名称进行搜索"
          v-model="keyword"
          class="input-with-select"
          style="width: 300px; margin-right: 5px"
          clearable
        >
        </el-input>
        <el-button @click="search">
          <el-icon><Search /></el-icon>
        </el-button>
      </div>
      <!-- 查询结果 -->
      <div class="result">
        <ul v-if="searchResult.length && clickFlag">
          <li
            v-for="(item, index) in searchResult"
            :key="item.musicId"
            @click.stop="addMusic(item.musicId)"
          >
            {{ index + 1 }} . {{ item.musicName }}
          </li>
        </ul>
        <div class="nullResult" v-else>
          <p v-if="clickFlag">查询结果为空</p>
          <p v-else></p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Search } from '@element-plus/icons-vue';

export default {
  components: { Search },
  data() {
    return {
      keyword: "",
      clickFlag: false,
      dialogVisible: false,
      listId: "",
    };
  },
  computed: {
    ...mapGetters(["searchResult"]),
  },
  methods: {
    open(listId) {
      this.listId = listId;
      this.dialogVisible = true;
      this.search();
    },
    handleClose() {
      this.dialogVisible = false;
      this.keyword = "";
      // this.$store.dispatch("searchMusic", this.keyword);
    },
    search() {
      this.clickFlag = true;
      this.$store.dispatch("searchMusic", this.keyword);
    },
    addMusic(musicId) {
      this.$store.dispatch("addMusic", {
        songId: musicId,
        listId: this.listId,
      });
      setTimeout(() => {
        this.$store.dispatch("gainSongListDetail", this.listId);
      }, 500);
    },
  },
};
</script>

<style lang="less" scoped>
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