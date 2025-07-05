<!-- 歌单（推荐歌单） -->
<template>
  <div class="songlist-main-container">
    <!-- 推荐歌单 -->
    <div class="recommend-section">
      <div class="section-title">
        <h2>推荐歌单</h2>
        <p class="subtitle">发现更多精彩音乐</p>
      </div>
      <div class="songlist-grid">
        <div
          class="song-card"
          v-for="(item, index) in recommendList"
          :key="item.id"
          @click="jump(item)"
        >
          <div class="image-container">
            <el-image 
              :src="item.image" 
              class="song-image"
              fit="cover"
              loading="lazy"
            />
            <div class="hover-overlay">
              <el-icon class="play-icon"><VideoPlay /></el-icon>
            </div>
          </div>
          <div class="song-info">
            <h3 class="song-title">{{ item.name }}</h3>
            <p class="song-desc">{{ item.message || '精选歌单' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { VideoPlay } from '@element-plus/icons-vue';

export default {
  name: "songlist",
  components: { VideoPlay },
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
.songlist-main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding: 24px 10px 32px 10px;
}

.recommend-section {
  max-width: 480px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: 32px;
  
  h2 {
    font-size: 0.6rem;
    font-weight: 700;
    color: #22223b;
    margin: 0 0 8px 0;
    letter-spacing: 1px;
  }
  
  .subtitle {
    font-size: 0.32rem;
    color: #6366f1;
    margin: 0;
    opacity: 0.8;
  }
}

.songlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  padding: 0 4px;
}

.song-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px 0 rgba(191,207,255,0.15), 0 4px 10px 0 rgba(0,0,0,0.06);
    border: 2px solid #e0e7ff;
    background: #f8fafc;
    
    .hover-overlay {
      opacity: 1;
    }
    
    .song-image {
      transform: scale(1.05);
    }
  }
}

.image-container {
  position: relative;
  width: 100%;
  height: 140px;
  overflow: hidden;
}

.song-image {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(99, 102, 241, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  .play-icon {
    font-size: 32px;
    color: #fff;
  }
}

.song-info {
  padding: 12px 16px 16px;
}

.song-title {
  font-size: 0.36rem;
  font-weight: 600;
  color: #22223b;
  margin: 0 0 4px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.song-desc {
  font-size: 0.28rem;
  color: #6366f1;
  margin: 0;
  opacity: 0.7;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

@media (max-width: 480px) {
  .songlist-main-container {
    padding: 16px 6px 24px 6px;
  }
  
  .section-title {
    margin-bottom: 24px;
    
    h2 {
      font-size: 0.52rem;
    }
    
    .subtitle {
      font-size: 0.28rem;
    }
  }
  
  .songlist-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
    padding: 0 2px;
  }
  
  .image-container {
    height: 120px;
  }
  
  .song-info {
    padding: 10px 12px 14px;
  }
  
  .song-title {
    font-size: 0.32rem;
  }
  
  .song-desc {
    font-size: 0.24rem;
  }
  
  .hover-overlay .play-icon {
    font-size: 28px;
  }
}

@media (max-width: 360px) {
  .songlist-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
  }
  
  .image-container {
    height: 100px;
  }
  
  .song-info {
    padding: 8px 10px 12px;
  }
  
  .song-title {
    font-size: 0.28rem;
  }
  
  .song-desc {
    font-size: 0.22rem;
  }
}
</style>