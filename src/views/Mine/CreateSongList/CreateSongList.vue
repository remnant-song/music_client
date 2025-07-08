<!-- 创建歌单  -->
<template>
  <div class="create-songlist-main-container">
    <PageHeader 
      :title="listMessage.name" 
      subtitle="歌单详情"
      @back="goBack"
    />
    <div class="create-songlist-content">
      <div class="songListTitle">
        <div>
          <el-image class="songListImg" :src="listMessage.image"></el-image>
        </div>
        <div class="briefInfoWithBtn">
          <div class="briefInfo">
            <span style="display: block; margin-bottom: 10px; margin-top: 20px">
              <b>创作者：</b>{{ listMessage.username }}
            </span>
            <span class="describe">
              <strong>描述：</strong><span>{{ listMessage.message }}</span>
            </span>
          </div>
          <div class="btn-group">
            <el-button class="addBtn" @click="addBtn" size="mini">添加歌曲</el-button>
            <el-button class="editBtn" type="warning" size="mini" @click="openEditDialog">编辑歌单</el-button>
          </div>
        </div>
      </div>
      <div class="listMain">
        <div class="songList">
          <ul>
            <li v-for="(item, index) in musicList" :key="item.musicId">
              <span @click="jump">{{ item.musicName }}</span>
              <el-icon
                class="deleteIcon"
                @click.stop="deleteMusic(item.musicId)"
              >
                <Delete />
              </el-icon>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 添加歌曲弹窗 -->
    <AddMusic ref="addMusicRef" />

    <el-dialog v-model="showEditDialog" title="编辑歌单" width="90%" class="create-dialog">
      <el-form :model="updateForm" label-width="80px" class="create-form">
        <el-form-item label="歌单名称">
          <el-input v-model="updateForm.name" class="form-input" />
        </el-form-item>
        <el-form-item label="歌单封面">
          <el-upload
            :action="actionUrl"
            :show-file-list="false"
            :before-upload="beforeImgUpload"
            class="upload-image"
          >
            <div class="upload-area">
              <img v-if="updateForm.image" :src="updateForm.image" class="uploaded-pic" />
              <div v-else class="upload-placeholder">
                <el-button>上传封面</el-button>
                <div class="upload-text">点击上传封面</div>
              </div>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="updateForm.tags" class="form-input" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="updateForm.message" class="form-textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showEditDialog = false" class="cancel-btn">取消</el-button>
          <el-button type="primary" @click="submitUpdate" class="create-btn">保存</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="cropperVisible" title="裁剪封面" width="400px">
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
  </div>
</template>

<script>
import AddMusic from "./AddMusic.vue";
import { mapGetters } from "vuex";
import { Delete } from '@element-plus/icons-vue';
import PageHeader from '@/components/PageHeader.vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default {
  data() {
    return {
      showEditDialog: false,
      updateForm: {
        id: '',
        name: '',
        image: '',
        tags: '',
        message: '',
      },
      actionUrl: '/upload/upImage',
      cropperVisible: false,
      cropperImg: '',
    };
  },
  components: { AddMusic, Delete, PageHeader, Cropper },
  watch: {
    "$route.params.listId": {
      immediate: true,
      handler(newValue, oldValue) {
        if (!isNaN(newValue)) {
          this.$store.dispatch(
            "gainSongListDetail",
            newValue ? newValue : oldValue
          );
        }
      },
    },
  },
  computed: {
    ...mapGetters(["listMessage", "musicList"]),
  },
  methods: {
    addBtn() {
      this.$refs.addMusicRef.open(this.$route.params.listId);
    },
    // 返回到创建歌单页面
    goBack() {
      this.$router.push('/mine/createSongList');
    },
    deleteMusic(songId) {
      this.$confirm("确定要移除这个歌曲吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("deleteSong", {
            songId,
            listId: this.$route.params.listId,
          });
          this.$store.dispatch("gainSongListDetail", this.$route.params.listId);
          // this.reload()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    openEditDialog() {
      this.updateForm = {
        id: this.$route.params.listId,
        name: this.listMessage.name,
        image: this.listMessage.image,
        tags: this.listMessage.tags,
        message: this.listMessage.message,
      };
      this.showEditDialog = true;
    },
    handleUploadSuccess(res) {
      // 兼容不同返回结构
      const url = res.url || (res.data && res.data.url) || '';
      this.updateForm.image = url;
      this.$message.success('封面上传成功');
      this.$forceUpdate && this.$forceUpdate();
    },
    handleUploadError() {
      this.$message.error('封面上传失败，请重试');
    },
    beforeImgUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg" || file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$notify.warning({ title: "警告", message: "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片" });
        return false;
      }
      if (!isLt2M) {
        this.$notify.warning({ title: "警告", message: "图片大小必须小于2M" });
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
    cropAndUpload() {
      const cropper = this.$refs.cropper;
      if (cropper && cropper.getResult) {
        const result = cropper.getResult();
        if (result && result.canvas) {
          result.canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('file', blob, 'cover.png');
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
    submitUpdate() {
      this.$store.dispatch('updateMusicList', this.updateForm).then(() => {
        this.showEditDialog = false;
        this.$store.dispatch('gainSongListDetail', this.updateForm.id);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.create-songlist-main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding-bottom: 40px;
  display: flex;
  align-items: flex-start;   /* 顶部对齐 */
  justify-content: center;
}
.create-songlist-content {
  max-width: 480px;
  width: 100%;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 24px 0 rgba(99,102,241,0.10);
  padding: 24px 18px 32px 18px;
  overflow: visible;
  margin-top: 32px;   /* 距离导航栏更近 */
}
.songListTitle {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  background: #f3f6fd;
  border-radius: 18px;
  padding: 18px 12px;
  margin-bottom: 18px;
  .songListImg {
    width: 110px;
    height: 110px;
    border-radius: 20px;
    box-shadow: 0 2px 16px rgba(99,102,241,0.12);
    background: #f3f4f6;
    flex-shrink: 0;
  }
  .briefInfoWithBtn {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    margin-left: 18px;
    min-width: 0;
    .briefInfo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 0;
      flex: 1;
      .describe {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        line-height: 1.5;
        color: #6366f1;
        font-size: 15px;
        word-break: break-all;
      }
      span {
        color: #6366f1;
        font-size: 16px;
        font-weight: bold;
        word-break: break-all;
      }
    }
    .btn-group {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      gap: 8px;
      height: 100%;
    }
    .addBtn {
      background: linear-gradient(90deg, #4FC3F7 0%, #6366f1 100%);
      color: #fff;
      border: none;
      border-radius: 20px;
      font-weight: bold;
      transition: background 0.2s;
    }
    .addBtn:hover {
      background: linear-gradient(90deg, #6366f1 0%, #4FC3F7 100%);
    }
    .editBtn {
      background: linear-gradient(90deg, #6366f1 0%, #4FC3F7 100%);
      color: #fff;
      border: none;
      border-radius: 20px;
      font-weight: bold;
      transition: background 0.2s;
      margin-left: 0;
      margin-top: 0;
    }
    .editBtn:hover {
      background: linear-gradient(90deg, #4FC3F7 0%, #6366f1 100%);
    }
  }
}
.listMain {
  background: #f8fafc;
  border-radius: 16px;
  padding: 18px 12px 10px 12px;
  margin-top: 10px;
  .songList {
    margin-top: 10px;
    background: #f5f7fa;
    border-radius: 16px;
    padding-bottom: 8px;
    ul {
      padding-left: 0;
      padding-top: 0;
    }
    li {
      padding: 0 15px;
      list-style: none;
      font-size: 18px;
      height: 50px;
      line-height: 50px;
      border-radius: 20px;
      background-color: #fafdff;
      margin-top: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 8px rgba(99,102,241,0.04);
      transition: box-shadow 0.2s, background 0.2s;
      cursor: pointer;
    }
    li:first-child {
      margin-top: 0;
    }
    li:hover {
      background: #eaf6ff;
      box-shadow: 0 4px 16px rgba(99,102,241,0.10);
    }
    .deleteIcon {
      color: #ff6b81;
      font-size: 22px;
      margin-left: 10px;
      cursor: pointer;
      transition: color 0.2s;
    }
    .deleteIcon:hover {
      color: #d32f2f;
    }
  }
}
.uploaded-pic {
  max-width: 120px;
  max-height: 120px;
  width: auto;
  height: auto;
  display: block;
  border-radius: 16px;
  object-fit: cover;
  margin: 0 auto;
}
// 编辑歌单弹窗美化
.el-dialog.create-dialog {
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(99,102,241,0.18);
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding: 0 0 18px 0;
  .el-dialog__header {
    border-radius: 24px 24px 0 0;
    background: #6366f1;
    color: #fff;
    padding: 18px 24px 10px 24px;
    font-size: 22px;
    font-weight: bold;
  }
  .el-dialog__body {
    padding: 24px 32px 0 32px;
  }
}
.create-form {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(99,102,241,0.08);
  padding: 18px 12px 8px 12px;
  .el-form-item {
    margin-bottom: 22px;
    .el-form-item__label {
      color: #6366f1;
      font-weight: bold;
      font-size: 16px;
    }
    .form-input, .form-textarea {
      border-radius: 12px;
      border: 1px solid #e0e7ff;
      background: #f8fafc;
      font-size: 15px;
      padding: 8px 12px;
      transition: border 0.2s;
    }
    .form-input:focus, .form-textarea:focus {
      border: 1.5px solid #6366f1;
      background: #fff;
    }
    .form-textarea {
      min-height: 160px; // 再加大高度
      height: 180px;
      width: 100%; // 宽度最大化
      max-width: 100%;
      resize: vertical;
      font-size: 15px;
      border-radius: 12px;
      border: 1px solid #e0e7ff;
      background: #f8fafc;
      padding: 14px 18px;
      box-sizing: border-box;
    }
  }
}
.upload-image {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .upload-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px; // 原140px，改小
    height: 100px; // 原140px，改小
    background: #f3f6fd;
    border-radius: 18px;
    border: 1.5px dashed #6366f1;
    cursor: pointer;
    transition: border 0.2s, box-shadow 0.2s;
    margin: 0 auto;
    &:hover {
      border: 1.5px solid #6366f1;
      box-shadow: 0 2px 12px rgba(99,102,241,0.10);
    }
    .upload-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-button {
        background: linear-gradient(90deg, #4FC3F7 0%, #6366f1 100%);
        color: #fff;
        border-radius: 16px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      .upload-text {
        color: #6366f1;
        font-size: 14px;
        margin-top: 2px;
      }
    }
    .uploaded-pic {
      max-width: 80px; // 原120px，改小
      max-height: 80px; // 原120px，改小
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(99,102,241,0.10);
      object-fit: cover;
      margin: 0 auto;
    }
  }
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  padding: 0 32px 18px 32px;
  .el-button {
    border-radius: 16px;
    font-weight: bold;
    min-width: 90px;
    font-size: 16px;
    padding: 8px 0;
    transition: background 0.2s;
  }
  .cancel-btn {
    background: #f3f6fd;
    color: #6366f1;
    border: none;
  }
  .cancel-btn:hover {
    background: #e0e7ff;
    color: #4FC3F7;
  }
  .create-btn {
    background: linear-gradient(90deg, #6366f1 0%, #4FC3F7 100%);
    color: #fff;
    border: none;
  }
  .create-btn:hover {
    background: linear-gradient(90deg, #4FC3F7 0%, #6366f1 100%);
  }
}
// 裁剪弹窗样式优化
.el-dialog {
  .el-dialog__header {
    font-size: 20px;
    color: #6366f1;
    font-weight: bold;
  }
}
// 移动端适配
@media (max-width: 600px) {
  .create-songlist-content {
    max-width: 98vw;
    padding: 10px 2vw 20px 2vw;
    top: 60px;
  }
  .el-dialog.create-dialog {
    width: 98vw !important;
    .el-dialog__body {
      padding: 10px 2vw 0 2vw;
    }
  }
  .dialog-footer {
    padding: 0 2vw 12px 2vw;
  }
}
// 修正简介输入框区域过小，使用深度选择器确保生效
:deep(.el-textarea__inner) {
  min-height: 144px !important;
  height: 144px !important;
  width: 100% !important;
  max-width: 100% !important;
  resize: vertical;
  font-size: 15px;
  border-radius: 12px;
  border: 1px solid #e0e7ff;
  background: #f8fafc;
  padding: 14px 18px;
  box-sizing: border-box;
}
</style>