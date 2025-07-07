<!-- 消息 -->
<template>
  <div class="message-bg">
    <div class="messageList">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="(item, index) in allMessage.slice().reverse()"
          :key="item.id"
          :name="index + 1"
          class="minHeight message-card"
        >
          <template #title>
            <span :class="item.isread ? 'msg-title-read' : 'msg-title-unread'">{{ item.title }}</span>
          </template>
          <div class="msg-content">{{ item.msg }}</div>
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
.message-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding: 0 10px 32px 10px;
  display: flex;
  justify-content: center;
}
.messageList {
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  padding: 0 12px 25px 12px;
}
.message-card {
  margin-bottom: 18px;
  border-radius: 16px !important;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  border: 2px solid transparent;
  overflow: hidden;
  transition: box-shadow 0.18s, border 0.18s, background 0.18s;
}
.message-card :deep(.el-collapse-item__header) {
  font-size: 0.45rem;
  font-weight: 700;
  color: #b0b6c6;
  background: #f8fafc;
  border-radius: 16px 16px 0 0;
  padding: 14px 18px;
  transition: color 0.18s;
}
.message-card :deep(.el-collapse-item__header.is-active) {
  color: #22223b;
}
.message-card :deep(.el-collapse-item__wrap) {
  background: #fff;
  border-radius: 0 0 16px 16px;
  padding: 0 18px 14px 18px;
}
.message-card:hover {
  border: 2px solid #bfcfff;
  box-shadow: 0 4px 18px 0 rgba(191,207,255,0.18);
}
.msg-content {
  font-size: 0.475rem;
  color: #22223b;
  line-height: 1.7;
  word-break: break-all;
}
.message-card :deep(.el-collapse-item__arrow) {
  margin-right: 12px;
}
@media (max-width: 480px) {
  .message-bg {
    padding: 0 2px 18px 2px;
  }
  .messageList {
    max-width: 100vw;
    padding: 0 4px 18px 4px;
  }
  .message-card {
    border-radius: 10px !important;
    margin-bottom: 10px;
  }
  .message-card :deep(.el-collapse-item__header) {
    font-size: 0.382rem;
    padding: 10px 8px;
    border-radius: 10px 10px 0 0;
  }
  .message-card :deep(.el-collapse-item__wrap) {
    border-radius: 0 0 10px 10px;
    padding: 0 8px 10px 8px;
  }
  .msg-content {
    font-size: 0.4rem;
  }
}
.back {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.back-arrow {
  font-size: 1.2em;
  font-weight: bold;
  margin-right: 4px;
  color: #6366f1;
}
.back-title {
  font-size: 1em;
  font-weight: 600;
  color: #22223b;
  margin-right: 8px;
}
.back-content {
  font-size: 0.9em;
  color: #b0b6c6;
}
.msg-title-unread {
  color: #22223b;
}
.msg-title-read {
  color: #b0b6c6;
}
</style>