<!-- 收藏歌单 -->
<template>
  <div class="collect-main-container">
    <div class="collect-content">
      <!-- 统计信息 -->
      <div class="stats-section">
        <div class="stats-card">
          <div class="stats-icon">
            <el-icon :color="'#6366f1'">
              <Folder />
            </el-icon>
          </div>
          <div class="stats-info">
            <h3 class="stats-number">{{ number }}</h3>
            <p class="stats-label">收藏歌单</p>
          </div>
        </div>
      </div>

      <!-- 歌单列表 -->
      <div class="playlist-container">
        <div class="playlist-header">
          <h3 class="list-title">歌单列表</h3>
        </div>
        
        <div class="playlist-list">
          <div
            class="playlist-item"
            v-for="(item, index) in collectSongList"
            :key="index"
            @click="jump(item)"
          >
            <div class="playlist-cover">
              <el-image 
                class="cover-image" 
                :src="item.image"
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
            
            <div class="playlist-info">
              <h4 class="playlist-name">{{ item.name }}</h4>
              <p class="playlist-creator">创作者：{{ item.username }}</p>
            </div>
            
            <div class="playlist-actions">
              <el-icon
                class="delete-icon"
                @click.stop="remove(item.id)"
              >
                <Delete />
              </el-icon>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-if="collectSongList.length === 0" class="empty-state">
          <div class="empty-icon">
            <el-icon :color="'#6366f1'" size="60">
              <Folder />
            </el-icon>
          </div>
          <h3 class="empty-title">还没有收藏的歌单</h3>
          <p class="empty-desc">去发现更多好歌单吧</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { ElMessage } from "element-plus";
import { Delete, Folder, Picture } from '@element-plus/icons-vue';

export default {
  components: { Delete, Folder, Picture },
  data() {
    return {
    };
  },
  mounted() {
    this.$store.dispatch("gainCollectSongList");
  },
  computed: {
    // ...mapState(["songListFlag"]),
    ...mapGetters(["collectSongList"]),
    // 歌单个数
    number() {
      return this.collectSongList.length;
    },
  },
  methods: {
    // 跳转到歌单详情
    jump(item) {
      this.$router.push({
        path: `/songlist/${item.id}`,
      });
    },
    // 移除收藏的歌单
    remove(listId) {
      this.$confirm("确定要移除这个歌单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("removeCollectMusicList", listId);
          setTimeout(() => {
            this.$store.dispatch("gainCollectSongList");
          }, 500);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.collect-main-container {
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

.collect-content {
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

.stats-section {
  margin-bottom: 24px;
}

.stats-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 2px solid transparent;
  background-clip: padding-box;
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
  
  &:hover::before {
    opacity: 1;
  }
}

.stats-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  .el-icon {
    font-size: 22px;
    color: #fff !important;
  }
}

.stats-info {
  flex: 1;
}

.stats-number {
  font-size: 0.6rem;
  font-weight: 700;
  color: #22223b;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.stats-label {
  font-size: 0.28rem;
  color: #6366f1;
  margin: 0;
  opacity: 0.8;
}

.playlist-container {
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

.playlist-header {
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

.playlist-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.playlist-item {
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
    
    .playlist-cover .cover-image {
      transform: scale(1.05);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
}

.playlist-cover {
  flex-shrink: 0;
  
  .cover-image {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    border: 2px solid #e0e7ff;
    transition: transform 0.3s ease;
    box-shadow: 0 2px 8px 0 rgba(99,102,241,0.10);
  }
  
  .image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f5ff;
    border-radius: 12px;
    
    .el-icon {
      font-size: 32px;
    }
  }
}

.playlist-info {
  flex: 1;
  min-width: 0;
}

.playlist-name {
  font-size: 0.352rem;
  font-weight: 600;
  color: #22223b;
  margin: 0 0 8px 0;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-creator {
  font-size: 0.264rem;
  color: #6366f1;
  margin: 0;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-actions {
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
  .collect-content {
    padding: 0 10px;
    width: calc(100% - 20px);
    max-width: calc(100% - 20px);
  }
  
  .stats-card {
    padding: 20px;
  }
  
  .playlist-container {
    padding: 20px;
  }
  
  .playlist-item {
    padding: 14px;
  }
  
  .playlist-cover .cover-image {
    width: 70px;
    height: 70px;
  }
}
</style>