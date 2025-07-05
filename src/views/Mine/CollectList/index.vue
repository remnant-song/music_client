<!-- 收藏歌单 -->
<template>
  <div class="listMain">
    <div class="header">
      <span style="color: grey">共{{ number }}个歌单</span>
    </div>
    <!-- 歌单列表 -->
    <el-row
      class="songListTitle"
      v-for="(item, index) in collectSongList"
      :key="index"
      @click="jump(item)"
    >
      <el-col :span="8">
        <el-image class="songListImg" :src="item.image"></el-image>
      </el-col>
      <el-col :span="14" class="briefInfo">
        <span
          style="
            display: block;
            margin-bottom: 10px;
            margin-top: 20px;
            font-size: 18px;
          "
          >{{ item.name }}</span
        >
        <span style="display: block; margin-bottom: 10px; margin-top: 20px">
          创作者：{{ item.username }}
        </span>
      </el-col>
      <el-col class="deleteIcon" :span="2">
        <el-icon @click.stop="remove(item.id)">
          <Delete />
        </el-icon>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { ElMessage } from "element-plus";
import { Delete } from '@element-plus/icons-vue';

export default {
  components: { Delete },
  data() {
    return {
    };
  },
  mounted() {
    this.$store.dispatch("gainCollectSongList");
  },
  computed: {
    // ...mapState(["songListFlag"]),
    ...mapGetters(["collectSongList"]),
    // 歌单个数
    number() {
      return this.collectSongList.length;
    },
  },
  methods: {
    // 跳转到歌单详情
    jump(item) {
      this.$router.push({
        path: `/songlist/${item.id}`,
      });
    },
    // 移除收藏的歌单
    remove(listId) {
      this.$confirm("确定要移除这个歌单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("removeCollectMusicList", listId);
          setTimeout(() => {
            this.$store.dispatch("gainCollectSongList");
          }, 500);
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
.songListTitle {
  height: 160px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  margin-bottom: 20px;
  border-radius: 20px;
  .songListImg {
    width: 100px;
    height: 100px;
    border-radius: 20px;
  }
  .describe {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    line-height: 1.5;
  }
  .deleteIcon {
    font-size: 30px;
  }
}
</style>