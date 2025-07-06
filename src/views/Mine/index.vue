<!-- 我的 -->
<template>
  <div class="mine-main-container">
    <!-- 头像 -->
    <div class="touxiang-card">
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
              :src="userInfo.imageUrl ? userInfo.imageUrl : 'https://i.postimg.cc/W3WxBjSD/unload.webp'"
              class="headImage"
            ></el-image>
          </div>
          <el-icon v-else class="uploadIcon"><Plus /></el-icon>
        </el-upload>
      </div>
      <span class="mine-username" @click="editName" ref="nameRef">
        <span v-if="userInfo">{{ userInfo.username }}</span>
        <el-button @click="login" v-else plain size="small">登录</el-button>
      </span>
    </div>
    <!-- 列表 -->
    <div class="mine-list-wrapper">
      <div
        class="mine-list-card"
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
        <el-icon class="icon" :color="'#6366f1'">
          <component :is="item.icon" />
        </el-icon>
        <span class="mine-list-title">{{ item.title }}</span>
        <el-icon class="brackets" :color="'#6366f1'"><ArrowRight /></el-icon>
      </div>
      <!-- 退出登录 -->
      <div class="logout">
        <el-button class="logout-btn" @click="logout">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { 
  Plus, 
  Headset, 
  Star, 
  CirclePlus, 
  Message, 
  Setting, 
  ArrowRight 
} from '@element-plus/icons-vue';
import path from "path-browserify";
import { mapState } from "vuex";

export default {
  inject: ["reload"],
  name: "",
  components: {
    Plus,
    Headset,
    Star,
    CirclePlus,
    Message,
    Setting,
    ArrowRight
  },
  data() {
    return {
      listTitle: [
        {
          id: 1,
          title: "我喜欢的音乐",
          icon: "Headset",
          value: "likeMusic",
        },
        {
          id: 2,
          title: "收藏歌单",
          icon: "Star",
          value: "collectSongList",
        },
        {
          id: 3,
          title: "创建歌单",
          icon: "CirclePlus",
          value: "createSongList",
        },
        { 
          id: 4, 
          title: "消息通知", 
          icon: "Message", 
          value: "message" 
        },
        {
           id: 5,
           title: "设置", 
           icon: "Setting", 
           value: "setting"
       },
      ],
      actionUrl: "/upload/upImage", // 上传图片的目的地址
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
            // path: `/mine/list/${item.value}/${item.title}`,
             path: `/mine/list/${item.value}/${item.title}`,
            // consolelog(path)
          })
          .then(() => {
            // console.log(`已跳转到：+${item.value}/${item.title}`);
            // this.$message.success(`正在跳转到 ${item.title}`);
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
.mine-main-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 24px 10px 32px 10px;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  min-height: 100vh;
}
.touxiang-card {
  width: 120px;
  margin: 0 auto 24px auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 0 10px 0;
  position: relative;
}
.uploadImage {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border: 1px dashed #bfcfff;
  border-radius: 50%;
  .headImage {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #f8fafc;
    border: 2.5px solid #e0e7ff;
  }
  .uploadIcon {
    font-size: 24px;
    color: #bfcfff;
  }
}
.mine-username {
  display: block;
  margin: 12px 0 0 0;
  font-size: 0.24rem;
  font-weight: 700;
  color: #6366f1;
  text-align: center;
  letter-spacing: 1px;
  cursor: pointer;
}
.mine-list-wrapper {
  margin: 0;
  margin-top: 32px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.mine-list-card {
  position: relative;
  min-height: 38px;
  padding: 12px 16px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  margin-bottom: 0;
  border: 2px solid transparent;
  transition: box-shadow 0.18s, border 0.18s, background 0.18s;
  cursor: pointer;
}
.mine-list-card:hover {
  border: 2px solid #bfcfff;
  background: #f4f7ff;
}
.icon {
  font-size: 22px;
  margin-right: 12px;
}
.mine-list-title {
  font-size: 0.4rem;
  color: #22223b;
  font-weight: 600;
  flex: 1;
}
.brackets {
  font-size: 15px;
  margin-left: 8px;
  line-height: 1;
}
.logout {
  margin-top: 40px;
  text-align: center;
}
.logout-btn {
  background: linear-gradient(90deg, #bfcfff 0%, #e0e7ff 100%);
  color: #6366f1;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  padding: 8px 32px;
  font-size: 0.4rem;
  box-shadow: 0 2px 8px 0 rgba(191,207,255,0.10);
  transition: background 0.18s, color 0.18s;
}
.logout-btn:hover {
  background: linear-gradient(90deg, #e0e7ff 0%, #bfcfff 100%);
  color: #22223b;
}
.badge {
  position: absolute;
  left: 0px;
  top: 5px;
}
@media (max-width: 480px) {
  .mine-main-container {
    max-width: 100vw;
    padding: 14px 2px 18px 2px;
  }
  .touxiang-card {
    width: 90px;
    padding: 12px 0 6px 0;
    margin: 0 auto 16px auto;
  }
  .uploadImage {
    width: 70px;
    height: 70px;
    line-height: 70px;
    .headImage {
      border-width: 1.5px;
    }
  }
  .mine-username {
    font-size: 0.204rem;
  }
  .mine-list-card {
    padding: 8px 8px;
    border-radius: 10px;
    min-height: 30px;
  }
  .mine-list-title {
    font-size: 0.34rem;
  }
  .icon {
    font-size: 18px;
    margin-right: 8px;
  }
  .logout-btn {
    font-size: 0.34rem;
    padding: 6px 18px;
  }
}
</style>