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
  margin-bottom: 18px;
  .el-input {
    border-radius: 20px;
    font-size: 16px;
    width: 100%;
  }
  .el-button {
    background: linear-gradient(90deg, #4FC3F7 0%, #6366f1 100%);
    color: #fff;
    border: none;
    border-radius: 20px;
    font-weight: bold;
    margin-left: 8px;
    transition: background 0.2s;
  }
  .el-button:hover {
    background: linear-gradient(90deg, #6366f1 0%, #4FC3F7 100%);
  }
  display: flex;
  justify-content: center;
  align-items: center;
}
.result {
  width: 90%;
  margin: 0 auto;
  border-radius: 20px;
  background-color: #f5f7fa;
  min-height: 120px;
  max-width: 100%;
  overflow-x: auto;
  ul {
    padding: 10px 15px;
    overflow-wrap: break-word;
    background: #f5f7fa;
  }
  li {
    height: 44px;
    line-height: 44px;
    list-style: none;
    margin: 18px 0;
    border-radius: 16px;
    padding-left: 24px;
    background-color: #fafdff;
    font-size: 17px;
    color: #333;
    box-shadow: 0 2px 8px rgba(99,102,241,0.04);
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
    min-width: 0;
    word-break: break-all;
    white-space: normal;
  }
  li:hover {
    background: #eaf6ff;
    box-shadow: 0 4px 16px rgba(99,102,241,0.10);
  }
}
.nullResult {
  width: 100%;
  height: 40px;
  text-align: center;
  margin: 0 auto;
  line-height: 40px;
  margin-top: 20px;
  font-size: 18px;
  color: #999;
}
.el-dialog__wrapper .el-dialog {
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(99,102,241,0.12);
}
@media (max-width: 600px) {
  .result {
    width: 98vw;
    min-height: 80px;
    li {
      font-size: 15px;
      padding-left: 10px;
    }
  }
}
</style>