<!-- 歌单详情 -->
<template>
  <div class="detail-main-container">
    <PageHeader 
      :title="title" 
      subtitle="歌单详情"
      @back="goBack"
    />
    
    <div class="detail-content">
      <!-- 歌单信息卡片 -->
      <div class="playlist-info-card">
        <div class="playlist-info-main">
          <div class="playlist-cover">
            <el-image 
              class="cover-image" 
              :src="listMessage.image"
              fit="cover"
            >
              <template #error>
                <div class="image-placeholder">
                  <el-icon :color="'#6366f1'">
                    <Picture />
                  </el-icon>
                </div>
              </template>
            </el-image>
          </div>
          <div class="playlist-details">
            <h2 class="playlist-name">{{ listMessage.name }}</h2>
            <div class="playlist-meta">
              <div class="creator-info">
                <el-icon :color="'#6366f1'">
                  <User />
                </el-icon>
                <span class="creator-name">{{ listMessage.username }}</span>
              </div>
              <div class="song-count">
                <el-icon :color="'#6366f1'">
                  <Music />
                </el-icon>
                <span>{{ musicList.length }} 首歌曲</span>
              </div>
            </div>
          </div>
          <div class="playlist-actions">
            <el-button
              v-if="!listMessage.isLike"
              type="primary"
              :icon="Plus"
              @click="collectSongList"
              class="collect-btn"
            >
              收藏歌单
            </el-button>
            <el-button
              v-else
              type="success"
              :icon="Check"
              disabled
              class="collected-btn"
            >
              已收藏
            </el-button>
          </div>
        </div>
        <div class="playlist-desc" v-if="listMessage.message">
          {{ listMessage.message }}
        </div>
      </div>

      <!-- 歌曲列表 -->
      <div class="songs-container">
        <div class="songs-header">
          <h3 class="songs-title">歌曲列表</h3>
          <p class="songs-subtitle">点击播放歌曲</p>
        </div>
        
        <div class="songs-list">
          <div
            class="song-item"
            v-for="(item, index) in musicList"
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
              <el-icon :color="'#6366f1'" class="play-icon">
                <VideoPlay />
              </el-icon>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-if="musicList.length === 0" class="empty-state">
          <div class="empty-icon">
            <el-icon :color="'#6366f1'" size="60">
              <Music />
            </el-icon>
          </div>
          <h3 class="empty-title">歌单中还没有歌曲</h3>
          <p class="empty-desc">去添加一些好听的音乐吧</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Plus, Check, User, Music, Picture, VideoPlay } from '@element-plus/icons-vue';
import PageHeader from '@/components/PageHeader.vue';

export default {
  name: "songlist-detail",
  components: { Plus, Check, User, Music, Picture, VideoPlay, PageHeader },
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
      this.$router.push('/songlist');
    },
    ...mapActions(["selectPlay"]),
  },
};
</script>

<style lang="less" scoped>
.detail-main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding: 24px 10px 32px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-content {
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
}

.playlist-info-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  padding: 18px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  overflow: hidden;
}

.playlist-info-main {
  display: flex;
  align-items: center;
  gap: 16px;
}

.playlist-cover {
  flex-shrink: 0;
  
  .cover-image {
    width: 81px;
    height: 81px;
    border-radius: 12px;
    border: 2px solid #e0e7ff;
    box-shadow: 0 4px 16px 0 rgba(99,102,241,0.15);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  .image-placeholder {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f5ff;
    border-radius: 12px;
    border: 2px solid #e0e7ff;
    
    .el-icon {
      font-size: 40px;
    }
  }
}

.playlist-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.playlist-name {
  font-size: 0.51rem;
  font-weight: 700;
  color: #22223b;
  margin: 0 0 10px 0;
  line-height: 1.3;
  letter-spacing: 0.5px;
  text-align: left;
}

.playlist-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
}

.creator-info, .song-count {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.26rem;
  color: #6366f1;
  opacity: 0.8;
  
  .el-icon {
    font-size: 13px;
  }
}

.playlist-actions {
  flex-shrink: 0;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 12px;
}

.collect-btn {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 0.28rem;
  box-shadow: 0 4px 12px 0 rgba(99,102,241,0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px 0 rgba(99,102,241,0.4);
  }
}

.collected-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 0.28rem;
  box-shadow: 0 4px 12px 0 rgba(16,185,129,0.3);
}

.songs-container {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  padding: 24px;
  overflow: hidden;
}

.songs-header {
  margin-bottom: 24px;
  text-align: center;
  
  .songs-title {
    font-size: 0.4rem;
    font-weight: 600;
    color: #6366f1;
    margin: 0 0 8px 0;
    letter-spacing: 1px;
    opacity: 0.8;
  }
  
  .songs-subtitle {
    font-size: 0.32rem;
    color: #6366f1;
    margin: 0;
    opacity: 0.8;
  }
}

.songs-list {
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
      opacity: 1;
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
  font-size: 0.4rem;
  font-weight: 600;
  color: #22223b;
  margin: 0 0 4px 0;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist {
  font-size: 0.32rem;
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
  opacity: 0.6;
  transition: all 0.3s ease;
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

.playlist-desc {
  margin-top: 18px;
  font-size: 0.32rem;
  color: #a5b4fc;
  line-height: 1.6;
  word-break: break-all;
  letter-spacing: 0.5px;
  width: 100%;
  box-sizing: border-box;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .detail-content {
    padding: 0 10px;
  }
  
  .playlist-info-card {
    padding: 20px;
  }
  
  .songs-container {
    padding: 20px;
  }
  
  .song-item {
    padding: 14px;
  }
  
     .playlist-cover .cover-image {
     width: 80px;
     height: 80px;
   }
   
   .playlist-cover .image-placeholder {
     width: 80px;
     height: 80px;
   }
}
</style>