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

    // 获取歌曲排行榜列表
  [types.SET_SONG_LIST_RANK](state, SongListRank) {
    state.SongListRank = SongListRank;
  },
    // 根据关键字查询各类排行榜下的歌曲
  [types.SET_SONGS_BY_RANK](state, songsByRank) {
    state.songsByRank = songsByRank;
  },


    // 推荐歌单
  [types.SET_RECOMMEND_LIST](state, recommendList) {
    state.recommendList = recommendList;
  },
    // 根据id拿到歌单信息
  [types.SET_LEST_MESSAGE](state, listMessage) {
    state.listMessage = listMessage;
  },
  // 根据歌单id拿到歌曲详细信息
  [types.SET_MUSIC_LIST](state, musicList) {
    state.musicList = musicList;
  },

    // 获取未读消息条数
  [types.SET_UNREAD_MSG_NUM](state, unReadMsgNum) {
    state.unReadMsgNum = unReadMsgNum;
  },


    // 我喜欢的音乐
  [types.SET_LIKE_MUSIC_LIST](state, likeMusicList) {
    state.likeMusicList = likeMusicList;
  },

    // 获取收藏的歌单
  [types.SET_COLLECT_SONG_LIST](state, collectSongList) {
    state.collectSongList = collectSongList;
  },

   // 获取我已经创建的歌单列表
  [types.SET_HAS_SONG_LIST](state, hasSongList) {
    state.hasSongList = hasSongList;
  },

    // 拿到搜索结果
  [types.SET_SEARCH_RESULT](state, searchResult) {
    state.searchResult = searchResult;
  },
 }
 export default mutations;