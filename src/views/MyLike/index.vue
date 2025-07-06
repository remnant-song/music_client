<!-- 我喜欢的音乐 -->
<template>
  <div class="like-main-container">
    <PageHeader 
      title="我喜欢的音乐" 
      subtitle="收藏的歌曲"
      @back="goBack"
    />
    
         <div class="like-content">
       <!-- 歌曲列表 -->
      <div class="song-list-container">
                 <div class="song-list-header">
           <h3 class="list-title">歌曲列表</h3>
         </div>
        
        <div class="song-list">
          <div
            class="song-item"
            v-for="(item, index) in likeMusicList"
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
               <el-icon
                 class="delete-icon"
                 @click.stop="remove(item.musicId)"
               >
                 <Delete />
               </el-icon>
             </div>
          </div>
        </div>
        
                 <!-- 空状态 -->
         <div v-if="likeMusicList.length === 0" class="empty-state">
           <div class="empty-icon">
             <el-icon :color="'#6366f1'" size="60">
               <Delete />
             </el-icon>
           </div>
           <h3 class="empty-title">还没有收藏的歌曲</h3>
           <p class="empty-desc">去发现更多好音乐吧</p>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Delete } from '@element-plus/icons-vue';
import PageHeader from '@/components/PageHeader.vue';

export default {
  components: { Delete, PageHeader },
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
      // 根据来源页面进行返回
      const fromPath = this.$route.query.from;
      if (fromPath) {
        this.$router.push(fromPath);
      } else {
        // 如果没有指定来源，尝试返回到上一个页面
        // 如果历史记录为空，则返回到首页
        if (window.history.length > 1) {
          this.$router.back();
        } else {
          this.$router.push('/');
        }
      }
      this.keyword = "";
      this.clickFlag = false;
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
    toSearch() {
      // 记录当前页面路径，用于返回时判断
      this.$router.push({ 
        path: "/search",
        query: { from: this.$route.path }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.like-main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding: 24px 10px 32px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: hidden;
  touch-action: pan-y;
}

.like-content {
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
  text-align: center;
  
  .list-title {
    font-size: 0.4rem;
    font-weight: 600;
    color: #6366f1;
    margin: 0;
    letter-spacing: 1px;
    opacity: 0.8;
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

.delete-icon {
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
  .like-content {
    padding: 0 10px;
    width: calc(100% - 20px);
    max-width: calc(100% - 20px);
  }
  
  .stats-card {
    padding: 20px;
  }
  
  .song-list-container {
    padding: 20px;
  }
  
  .song-item {
    padding: 14px;
  }
}
</style>