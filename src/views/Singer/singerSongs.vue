<!-- 歌手下歌曲详情 -->
<template>
  <div class="singer-main-container">
    <PageHeader 
      :title="singerDetail.username" 
      subtitle="歌手详情"
      @back="goBack"
    />
    
    <!-- 歌手信息卡片 -->
    <div class="singer-info-card">
      <div class="singer-avatar">
        <el-image 
          class="singer-image" 
          :src="singerDetail.imageUrl"
          fit="cover"
        />
        <div class="avatar-overlay">
          <el-icon class="music-icon"><Headset /></el-icon>
        </div>
      </div>
      <div class="singer-details">
        <h2 class="singer-name">{{ singerDetail.username }}</h2>
        <p class="singer-desc">{{ singerDetail.about || '暂无描述' }}</p>
        <div class="singer-stats">
          <span class="stat-item">
            <el-icon><VideoPlay /></el-icon>
            {{ songList.length }} 首歌曲
          </span>
        </div>
      </div>
    </div>
    
    <!-- 歌曲列表 -->
    <div class="songs-section">
      <div class="section-header">
        <h3>热门歌曲</h3>
        <span class="song-count">共 {{ songList.length }} 首歌曲</span>
      </div>
      
      <div class="songs-list" v-if="songList.length">
        <div
          class="song-item"
          v-for="(item, index) in songList"
          :key="item.musicId"
          @click="jumpPlay(item, index)"
        >
          <div class="song-number">{{ index + 1 }}</div>
          <div class="song-info">
            <h4 class="song-name">{{ item.musicName }}</h4>
            <p class="song-artist">{{ singerDetail.username }}</p>
          </div>
          <div class="song-action">
            <el-icon class="play-icon"><VideoPlay /></el-icon>
          </div>
        </div>
      </div>
      
      <div class="empty-songs" v-else>
        <el-icon class="empty-icon"><Music /></el-icon>
        <p class="empty-text">暂无歌曲</p>
        <p class="empty-tip">该歌手还没有上传歌曲</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Headset, VideoPlay, Music } from '@element-plus/icons-vue';
import PageHeader from '@/components/PageHeader.vue';

export default {
  name: "singer-songs",
  components: { Headset, VideoPlay, Music, PageHeader },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["songDetailBySingerId"]),
    songList() {
      return this.songDetailBySingerId.list || [];
    },
    singerDetail() {
      return this.songDetailBySingerId.singer || {};
    },
  },
  watch: {
    "$route.params.singerId": {
      immediate: true,
      handler(newValue, oldValue) {
        if (!isNaN(newValue))
          this.$store.dispatch(
            "gainSongBySingerId",
            newValue ? newValue : oldValue
          );
      },
    },
  },
  methods: {
    // 跳转到播放页面
    jumpPlay(item, index) {
      this.selectPlay({
        list: this.songList,
        index,
      });
    },
    // 返回
    goBack() {
      this.$router.push('/singer');
    },
    ...mapActions(["selectPlay"]),
  },
};
</script>
<style lang="less" scoped>
.singer-main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding: 24px 10px 32px 10px;
}

/* 移除旧的导航栏样式 */

.singer-info-card {
  max-width: 480px;
  margin: 0 auto 32px auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  padding: 24px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.singer-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 20px;
  overflow: hidden;
  flex-shrink: 0;
  
  .singer-image {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    transition: transform 0.3s ease;
  }
  
  .avatar-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(99,102,241,0.8) 0%, rgba(139,92,246,0.8) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    
    .music-icon {
      font-size: 32px;
      color: #fff;
    }
  }
  
  &:hover {
    .singer-image {
      transform: scale(1.05);
    }
    
    .avatar-overlay {
      opacity: 1;
    }
  }
}

.singer-details {
  flex: 1;
  min-width: 0;
}

.singer-name {
  font-size: 0.52rem;
  font-weight: 700;
  color: #22223b;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.singer-desc {
  font-size: 0.32rem;
  color: #6366f1;
  margin: 0 0 16px 0;
  line-height: 1.5;
  opacity: 0.8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.singer-stats {
  display: flex;
  gap: 16px;
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.28rem;
    color: #6366f1;
    font-weight: 600;
    
    .el-icon {
      font-size: 16px;
    }
  }
}

.songs-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 4px;
}

.section-header {
  text-align: center;
  margin-bottom: 24px;
  
  h3 {
    font-size: 0.48rem;
    font-weight: 600;
    color: #22223b;
    margin: 0 0 8px 0;
  }
  
  .song-count {
    font-size: 0.28rem;
    color: #6366f1;
    opacity: 0.8;
  }
}

.songs-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.song-item {
  background: #fff;
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px 0 rgba(191,207,255,0.15), 0 4px 10px 0 rgba(0,0,0,0.06);
    border: 2px solid #e0e7ff;
    background: #f8fafc;
    
    .play-icon {
      color: #6366f1;
      transform: scale(1.1);
    }
  }
}

.song-number {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.28rem;
  flex-shrink: 0;
}

.song-info {
  flex: 1;
  min-width: 0;
  
  .song-name {
    font-size: 0.36rem;
    font-weight: 600;
    color: #22223b;
    margin: 0 0 4px 0;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  
  .song-artist {
    font-size: 0.28rem;
    color: #6366f1;
    margin: 0;
    opacity: 0.7;
  }
}

.song-action {
  .play-icon {
    font-size: 24px;
    color: #bfcfff;
    transition: all 0.3s ease;
  }
}

.empty-songs {
  background: #fff;
  border-radius: 16px;
  padding: 48px 24px;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  
  .empty-icon {
    font-size: 48px;
    color: #bfcfff;
    margin-bottom: 16px;
  }
  
  .empty-text {
    font-size: 0.36rem;
    font-weight: 600;
    color: #22223b;
    margin: 0 0 8px 0;
  }
  
  .empty-tip {
    font-size: 0.28rem;
    color: #6366f1;
    margin: 0;
    opacity: 0.7;
  }
}

@media (max-width: 480px) {
  .singer-main-container {
    padding: 16px 6px 24px 6px;
  }
  
  .singer-info-card {
    margin-bottom: 24px;
    padding: 20px;
    gap: 16px;
  }
  
  .singer-avatar {
    width: 100px;
    height: 100px;
    border-radius: 16px;
    
    .avatar-overlay .music-icon {
      font-size: 28px;
    }
  }
  
  .singer-name {
    font-size: 0.44rem;
  }
  
  .singer-desc {
    font-size: 0.28rem;
    margin-bottom: 12px;
  }
  
  .singer-stats .stat-item {
    font-size: 0.24rem;
    
    .el-icon {
      font-size: 14px;
    }
  }
  
  .section-header {
    margin-bottom: 20px;
    
    h3 {
      font-size: 0.4rem;
    }
    
    .song-count {
      font-size: 0.24rem;
    }
  }
  
  .songs-list {
    gap: 10px;
  }
  
  .song-item {
    padding: 12px 16px;
    gap: 12px;
  }
  
  .song-number {
    width: 28px;
    height: 28px;
    font-size: 0.24rem;
  }
  
  .song-info {
    .song-name {
      font-size: 0.32rem;
    }
    
    .song-artist {
      font-size: 0.24rem;
    }
  }
  
  .song-action .play-icon {
    font-size: 20px;
  }
  
  .empty-songs {
    padding: 40px 20px;
    
    .empty-icon {
      font-size: 40px;
    }
    
    .empty-text {
      font-size: 0.32rem;
    }
    
    .empty-tip {
      font-size: 0.24rem;
    }
  }
}

@media (max-width: 360px) {
  .singer-info-card {
    padding: 16px;
    gap: 12px;
  }
  
  .singer-avatar {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    
    .avatar-overlay .music-icon {
      font-size: 24px;
    }
  }
  
  .singer-name {
    font-size: 0.4rem;
  }
  
  .singer-desc {
    font-size: 0.26rem;
  }
  
  .songs-list {
    gap: 8px;
  }
  
  .song-item {
    padding: 10px 14px;
    gap: 10px;
  }
  
  .song-number {
    width: 24px;
    height: 24px;
    font-size: 0.22rem;
  }
  
  .song-info {
    .song-name {
      font-size: 0.28rem;
    }
    
    .song-artist {
      font-size: 0.22rem;
    }
  }
  
  .song-action .play-icon {
    font-size: 18px;
  }
}
</style>