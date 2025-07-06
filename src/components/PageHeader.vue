<!-- 统一页面导航栏 -->
<template>
  <div class="page-header">
    <div class="header-content">
      <div class="back-button" @click="handleBack">
        <el-icon class="back-icon"><ArrowLeft /></el-icon>
        <span class="back-text">返回</span>
      </div>
      <div class="page-title">
        <h2>{{ title }}</h2>
        <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowLeft } from '@element-plus/icons-vue';

export default {
  name: 'PageHeader',
  components: { ArrowLeft },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleBack() {
      this.$emit('back');
      this.$router.back();
    }
  }
};
</script>

<style lang="less" scoped>
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(191, 207, 255, 0.2);
  box-shadow: 0 2px 12px 0 rgba(191, 207, 255, 0.1);
}

.header-content {
  max-width: 480px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 7px 11px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  min-height: 34px;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px 0 rgba(99, 102, 241, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  .back-icon {
    font-size: 17.6px;
    color: #fff;
    font-weight: 900;
  }
  
  .back-text {
    font-size: 0.308rem;
    font-weight: 900;
    color: #fff;
  }
}

.page-title {
  flex: 1;
  min-width: 0;
  
  h2 {
    font-size: 0.44rem;
    font-weight: 700;
    color: #22223b;
    margin: 0;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  
  .page-subtitle {
    font-size: 0.24rem;
    color: #6366f1;
    margin: 2px 0 0 0;
    opacity: 0.8;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 10px 12px;
    gap: 12px;
  }
  
  .back-button {
    padding: 5px 9px;
    min-height: 30px;
    
    .back-icon {
      font-size: 15.4px;
      font-weight: 900;
    }
    
    .back-text {
      font-size: 0.264rem;
      font-weight: 900;
    }
  }
  
  .page-title {
    h2 {
      font-size: 0.4rem;
    }
    
    .page-subtitle {
      font-size: 0.22rem;
    }
  }
}

@media (max-width: 360px) {
  .header-content {
    padding: 8px 10px;
    gap: 10px;
  }
  
  .back-button {
    padding: 4px 7px;
    min-height: 26px;
    
    .back-icon {
      font-size: 13.2px;
      font-weight: 900;
    }
    
    .back-text {
      font-size: 0.242rem;
      font-weight: 900;
    }
  }
  
  .page-title {
    h2 {
      font-size: 0.36rem;
    }
    
    .page-subtitle {
      font-size: 0.2rem;
    }
  }
}
</style> 