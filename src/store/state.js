import { playMode } from "../common/config";

const state = {
  // 播放状态 Boolean
  playing: false,
  // 播放器全屏 Boolean
  fullScreen: false,
  // 当前歌曲播放列表 Array
  playList: [],
  // 顺序歌曲播放列表 Array
  sequenceList: [],
  // 播放模式 Object
  mode: playMode.sequence,
  // 当前播放歌曲索引
  currentIndex: -1,
  // 根据musicId拿到歌曲详细信息
  songDetailByMusicId: {},

  // 获取歌曲排行榜列表（推荐歌曲）24的
  SongListRank: {},

    // 获取推荐歌手
  recommendSinger: [],
    // 根据歌手id查询歌曲详情
  songDetailBySingerId: [],
};

export default state;