<!-- 选择页面 -->
<template>
  <div>
    <PageHeader 
      :title="headTitle" 
      subtitle="个人中心"
      @back="goBack"
    />
    <MyLike v-if="selectPage == 'likeMusic'" />
    <CollectList v-if="selectPage == 'collectSongList'" />
    <CreateSongList v-if="selectPage == 'createSongList'" />
     <Message v-if="selectPage == 'message'" />
     <Set v-if="selectPage == 'setting'" />
  </div>
</template>

<script>
import MyLike from  "../MyLike/index.vue";
import CollectList from "./CollectList/index.vue";
import CreateSongList from "./CreateSongList/index.vue";
import Message from "./Message/index.vue";
import Set from "./Set/index.vue";
import PageHeader from '@/components/PageHeader.vue';

export default {
  name: "Like",
  components: { MyLike,CollectList,CreateSongList,Message,Set,PageHeader},
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
      this.$router.push('/mine');
    },
  },
};
</script>
<style lang="less" scoped>
/* 移除旧的导航栏样式 */
</style>