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
      <el-col :span="6" class="rank-img-col">
        <el-image
          style="width: 100px; height: 100px"
          :src="item.imageUrl"
          fit="fill"
          lazy
        />
      </el-col>
      <el-col :span="17" class="rank-content-col">
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
.rank {
  background: #f8fafc;
  min-height: 100vh;
  padding: 0 10px 32px 10px;
}
.rank-list {
  background-color: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(191,207,255,0.10), 0 1px 3px 0 rgba(0,0,0,0.04);
  margin-bottom: 18px;
  color: #000;
  height: 100px;
  border: 2px solid transparent;
  transition: box-shadow 0.18s, border 0.18s;
  cursor: pointer;
}
.rank-list:hover {
  box-shadow: 0 4px 18px 0 rgba(191,207,255,0.18), 0 2px 6px 0 rgba(0,0,0,0.08);
  border: 2px solid #bfcfff;
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
  color: #6366f1;
}
.rank-list h5 {
  margin: 0;
  padding: 0;
  padding-top: 5px;
  padding-left: 15px;
  color: #8b95b2;
  font-weight: 700;
  font-size: 0.3rem;
  margin-bottom: 8px;
}
.rank-list p span {
  color: #bfcfff;
}
.rank-img-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
.rank-content-col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 20px;
  margin-top: 5px;
}
@media (max-width: 600px) {
  .rank-content-col {
    margin-left: 10px;
    margin-top: 3px;
  }
}
</style>