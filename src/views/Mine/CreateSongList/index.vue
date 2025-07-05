<!-- 创建歌单 -->
<template>
  <div class="create-main-container">
    <div class="create-content">
            <!-- 统计和操作栏 -->
      <div class="stats-section">
        <div class="stats-card">
          <div class="stats-icon">
            <el-icon :color="'#6366f1'">
              <FolderAdd />
            </el-icon>
          </div>
          <div class="stats-info">
            <h3 class="stats-number">{{ totalList }}</h3>
            <p class="stats-label">我的歌单</p>
          </div>
          <div class="stats-actions">
            <div class="action-content">
              <h3 class="action-title">创建歌单</h3>
              <p class="action-subtitle">管理你的音乐收藏</p>
            </div>
          </div>
          <el-icon
            class="add-icon"
            @click="addDialog"
          >
            <Plus />
          </el-icon>
        </div>
      </div>

      <!-- 歌单列表 -->
      <div class="playlist-container">
        <div class="playlist-list">
          <div
            class="playlist-item"
            v-for="(item, index) in hasSongList"
            :key="index"
            @click="jumpPlay(item, index)"
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
              <p class="playlist-desc">点击编辑歌单</p>
            </div>
            
            <div class="playlist-actions">
              <el-icon
                class="delete-icon"
                @click.stop="deleteSongList(item.id)"
              >
                <Delete />
              </el-icon>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-if="(hasSongList || []).length === 0" class="empty-state">
          <div class="empty-icon">
            <el-icon :color="'#6366f1'" size="60">
              <FolderAdd />
            </el-icon>
          </div>
          <h3 class="empty-title">还没有创建的歌单</h3>
          <p class="empty-desc">点击右上角按钮创建你的第一个歌单</p>
        </div>
      </div>

      <!-- 创建歌单弹窗 -->
      <el-dialog
        v-model="dialogVisible"
        title="创建新歌单"
        width="90%"
        :before-close="handleClose"
        class="create-dialog"
      >
        <el-form
          :model="addForm"
          hide-required-asterisk
          ref="addFormRef"
          label-width="80px"
          class="create-form"
        >
          <el-form-item label="歌单名称" required>
            <el-input
              v-model.trim="addForm.name"
              autocomplete="off"
              placeholder="请输入歌单名称"
              class="form-input"
            ></el-input>
          </el-form-item>
          
          <el-form-item label="歌单封面">
            <el-upload
              class="upload-image"
              :action="actionUrl"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
              :before-upload="beforeImgUpload"
            >
              <div class="upload-area">
                <el-image
                  v-if="addForm.image"
                  :src="addForm.image"
                  class="uploaded-pic"
                  fit="cover"
                ></el-image>
                <div v-else class="upload-placeholder">
                  <el-icon :color="'#6366f1'" size="32">
                    <Plus />
                  </el-icon>
                  <p class="upload-text">点击上传封面</p>
                </div>
              </div>
            </el-upload>
          </el-form-item>
          
          <el-form-item label="标签">
            <el-input 
              v-model="addForm.tags"
              placeholder="请输入标签，用逗号分隔"
              class="form-input"
            ></el-input>
          </el-form-item>
          
          <el-form-item label="简介">
            <el-input 
              type="textarea" 
              v-model="addForm.message"
              placeholder="请输入歌单简介"
              :rows="3"
              class="form-textarea"
            ></el-input>
          </el-form-item>
        </el-form>
        
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false" class="cancel-btn">取消</el-button>
            <el-button type="primary" @click="create" class="create-btn">创建</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Plus, Delete, FolderAdd, Picture } from '@element-plus/icons-vue';

export default {
  components: { Plus, Delete, FolderAdd, Picture },
  inject: ["reload"],
  name: "",
  data() {
    return {
      dialogVisible: false, // 控制新增页面的显示
      addForm: {
        name: "",
        image: "",
        message: "",
        tags: "",
      },
      actionUrl: process.env.BASE_URL + "/upload/upImage", // 上传图片的目的地址
    };
  },
  mounted() {
    this.$store.dispatch("gainMySongList");
  },
  computed: {
    ...mapState(["hasSongList"]),
    totalList() {
      return (this.hasSongList || []).length;
    },
  },
  methods: {
    addDialog() {
      this.dialogVisible = true;
    },
    // 每次关闭表单的时候重置表单
    handleClose() {
      this.$refs.addFormRef.resetFields();
      this.dialogVisible = false;
    },
    create() {
      this.$store.dispatch("createMusicList", this.addForm);
      this.dialogVisible = false;
      setTimeout(() => {
        this.$store.dispatch("gainMySongList");
        this.reload();
      }, 500);
    },
    jumpPlay(item, index) {
      this.$router.push({
        path: `/createSongList/${item.id}`,
      });
    },
    //选择完图片后自动上传，并拿到服务器返回的图片url地址
    handleUploadSuccess(res) {
      this.$message.success("上传成功");
      this.addForm.image = res.data.url;
    },
    handleUploadError() {
      this.$message.error("上传失败，请重试");
    },
    // 对上传的文件类型及大小进行限制
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
      }
      if (!isLt2M) {
        this.$notify.warning({
          title: "警告",
          message: "图片大小必须小于2M",
        });
      }
      return isJPG && isLt2M;
    },
    // 删除歌单
    deleteSongList(listId) {
      window.event.stopPropagation();
      this.$confirm("确定要删除这个歌单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("deleteMusicList", listId);
          setTimeout(() => {
            this.$store.dispatch("gainMySongList");
            this.$store.dispatch("gainRecommendList"); // 获取推荐歌单
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
.create-main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding: 24px 10px 32px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.create-content {
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
}

.stats-section {
  margin-bottom: 24px;
}

.stats-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
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
  flex-shrink: 0;
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

.stats-actions {
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: flex-end;
}

.action-content {
  text-align: right;
}

.action-title {
  font-size: 0.5rem;
  font-weight: 700;
  color: #22223b;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.action-subtitle {
  font-size: 0.32rem;
  color: #6366f1;
  margin: 0;
  opacity: 0.8;
}



.add-icon {
  font-size: 24px;
  color: #6366f1;
  opacity: 0.8;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 12px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.1);
  
  &:hover {
    opacity: 1;
    transform: scale(1.1);
    background: rgba(99, 102, 241, 0.2);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.playlist-container {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  padding: 24px;
  overflow: hidden;
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
  font-size: 0.4rem;
  font-weight: 600;
  color: #22223b;
  margin: 0 0 8px 0;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-desc {
  font-size: 0.32rem;
  color: #6366f1;
  margin: 0;
  opacity: 0.8;
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

/* 弹窗样式 */
.create-dialog {
  :deep(.el-dialog) {
    border-radius: 20px;
    overflow: hidden;
  }
  
  :deep(.el-dialog__header) {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: #fff;
    padding: 20px 24px;
    
    .el-dialog__title {
      color: #fff;
      font-weight: 600;
    }
  }
  
  :deep(.el-dialog__body) {
    padding: 24px;
  }
  
  :deep(.el-dialog__footer) {
    padding: 16px 24px 24px;
    border-top: 1px solid #f1f5ff;
  }
}

.create-form {
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
}

.upload-image {
  .upload-area {
    width: 120px;
    height: 120px;
    border: 2px dashed #e0e7ff;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #f8fafc;
    
    &:hover {
      border-color: #6366f1;
      background: #f4f7ff;
    }
  }
  
  .uploaded-pic {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    object-fit: cover;
  }
  
  .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    
    .upload-text {
      font-size: 0.28rem;
      color: #6366f1;
      margin: 0;
    }
  }
}

.dialog-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  
  .cancel-btn {
    border-radius: 12px;
    border: 2px solid #e0e7ff;
    color: #6366f1;
    
    &:hover {
      border-color: #6366f1;
      background: rgba(99,102,241,0.05);
    }
  }
  
  .create-btn {
    border-radius: 12px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border: none;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px 0 rgba(99,102,241,0.3);
    }
  }
}

/* 响应式设计 */
@media (max-width: 480px) {
  .create-content {
    padding: 0 10px;
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
  
  .upload-image .upload-area {
    width: 100px;
    height: 100px;
  }
}
</style>