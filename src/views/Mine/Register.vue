<template>
  <div class="register-main-container">
    <PageHeader 
      title="注册" 
      subtitle="创建新账户"
      @back="goBack"
    />
    
    <div class="register-content">
      <!-- 欢迎区域 -->
      <div class="welcome-section">
        <div class="welcome-icon">
          <el-icon class="music-icon"><UserFilled /></el-icon>
        </div>
        <h2 class="welcome-title">加入我们</h2>
        <p class="welcome-subtitle">创建您的音乐账户，开启音乐之旅</p>
      </div>

      <!-- 注册表单 -->
      <div class="form-container">
        <div class="form-header">
          <h3 class="form-title">账户注册</h3>
        </div>
        
        <el-form 
          :model="registerForm"
          ref="registerFormRef"
          status-icon
          class="register-form"
        >
          <el-form-item prop="email" :rules="rules.emailRules" class="form-item">
            <el-input 
              type="text" 
              v-model="registerForm.email" 
              placeholder="请输入邮箱地址"
              class="form-input"
              size="large"
              :prefix-icon="Message"
            />
          </el-form-item>
          
          <el-form-item prop="phone" :rules="rules.phoneRules" class="form-item">
            <el-input 
              type="text" 
              v-model="registerForm.phone" 
              placeholder="请输入手机号码"
              class="form-input"
              size="large"
              :prefix-icon="Phone"
            />
          </el-form-item>
          
          <el-form-item prop="password" :rules="rules.passwordRules" class="form-item">
            <el-input
              type="password"
              v-model="registerForm.password"
              placeholder="请输入密码"
              class="form-input"
              size="large"
              :prefix-icon="Lock"
              @keyup.enter="handleRegister('registerFormRef')"
              show-password
            />
          </el-form-item>
          
          <el-form-item prop="role" class="form-item">
            <el-select 
              v-model="registerForm.role" 
              placeholder="请选择角色"
              class="form-select"
              size="large"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <div class="role-option">
                  <el-icon class="role-icon">
                    <component :is="item.value === 1 ? 'Microphone' : 'User'" />
                  </el-icon>
                  <span>{{ item.label }}</span>
                </div>
              </el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item class="form-item">
            <el-button
              type="primary"
              @click="handleRegister('registerFormRef')"
              :loading="loading"
              class="register-btn"
              size="large"
            >
              <el-icon v-if="!loading"><UserFilled /></el-icon>
              {{ loading ? '注册中...' : '注册' }}
            </el-button>
          </el-form-item>
        </el-form>
        
        <!-- 其他操作 -->
        <div class="form-footer">
          <span class="login-link" @click="toLogin">
            已有账户？立即登录
          </span>
        </div>
      </div>
      
      <!-- 装饰元素 -->
      <div class="decoration-elements">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserFilled, Message, Phone, Lock, Microphone, User } from '@element-plus/icons-vue';
import rules from "../../utils/validator.js";
import PageHeader from '@/components/PageHeader.vue';

export default {
  components: { 
    PageHeader,
    UserFilled,
    Message,
    Phone,
    Lock,
    Microphone,
    User
  },
  // inject: ["reload"],
  data() {
    return {
      registerForm: {
        email: "",
        phone: "",
        password: "",
        role: 2, // 1为歌手，2为普通用户
      },
      options: [
        {
          value: 1,
          label: "歌手",
        },
        {
          value: 2,
          label: "普通用户",
        },
      ],
      rules,
      loading: false,
    };
  },
  methods: {
    handleRegister(registerFormRef) {
      this.$refs.registerFormRef.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch("register", this.registerForm).then(() => {
            this.loading = false;
          }).catch(() => {
            this.loading = false;
          });
        }
      });
    },
    // 返回
    goBack() {
      this.$router.push({ path: "/mine" });
      this.$refs.registerFormRef.resetFields();
    },
    // 去登录
    toLogin() {
      this.$router.push({
        path: "/login",
      });
      this.$refs.registerFormRef.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.register-main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding: 15.6px 6.5px 20.8px 6.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: hidden;
  touch-action: pan-y;
}

.register-content {
  max-width: 312px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.welcome-section {
  text-align: center;
  margin-bottom: 26px;
  padding: 26px 13px;
}

.welcome-icon {
  margin-bottom: 13px;
  
  .music-icon {
    font-size: 29.25px;
    color: #6366f1;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.welcome-title {
  font-size: 0.585rem;
  font-weight: 700;
  color: #22223b;
  margin: 0 0 7.8px 0;
  line-height: 1.3;
  letter-spacing: 0.5px;
}

.welcome-subtitle {
  font-size: 0.2925rem;
  color: #6366f1;
  opacity: 0.8;
  margin: 0;
  line-height: 1.5;
}

.form-container {
  background: #fff;
  border-radius: 13px;
  box-shadow: 0 1.3px 7.8px 0 rgba(191,207,255,0.10), 0 0.65px 1.95px 0 rgba(0,0,0,0.04);
  padding: 20.8px 15.6px;
  position: relative;
  overflow: hidden;
}

.form-header {
  text-align: center;
  margin-bottom: 20.8px;
}

.form-title {
  font-size: 0.455rem;
  font-weight: 600;
  color: #22223b;
  margin: 0 0 5.2px 0;
  line-height: 1.3;
}

.register-form {
  .form-item {
    margin-bottom: 15.6px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .form-input {
    :deep(.el-input__wrapper) {
      background: #f8fafc;
      border: 1.3px solid transparent;
      border-radius: 7.8px;
      box-shadow: none;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: #e0e7ff;
        background: #fff;
      }
      
      &.is-focus {
        border-color: #6366f1;
        background: #fff;
        box-shadow: 0 0 0 1.95px rgba(99,102,241,0.1);
      }
    }
    
    :deep(.el-input__inner) {
      height: 31.2px;
      font-size: 0.2925rem;
      color: #22223b;
      
      &::placeholder {
        color: #9ca3af;
      }
    }
    
    :deep(.el-input__prefix) {
      color: #6366f1;
      font-size: 5.85px;
    }
  }
  
  .form-select {
    width: 100%;
    
    :deep(.el-input__wrapper) {
      background: #f8fafc;
      border: 1.3px solid transparent;
      border-radius: 7.8px;
      box-shadow: none;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: #e0e7ff;
        background: #fff;
      }
      
      &.is-focus {
        border-color: #6366f1;
        background: #fff;
        box-shadow: 0 0 0 1.95px rgba(99,102,241,0.1);
      }
    }
    
    :deep(.el-input__inner) {
      height: 31.2px;
      font-size: 0.2925rem;
      color: #22223b;
      
      &::placeholder {
        color: #9ca3af;
      }
    }
  }
}

.role-option {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .role-icon {
    color: #6366f1;
    font-size: 14px;
  }
}

.register-btn {
  width: 100%;
  height: 31.2px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  border-radius: 7.8px;
  font-weight: 600;
  font-size: 0.30875rem;
  box-shadow: 0 2.6px 7.8px 0 rgba(99,102,241,0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1.3px);
    box-shadow: 0 3.9px 13px 0 rgba(99,102,241,0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  .el-icon {
    margin-right: 5.2px;
  }
}

.form-footer {
  text-align: center;
  margin-top: 15.6px;
  padding-top: 15.6px;
  border-top: 0.65px solid #f1f5f9;
}

.login-link {
  font-size: 0.27625rem;
  color: #6366f1;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    color: #4f46e5;
    text-decoration: underline;
  }
}

.decoration-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 78px;
  height: 78px;
  top: 10%;
  right: -39px;
  animation-delay: 0s;
}

.circle-2 {
  width: 52px;
  height: 52px;
  bottom: 20%;
  left: -26px;
  animation-delay: 2s;
}

.circle-3 {
  width: 39px;
  height: 39px;
  top: 60%;
  right: 10%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

// 响应式设计
@media (max-width: 480px) {
  .register-main-container {
    padding: 10.4px 5.2px 15.6px 5.2px;
  }
  
  .register-content {
    max-width: 260px;
  }
  
  .welcome-section {
    padding: 19.5px 10.4px;
    margin-bottom: 19.5px;
  }
  
  .welcome-title {
    font-size: 0.52rem;
  }
  
  .form-container {
    padding: 15.6px 13px;
  }
  
  .form-title {
    font-size: 0.4225rem;
  }
  
  .decoration-circle {
    display: none;
  }
}

@media (max-width: 360px) {
  .register-content {
    max-width: 234px;
  }
  
  .welcome-section {
    padding: 13px 7.8px;
  }
  
  .form-container {
    padding: 13px 10.4px;
  }
  
  .register-form .form-input :deep(.el-input__inner) {
    height: 28.6px;
    font-size: 0.26rem;
  }
  
  .register-form .form-select :deep(.el-input__inner) {
    height: 28.6px;
    font-size: 0.26rem;
  }
  
  .register-btn {
    height: 28.6px;
  }
}

@media (max-width: 280px) {
  .register-content {
    max-width: 208px;
  }
  
  .welcome-section {
    padding: 10.4px 5.2px;
  }
  
  .form-container {
    padding: 10.4px 7.8px;
  }
}
</style>