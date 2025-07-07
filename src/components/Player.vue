<template>
  <div class="player" v-show="playList.length > 0">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <!--播放页面全屏-->
      <div class="normal-player" v-show="fullScreen">
        <!--背景 模糊-->
        <!-- <div class="background">
          <el-image
            :src="currentSong.imageUrl"
            alt=""
            lazy
            width="100%"
            height="100%"
          ></el-image>
        </div> -->
        <!--顶部-->
        <div class="top">
          <div class="back" @click="back">
            <el-icon class="player-back-icon"><ArrowLeft /></el-icon>
          </div>
          <h1 class="title">{{ currentSong.musicName }}</h1>
          <h2 class="subtitle">{{ currentSong.userName }}</h2>
        </div>
        <!--中间cd部分-->
        <div
          class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img :src="currentSong.imageUrl" alt="" class="image" />
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">
                <!-- {{ playingLyric }} -->
                {{ playingLyric || (currentLyric === null ? '' : '歌词加载中...') }}
              </div>
            </div>
          </div>
          <!--歌词滚动-->
          <scroll
            class="middle-r"
            ref="lyriclist"
            :data="currentLyric && currentLyric.lines"
          >
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  :ref="setLyricLineRef"
                  class="text"
                  v-for="(line, index) in currentLyric.lines"
                  :key="line.key"
                  :class="{ current: currentLineNum === index }"
                >
                  {{ line.txt }}
                </p>
              </div>
            </div>
          </scroll>
        </div>
        <!--底部按钮控制部分-->
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{ active: currentShow === 'cd' }"></span>
            <span
              class="dot"
              :class="{ active: currentShow === 'lyric' }"
            ></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">
              {{ format(currentTime) }}
            </span>
            <!--播放进度条-->
            <div class="progress-bar-wrapper">
              <progress-bar
                :percent="percent"
                @percentChange="onProgressBarChange"
              ></progress-bar>
            </div>
            <span class="time time-r">
              {{ format(currentSong.timelength) }}
            </span>
            <div class="star">
              <el-icon v-if="isLike" style="color: crimson" @click.stop="handleStar(currentSong.musicId)"><StarFilled /></el-icon>
              <el-icon v-else style="color: #fff" @click.stop="handleStar(currentSong.musicId)"><Star /></el-icon>
            </div>
          </div>
          <div class="operators">
            <div class="center-group">
              <div class="icon i-left" :class="disableCls">
                <el-icon @click="prev"><CaretLeft /></el-icon>
              </div>
              <div class="icon i-center" :class="disableCls">
                <el-icon @click="togglePlaying">
                  <VideoPause v-if="playing" />
                  <VideoPlay v-else />
                </el-icon>
              </div>
              <div class="icon i-right" :class="disableCls">
                <el-icon @click="next"><CaretRight /></el-icon>
              </div>
            </div>
            <!-- 播放模式切换按钮 -->
            <div class="icon i-mode" @click="changeMode">
              <img :src="modeIcon" alt="mode" style="width: 0.96em; height: 0.96em; vertical-align: middle;" />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--播放页面小屏 底部-->
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen">
        <div class="icon" @click="open">
          <img
            alt=""
            :src="currentSong.imageUrl"
            width="40"
            height="40"
            :class="cdCls"
          />
        </div>
        <div class="text" @click="open">
          <h2 class="name" v-html="currentSong.musicName"></h2>
          <p class="desc" v-html="currentSong.userName"></p>
        </div>
        <div class="control">
          <div class="control-btn" @click.stop="prev">
            <el-icon><CaretLeft /></el-icon>
          </div>
          <div class="control-btn" @click.stop="togglePlaying">
            <el-icon>
              <VideoPause v-if="playing" />
              <VideoPlay v-else />
            </el-icon>
          </div>
          <div class="control-btn" @click.stop="next">
            <el-icon><CaretRight /></el-icon>
          </div>
        </div>
      </div>
    </transition>
    <audio
      v-if="hasValidAudio"
      ref="audio"
      @play="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="ended"
      @loadstart="onLoadStart"
      @canplay="onCanPlay"
      @loaderror="onLoadError"
    ></audio>
    <!-- 调试信息 -->
    <div v-if="!hasValidAudio" style="display: none;">
      <p>调试信息: 没有有效的音频源</p>
      <p>fullCurrentSong: {{ JSON.stringify(fullCurrentSong) }}</p>
      <p>audioSrc: {{ audioSrc }}</p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { prefixStyle } from "../common/dom";
import ProgressBar from "/src/components/ProgressBar.vue";
import animations from "create-keyframe-animation";
// import ProgressCircle from "/src/components/ProgressCircle.vue";
import { playMode } from "../common/config";
import Lyric from "lyric-parser";
import Scroll from "/src/components/Scroll.vue";
import { playerMixin } from "../common/mixin";
import { ElMessage } from "element-plus";
import { getSongDetailByMusicId } from "../api/songlist";
import { getLyric } from "../api/common";
import { ArrowLeft, Star, StarFilled, CaretLeft, CaretRight, VideoPause, VideoPlay, Refresh, Sort, Shuffle } from '@element-plus/icons-vue';
import { BASE_API } from '../common/config';
const transform = prefixStyle("transform");
const transitionDuration = prefixStyle("transitionDuration");
export default {
  mixins: [playerMixin],
  data() {
    return {
      songReady: false,
      currentTime: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: "cd",
      playingLyric: "",
      lyricLineRefs: [],
      lyricUrl: "", // 歌词地址
      isLike: false, // 歌曲收藏状态
    };
  },
  components: {
    ProgressBar,
    // ProgressCircle,
    Scroll,
    ElMessage,
    ArrowLeft,
    Star,
    StarFilled,
    CaretLeft,
    CaretRight,
    VideoPause,
    VideoPlay,
    Refresh,
    Sort,
    Shuffle,
  },
  // 滑动touch
  created() {
    console.log(transform)
    console.log(transitionDuration)
    this.touch = {};
  },
  mounted() {
    // 监听浏览器返回按钮，当在播放界面时关闭播放界面
    window.addEventListener('popstate', this.handlePopState);
    
    // 初始化音频源
    this.$nextTick(() => {
      if (this.hasValidAudio) {
        this.loadAudioThroughProxy();
      }
    });
  },
  beforeUnmount() {
    // 移除事件监听器
    window.removeEventListener('popstate', this.handlePopState);
  },

  // 填充歌曲信息 控制歌曲播放
  computed: {
    cdCls() {
      return this.playing ? "play" : "pause";
    },
    playIcon() {
      return this.playing ? "icon-pause" : "icon-play";
    },
    miniIcon() {
      return this.playing ? "icon-pause-mini" : "icon-play-mini";
    },
    disableCls() {
      return this.songReady ? "" : "disable";
    },
    percent() {
      return this.currentTime / this.currentSong.timelength;
    },
    iconMode() {
      return this.mode === playMode.sequence
        ? "icon-sequence"
        : this.mode === playMode.loop
        ? "icon-loop"
        : "icon-random";
    },
    modeIcon() {
      switch (this.mode) {
        case playMode.sequence: return require('@/assets/image/orader.svg');
        case playMode.loop: return require('@/assets/image/circulation.svg');
        case playMode.random: return require('@/assets/image/random.svg');
        default: return require('@/assets/image/orader.svg');
      }
    },
    // 获取完整的歌曲信息，优先使用详情中的信息
    fullCurrentSong() {
      const songDetail = this.songDetailByMusicId;
      const currentSong = this.currentSong;
      
      console.log('fullCurrentSong计算:', {
        songDetail,
        currentSong,
        songDetailMusicId: songDetail?.musicId,
        currentSongMusicId: currentSong?.musicId
      });
      
      // 如果详情中有完整信息，使用详情
      if (songDetail && songDetail.musicId === currentSong.musicId) {
        const mergedSong = { ...currentSong, ...songDetail };
        console.log('合并后的歌曲信息:', mergedSong);
        return mergedSong;
      }
      
      console.log('使用原始歌曲信息:', currentSong);
      return currentSong;
    },
    audioSrc() {
      // 处理音乐文件URL，确保使用正确的路径
      console.log('audioSrc计算 - fullCurrentSong:', this.fullCurrentSong);
      
      if (!this.fullCurrentSong || !this.fullCurrentSong.musicUrl) {
        console.warn('音乐URL为空:', this.fullCurrentSong);
        // 临时测试：使用一个已知存在的MP3文件
        return '';
      }
      
      let finalUrl = this.fullCurrentSong.musicUrl;
      console.log('原始musicUrl:', finalUrl);
      
      // 如果URL已经是完整路径，直接返回
      if (finalUrl.startsWith('http')) {
        console.log('使用完整URL:', finalUrl);
        return finalUrl;
      }
      
      // 如果是相对路径，确保以/开头
      if (finalUrl.startsWith('/')) {
        console.log('使用相对路径:', finalUrl);
        return finalUrl;
      }
      
      // 否则添加/前缀
      finalUrl = '/' + finalUrl;
      console.log('处理后的URL:', finalUrl);
      return finalUrl;
    },
    hasValidAudio() {
      const hasSong = !!this.fullCurrentSong;
      const hasMusicUrl = !!(this.fullCurrentSong && this.fullCurrentSong.musicUrl);
      const hasAudioSrc = !!this.audioSrc;
      
      console.log('hasValidAudio检查:', {
        hasSong,
        hasMusicUrl,
        hasAudioSrc,
        fullCurrentSong: this.fullCurrentSong,
        audioSrc: this.audioSrc
      });
      
      return hasSong && hasMusicUrl && hasAudioSrc;
    },
    ...mapGetters(["fullScreen", "playing", "currentIndex", "mode"]),
  },
  watch: {
    currentSong(newSong, oldSong) {
      // 当列表没有歌曲时 直接return
      if (!newSong.musicId) return;

      if (newSong === oldSong) {
        return;
      }
      
      console.log('当前歌曲变化:', {
        newSong,
        oldSong,
        musicUrl: newSong.musicUrl
      });
      
      // 检查是否有有效的音频URL
      if (!newSong.musicUrl) {
        console.error('当前歌曲没有音频URL:', newSong);
        this.$message.error('该歌曲暂无音频文件，无法播放');
        return;
      }
      
      // 根据musicId获取音乐详情
      getSongDetailByMusicId(newSong.musicId).then((res) => {
        if (res.code == "50") {
          ElMessage({
            type: "error",
            message: res.message,
          });
          return;
        } else if (res.code == "20") {
          this.lyricUrl = res.data.music.lyric;
          this.isLike = res.data.music.isLike;
        }
      });

      // 通过代理加载音频
      this.$nextTick(() => {
        if (this.hasValidAudio) {
          this.loadAudioThroughProxy();
        }
      });

      // 防止歌词切换跳动
      if (this.currentLyric) {
        this.currentLyric.stop();
        this.currentLyric = null;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (this.$refs.audio) {
          this.$refs.audio.play();
          this.gainLyric();
        }
      }, 1000);
      this.currentLineNum = 0;
      this.playingLyric = "";
    },
    audioSrc(newSrc, oldSrc) {
      console.log('音频源变化:', {
        newSrc,
        oldSrc,
        currentSong: this.currentSong
      });
    },
    playing(newPlaying) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        if (audio && this.hasValidAudio) {
          newPlaying ? audio.play() : audio.pause();
        }
      });
    },
  },
  methods: {
    handleStar(musicId) {
      if (localStorage.getItem("token")) {
        this.currentSong.isLike = !this.currentSong.isLike;
        this.isLike = !this.isLike;
        if (this.isLike) {
          this.$store.dispatch("addLikeSong", musicId);
        } else {
          this.$store.dispatch("removeLikeMusic", musicId);
        }
      } else {
        this.$message.warning("请先登录");
      }
    },
    // 监听progressBar派发的事件
    onProgressBarChange(percent) {
      const currentTime = this.currentSong.timelength * percent;
      this.$refs.audio.currentTime = currentTime;
      if (!this.playing) {
        this.togglePlaying();
      }
      // 点击或滑动 歌曲进度条 歌词滚动到对应的位置
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    setLyricLineRef(el) {
      this.lyricLineRefs.push(el);
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    // 格式化时间
    format(interval) {
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    // 解析歌词 使用lyric-parser库
    gainLyric() {
      getLyric(this.lyricUrl)
        .then((res) => {
          this.currentLyric = new Lyric(res.data, this.handleLyric);
          if (this.playing) {
            this.currentLyric.play();
          }
        })
        .catch(() => {
          this.currentLyric = null;
          this.currentLineNum = 0;
          this.playingLyric = "";
        });
    },

    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.lyricLineRefs[lineNum - 5];
        this.$refs.lyriclist.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyriclist.scrollTo(0, 0, 1000);
      }
      this.playingLyric = txt;
    },
    // 防止快速点击 产生错误
    ready() {
      this.songReady = true;
      console.log('音频加载成功:', this.audioSrc);
    },
    error(e) {
      this.songReady = true;
      console.error('音频加载失败:', {
        src: this.audioSrc,
        currentSong: this.currentSong,
        error: e
      });
      
      // 显示错误提示
      this.$message.error('音频文件加载失败，请检查网络连接或联系管理员');
    },
    onLoadStart() {
      console.log('音频开始加载:', this.audioSrc);
    },
    onCanPlay() {
      console.log('音频可以播放:', this.audioSrc);
    },
    onLoadError(e) {
      console.error('音频加载错误:', {
        src: this.audioSrc,
        error: e
      });
    },
    // 通过代理获取音频文件
    async loadAudioThroughProxy() {
      if (!this.audioSrc) {
        console.error('音频源为空');
        return;
      }
      
      try {
        console.log('通过代理加载音频:', this.audioSrc);
        
        // 构建完整的后端URL
        const backendUrl = `${BASE_API}${this.audioSrc}`;
        // const backendUrl = `http://192.168.2.7:8007${this.audioSrc}`;
        console.log('完整后端URL:', backendUrl);
        
        // 直接设置音频源为后端URL
        if (this.$refs.audio) {
          this.$refs.audio.src = backendUrl;
          console.log('音频加载成功，直接使用后端URL:', backendUrl);
        }
        
      } catch (error) {
        console.error('设置音频源失败:', error);
        this.$message.error('音频文件加载失败，请检查网络连接');
      }
    },
    // 歌曲前进后退
    prev() {
      if (!this.songReady) {
        return;
      }
      if (this.playList.length === 1) {
        this.loop();
      } else {
        let index;
        if (this.mode === playMode.random) {
          // 随机模式
          do {
            index = Math.floor(Math.random() * this.playList.length);
          } while (index === this.currentIndex && this.playList.length > 1);
        } else {
          // 顺序/循环
          index = this.currentIndex - 1;
          if (index < 0) {
            index = this.playList.length - 1;
          }
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
      this.songReady = false;
    },
    next() {
      if (!this.songReady) {
        return;
      }
      if (this.playList.length === 1) {
        this.loop();
      } else {
        let index;
        if (this.mode === playMode.random) {
          // 随机模式
          do {
            index = Math.floor(Math.random() * this.playList.length);
          } while (index === this.currentIndex && this.playList.length > 1);
        } else {
          // 顺序/循环
          index = this.currentIndex + 1;
          if (index === this.playList.length) {
            index = 0;
          }
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
      this.songReady = false;
    },
    ended() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();

      // 循环播放 歌词回到开始的时候
      if (this.currentLyric) {
        this.currentLyric.seek(0);
      }
    },
    back() {
      this.setFullScreen(false);
    },
    handlePopState(event) {
      // 如果当前在播放界面，关闭播放界面而不是返回上一页
      if (this.fullScreen) {
        this.setFullScreen(false);
        // 阻止默认的返回行为，因为我们只是关闭播放界面
        event.preventDefault();
        return false;
      }
    },

    open() {
      this.setFullScreen(true);
      // 添加历史记录状态，这样手机返回键才能被捕获
      window.history.pushState({ player: 'fullscreen' }, null, window.location.href);
    },
    // 设置playing状态 watch playing的变化 实现播放暂停
    togglePlaying() {
      if (!this.songReady) {
        return;
      }
      this.setPlayingState(!this.playing);

      // 歌词随着歌曲播放暂停而滚动或暂停滚动
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },

    middleTouchStart(e) {
      this.touch.initiated = true;
      // 用来判断是否是一次移动
      this.touch.moved = false;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
    },
    middleTouchMove(e) {
      // 没有touchstart 返回
      if (!this.touch.initiated) {
        return;
      }
      const touch = e.touches[0];
      const deltaX = touch.pageX - this.touch.startX;
      const deltaY = touch.pageY - this.touch.startY;
      // y轴距离大于x轴距离 => 纵向滚动 => 返回
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }
      if (!this.touch.moved) {
        this.touch.moved = true;
      }
      const left = this.currentShow === "cd" ? 0 : -window.innerWidth;
      // 滚动的距离  最大是0
      const offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + deltaX)
      );
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
      this.$refs.lyriclist.$el.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.lyriclist.$el.style[transitionDuration] = 0;
      this.$refs.middleL.style.opacity = 1 - this.touch.percent;
      this.$refs.middleL.style[transitionDuration] = 0;
    },
    middleTouchEnd() {
      if (!this.touch.moved) {
        return;
      }
      let offsetWidth;
      let opacity;
      if (this.currentShow === "cd") {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth;
          opacity = 0;
          this.currentShow = "lyric";
        } else {
          offsetWidth = 0;
          opacity = 1;
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0;
          this.currentShow = "cd";
          opacity = 1;
        } else {
          offsetWidth = -window.innerWidth;
          opacity = 0;
        }
      }
      // 动画缓冲时间
      const time = 300;
      this.$refs.lyriclist.$el.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.lyriclist.$el.style[transitionDuration] = `${time}ms`;
      this.$refs.middleL.style.opacity = opacity;
      this.$refs.middleL.style[transitionDuration] = `${time}ms`;
      this.touch.initiated = false;
    },

    // vue transition 动画钩子
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale();

      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`,
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`,
        },
      };

      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 400,
          easing: "linear",
        },
      });

      animations.runAnimation(this.$refs.cdWrapper, "move", done);
    },
    afterEnter() {
      animations.unregisterAnimation("move");
      this.$refs.cdWrapper.style.animation = "";
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = "all 0.4s";
      const { x, y, scale } = this._getPosAndScale();
      this.$refs.cdWrapper.style[
        transform
      ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener("transitionend", done);
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = "";
      this.$refs.cdWrapper.style[transform] = "";
    },
    // vue transition 动画钩子结束

    // 获取动画起始位置
    _getPosAndScale() {
      // 左下角小图片初始位置
      const targetWidth = 40;
      const paddingLeft = 40;
      const paddingBottom = 30;
      // 中间大图片距离顶部位置
      const paddingTop = 80;
      // 中间图片宽度
      const width = window.innerWidth * 0.8;
      // 缩放尺度
      const scale = targetWidth / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return {
        x,
        y,
        scale,
      };
    },

    // 歌曲列表
    showPlayList() {
      this.$refs.playList.show();
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
    }),
    changeMode() {
      const newMode = (this.mode + 1) % 3;
      this.$store.commit('SET_PLAY_MODE', newMode);
      let msg = '';
      switch (newMode) {
        case playMode.sequence: msg = '顺序播放'; break;
        case playMode.loop: msg = '单曲循环'; break;
        case playMode.random: msg = '随机播放'; break;
      }
      this.$message.success(`已切换为${msg}`);
    },
  },
  beforeUpdate() {
    this.lyricLineRefs = [];
  },
};
</script>
<style scoped>
.star {
  margin-left: 20px;
  display: inline-block;
}
.starIcon {
  font-size: 30px;
}
.player .normal-player {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 300;
  background: #222;
}
.player .normal-player .background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.6;
  filter: blur(20px);
}
.player .normal-player .top {
  position: relative;
  margin-bottom: 25px;
}
.player .normal-player .top .back {
  position: absolute;
  top: 0;
  left: 6px;
  z-index: 50;
}
.player .normal-player .top .back .player-back-icon {
  color: #fff !important;
  font-size: 32px !important;
  vertical-align: middle;
}
.player .normal-player .top .title {
  width: 70%;
  margin: 0 auto;
  line-height: 40px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 18px;
  color: #fff;
}
.player .normal-player .top .subtitle {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  color: #fff;
}
.player .normal-player .middle {
  position: fixed;
  width: 100%;
  top: 80px;
  bottom: 170px;
  white-space: nowrap;
  font-size: 0;
}
.player .normal-player .middle .middle-l {
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 80%;
}
.player .normal-player .middle .middle-l .cd-wrapper {
  position: absolute;
  left: 10%;
  top: 0;
  width: 80%;
  height: 100%;
}
.player .normal-player .middle .middle-l .cd-wrapper .cd {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 10px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}
.player .normal-player .middle .middle-l .cd-wrapper .cd.play {
  animation: rotate 20s linear infinite;
}
.player .normal-player .middle .middle-l .cd-wrapper .cd.pause {
  animation-play-state: paused;
}
.player .normal-player .middle .middle-l .cd-wrapper .cd .image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.player .normal-player .middle .middle-l .playing-lyric-wrapper {
  width: 80%;
  margin: 30px auto 0 auto;
  overflow: hidden;
  text-align: center;
}
.player .normal-player .middle .middle-l .playing-lyric-wrapper .playing-lyric {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}
.player .normal-player .middle .middle-r {
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.player .normal-player .middle .middle-r .lyric-wrapper {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
}
.player .normal-player .middle .middle-r .lyric-wrapper .text {
  line-height: 32px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}
.player .normal-player .middle .middle-r .lyric-wrapper .text.current {
  color: #fff;
}
.player .normal-player .bottom {
  position: absolute;
  bottom: 50px;
  width: 100%;
}
.player .normal-player .bottom .dot-wrapper {
  text-align: center;
  font-size: 0;
}
.player .normal-player .bottom .dot-wrapper .dot {
  display: inline-block;
  vertical-align: middle;
  margin: 0 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
}
.player .normal-player .bottom .dot-wrapper .dot.active {
  width: 20px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
}
.player .normal-player .bottom .progress-wrapper {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  width: 90%;
  margin: 0px auto;
  padding: 10px 0;
}
.player .normal-player .bottom .progress-wrapper .time {
  color: #fff;
  font-size: 12px;
  -ms-flex: 0 0 30px;
  flex: 0 0 30px;
  line-height: 30px;
  width: 30px;
}
.player .normal-player .bottom .progress-wrapper .time.time-l {
  text-align: left;
}
.player .normal-player .bottom .progress-wrapper .time.time-r {
  text-align: right;
}
.player .normal-player .bottom .progress-wrapper .progress-bar-wrapper {
  -ms-flex: 1;
  flex: 1;
}
.player .normal-player .bottom .operators {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  gap: 0;
}
.player .normal-player .bottom .operators .center-group {
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;
  justify-content: center;
  margin-left: 32px;
}
.player .normal-player .bottom .operators .i-mode {
  margin-right: 32px;
  margin-left: 0;
  display: flex;
  align-items: center;
  font-size: 26px;
  cursor: pointer;
  color: #ffcd32;
  transition: color 0.2s;
}
.player .normal-player .bottom .operators .i-mode:hover {
  color: #ffb300;
}
.player .normal-player .bottom .operators .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  cursor: pointer;
  transition: color 0.2s, transform 0.2s;
}
.player .normal-player .bottom .operators .icon:active {
  transform: scale(0.92);
}
.player .normal-player .bottom .operators .i-center {
  font-size: 38px;
  margin: 0 18px;
  color: #4FC3F7;
}
.player .normal-player .bottom .operators .i-left, .player .normal-player .bottom .operators .i-right {
  color: #4FC3F7;
}
.player .normal-player .bottom .operators .icon.disable {
  color: rgba(99, 102, 241, 0.4);
  cursor: not-allowed;
}
.player .normal-player.normal-enter-active,
.player .normal-player.normal-leave-active {
  transition: all 0.4s;
}
.player .normal-player.normal-enter-active .top,
.player .normal-player.normal-leave-active .top,
.player .normal-player.normal-enter-active .bottom,
.player .normal-player.normal-leave-active .bottom {
  transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
}
.player .normal-player.normal-enter,
.player .normal-player.normal-leave-to {
  opacity: 0;
}
.player .normal-player.normal-enter .top,
.player .normal-player.normal-leave-to .top {
  transform: translate3d(0, -100px, 0);
}
.player .normal-player.normal-enter .bottom,
.player .normal-player.normal-leave-to .bottom {
  transform: translate3d(0, 100px, 0);
}
.player .mini-player {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: linear-gradient(135deg, #333 0%, #444 100%);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.1);
}
.player .mini-player.mini-enter-active,
.player .mini-player.mini-leave-active {
  transition: all 0.4s;
}
.player .mini-player.mini-enter,
.player .mini-player.mini-leave-to {
  opacity: 0;
}
.player .mini-player .icon {
  -ms-flex: 0 0 40px;
  flex: 0 0 40px;
  width: 40px;
  padding: 0 10px 0 20px;
}
.player .mini-player .icon img {
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}
.player .mini-player .icon img.play {
  animation: rotate 10s linear infinite;
}
.player .mini-player .icon img.pause {
  animation-play-state: paused;
}
.player .mini-player .text {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex: 1;
  flex: 1;
  line-height: 20px;
  overflow: hidden;
}
.player .mini-player .text .name {
  margin-bottom: 2px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  color: #fff;
  margin: 0;
}
.player .mini-player .text .desc {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 12px;
  margin: 0;
  color: rgba(255, 255, 255, 0.3);
}

.player .mini-player .control {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
}

.player .mini-player .control .control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.player .mini-player .control .control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.player .mini-player .control .control-btn:active {
  transform: scale(0.95);
}

.player .mini-player .control .control-btn .el-icon {
  font-size: 16px;
  color: #fff;
}

.player .mini-player .control .control-btn:nth-child(2) .el-icon {
  font-size: 18px;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.el-message {
  z-index: 999999;
}
.player-back-icon {
  color: #fff !important;
  font-size: 32px !important;
  vertical-align: middle;
}
.operators {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  gap: 0;
}
.operators .center-group {
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;
  justify-content: center;
  margin-left: 32px;
}
.operators .i-mode {
  margin-right: 32px;
  margin-left: 0;
  display: flex;
  align-items: center;
  font-size: 26px;
  cursor: pointer;
  color: #ffcd32;
  transition: color 0.2s;
}
.operators .i-mode:hover {
  color: #ffb300;
}
.operators .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  cursor: pointer;
  transition: color 0.2s, transform 0.2s;
}
.operators .icon:active {
  transform: scale(0.92);
}
.operators .i-center {
  font-size: 38px;
  margin: 0 18px;
  color: #4FC3F7;
}
.operators .i-left, .operators .i-right {
  color: #4FC3F7;
}
.operators .icon.disable {
  color: rgba(99, 102, 241, 0.4);
  cursor: not-allowed;
}
@media (max-width: 600px) {
  .operators .i-mode {
    margin-right: 12px;
    margin-left: 0;
    font-size: 22px;
  }
  .operators .center-group {
    gap: 16px;
    margin-left: 8px;
  }
}
</style>