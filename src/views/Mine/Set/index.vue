<!-- 设置 -->
<template>
  <div class="set-main-container">
    <div class="set-content">
      <!-- 标题区域 -->
      <div class="set-header">
        <h2>设置</h2>
        <p class="subtitle">管理你的账户和偏好</p>
      </div>
      
      <!-- 设置列表 -->
      <div class="settings-list">
        <div
          class="setting-item"
          v-for="(item, index) in listTitle"
          :key="item.id"
          @click="jumpPage(item)"
        >
          <div class="setting-icon">
            <el-icon :color="'#6366f1'">
              <component :is="item.icon" />
            </el-icon>
          </div>
          <div class="setting-info">
            <h3 class="setting-title">{{ item.title }}</h3>
            <p class="setting-desc">{{ item.description }}</p>
          </div>
          <div class="setting-arrow">
            <el-icon :color="'#6366f1'"><ArrowRight /></el-icon>
          </div>
        </div>
      </div>
      
      <!-- 版本信息 -->
      <div class="version-info">
        <p class="version-text">音乐播放器 v1.0.0</p>
      </div>
    </div>
  </div>
</template>

<script>
import { User, Key, ArrowRight } from '@element-plus/icons-vue';

export default {
  name: "",
  components: { User, Key, ArrowRight },
  data() {
    return {
      listTitle: [
        {
          id: 1,
          title: "个人信息",
          description: "修改头像、用户名等基本信息",
          icon: "User",
          value: "setInfo",
        },
        {
          id: 2,
          title: "账户安全",
          description: "修改登录密码，保护账户安全",
          icon: "Key",
          value: "editPassword",
        },
      ],
    };
  },
  methods: {
    jumpPage(item) {
      this.$router.push({
        path: `/mine/set/${item.value}`,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.set-main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding: 24px 10px 32px 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.set-content {
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
}

.set-header {
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

.settings-list {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
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
    
    .setting-icon {
      transform: scale(1.1);
    }
    
    .setting-arrow {
      transform: translateX(4px);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
}

.setting-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  
  .el-icon {
    font-size: 24px;
    color: #fff !important;
  }
}

.setting-info {
  flex: 1;
  min-width: 0;
}

.setting-title {
  font-size: 0.4rem;
  font-weight: 600;
  color: #22223b;
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.setting-desc {
  font-size: 0.28rem;
  color: #6366f1;
  margin: 0;
  opacity: 0.7;
  line-height: 1.4;
}

.setting-arrow {
  transition: transform 0.3s ease;
  
  .el-icon {
    font-size: 18px;
  }
}

.version-info {
  text-align: center;
  margin-top: 32px;
  
  .version-text {
    font-size: 0.24rem;
    color: #6366f1;
    margin: 0;
    opacity: 0.6;
  }
}

@media (max-width: 480px) {
  .set-main-container {
    padding: 16px 6px 24px 6px;
  }
  
  .set-header {
    margin-bottom: 24px;
    
    h2 {
      font-size: 0.52rem;
    }
    
    .subtitle {
      font-size: 0.28rem;
    }
  }
  
  .settings-list {
    border-radius: 16px;
    padding: 20px;
    gap: 12px;
  }
  
  .setting-item {
    padding: 16px;
    gap: 12px;
    
    &:hover {
      transform: translateY(-1px);
    }
  }
  
  .setting-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    
    .el-icon {
      font-size: 20px;
    }
  }
  
  .setting-title {
    font-size: 0.36rem;
  }
  
  .setting-desc {
    font-size: 0.24rem;
  }
  
  .setting-arrow .el-icon {
    font-size: 16px;
  }
  
  .version-info {
    margin-top: 24px;
    
    .version-text {
      font-size: 0.22rem;
    }
  }
}

@media (max-width: 360px) {
  .settings-list {
    padding: 16px;
    gap: 10px;
  }
  
  .setting-item {
    padding: 14px;
    gap: 10px;
  }
  
  .setting-icon {
    width: 36px;
    height: 36px;
    
    .el-icon {
      font-size: 18px;
    }
  }
  
  .setting-title {
    font-size: 0.32rem;
  }
  
  .setting-desc {
    font-size: 0.22rem;
  }
}
</style>