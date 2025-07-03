
<!-- 创建歌单 -->
<template>
  <div>
    <div class="createSongList">
      <span style="color: grey; float: left"
        >创建歌单（{{ totalList }}个）</span
      >
      <i
         class="el-icon-plus" 
        style="float: right; font-size: 20px;
        background-image:url('image/add.svg') ;
        background-position: center;
        background-size: contain;
         width: 20px; height: 20px;"
        @click="addDialog"
      ></i>
      <!-- 已有歌单列表 -->
      <el-row
        class="songListTitle"
        v-for="(item, index) in hasSongList"
        :key="index"
        @click="jumpPlay(item, index)"
      >
        <el-col :span="8">
          <el-image class="songListImg" :src="item.image"></el-image>
        </el-col>
        <el-col :span="14" class="briefInfo">
          <span
            style="
              display: block;
              margin-bottom: 10px;
              margin-top: 20px;
              font-size: 18px;
            "
            >{{ item.name }}</span
          >
        </el-col>
        <el-col class="deleteIcon" :span="2">
          <i class="el-icon-delete" @click.stop="deleteSongList(item.id)"></i>
        </el-col>
      </el-row>
      <!-- 点击新增后的弹窗 -->
      <el-dialog
        v-model="dialogVisible"
        title="新增"
        width="80%"
        :before-close="handleClose"
      >
        <el-form
          :model="addForm"
          hide-required-asterisk
          ref="addFormRef"
          label-width="70px"
        >
          <el-form-item label="歌单名称">
            <el-input
              v-model.trim="addForm.name"
              autocomplete="off"
              required
            ></el-input>
          </el-form-item>
          <el-form-item label="歌单封面">
            <el-upload
              class="uploadImage"
              :action="actionUrl"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
              :before-upload="beforeImgUpload"
            >
              <el-image
                v-if="addForm.image"
                :src="addForm.image"
                class="pic"
              ></el-image>
              <i v-else class="el-icon-plus uploadIcon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="addForm.tags"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" v-model="addForm.message"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="create">创建</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import * as ElIcons from '@element-plus/icons'
export default {
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
    // totalList() {
    //   return this.hasSongList.length;
    // },
      totalList() {
    return (this.hasSongList || []).length;
  },
  },
  methods: {
    addDialog() {
      this.dialogVisible = true;
      // this.newSongList = "";
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
    //
    // 删除歌单
    deleteSongList(listId) {
      window.event.stopPropagation();
      this.$confirm("确定要移除这个歌单吗？", "提示", {
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
.createSongList {
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 20px;
  padding-bottom: 30px;
  .collect {
    float: right;
    width: 100px;
    height: 30px;
    border-radius: 20px;
    background-color: rgb(240, 204, 204);
    text-align: center;
    i {
      //font-size: 15px;
      font-size: 20px ;
      font-weight: 700;
      color: red;
      margin-right: 5px;
      visibility: visible ;
    }
  }
}
// 上传图片
.uploadImage {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border: 1px dashed #d9d9d9;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-align: center;
  .pic {
    width: 100%;
    height: 100%;
  }
}
.deleteIcon {
  float: right;
  font-size: 20px;
  margin-top: 15px;
}
.songListTitle {
  height: 160px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 20px;
  .songListImg {
    width: 100px;
    height: 100px;
    border-radius: 20px;
  }
  .describe {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    line-height: 1.5;
  }
  .deleteIcon {
    font-size: 30px;
  }
}
</style>