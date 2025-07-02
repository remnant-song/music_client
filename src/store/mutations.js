import * as types from "./mutation-types";

const mutations = {
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag;
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag;
  },
  [types.SET_PLAYLIST](state, list) {
    state.playList = list;
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode;
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list;
  },
    [types.SET_SONG_DETAIL_BY_MUSIC_ID](state, songDetailByMusicId) {
    state.songDetailByMusicId = songDetailByMusicId;
  },
    [types.SET_SONG_LIST_RANK](state, SongListRank) {     //24
    state.SongListRank = SongListRank;
  },
    [types.SET_RECOMMEND_SINGER](state, recommendSinger) {
    state.recommendSinger = recommendSinger;
  },
    // 根据歌手id查询歌曲详情
  [types.SET_SONG_DETAIL_BY_SINGER_ID](state, songDetailBySingerId) {
    state.songDetailBySingerId = songDetailBySingerId;
  },  
 }
 export default mutations;