import { mapGetters, mapMutations } from 'vuex'
import { playMode } from '@/common/config'  // 确保导入播放模式配置

export const playerMixin = {
 computed: {
   iconMode() {
     return this.mode === playMode.sequence
       ? "icon-sequence"
       : this.mode === playMode.loop
       ? "icon-loop"
       : "icon-random";
   },
   ...mapGetters(["sequenceList", "playList", "currentSong", "mode"]),
 },
 methods: {
   ...mapMutations({
     setPlayMode: "SET_PLAY_MODE",
     setPlaylist: "SET_PLAYLIST",
     setCurrentIndex: "SET_CURRENT_INDEX",
     setPlayingState: "SET_PLAYING_STATE",
   }),
 },
};