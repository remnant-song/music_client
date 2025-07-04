<!-- 设置用户信息 -->
<template>
  <div>
    <div class="back" @click="goBack">
      <el-page-header
        :icon="ArrowLeft"
        title="返回"
        content="设置用户信息"
      />
    </div>
    <!-- 个人资料设置 -->
    <div class="selfInfo">
      <el-form :model="userMessage" ref="userInfoRef" label-width="100px">
        <el-form-item label="昵称" prop="username" :rules="rules.usernameRules">
          <el-input
            v-model="userMessage.username"
            style="width: 280px"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :rules="rules.emailRules">
          <el-input v-model="userMessage.email" style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" :rules="rules.phoneRules">
          <el-input
            v-model.number="userMessage.phone"
            style="width: 280px"
          ></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introInfo">
          <el-input
            type="textarea"
            v-model="userMessage.about"
            style="width: 280px"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="saveEdit('userInfoRef')"
            round
            style="margin-left: 75px"
            >保存修改</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { get } from "lodash-es";
import rules from "../../../utils/validator";
import { ArrowLeft } from '@element-plus/icons-vue';

export default {
  components: { ArrowLeft },
  data() {
    return {
      userMessage: {
        username: "",
        email: "",
        phone: "",
        about: "",
      },
      rules, // 封装好的表单验证
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
          this.$store.dispatch("setUserInfo", this.userMessage);
          setTimeout(() => {
            this.$store.dispatch("gainUserInfo");
          }, 1000);
        } else {
          console.log("error save!!");
          return false;
        }
      });
    },
    // 返回
    goBack() {
      this.$router.back();
    },
  },
};
</script>
<style lang="less" scoped>
.selfInfo {
  width: 100%;
  height: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
}
.back {
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 200;
  background-color: #fff;
  width: 100%;
  height: 36px;
  padding-top: 15px;
  margin-left: 10px;
}
</style>