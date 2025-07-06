<!-- 搜索 -->
<template>
  <div class="search-main-container">
    <PageHeader 
      title="搜索" 
      subtitle="发现你喜欢的音乐"
      @back="goBack"
    />
    
    <div class="search-section">
      <div class="search-header">
        <h2>音乐搜索</h2>
        <p class="subtitle">发现你喜欢的音乐</p>
      </div>
      
      <div class="search-form">
        <el-input
          placeholder="请输入歌曲名称进行搜索"
          v-model="keyword"
          class="search-input"
          clearable
          size="large"
          @keyup.enter="search"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button 
          type="primary" 
          class="search-btn"
          @click="search"
          :loading="loading"
        >
          <el-icon><Search /></el-icon>
          搜索
        </el-button>
      </div>
    </div>
    
    <!-- 查询结果 -->
    <div class="result-section" v-if="clickFlag">
      <div class="result-header" v-if="searchResult.length">
        <h3>搜索结果</h3>
        <span class="result-count">共找到 {{ searchResult.length }} 首歌曲</span>
      </div>
      
      <div class="result-list" v-if="searchResult.length">
        <div
          class="song-item"
          v-for="(item, index) in searchResult"
          :key="item.musicId"
          @click="playMusic(item, index)"
        >
          <div class="song-number">{{ index + 1 }}</div>
          <div class="song-info">
            <h4 class="song-name">{{ item.musicName }}</h4>
            <p class="song-artist">{{ item.artist || '未知歌手' }}</p>
          </div>
          <div class="song-action">
            <el-icon class="play-icon"><VideoPlay /></el-icon>
          </div>
        </div>
      </div>
      
      <div class="empty-result" v-else>
        <el-icon class="empty-icon"><Search /></el-icon>
        <p class="empty-text">未找到相关歌曲</p>
        <p class="empty-tip">请尝试其他关键词</p>
      </div>
    </div>
    
    <!-- 初始状态 -->
    <div class="initial-state" v-else>
      <div class="welcome-card">
        <el-icon class="welcome-icon"><Headset /></el-icon>
        <h3>开始你的音乐之旅</h3>
        <p>输入歌曲名称，发现更多精彩音乐</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Search, VideoPlay, Headset } from '@element-plus/icons-vue';
import PageHeader from '@/components/PageHeader.vue';

export default {
  name: "search",
  components: { Search, VideoPlay, Headset, PageHeader },
  data() {
    return {
      keyword: "",
      clickFlag: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["searchResult"]),
  },
  methods: {
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
    async search() {
      if (!this.keyword.trim()) {
        this.$message.warning("请输入搜索关键词");
        return;
      }
      
      this.loading = true;
      this.clickFlag = true;
      
      try {
        await this.$store.dispatch("searchMusic", this.keyword);
      } finally {
        this.loading = false;
      }
    },
    playMusic(item, index) {
      this.selectPlay({
        list: this.searchResult,
        index,
      });
    },
    ...mapActions(["selectPlay"]),
  },
};
</script>
<style lang="less" scoped>
.search-main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding: 24px 10px 32px 10px;
}

/* 移除旧的导航栏样式 */

.search-section {
  max-width: 480px;
  margin: 0 auto 32px auto;
  padding: 0 4px;
}

.search-header {
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

.search-form {
  display: flex;
  gap: 12px;
  align-items: center;
  
  .search-input {
    flex: 1;
    
    :deep(.el-input__wrapper) {
      border-radius: 12px;
      box-shadow: 0 2px 8px 0 rgba(191,207,255,0.15);
      border: 2px solid transparent;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: #bfcfff;
        box-shadow: 0 4px 12px 0 rgba(191,207,255,0.20);
      }
      
      &.is-focus {
        border-color: #6366f1;
        box-shadow: 0 4px 12px 0 rgba(99,102,241,0.15);
      }
    }
  }
  
  .search-btn {
    border-radius: 12px;
    padding: 12px 20px;
    font-weight: 600;
    background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
    border: none;
    box-shadow: 0 2px 8px 0 rgba(99,102,241,0.20);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px 0 rgba(99,102,241,0.30);
    }
  }
}

.result-section {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 4px;
}

.result-header {
  text-align: center;
  margin-bottom: 24px;
  
  h3 {
    font-size: 0.48rem;
    font-weight: 600;
    color: #22223b;
    margin: 0 0 8px 0;
  }
  
  .result-count {
    font-size: 0.28rem;
    color: #6366f1;
    opacity: 0.8;
  }
}

.result-list {
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

.empty-result {
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

.initial-state {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 4px;
}

.welcome-card {
  background: #fff;
  border-radius: 20px;
  padding: 48px 24px;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  
  .welcome-icon {
    font-size: 64px;
    color: #6366f1;
    margin-bottom: 24px;
  }
  
  h3 {
    font-size: 0.48rem;
    font-weight: 600;
    color: #22223b;
    margin: 0 0 12px 0;
  }
  
  p {
    font-size: 0.32rem;
    color: #6366f1;
    margin: 0;
    opacity: 0.8;
  }
}

@media (max-width: 480px) {
  .search-main-container {
    padding: 16px 6px 24px 6px;
  }
  
  .search-section {
    margin-bottom: 24px;
  }
  
  .search-header {
    margin-bottom: 24px;
    
    h2 {
      font-size: 0.52rem;
    }
    
    .subtitle {
      font-size: 0.28rem;
    }
  }
  
  .search-form {
    gap: 8px;
    
    .search-btn {
      padding: 10px 16px;
      font-size: 0.28rem;
    }
  }
  
  .result-header {
    margin-bottom: 20px;
    
    h3 {
      font-size: 0.4rem;
    }
    
    .result-count {
      font-size: 0.24rem;
    }
  }
  
  .result-list {
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
  
  .empty-result {
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
  
  .welcome-card {
    padding: 40px 20px;
    
    .welcome-icon {
      font-size: 56px;
    }
    
    h3 {
      font-size: 0.4rem;
    }
    
    p {
      font-size: 0.28rem;
    }
  }
}
</style>