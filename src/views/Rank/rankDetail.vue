<!-- 排行榜详情 -->
<template>
  <div>
    <div class="back" @click="goBack">
      <el-page-header
        icon="el-icon-arrow-left"
        title="返回"
        content="榜单歌曲"
      />
    </div>
    <div class="coverPic">
      <img src="/image/pic1.png" v-if="category == 'hotList'" />
      <img src="/image/pic2.png" v-if="category == 'newList'" />
      <img src="/image/pic3.png" v-if="category == 'recommendList'" />
    </div>
    <div class="listMain">
      <span style="color: grey; float: right; margin: 5px 30px"
        >共{{ totalMusic }}首歌</span
      >
      <div class="songList">
        <ul>
          <li
            v-for="(item, index) in songsByRank"
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
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["songsByRank"]),
    ...mapState(["rankList"]),
    totalMusic() {
      return this.songsByRank.length;
    },
    category() {
      return this.$route.params.value;
    },
  },
  watch: {
    "$route.params.value": {
      immediate: true,
      handler(newValue, oldValue) {
        this.$store.dispatch("gainSongsByRank", newValue ? newValue : oldValue);
      },
    },
  },
  methods: {
    ...mapActions(["selectPlay"]),
    jumpPlay(item, index) {
      this.selectPlay({
        list: this.songsByRank,
        index,
      });
    },
    goBack() {
      this.$router.back();
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
}
.coverPic {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  margin-bottom: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}
.listMain {
  padding: 10px;
  background-color: rgb(248, 248, 248);
  border-radius: 20px 20px 0 0;
  padding-bottom: 30px;
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
  .deleteIcon {
    font-size: 20px;
    float: right;
    margin-top: 15px;
    margin-right: 20px;
  }
}
</style>