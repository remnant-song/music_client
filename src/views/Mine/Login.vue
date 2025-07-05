<!-- 登录 -->
<template>
  <div>
    <PageHeader 
      title="登录" 
      subtitle="欢迎回来"
      @back="goBack"
    />
    <el-form :model="loginForm" ref="loginFormRef" status-icon>
      <div class="bform">
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
            placeholder="用户名/手机号/邮箱"
          />
        </el-form-item>
        <el-form-item prop="password" :rules="rules.passwordRules">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            placeholder="密码"
            @keyup.enter="handleLogin('loginFormRef')"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleLogin('loginFormRef')"
            round
            class="login"
            >登录</el-button
          >
          <span class="toRegister" @click="toRegister">注册</span>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import rules from "../../utils/validator.js";
import PageHeader from '@/components/PageHeader.vue';

export default {
  inject: ["reload"],
  components: { PageHeader },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules,
    };
  },
  methods: {
    handleLogin(loginFormRef) {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: "/mine",
              });
              // 登录成功之后，mine页面刷新一次显示用户名和头像
              this.reload();
            })
            .catch(() => {});
        } else {
          this.$notify.error({
            title: " 错误",
            message: " 请输入正确的用户名密码",
          });
          return false;
        }
      });
    },
    // 返回
    goBack() {
      // this.$router.back(-1);
      this.$router.push({ path: "/mine" });
      this.$refs.loginFormRef.resetFields();
    },
    // 注册
    toRegister() {
      this.$router.push({
        path: "/register",
      });
      this.$refs.loginFormRef.resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
/* 移除旧的导航栏样式 */
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
.toRegister {
  font-size: 12px;
  margin-left: 85px;
  color: #999;
}
</style>