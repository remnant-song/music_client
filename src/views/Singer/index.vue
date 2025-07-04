<!-- 歌手列表 -->
<template>
  <div class="singer-main-container">
    <div class="singer-list-wrapper">
      <div
        class="singer-card"
        v-for="(item, index) in recommendSinger"
        :key="item.id"
        @click="jump(item)"
      >
        <div class="singer-avatar">
          <el-avatar :size="60" src="#" shape="square">
            <img :src="item.imageUrl" style="border-radius:12px; border:2px solid #6366f1;" />
          </el-avatar>
        </div>
        <div class="singer-info">
          <div class="singer-name">{{ item.username }}</div>
          <div class="singer-desc">{{ item.about }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("gainRecommendSinger");
  },
  computed: {
    ...mapGetters(["recommendSinger"]),
  },
  methods: {
    jump(item) {
      this.$router.push({
        path: `/singer/songs/${item.id}`,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.singer-main-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 10px 32px 10px;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  min-height: 100vh;
}
.singer-list-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0;
}
.singer-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  border: 2px solid transparent;
  background-clip: padding-box;
  padding: 8px 8px 8px 6px;
  transition: box-shadow 0.18s, transform 0.18s, border 0.18s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  min-width: 0;
  max-width: 100%;
  will-change: transform;
}
.singer-card:hover {
  box-shadow: 0 4px 18px 0 rgba(191,207,255,0.18), 0 2px 6px 0 rgba(0,0,0,0.08);
  border: 2px solid #bfcfff;
  transform: scale(1.02);
}
.singer-card:active {
  background: #f8fafc;
  border: 2px solid #e0e7ff;
}
.singer-avatar {
  margin-right: 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-avatar {
  box-shadow: 0 2px 8px 0 rgba(191,207,255,0.10);
  border: 2.5px solid #f0f4ff;
  transition: transform 0.18s, border 0.18s;
  background: #f8fafc;
  border-radius: 12px !important;
}
.singer-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  flex: 1;
}
.singer-name {
  font-size: 0.31875rem;
  font-weight: 700;
  color: #8b95b2;
  letter-spacing: 0.5px;
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.18s;
  line-height: 1.1;
}
.singer-desc {
  font-size: 0.27rem;
  color: #bfcfff;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.1;
}
@media (max-width: 480px) {
  .singer-main-container {
    max-width: 100vw;
    padding: 0 2px 18px 2px;
  }
  .singer-list-wrapper {
    gap: 4px;
  }
  .singer-card {
    padding: 8px 4px 8px 4px;
    border-radius: 12px;
  }
  .singer-name {
    font-size: 0.31875rem;
  }
  .singer-desc {
    font-size: 0.27rem;
  }
}
</style>