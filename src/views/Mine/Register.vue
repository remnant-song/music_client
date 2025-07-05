<template>
  <div>
    <PageHeader 
      title="注册" 
      subtitle="创建新账户"
      @back="goBack"
    />
    <el-form
      :model="registerForm"
      ref="registerFormRef"
      status-icon
      class="bform"
    >
      <el-form-item prop="email" :rules="rules.emailRules" label="邮箱">
        <el-input type="text" v-model="registerForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="phone" :rules="rules.phoneRules" label="电话">
        <el-input type="text" v-model="registerForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="password" :rules="rules.passwordRules" label="密码">
        <el-input
          type="password"
          v-model="registerForm.password"
          autocomplete="off"
          @keyup.enter="handleRegister('registerFormRef')"
        />
      </el-form-item>
      <el-form-item prop="role" label="角色" label-width="70px">
        <el-select v-model="registerForm.role" placeholder="请选择角色">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleRegister('registerFormRef')"
          round
          class="login"
          >注册</el-button
        >
        <span class="toLogin" @click="toLogin">去登录</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import rules from "../../utils/validator.js";
import PageHeader from '@/components/PageHeader.vue';

export default {
  components: { PageHeader },
  // inject: ["reload"],
  data() {
    return {
      registerForm: {
        email: "",
        phone: "",
        password: "",
        role: 2, // 1为歌手，2为普通用户
      },
      options: [
        {
          value: 1,
          label: "歌手",
        },
        {
          value: 2,
          label: "普通用户",
        },
      ],
      rules,
    };
  },
  methods: {
    handleRegister(registerFormRef) {
      this.$refs.registerFormRef.validate((valid) => {
        if (valid) {
          this.$store.dispatch("register", this.registerForm);
        }
      });
    },
    // 返回
    goBack() {
      this.$router.push({ path: "/mine" });
      this.$refs.registerFormRef.resetFields();
    },
    // 去登录
    toLogin() {
      this.$router.push({
        path: "/login",
      });
      this.$refs.registerFormRef.resetFields();
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
.toLogin {
  font-size: 12px;
  margin-left: 85px;
  color: #999;
}
</style>