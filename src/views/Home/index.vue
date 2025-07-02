<!-- 首页 -->
<template>
  <!--轮播组件-->
  <slider :images="sliderList" />
  <h5 style="font-size: 20px">热门歌曲推荐</h5>
  <el-row
    class="recommendList"
    v-for="(item, index) in hotMusic"
    :key="item.musicId"
    @click="selectItem(item, index)"
  >
    <el-col :span="5">
      <el-avatar :size="60" src="#">
        <img :src="item.imageUrl" :title="item.musicName" />
      </el-avatar>
    </el-col>
    <el-col :span="15">
      <p>{{ item.musicName }}</p>
      <p>{{ item.userName }}</p>
    </el-col>
  </el-row>
</template>
<!-- <template> -->
  <!-- <div class="home"> -->
    <!-- <img :src="logo" alt="Vue logo" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <!-- </div> -->
<!-- </template> -->

<!-- <script>
// @ 是 /src 的别名
import HelloWorld from '@/components/HelloWorld.vue'
import logo from '@/assets/logo.png'  // 导入图片资源

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      logo
    }
  }
}
</script> -->
<script>
import slider from "../../components/Slider.vue";
import { mapActions, mapGetters } from "vuex";

import swiper1 from "@/assets/image/swiper1.png";
import swiper2 from "@/assets/image/swiper2.png";
import swiper3 from "@/assets/image/swiper3.png";
import swiper4 from "@/assets/image/swiper4.png";
import swiper5 from "@/assets/image/swiper5.png";
import swiper6 from "@/assets/image/swiper6.png";


export default {
  components: {
    slider,
  },
  // data() {
  //   return {
  //     // 首页轮播图
  //     sliderList: [
  //              {
  //         name: "001",
  //         url: new URL("/image/swiper1.png", import.meta.url).href,
  //       },
  //       {
  //         name: "002",
  //         url: new URL("/image/swiper2.png", import.meta.url).href,
  //       },
  //       {
  //         name: "003",
  //         url: new URL("/image/swiper3.png", import.meta.url).href,
  //       },
  //       {
  //         name: "004",
  //         url: new URL("/image/swiper4.png", import.meta.url).href,
  //       },
  //       {
  //         name: "005",
  //         url: new URL("/image/swiper5.png", import.meta.url).href,
  //       },
  //       {
  //         name: "006",
  //         url: new URL("/image/swiper6.png", import.meta.url).href,
  //       },
  //     ],
  //   };
  // },
      data() {
    return {
      sliderList: [
        { name: "001", url: swiper1 },
        { name: "002", url: swiper2 },
        { name: "003", url: swiper3 },
        { name: "004", url: swiper4 },
        { name: "005", url: swiper5 },
        { name: "006", url: swiper6 },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("gainSongListRank");
  },
    computed: {
    ...mapGetters({ recommendList: "SongListRank" }),
    hotMusic() {
      return this.recommendList.hotMusic;
    },
    },
      methods: {
    ...mapActions(["selectPlay"]),
    selectItem(item, index) {
      this.$store.dispatch("gainSongDetailByMusicId", item.musicId);
      this.selectPlay({
        list: this.hotMusic,
        index,
      });
    },
}
  
};
</script>

<style scoped>
.recommendList {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}
.recommendList:last-child {
  margin-bottom: 25px;
}
.recommendList p {
  margin: 5px;
  font-size: 20px;
}
.recommendList p:nth-child(2) {
  color: #999;
  font-size: 12px;
}
.starIcon {
  font-size: 30px;
  margin-top: 12px;
}
</style>
