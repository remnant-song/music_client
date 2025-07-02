<!-- 歌手列表 -->
<template>
  <div>
    <el-row
      class="singerList"
      v-for="(item, index) in recommendSinger"
      :key="item.id"
      @click="jump(item)"
    >
      <el-col :span="6">
        <el-avatar :size="70" src="#">
          <img :src="item.imageUrl" />
        </el-avatar>
      </el-col>
      <el-col :span="18">
        <p>{{ item.username }}</p>
      </el-col>
    </el-row>
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
.singerList {
  margin-bottom: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  border-bottom: 1px solid #eee;
  p {
    margin: 5px;
    line-height: 70px;
    font-size: 18px;
  }
  p:nth-child(2) {
    color: #999;
  }
}
</style>