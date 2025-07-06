<template>
  <div class="home-mobile-container">
    <slider :images="sliderList" />
    <h5 class="recommend-title">热门歌曲推荐</h5>
    <div class="recommend-list-mobile">
      <div
        class="recommend-card-mobile"
        v-for="(item, index) in hotMusic"
        :key="item.musicId"
        @click="selectItem(item, index)"
      >
        <div class="card-avatar-mobile">
          <el-avatar :size="60" src="#" shape="square">
            <img :src="item.imageUrl" :title="item.musicName" style="border-radius:12px;" />
          </el-avatar>
        </div>
        <div class="card-info-mobile">
          <div class="music-name-mobile">{{ item.musicName }}</div>
          <div class="user-name-mobile">{{ item.userName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

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
      // 先获取歌曲详情，然后播放
      this.$store.dispatch("gainSongDetailByMusicId", item.musicId).then(() => {
        // 等待歌曲详情获取完成后再播放
        this.$nextTick(() => {
          this.selectPlay({
            list: this.hotMusic,
            index,
          });
        });
      });
    },
}
  
};
</script>

<style scoped>
/* 页面整体背景渐变 */
:host, .home-main-container {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  min-height: 100vh;
  padding-bottom: 40px;
}
.home-main-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 18px;
}
.slider + h5 {
  margin-top: 32px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #3b3b3b;
  border-left: 5px solid #6366f1;
  padding-left: 12px;
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.recommend-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 28px 22px;
  justify-content: flex-start;
  margin-bottom: 32px;
}
.recommend-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 18px 0 rgba(99,102,241,0.08), 0 1.5px 4px 0 rgba(0,0,0,0.03);
  border: 2px solid transparent;
  background-clip: padding-box;
  transition: box-shadow 0.2s, transform 0.2s, border 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-width: 270px;
  max-width: 350px;
  flex: 1 1 270px;
  padding: 18px 22px 18px 18px;
  position: relative;
  overflow: hidden;
}
.recommend-card:hover {
  box-shadow: 0 8px 32px 0 rgba(99,102,241,0.18), 0 3px 8px 0 rgba(0,0,0,0.06);
  transform: translateY(-4px) scale(1.025);
  border: 2px solid #6366f1;
}
.card-avatar {
  margin-right: 18px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-avatar {
  box-shadow: 0 2px 8px 0 rgba(99,102,241,0.10);
  border: 2px solid #e0e7ff;
  transition: transform 0.2s, border 0.2s;
  background: #f1f5ff;
}
.recommend-card:hover .el-avatar {
  transform: scale(1.10) rotate(-2deg);
  border-color: #6366f1;
}
.card-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}
.music-name {
  font-size: 20px;
  font-weight: 700;
  color: #22223b;
  letter-spacing: 1px;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s;
}
.recommend-card:hover .music-name {
  color: #6366f1;
}
.user-name {
  color: #6366f1;
  font-size: 14px;
  font-weight: 400;
  opacity: 0.85;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (max-width: 900px) {
  .home-main-container {
    max-width: 100%;
    padding: 0 8px;
  }
  .recommend-list-wrapper {
    gap: 18px 8px;
  }
}
@media (max-width: 600px) {
  .recommend-list-wrapper {
    flex-direction: column;
    gap: 12px 0;
  }
  .recommend-card {
    min-width: 0;
    max-width: 100%;
    padding: 14px 10px 14px 10px;
  }
  .slider + h5 {
    font-size: 18px;
    margin-top: 18px;
  }
  .music-name {
    font-size: 16px;
  }
  .user-name {
    font-size: 12px;
  }
}
</style>

<style scoped>
.home-mobile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding-bottom: 32px;
  padding-top: 0;
  max-width: 480px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 0;
}
.slider + h5 {
  margin-top: 18px;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1.5px;
  color: #3b3b3b;
  border-left: 4px solid #6366f1;
  padding-left: 10px;
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.recommend-list-mobile {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0;
}
.recommend-card-mobile {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(99,102,241,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  border: 2px solid transparent;
  background-clip: padding-box;
  padding: 8px 8px 8px 6px;
  transition: box-shadow 0.18s, transform 0.18s, border 0.18s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  min-width: 0;
  max-width: 100%;
  will-change: transform;
}
.recommend-card-mobile:active {
  transform: scale(0.97);
  border: 2px solid #60a5fa;
  box-shadow: 0 4px 18px 0 rgba(99,102,241,0.18), 0 2px 6px 0 rgba(0,0,0,0.08);
}
.card-avatar-mobile {
  margin-right: 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-avatar {
  box-shadow: 0 2px 8px 0 rgba(99,102,241,0.10);
  border: 2.5px solid #e0e7ff;
  transition: transform 0.18s, border 0.18s;
  background: #f1f5ff;
  border-radius: 12px !important;
}
.recommend-card-mobile:active .el-avatar {
  border-color: #60a5fa;
  transform: scale(1.05);
}
.card-info-mobile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  flex: 1;
}
.music-name-mobile {
  font-size: 0.375rem;
  font-weight: 700;
  color: #22223b;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.18s;
  line-height: 1.02;
}
.recommend-card-mobile:active .music-name-mobile {
  color: #60a5fa;
}
.user-name-mobile {
  color: #6366f1;
  font-size: 0.3rem;
  font-weight: 400;
  opacity: 0.85;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.02;
}
@media (max-width: 480px) {
  .home-mobile-container {
    max-width: 100vw;
    padding: 0 0 24px 0;
  }
  .recommend-list-mobile {
    padding: 0 2px;
  }
  .recommend-card-mobile {
    padding: 12px 6px 12px 6px;
  }
  .slider + h5 {
    font-size: 17px;
    margin-top: 12px;
  }
  .music-name-mobile {
    font-size: 15px;
  }
  .user-name-mobile {
    font-size: 11px;
  }
}
</style>

<style scoped>
.recommend-title {
  margin-top: 6px;
  margin-bottom: 4px;
  font-size: 0.48rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-align: center;
  color: #444;
  position: relative;
  background: linear-gradient(90deg, #7c8cf8 0%, #a0c4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
}
.recommend-title::after {
  content: '';
  display: block;
  width: 11px;
  height: 0.8px;
  margin: 2.5px auto 0 auto;
  border-radius: 0.4px;
  background: linear-gradient(90deg, #7c8cf8 0%, #a0c4ff 100%);
  opacity: 0.7;
}
@media (max-width: 600px) {
  .recommend-title {
    font-size: 0.4rem;
    margin-top: 4px;
    margin-bottom: 2.8px;
  }
  .recommend-title::after {
    width: 7px;
    height: 0.56px;
    margin-top: 1.6px;
  }
}
</style>
