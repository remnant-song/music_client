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

    // 排行榜分类列表
  rankList: [
    {
      id: 1,
      name: "热歌榜",
      imageUrl: "/image/pic1.png",
      value: "hotList",
    },
    {
      id: 2,
      name: "新歌榜",
      imageUrl: "/image/pic2.png",
      value: "newList",
    },
    {
      id: 3,
      name: "推荐榜",
      imageUrl: "/image/pic3.png",
      value: "recommendList",
    },
  ],
    // 获取歌曲排行榜列表（推荐歌曲）
  SongListRank: {},
    // 根据关键字查询各类排行榜下的歌曲
  songsByRank: [],


    // 推荐歌单
  recommendList: [],
    // 根据id拿到歌单信息
  listMessage: {},
  // 根据歌单id拿到歌曲详细信息
  musicList: [],


    // 未读消息条数
  unReadMsgNum: 0,

    // 我喜欢的音乐列表
  likeMusicList: [],
};

export default state;