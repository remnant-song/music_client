<!-- 消息 -->
<template>
  <div>
    <div class="messageList">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="(item, index) in allMessage"
          :key="item.id"
          :title="item.title"
          :name="index + 1"
          class="minHeight"
        >
          {{ item.msg }}
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      activeName: "1",
    };
  },
  mounted() {
    this.$store.dispatch("gainAllMessage");
  },
  computed: {
    ...mapGetters(["allMessage"]),
  },
};
</script>
<style lang="less" scoped>
.messageList {
  padding-bottom: 25px;
}
.minHeight {
  :deep(.el-collapse-item__header) {
    font-size: 16px;
    margin-bottom: 10px;
  }
}
</style>