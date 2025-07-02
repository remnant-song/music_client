import * as types from "./mutation-types";
import { playMode } from "../common/config";

import { getSongListRank } from '@/api/rank';
import { getRecommendSinger } from "@/api/singer";
import { getSongsByRank } from '@/api/rank'

import { getRecommendList } from '@/api/songlist'

import { setHeadImage } from "@/api/login";
import{getUnReadMsgNum} from "@/api/message";
import{modifyAllRead} from "@/api/message";
import{getUserInfo} from "@/api/mine";
import { collectSongList } from "@/api/songlist";
import { removeMyLikeMusic } from "@/api/mine";
import {getSongDetailByMusicId,} from "../api/songlist";


function findIndex(list, song) {
    return list.findIndex((item) => {
      return item.id === song.id;
    });
  }


  export const gainSongDetailByMusicId = ({ commit }, musicId) => {
    getSongDetailByMusicId(musicId).then((res) => {
      commit(types.SET_SONG_DETAIL_BY_MUSIC_ID, res.data.music);
    });
  };

  // 跳转到音乐播放页面（Player组件）
export const selectPlay = ({ commit, state }, { list, index }) => {
    // 提交设置歌曲列表
    commit(types.SET_SEQUENCE_LIST, list);
    if (state.mode === playMode.random) {
      let randomList = shuffle(list);
      commit(types.SET_PLAYLIST, randomList);
      index = findIndex(randomList, list[index]);
      commit(types.SET_CURRENT_INDEX, index);
    } else {
      // 设置播放列表
      commit(types.SET_PLAYLIST, list);
  
      // 设置当前播放歌曲的索引
      commit(types.SET_CURRENT_INDEX, index);
    }
    // 设置播放器状态 全屏 or 小屏
    commit(types.SET_FULL_SCREEN, true);
  
    // 设置播放状态 播放 or 暂停
    commit(types.SET_PLAYING_STATE, true);
  };
  // 添加到我喜欢的音乐
export const addLikeSong = ({ commit }, musicId) => {
  addLikeMusic(musicId).then((res) => {
    if (res.code == "20") {
      ElMessage({
        type: "success",
        message: "收藏成功",
      });
    } else if (res.code == "50") {
      ElMessage({
        type: "error",
        message: res.message,
      });
    }
  });
};

// 移除我喜欢的歌曲
export const removeLikeMusic = ({ commit }, musicId) => {
  removeMyLikeMusic(musicId).then((res) => {
    if (res.code == "20") {
      ElMessage({
        // type: "success",
        message: "已取消收藏",
      });
    } else if (res.code == "50") {
      ElMessage({
        type: "error",
        message: res.message,
      });
    }
  });
};
//24的
export const gainSongListRank = ({ commit }) => {
  getSongListRank().then((res) => {
    commit(types.SET_SONG_LIST_RANK, res.data);
  });
};

// 获取推荐歌手
export const gainRecommendSinger = ({ commit }) => {
  getRecommendSinger().then((res) => {
    commit(types.SET_RECOMMEND_SINGER, res.data.list);
  });
};
// 根据歌手id查询歌曲
export const gainSongBySingerId = ({ commit }, singerId) => {
  getSongBySingerId(singerId).then((res) => {
    commit(types.SET_SONG_DETAIL_BY_SINGER_ID, res.data);
  });
};


// 根据关键字查询各类排行榜下的歌曲
export const gainSongsByRank = ({ commit }, param) => {
  getSongsByRank(param).then((res) => {
    commit(types.SET_SONGS_BY_RANK, res.data.list);
  });
};


// 获取推荐歌单列表
export const gainRecommendList = ({ commit }) => {
  getRecommendList().then((res) => {
    commit(types.SET_RECOMMEND_LIST, res.data.list);
  });
};
// 根据歌单id获取歌单信息详情
export const gainSongListDetail = ({ commit }, listId) => {
  getSongListDetail(listId).then((res) => {
    if (res.code == "50") {
      commit(types.SET_LEST_MESSAGE, {});
      commit(types.SET_MUSIC_LIST, []);
      ElMessage({
        type: "error",
        message: "歌单已删除，请将该歌单移除收藏列表",
      });
    } else {
      commit(types.SET_LEST_MESSAGE, res.data.listMessage);
      commit(types.SET_MUSIC_LIST, res.data.musicList);
    }
  });
};
// 收藏歌单
export const collectMusicList = ({ commit }, listId) => {
  collectSongList(listId).then((res) => {
    if (res.code == "20") {
      ElMessage({
        type: "success",
        message: res.message,
      });
    } else if (code == "50") {
      ElMessage({
        type: "error",
        message: "收藏失败",
      });
    }
  });
};


// 获取未读消息条数
export const gainUnReadMsgNum = ({ commit }) => {
  getUnReadMsgNum().then((res) => {
    commit(types.SET_UNREAD_MSG_NUM, res.data.unReadMsg);
  });
};
// 修改消息通知为全部已读状态
export const modifyAllMsgRead = ({ commit }) => modifyAllRead();
// 获取用户信息
export const gainUserInfo = ({}) => {
  getUserInfo().then((res) => {
    localStorage.removeItem("userInfo");
    localStorage.setItem("userInfo", JSON.stringify(res.data.user));
  });
};
// 更新用户头像
export const setHeadPic = ({ commit }, iconUrl) => {
  setHeadImage(iconUrl).then((res) => {
    if (res.code == "20") {
      ElMessage({
        type: "success",
        message: res.message,
      });
    }
  });
};