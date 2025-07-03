<!-- 我喜欢的音乐 -->
<template>
  <div>
    <div class="listMain">
      <span style="color: grey; float: right; margin: 5px 30px"
        >共{{ likeMusicList.length }}首歌</span
      >
      <div class="songList">
        <ul>
          <li
            v-for="(item, index) in likeMusicList"
            :key="item.musicId"
            @click="jumpPlay(item, index)"
          >
            <span style="margin-right: 20px">{{ index + 1 }}</span>
            <span>{{ item.musicName }}</span>
            <i
              class="el-icon-delete deleteIcon"
              @click.stop="remove(item.musicId)"
            ></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("gainLikeMusicList");
  },
  computed: {
    ...mapGetters(["likeMusicList"]),
  },
  methods: {
    // 跳转到播放页面
    jumpPlay(item, index) {
      this.selectPlay({
        list: this.likeMusicList,
        index,
      });
    },
    // 返回
    goBack() {
      this.$router.back();
    },
    // 移除我喜欢的音乐
    remove(musicId) {
      this.$confirm("确定要移除这首歌吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("removeLikeMusic", musicId);
          setTimeout(() => {
            this.$store.dispatch("gainLikeMusicList");
          }, 500);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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
  width: 100%;
  height: 36px;
  padding-top: 15px;
  margin-left: 10px;
  background-color: #fff;
}
.listMain {
  padding: 10px;
  background-color: rgb(248, 248, 248);
  border-radius: 20px;
  .collect {
    float: right;
    width: 100px;
    height: 30px;
    border-radius: 20px;
    background-color: rgb(240, 204, 204);
    text-align: center;
    i {
      font-size: 15px;
      font-weight: 700;
      color: red;
      margin-right: 5px;
    }
  }
  .songList ul {
    padding-left: 0;
    padding-top: 10px;
    li {
      padding: 0 15px;
      list-style: none;
      font-size: 18px;
      height: 50px;
      line-height: 50px;
      border-radius: 20px;
      background-color: #fff;
      margin-top: 20px;
      .playIcon {
        float: right;
        margin-right: 20px;
        margin-top: 15px;
        font-size: 20px;
      }
    }
    li:last-child {
      margin-bottom: 30px;
    }
  }
}
.deleteIcon {
  font-size: 20px;
  float: right;
  margin-top: 15px;
  margin-right: 20px;
}
</style>