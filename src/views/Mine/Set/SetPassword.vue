<!-- 修改密码 -->
<template>
  <div>
    <div class="back" @click="goBack">
      <el-page-header
        :icon="ArrowLeft"
        title="返回"
        content="修改密码"
      />
    </div>
    <el-form ref="loginFormRef" status-icon class="bform" :model="password">
      <el-form-item label="原密码">
        <el-input
          type="password"
          v-model="password.oldPassword"
          autocomplete="off"
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
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="editPassword"
          >修改密码</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import rules from "../../../utils/validator.js";
import { ArrowLeft } from '@element-plus/icons-vue';

export default {
  name: "",
  components: { ArrowLeft },
  data() {
    return {
      password: {
        oldPassword: "",
        newPassword: "",
      },
      rules,
    };
  },
  methods: {
    // 返回
    goBack() {
      this.$router.back();
    },
    editPassword() {
      this.$store.dispatch("editPwd", {
        oldPassword: this.password.oldPassword,
        newPassword: this.password.newPassword,
      });
    },
  },
};
</script>
<style lang="less" scoped>
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
.bform {
  width: 100%;
  height: 100%;
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
}
</style>