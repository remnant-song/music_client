<!-- 选择页面 -->
<template>
  <div>
    <div class="back" @click="goBack">
      <el-page-header
        icon="el-icon-arrow-left"
        title="返回"
        :content="headTitle"
      />
    </div>
    <MyLike v-if="selectPage == 'likeMusic'" />
    <CollectList v-if="selectPage == 'collectSongList'" />
  </div>
</template>

<script>
import MyLike from  "../MyLike/index.vue";
import CollectList from "./CollectList/index.vue";
export default {
  name: "Like",
  components: { MyLike,CollectList},
  data() {
    return {};
  },
  computed: {
    selectPage() {
      return this.$route.params.value;
    },
    headTitle() {
      return this.$route.params.title;
    },
  },
  methods: {
    goBack() {
      this.$router.back();
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
}
</style>