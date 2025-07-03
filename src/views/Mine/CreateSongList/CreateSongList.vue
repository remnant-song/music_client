<!-- 创建歌单  -->
<template>
  <div>
    <div class="back" @click="goBack">
      <el-page-header
        icon="el-icon-arrow-left"
        title="返回"
        :content="listMessage.name"
      />
    </div>
    <div class="songListTitle">
      <div>
        <el-image class="songListImg" :src="listMessage.image"></el-image>
      </div>
      <div class="briefInfo">
        <span style="display: block; margin-bottom: 10px; margin-top: 20px"
          ><b>创作者：</b>{{ listMessage.username }}</span
        >
        <span class="describe"
          ><strong>描述：</strong><span>{{ listMessage.message }}</span></span
        >
      </div>
    </div>
    <div class="listMain">
      <el-button class="addBtn" @click="addBtn" size="mini">添加歌曲</el-button>
      <div class="songList">
        <ul>
          <li v-for="(item, index) in musicList" :key="item.musicId">
            <span @click="jump">{{ item.musicName }}</span>
            <i
              class="el-icon-delete deleteIcon"
              @click.stop="deleteMusic(item.musicId)"
            ></i>
          </li>
        </ul>
      </div>
    </div>
    <!-- 添加歌曲弹窗 -->
    <AddMusic ref="addMusicRef" />
  </div>
</template>

<script>
import AddMusic from "./AddMusic.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  components: { AddMusic },
  watch: {
    "$route.params.listId": {
      immediate: true,
      handler(newValue, oldValue) {
        if (!isNaN(newValue)) {
          this.$store.dispatch(
            "gainSongListDetail",
            newValue ? newValue : oldValue
          );
        }
      },
    },
  },
  computed: {
    ...mapGetters(["listMessage", "musicList"]),
  },
  methods: {
    addBtn() {
      this.$refs.addMusicRef.open(this.$route.params.listId);
    },
    // 返回
    goBack() {
      this.$router.back();
    },
    deleteMusic(songId) {
      this.$confirm("确定要移除这个歌曲吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("deleteSong", {
            songId,
            listId: this.$route.params.listId,
          });
          this.$store.dispatch("gainSongListDetail", this.$route.params.listId);
          // this.reload()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
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
  margin-left: 10px;
}
.songListTitle {
  height: 160px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  background-color: rgb(248, 248, 248);
  margin-bottom: 20px;
  .songListImg {
    width: 110px;
    height: 110px;
    border-radius: 20px;
  }
  .briefInfo {
    margin-left: 15px;
    .describe {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      line-height: 1.5;
    }
  }
}
.listMain {
  padding-bottom: 30px;
  padding: 10px 20px 25px;
  background-color: rgb(248, 248, 248);
  .addBtn {
    float: right;
    margin-top: 5px;
    margin-right: 20px;
  }
  .songList {
    margin-top: 10px;
    ul {
      padding-left: 0;
      padding-top: 10px;
    }
    li {
      padding: 0 15px;
      list-style: none;
      font-size: 18px;
      height: 50px;
      line-height: 50px;
      border-radius: 20px;
      background-color: #fff;
      margin-top: 20px;
      .deleteIcon {
        float: right;
        font-size: 20px;
        margin-top: 15px;
      }
    }
  }
}
</style>