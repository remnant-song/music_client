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

// // 获取歌曲排行榜列表（推荐歌曲列表）25任务需求，和上面24的相同
// export const SongListRank = (state) => state.SongListRank || {};
// 根据关键字查询各类排行榜下的歌曲
export const songsByRank = (state) => state.songsByRank || [];


// 推荐歌单
export const recommendList = (state) => state.recommendList || [];
// 根据id拿到歌单信息
export const listMessage = (state) => state.listMessage || {};

// 根据歌单id拿到歌曲详细信息
export const musicList = (state) => state.musicList || [];

// 我喜欢的音乐列表
export const likeMusicList = (state) => state.likeMusicList || [];

// 收藏歌单信息
export const collectSongList = (state) => state.collectSongList || [];

// 已经创建的歌单列表
export const hasSongList = (state) => state.hasSongList || [];

// 拿到搜索结果
export const searchResult = (state) => state.searchResult || [];

// 所有消息通知
export const allMessage = (state) => state.allMessage || [];