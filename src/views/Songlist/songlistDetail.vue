<!-- 歌单详情 -->
<template>
  <div>
    <div class="back" @click="goBack">
      <el-page-header :icon="ArrowLeft" title="返回" :content="title" />
    </div>
    <div class="songListTitle">
      <div>
        <el-image class="songListImg" :src="listMessage.image"></el-image>
      </div>
      <div class="briefInfo">
        <span style="display: block; margin-bottom: 10px; margin-top: 20px"
          ><b>创作者：</b>{{ listMessage.username }}</span
        >
        <span class="describe"><b>描述：</b>{{ listMessage.message }}</span>
      </div>
    </div>
    <div class="listMain">
      <div class="header">
        <span style="color: grey">共{{ musicList.length }}首歌</span>
        <span
          class="collect"
          @click="collectSongList"
          v-if="!listMessage.isLike"
        >
          <el-icon><Plus /></el-icon>
          <i>收藏歌单</i>
        </span>
        <span class="collected" v-else>
          <el-icon><Check /></el-icon>
          <i>已收藏</i>
        </span>
      </div>
      <div class="songList">
        <ul>
          <li
            v-for="(item, index) in musicList"
            :key="item.musicId"
            @click="jumpPlay(item, index)"
          >
            <span style="margin-right: 20px">{{ index + 1 }}</span>
            <span>{{ item.musicName }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ArrowLeft, Plus, Check } from '@element-plus/icons-vue';

export default {
  name: "songlist-detail",
  components: { ArrowLeft, Plus, Check },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["listMessage", "musicList"]),
    title() {
      return this.listMessage.name;
    },
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler(newValue, oldValue) {
        if (!isNaN(newValue))
          this.$store.dispatch(
            "gainSongListDetail",
            newValue ? newValue : oldValue
          );
      },
    },
  },
  methods: {
    // 收藏歌单
    collectSongList() {
      if (localStorage.getItem("token")) {
        this.listMessage.isLike = true;
        if (this.listMessage.isLike) {
          this.$store.dispatch("collectMusicList", this.$route.params.id);
        }
      } else {
        this.$message.warning("请先登录");
      }
    },
    // 跳转到播放页面
    jumpPlay(item, index) {
      this.selectPlay({
        list: this.musicList,
        index,
      });
    },
    // 返回
    goBack() {
      this.$router.back();
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
    margin-left: 30px;
  }
  .describe {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    line-height: 1.5;
  }
}
.listMain {
  padding: 10px;
  border-radius: 20px 20px 0 0;
  padding-bottom: 30px;
  background-color: rgb(248, 248, 248);
  .header {
    padding: 20px;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    border-radius: 20px;
  }
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
  .collected {
    float: right;
    width: 100px;
    height: 30px;
    border-radius: 20px;
    background-color: rgb(216, 214, 214);
    text-align: center;
    i {
      font-size: 15px;
      font-weight: 700;
      color: rgb(124, 122, 122);
      margin-right: 5px;
    }
  }
  .songList ul {
    padding-left: 0;
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
    .playIcon {
      float: right;
      margin-right: 20px;
      margin-top: 15px;
      font-size: 20px;
    }
  }
}
</style>