<!-- 设置用户信息 -->
<template>
  <div class="set-info-main-container">
    <PageHeader 
      title="个人信息" 
      subtitle="编辑个人资料"
      @back="goBack"
    />
    
    <div class="set-info-content">
      <!-- 头像区域 -->
      <div class="avatar-section">
        <div class="avatar-container">
          <el-upload
            class="avatar-upload"
            :action="actionUrl"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :before-upload="beforeImgUpload"
          >
            <el-avatar 
              :size="120" 
              :src="userInfo?.imageUrl || '/image/pic1.png'"
              class="user-avatar"
            />
            <div class="avatar-overlay">
              <el-icon class="upload-icon"><Camera /></el-icon>
            </div>
          </el-upload>
        </div>
        <h3 class="user-name">{{ userMessage.username || '未设置昵称' }}</h3>
      </div>
      <!-- 裁剪弹窗 -->
      <el-dialog v-model="cropperVisible" title="裁剪头像" width="400px">
        <cropper
          :src="cropperImg"
          :stencil-props="{ aspectRatio: 1 }"
          :autoZoom="true"
          :resizeImage="true"
          :image-restriction="'stencil'"
          ref="cropper"
          style="height: 300px; width: 100%;"
        />
        <template #footer>
          <el-button @click="cropperVisible = false">取消</el-button>
          <el-button type="primary" @click="cropAndUpload">确定</el-button>
        </template>
      </el-dialog>
      <!-- 个人资料设置 -->
      <div class="form-container">
        <div class="form-header">
          <h3 class="form-title">基本信息</h3>
          <p class="form-subtitle">完善您的个人资料</p>
        </div>
        
        <el-form 
          :model="userMessage" 
          ref="userInfoRef" 
          label-width="80px"
          class="user-form"
        >
          <el-form-item label="昵称" prop="username" :rules="rules.usernameRules">
            <el-input
              v-model="userMessage.username"
              placeholder="请输入您的昵称"
              class="form-input"
            />
          </el-form-item>
          
          <el-form-item label="邮箱" prop="email" :rules="rules.emailRules">
            <el-input 
              v-model="userMessage.email" 
              placeholder="请输入您的邮箱"
              class="form-input"
            />
          </el-form-item>
          
          <el-form-item label="手机号" prop="phone" :rules="rules.phoneRules">
            <el-input
              v-model.number="userMessage.phone"
              placeholder="请输入您的手机号"
              class="form-input"
            />
          </el-form-item>
          
          <el-form-item label="个人简介" prop="introInfo">
            <el-input
              type="textarea"
              v-model="userMessage.about"
              placeholder="介绍一下自己吧..."
              maxlength="200"
              show-word-limit
              :rows="4"
              class="form-textarea"
            />
          </el-form-item>
        </el-form>
        
        <div class="form-actions">
          <el-button
            type="primary"
            @click="saveEdit('userInfoRef')"
            :loading="saving"
            class="save-btn"
          >
            保存修改
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash-es";
import { Camera, Check } from '@element-plus/icons-vue';
import rules from "../../../utils/validator";
import PageHeader from '@/components/PageHeader.vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default {
  components: { Camera, Check, PageHeader, Cropper },
  data() {
    return {
      userMessage: {
        username: "",
        email: "",
        phone: "",
        about: "",
      },
      rules, // 封装好的表单验证
      saving: false,
      actionUrl: "/upload/upImage", // 上传图片的目的地址
      cropperVisible: false,
      cropperImg: '',
    };
  },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userMessage.username = get(userInfo, "username", "");
    this.userMessage.email = get(userInfo, "email", "");
    this.userMessage.phone = get(userInfo, "phone", "");
    this.userMessage.about = get(userInfo, "about", "");
  },
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo"));
    },
  },
  methods: {
    saveEdit(userInfoRef) {
      this.$refs[userInfoRef].validate((valid) => {
        if (valid) {
          this.saving = true;
          this.$store.dispatch("setUserInfo", this.userMessage);
          setTimeout(() => {
            this.$store.dispatch("gainUserInfo");
            this.saving = false;
            this.$message.success("个人信息保存成功");
          }, 1000);
        } else {
          console.log("error save!!");
          return false;
        }
      });
    },
    // 返回
    goBack() {
      this.$router.push('/mine/set');
    },
    // 头像上传成功
    handleUploadSuccess(res) {
      this.$message.success("头像上传成功");
      this.$store.dispatch("setHeadPic", res.data.url);
      // 立即更新localStorage中的userInfo
      let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
      userInfo.imageUrl = res.data.url;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // 触发视图刷新
      this.$forceUpdate && this.$forceUpdate();
      setTimeout(() => {
        this.$store.dispatch("gainUserInfo");
      }, 300);
    },
    // 头像上传失败
    handleUploadError() {
      this.$message.error("头像上传失败，请重试");
    },
    // 头像上传前验证
    beforeImgUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$notify.warning({
          title: "警告",
          message:
            "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片",
        });
        return false;
      }
      if (!isLt2M) {
        this.$notify.warning({
          title: "警告",
          message: "图片大小必须小于2M",
        });
        return false;
      }
      // 打开裁剪弹窗
      const reader = new FileReader();
      reader.onload = (e) => {
        this.cropperImg = e.target.result;
        this.cropperVisible = true;
      };
      reader.readAsDataURL(file);
      return false; // 阻止 el-upload 自动上传
    },
    // 裁剪并上传
    cropAndUpload() {
      const cropper = this.$refs.cropper;
      if (cropper && cropper.getResult) {
        const result = cropper.getResult();
        if (result && result.canvas) {
          result.canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('file', blob, 'avatar.png');
            this.$http.post(this.actionUrl, formData)
              .then(res => {
                this.handleUploadSuccess(res.data);
                this.cropperVisible = false;
              })
              .catch(() => {
                this.handleUploadError();
                this.cropperVisible = false;
              });
          }, 'image/png');
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.set-info-main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  position: relative;
  overflow-x: hidden;
  touch-action: pan-y;
}

.set-info-content {
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

.avatar-section {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  padding: 32px 24px;
  margin-bottom: 24px;
  text-align: center;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.avatar-upload {
  cursor: pointer;
  
  .user-avatar {
    border: 4px solid #e0e7ff;
    box-shadow: 0 4px 16px 0 rgba(99,102,241,0.15);
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
      border-color: #6366f1;
    }
  }
}

.avatar-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px 0 rgba(99,102,241,0.3);
  transition: all 0.3s ease;
  
  .upload-icon {
    font-size: 18px;
    color: #fff;
  }
  
  &:hover {
    transform: scale(1.1);
  }
}

.user-name {
  font-size: 0.48rem;
  font-weight: 700;
  color: #22223b;
  margin: 0;
  line-height: 1.2;
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

.user-form {
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
  
  .form-textarea {
    :deep(.el-textarea__inner) {
      border-radius: 12px;
      border: 2px solid #e0e7ff;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: #6366f1;
      }
      
      &:focus {
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
  

}

.form-actions {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .save-btn {
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
  }
}

/* 响应式设计 */
@media (max-width: 480px) {
  .set-info-content {
    padding: 0 10px;
    width: calc(100% - 20px);
    max-width: calc(100% - 20px);
  }
  
  .avatar-section {
    padding: 24px 20px;
  }
  
  .avatar-upload .user-avatar {
    width: 100px !important;
    height: 100px !important;
  }
  
  .avatar-overlay {
    width: 32px;
    height: 32px;
    
    .upload-icon {
      font-size: 16px;
    }
  }
  
  .user-name {
    font-size: 0.4rem;
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
  
  .save-btn {
    padding: 10px 24px;
    font-size: 0.32rem;
  }
}
</style>