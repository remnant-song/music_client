<!-- 设置 -->
<template>
  <div class="set-main-bg">
    <div class="list">
      <div
        class="singleList"
        v-for="(item, index) in listTitle"
        :key="item.id"
        @click="jumpPage(item)"
      >
        <i class="icon" :class="item.icon"></i>
        <span>{{ item.title }}</span>
        <i class="brackets el-icon-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      listTitle: [
        {
          id: 1,
          title: "设置个人信息",
          icon: "el-icon-s-custom",
          value: "setInfo",
        },
        {
          id: 2,
          title: "修改密码",
          icon: "el-icon-key",
          value: "editPassword",
        },
      ],
    };
  },
  methods: {
    jumpPage(item) {
      this.$router.push({
        path: `/mine/set/${item.value}`,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.set-main-bg {
  min-height: 100vh;
  /* 浅色渐变背景，保证全屏统一 */
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding: 0 10px 32px 10px;
  display: flex;
  justify-content: center;
}
.list {
  background-color: #fff;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  padding-top: 24px;
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
.singleList {
  min-height: 38px;
  padding: 12px 18px;
  background: #f8fafc;
  margin-bottom: 0;
  border-radius: 18px !important;
  box-shadow: 0 2px 8px 0 rgba(191,207,255,0.08);
  display: flex;
  align-items: center;
  border: 2px solid transparent;
  transition: box-shadow 0.18s, border 0.18s, background 0.18s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 340px;
  max-width: 90vw;
}
.singleList:hover {
  border: 2px solid #bfcfff;
  background: #f4f7ff;
  box-shadow: 0 4px 18px 0 rgba(191,207,255,0.18);
}
.singleList span {
  font-size: 0.45rem;
  color: #22223b;
  font-weight: 600;
  flex: 1;
}
.brackets {
  font-size: 15px;
  margin-left: 8px;
  color: #bfcfff;
  line-height: 1;
}
.logout {
  margin-top: 40px;
  text-align: center;
}
@media (max-width: 480px) {
  .set-main-bg {
    padding: 0 2px 18px 2px;
  }
  .list {
    max-width: 100vw;
    border-radius: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    gap: 8px;
    align-items: center;
  }
  .singleList {
    padding: 8px 8px;
    border-radius: 12px !important;
    min-height: 30px;
    width: 92vw;
    max-width: 98vw;
  }
  .singleList span {
    font-size: 0.382rem;
  }
  .icon {
    font-size: 18px;
    margin-right: 8px;
  }
}
</style>