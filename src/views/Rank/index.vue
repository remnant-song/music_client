<!-- 排行榜页面 -->
<template>
  <div class="rank" ref="rank">
    <el-row
      class="rank-list"
      v-for="item in rankList"
      :key="item.id"
      @click="jump(item)"
      :data-id="item.id"
    >
      <el-col :span="6">
        <el-image
          style="width: 100px; height: 100px"
          :src="item.imageUrl"
          fit="fill"
          lazy
        />
      </el-col>
      <el-col :span="17">
        <h5>{{ item.name }}</h5>
        <div v-if="item.id == 1">
          <p v-for="(song, index) in hotMusic" :key="song.musicId">
            {{ index + 1 }} {{ song.musicName }} -
            <span>{{ song.userName }}</span>
          </p>
        </div>
        <div v-if="item.id == 2">
          <p v-for="(song, index) in newMusic" :key="song.musicId">
            {{ index + 1 }} {{ song.musicName }} -
            <span>{{ song.userName }}</span>
          </p>
        </div>
        <div v-if="item.id == 3">
          <p v-for="(song, index) in recommendMusic" :key="song.musicId">
            {{ index + 1 }} {{ song.musicName }} -
            <span>{{ song.userName }}</span>
          </p>
        </div>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("gainSongListRank");
  },
  computed: {
    ...mapState(["rankList"]),
    ...mapGetters(["SongListRank"]),
    hotMusic() {
      return this.SongListRank.hotMusic;
    },
    newMusic() {
      return this.SongListRank.newMusic;
    },
    recommendMusic() {
      return this.SongListRank.recommendMusic;
    },
  },
  methods: {
    //动态路由
    jump(item) {
      this.$router.push({
        path: `/rank/${item.value}`,
      });
    },
  },
};
</script>

<style scoped>
.rank-list {
  background-color: #eee;
  margin-bottom: 20px;
  color: #000;
  height: 100px;
}
.rank-list p,
.rank-list h5 {
  padding-left: 15px;
  line-height: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.rank-list p {
  line-height: 12px;
  font-size: 12px;
}
.rank-list h5 {
  margin: 0;
  padding: 0;
  padding-top: 5px;
  padding-left: 15px;
}
.rank-list p span {
  color: #777;
}
</style>