<!-- 我的 -->
<template>
  <div class="bg">
    <!-- 头像 -->
    <div class="touxiang">
      <div @click="loadingTips">
        <el-upload
          class="uploadImage"
          :action="actionUrl"
          :show-file-list="false"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :before-upload="beforeImgUpload"
          :disabled="!userInfo"
        >
          <div v-if="userInfo">
            <el-image
              :src="
                userInfo.imageUrl
                  ? userInfo.imageUrl
                  : 'https://i.postimg.cc/W3WxBjSD/unload.webp'
              "
              class="headImage"
            ></el-image>
          </div>
          <i v-else class="el-icon-plus uploadIcon"></i>
        </el-upload>
      </div>
      <span @click="editName" ref="nameRef">
        <span v-if="userInfo">{{ userInfo.username }}</span>
        <el-button @click="login" v-else plain size="small">登录</el-button>
      </span>
    </div>
    <!-- 列表 -->
    <div class="list">
      <div
        class="singleList"
        v-for="(item, index) in listTitle"
        :key="item.id"
        @click="jumpPage(item)"
      >
        <el-badge
          :value="unReadMsgNum"
          class="badge"
          type="danger"
          v-if="item.id == 4 && unReadMsgNum"
        >
        </el-badge>
        <i class="icon" :class="item.icon"></i>
        <span> {{ item.title }}</span>
        <i class="brackets el-icon-right"></i>
      </div>
      <!-- 退出登录 -->
      <div class="logout">
        <el-button @click="logout">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { mapState } from "vuex";

export default {
  inject: ["reload"],
  name: "",
  data() {
    return {
      listTitle: [
        {
          id: 1,
          title: "我喜欢的音乐",
          icon: "el-icon-headset",
          value: "likeMusic",
        },
        {
          id: 2,
          title: "收藏歌单",
          icon: "el-icon-star-off",
          value: "collectSongList",
        },
        {
          id: 3,
          title: "创建歌单",
          icon: "el-icon-circle-plus-outline",
          value: "createSongList",
        },
        { 
          id: 4, 
          title: "消息通知", 
          icon: "el-icon-message", 
          value: "message" 
        },
        {
           id: 5,
           title: "设置", 
           icon: "el-icon-setting", 
           value: "setting"
       },
      ],
      actionUrl: process.env.BASE_URL + "/upload/upImage", // 上传图片的目的地址
    };
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.$store.dispatch("gainUnReadMsgNum");
    }
  },
  computed: {
    ...mapState(["unReadMsgNum"]),
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo"));
    },
  },

  methods: {
    jumpPage(item) {
      if (localStorage.getItem("token")) {
        this.$router
          .push({
            path: `/mine/list/${item.value}/${item.title}`,
          })
          .then(() => {
            if (item.id == 4) {
              this.$store.dispatch("modifyAllMsgRead");
              setTimeout(() => {
                this.$store.dispatch("gainUnReadMsgNum");
              }, 500);
            }
          });
      } else {
        this.$message.warning("请先登录");
      }
    },
    // 登录模块
    login() {
      this.$router.push({
        path: "/login",
      });
    },
    // 退出
    logout() {
      if (localStorage.getItem("token")) {
        this.$confirm("确定要退出吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            this.$message.warning("已退出登录");
            // 刷新整个页面，可以移除头像和用户名（缺点：页面会闪一下）
            // this.$router.go(0);
            // 刷新整个页面，可以移除头像和用户名（页面不会闪）
            this.reload();
          })
          .catch((err) => {}); // 需要添加错误捕获，否则报错
      } else {
        ElMessage({
          type: "warning",
          message: "不在登录状态",
        });
      }
    },
    //选择完图片后自动上传，并拿到服务器返回的图片url地址
    handleUploadSuccess(res) {
      this.$store.dispatch("setHeadPic", res.data.url);
      // 增加延时，先执行异步上传，再刷新页面
      setTimeout(() => {
        this.$store.dispatch("gainUserInfo");
      }, 300);
      setTimeout(() => {
        this.reload();
      }, 500);
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
    // 未登录提示
    loadingTips() {
      if (!this.userInfo) {
        this.$message.warning("请先登录");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.bg {
  background-color: rgb(248, 248, 248);
  padding-top: 10px;
}
.touxiang {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-bottom: 20px;
  text-align: center;
  // 上传图片
  .uploadImage {
    width: 100px;
    height: 100px;
    line-height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    .headImage {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  span {
    display: block;
    margin: 10px;
  }
}
.list {
  margin: 10px;
  margin-top: 50px;
  padding-bottom: 30px;
  .singleList {
    position: relative;
    height: 30px;
    padding: 10px;
    background-color: #fff;
    margin-bottom: 20px;
    .icon {
      font-size: 20px;
      margin-right: 10px;
    }
    span {
      font-size: 20px;
    }
    .brackets {
      float: right;
      font-size: 15px;
      margin-right: 5px;
      line-height: 30px;
    }
  }
  .logout {
    margin-top: 40px;
    text-align: center;
  }
}
.badge {
  position: absolute;
  left: 0px;
  top: 5px;
}
</style>