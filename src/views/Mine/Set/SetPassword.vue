<!-- 修改密码 -->
<template>
  <div>
    <PageHeader 
      title="修改密码" 
      subtitle="账户安全"
      @back="goBack"
    />
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
import PageHeader from '@/components/PageHeader.vue';

export default {
  name: "",
  components: { PageHeader },
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
      this.$router.push('/mine/set');
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
</style>