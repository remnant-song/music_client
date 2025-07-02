export const playing = (state) => state.playing;
export const fullScreen = (state) => state.fullScreen;
export const playList = (state) => state.playList;
export const sequenceList = (state) => state.sequenceList;
export const mode = (state) => state.mode;
export const currentIndex = (state) => state.currentIndex;
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {};
};
export const songDetailByMusicId = (state) => state.songDetailByMusicId || {};

// 获取歌曲排行榜列表（推荐歌曲列表）24
export const SongListRank = (state) => state.SongListRank || {};
// 获取推荐歌手
export const recommendSinger = (state) => state.recommendSinger || [];
// 根据歌手id查询歌曲详情
export const songDetailBySingerId = (state) => state.songDetailBySingerId || [];