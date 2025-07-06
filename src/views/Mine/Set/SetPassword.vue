<!-- 修改密码 -->
<template>
  <div class="set-password-main-container">
    <PageHeader 
      title="修改密码" 
      subtitle="账户安全"
      @back="goBack"
    />
    
    <div class="set-password-content">
      <!-- 安全提示 -->
      <div class="security-section">
        <div class="security-icon">
          <el-icon :color="'#6366f1'" size="48">
            <Lock />
          </el-icon>
        </div>
        <h3 class="security-title">账户安全</h3>
        <p class="security-desc">定期更换密码，保护您的账户安全</p>
      </div>

      <!-- 密码修改表单 -->
      <div class="form-container">
        <div class="form-header">
          <h3 class="form-title">修改密码</h3>
          <p class="form-subtitle">请输入原密码和新密码</p>
        </div>
        
        <el-form 
          ref="loginFormRef" 
          status-icon 
          :model="password"
          class="password-form"
        >
          <el-form-item label="原密码" prop="oldPassword" :rules="rules.oldPasswordRules">
            <el-input
              type="password"
              v-model="password.oldPassword"
              placeholder="请输入原密码"
              autocomplete="off"
              class="form-input"
              show-password
            />
          </el-form-item>
          
          <el-form-item
            label="新密码"
            prop="newPassword"
            :rules="rules.passwordRules"
          >
            <el-input
              type="password"
              v-model="password.newPassword"
              placeholder="请输入新密码"
              autocomplete="off"
              class="form-input"
              show-password
            />
          </el-form-item>
          
          <el-form-item
            label="确认密码"
            prop="confirmPassword"
            :rules="rules.confirmPasswordRules"
          >
            <el-input
              type="password"
              v-model="password.confirmPassword"
              placeholder="请再次输入新密码"
              autocomplete="off"
              class="form-input"
              show-password
            />
          </el-form-item>
          
          <el-form-item class="form-actions">
            <el-button 
              type="primary" 
              @click="editPassword"
              :loading="changing"
              class="change-btn"
            >
              <el-icon v-if="!changing"><Key /></el-icon>
              修改密码
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Lock, Key } from '@element-plus/icons-vue';
import rules from "../../../utils/validator.js";
import PageHeader from '@/components/PageHeader.vue';

export default {
  name: "",
  components: { Lock, Key, PageHeader },
  data() {
    return {
      password: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      changing: false,
      rules: {
        ...rules,
        oldPasswordRules: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ],
        confirmPasswordRules: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.password.newPassword) {
                callback(new Error('两次输入的密码不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      },
    };
  },
  methods: {
    // 返回
    goBack() {
      this.$router.push('/mine/set');
    },
    editPassword() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.changing = true;
          this.$store.dispatch("editPwd", {
            oldPassword: this.password.oldPassword,
            newPassword: this.password.newPassword,
          }).then(() => {
            this.changing = false;
            this.$message.success("密码修改成功");
            // 清空表单
            this.password.oldPassword = "";
            this.password.newPassword = "";
            this.password.confirmPassword = "";
            this.$refs.loginFormRef.resetFields();
          }).catch(() => {
            this.changing = false;
          });
        } else {
          this.$message.error("请检查输入信息");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.set-password-main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  position: relative;
  overflow-x: hidden;
  touch-action: pan-y;
}

.set-password-content {
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

.security-section {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  padding: 32px 24px;
  margin-bottom: 24px;
  text-align: center;
}

.security-icon {
  margin-bottom: 16px;
}

.security-title {
  font-size: 0.48rem;
  font-weight: 700;
  color: #22223b;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.security-desc {
  font-size: 0.32rem;
  color: #6366f1;
  margin: 0;
  opacity: 0.8;
}

.form-container {
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

.form-header {
  text-align: center;
  margin-bottom: 32px;
  
  .form-title {
    font-size: 0.44rem;
    font-weight: 700;
    color: #22223b;
    margin: 0 0 8px 0;
    line-height: 1.2;
  }
  
  .form-subtitle {
    font-size: 0.32rem;
    color: #6366f1;
    margin: 0;
    opacity: 0.8;
  }
}

.password-form {
  .form-input {
    :deep(.el-input__wrapper) {
      border-radius: 12px;
      border: 2px solid #e0e7ff;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: #6366f1;
      }
      
      &.is-focus {
        border-color: #6366f1;
        box-shadow: 0 0 0 2px rgba(99,102,241,0.1);
      }
    }
  }
  
  :deep(.el-form-item__label) {
    font-size: 0.32rem;
    font-weight: 600;
    color: #22223b;
  }
  
  :deep(.el-form-item__error) {
    font-size: 0.24rem;
    color: #f56c6c;
  }
  
  :deep(.el-form-item.form-actions) {
    .el-form-item__content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.form-actions {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .change-btn {
    border-radius: 12px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border: none;
    padding: 12px 32px;
    font-size: 0.36rem;
    font-weight: 600;
    box-shadow: 0 2px 8px 0 rgba(99,102,241,0.2);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px 0 rgba(99,102,241,0.3);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    .el-icon {
      margin-right: 8px;
    }
  }
}

/* 响应式设计 */
@media (max-width: 480px) {
  .set-password-content {
    padding: 0 10px;
    width: calc(100% - 20px);
    max-width: calc(100% - 20px);
  }
  
  .security-section {
    padding: 24px 20px;
  }
  
  .security-title {
    font-size: 0.4rem;
  }
  
  .security-desc {
    font-size: 0.28rem;
  }
  
  .form-container {
    padding: 20px;
  }
  
  .form-header {
    margin-bottom: 24px;
    
    .form-title {
      font-size: 0.4rem;
    }
    
    .form-subtitle {
      font-size: 0.28rem;
    }
  }
  
  .change-btn {
    padding: 10px 24px;
    font-size: 0.32rem;
  }
}
</style>