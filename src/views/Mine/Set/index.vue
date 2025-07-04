<!-- 设置 -->
<template>
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
.list {
  background-color: #fff;
  .singleList {
    height: 30px;
    padding: 10px 20px;
    background-color: rgb(247, 244, 244);
    margin-bottom: 20px;
    border-radius: 20px;
    .icon {
      font-size: 20px;
      margin-right: 20px;
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
</style>