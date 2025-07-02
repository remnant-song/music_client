<!-- 歌单（推荐歌单） -->
<template>
  <div>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <div class="tuijian">推荐歌单</div>
      <div class="songlist">
        <div
          class="singleSong"
          v-for="(item, index) in recommendList"
          :key="item.id"
          @click="jump(item)"
        >
          <img :src="item.image" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "songlist",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("gainRecommendList");
  },
  computed: {
    ...mapGetters(["recommendList"]),
  },
  methods: {
    // 跳转到歌单详情
    jump(item) {
      this.$router.push({
        path: `/songlist/${item.id}`,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.tuijian {
  font-weight: 700;
  font-size: 20px;
}
.songlist {
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  .singleSong {
    width: 33%;
    height: 120px;
    justify-content: space-around;
    margin-bottom: 20px;
    text-align: center;
    img {
      width: 95%;
      height: 90%;
      border-radius: 10px;
    }
    span {
      display: block;
      font-size: 12px;
      font-family: "SimSun";
    }
  }
}
</style>