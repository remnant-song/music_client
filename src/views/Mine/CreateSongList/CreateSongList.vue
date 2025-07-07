<!-- 创建歌单  -->
<template>
  <div class="create-songlist-main-container">
    <PageHeader 
      :title="listMessage.name" 
      subtitle="歌单详情"
      @back="goBack"
    />
    <div class="create-songlist-content">
      <div class="songListTitle">
        <div>
          <el-image class="songListImg" :src="listMessage.image"></el-image>
        </div>
        <div class="briefInfoWithBtn">
          <div class="briefInfo">
            <span style="display: block; margin-bottom: 10px; margin-top: 20px">
              <b>创作者：</b>{{ listMessage.username }}
            </span>
            <span class="describe">
              <strong>描述：</strong><span>{{ listMessage.message }}</span>
            </span>
          </div>
          <el-button class="addBtn" @click="addBtn" size="mini">添加歌曲</el-button>
        </div>
      </div>
      <div class="listMain">
        <div class="songList">
          <ul>
            <li v-for="(item, index) in musicList" :key="item.musicId">
              <span @click="jump">{{ item.musicName }}</span>
              <el-icon
                class="deleteIcon"
                @click.stop="deleteMusic(item.musicId)"
              >
                <Delete />
              </el-icon>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 添加歌曲弹窗 -->
    <AddMusic ref="addMusicRef" />
  </div>
</template>

<script>
import AddMusic from "./AddMusic.vue";
import { mapGetters } from "vuex";
import { Delete } from '@element-plus/icons-vue';
import PageHeader from '@/components/PageHeader.vue';

export default {
  data() {
    return {};
  },
  components: { AddMusic, Delete, PageHeader },
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
    // 返回到创建歌单页面
    goBack() {
      this.$router.push('/mine/createSongList');
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
.create-songlist-main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding-bottom: 40px;
  display: flex;
  align-items: flex-start;   /* 顶部对齐 */
  justify-content: center;
}
.create-songlist-content {
  max-width: 480px;
  width: 100%;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 24px 0 rgba(99,102,241,0.10);
  padding: 24px 18px 32px 18px;
  overflow: visible;
  margin-top: 32px;   /* 距离导航栏更近 */
}
.songListTitle {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  background: #f3f6fd;
  border-radius: 18px;
  padding: 18px 12px;
  margin-bottom: 18px;
  .songListImg {
    width: 110px;
    height: 110px;
    border-radius: 20px;
    box-shadow: 0 2px 16px rgba(99,102,241,0.12);
    background: #f3f4f6;
    flex-shrink: 0;
  }
  .briefInfoWithBtn {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    margin-left: 18px;
    min-width: 0;
    .briefInfo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 0;
      flex: 1;
      .describe {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        line-height: 1.5;
        color: #6366f1;
        font-size: 15px;
        word-break: break-all;
      }
      span {
        color: #6366f1;
        font-size: 16px;
        font-weight: bold;
        word-break: break-all;
      }
    }
    .addBtn {
      margin-left: 24px;
      background: linear-gradient(90deg, #4FC3F7 0%, #6366f1 100%);
      color: #fff;
      border: none;
      border-radius: 20px;
      font-weight: bold;
      transition: background 0.2s;
    }
    .addBtn:hover {
      background: linear-gradient(90deg, #6366f1 0%, #4FC3F7 100%);
    }
  }
}
.listMain {
  background: #f8fafc;
  border-radius: 16px;
  padding: 18px 12px 10px 12px;
  margin-top: 10px;
  .songList {
    margin-top: 10px;
    background: #f5f7fa;
    border-radius: 16px;
    padding-bottom: 8px;
    ul {
      padding-left: 0;
      padding-top: 0;
    }
    li {
      padding: 0 15px;
      list-style: none;
      font-size: 18px;
      height: 50px;
      line-height: 50px;
      border-radius: 20px;
      background-color: #fafdff;
      margin-top: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 8px rgba(99,102,241,0.04);
      transition: box-shadow 0.2s, background 0.2s;
      cursor: pointer;
    }
    li:first-child {
      margin-top: 0;
    }
    li:hover {
      background: #eaf6ff;
      box-shadow: 0 4px 16px rgba(99,102,241,0.10);
    }
    .deleteIcon {
      color: #ff6b81;
      font-size: 22px;
      margin-left: 10px;
      cursor: pointer;
      transition: color 0.2s;
    }
    .deleteIcon:hover {
      color: #d32f2f;
    }
  }
}
@media (max-width: 600px) {
  .create-songlist-content {
    max-width: 98vw;
    padding: 10px 2vw 20px 2vw;
    top: 60px;
  }

}
</style>