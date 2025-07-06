<!-- 排行榜详情 -->
<template>
  <div class="rank-detail-main-container">
    <PageHeader 
      title="榜单歌曲" 
      subtitle="热门排行"
      @back="goBack"
    />
    
    <div class="rank-detail-content">
      <!-- 榜单封面 -->
      <div class="rank-cover-section">
        <div class="rank-cover">
          <img src="/image/pic1.png" v-if="category == 'hotList'" />
          <img src="/image/pic2.png" v-if="category == 'newList'" />
          <img src="/image/pic3.png" v-if="category == 'recommendList'" />
        </div>
        <div class="rank-info">
          <h3 class="rank-title">
            {{ category === 'hotList' ? '热门榜单' : category === 'newList' ? '新歌榜单' : '推荐榜单' }}
          </h3>
          <p class="rank-desc">发现最受欢迎的音乐</p>
        </div>
      </div>

      <!-- 歌曲列表 -->
      <div class="song-list-container">
        <div class="song-list-header">
          <h3 class="list-title">歌曲列表</h3>
          <span class="song-count">共 {{ totalMusic }} 首歌</span>
        </div>
        
        <div class="song-list">
          <div
            class="song-item"
            v-for="(item, index) in songsByRank"
            :key="item.musicId"
            @click="jumpPlay(item, index)"
          >
            <div class="song-rank">
              <span class="rank-number">{{ index + 1 }}</span>
            </div>
            
            <div class="song-info">
              <div class="song-avatar">
                <el-avatar :size="50" src="#" shape="square">
                  <img :src="item.imageUrl || '/image/pic1.png'" :title="item.musicName" style="border-radius:8px;" />
                </el-avatar>
              </div>
              
              <div class="song-details">
                <h4 class="song-name">{{ item.musicName }}</h4>
                <p class="song-artist">{{ item.userName || '未知歌手' }}</p>
              </div>
            </div>
            
            <div class="song-actions">
              <el-icon class="play-icon">
                <VideoPlay />
              </el-icon>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-if="songsByRank.length === 0" class="empty-state">
          <div class="empty-icon">
            <el-icon :color="'#6366f1'" size="60">
              <Headset />
            </el-icon>
          </div>
          <h3 class="empty-title">暂无歌曲</h3>
          <p class="empty-desc">该榜单暂时没有歌曲</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { VideoPlay, Headset } from '@element-plus/icons-vue';
import PageHeader from '@/components/PageHeader.vue';

export default {
  name: "",
  components: { VideoPlay, Headset, PageHeader },
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
      this.$router.push('/rank');
    },
  },
};
</script>
<style lang="less" scoped>
.rank-detail-main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  position: relative;
  overflow-x: hidden;
  touch-action: pan-y;
}

.rank-detail-content {
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  bottom: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 10px;
  box-sizing: border-box;
  touch-action: pan-y;
}

.rank-cover-section {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.rank-cover {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px 0 rgba(99,102,241,0.15);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.rank-info {
  flex: 1;
  min-width: 0;
  
  .rank-title {
    font-size: 0.48rem;
    font-weight: 700;
    color: #22223b;
    margin: 0 0 8px 0;
    line-height: 1.2;
  }
  
  .rank-desc {
    font-size: 0.32rem;
    color: #6366f1;
    margin: 0;
    opacity: 0.8;
  }
}

.song-list-container {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  padding: 24px;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  touch-action: pan-y;
}

.song-list-header {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .list-title {
    font-size: 0.4rem;
    font-weight: 600;
    color: #6366f1;
    margin: 0;
    letter-spacing: 1px;
    opacity: 0.8;
  }
  
  .song-count {
    font-size: 0.28rem;
    color: #6366f1;
    opacity: 0.6;
  }
}

.song-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.song-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(139,92,246,0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    border: 2px solid #e0e7ff;
    background: #f4f7ff;
    box-shadow: 0 8px 25px 0 rgba(191,207,255,0.15), 0 4px 10px 0 rgba(0,0,0,0.06);
    
    &::before {
      opacity: 1;
    }
    
    .song-avatar .el-avatar {
      transform: scale(1.1);
    }
    
    .play-icon {
      color: #6366f1;
      transform: scale(1.1);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
}

.song-rank {
  flex-shrink: 0;
  
  .rank-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: #fff;
    border-radius: 8px;
    font-size: 0.36rem;
    font-weight: 600;
  }
}

.song-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.song-avatar {
  flex-shrink: 0;
  
  .el-avatar {
    border: 2px solid #e0e7ff;
    transition: transform 0.3s ease;
    box-shadow: 0 2px 8px 0 rgba(99,102,241,0.10);
  }
}

.song-details {
  flex: 1;
  min-width: 0;
}

.song-name {
  font-size: 0.32rem;
  font-weight: 600;
  color: #22223b;
  margin: 0 0 4px 0;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist {
  font-size: 0.24rem;
  color: #6366f1;
  margin: 0;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-actions {
  flex-shrink: 0;
}

.play-icon {
  font-size: 20px;
  color: #6366f1;
  opacity: 0.6;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  
  &:hover {
    opacity: 1;
    transform: scale(1.1);
    background: rgba(99, 102, 241, 0.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  
  .empty-icon {
    margin-bottom: 24px;
  }
  
  .empty-title {
    font-size: 0.5rem;
    font-weight: 600;
    color: #22223b;
    margin: 0 0 12px 0;
  }
  
  .empty-desc {
    font-size: 0.36rem;
    color: #6366f1;
    margin: 0;
    opacity: 0.8;
  }
}

/* 响应式设计 */
@media (max-width: 480px) {
  .rank-detail-content {
    padding: 0 10px;
    width: calc(100% - 20px);
    max-width: calc(100% - 20px);
  }
  
  .rank-cover-section {
    padding: 20px;
    gap: 16px;
  }
  
  .rank-cover {
    width: 100px;
    height: 100px;
  }
  
  .rank-info {
    .rank-title {
      font-size: 0.4rem;
    }
    
    .rank-desc {
      font-size: 0.28rem;
    }
  }
  
  .song-list-container {
    padding: 20px;
  }
  
  .song-item {
    padding: 14px;
  }
}
</style>