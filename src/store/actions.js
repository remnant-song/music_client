import * as types from "./mutation-types";
import { playMode } from "../common/config";

import { getSongListRank } from '@/api/rank';
import { getRecommendSinger } from "@/api/singer";
import { getSongsByRank } from '@/api/rank'
// import { shuffle } from "lodash-es";
import { getRecommendList } from '@/api/songlist'

import { setHeadImage } from "@/api/login";
import{getUnReadMsgNum} from "@/api/message";
import{modifyAllRead} from "@/api/message";
import{getUserInfo} from "@/api/mine";
import { collectSongList } from "@/api/songlist";
import { removeMyLikeMusic } from "@/api/mine";
import {getSongDetailByMusicId,} from "../api/songlist";

import{toLogin} from "@/api/login";
import { addLikeMusic } from "@/api/common";
import{toRegister} from "@/api/login";
import { getSongBySingerId } from "@/api/singer";
import { ElMessage } from "element-plus";
import { getSongListDetail } from "@/api/songlist";
import shuffle from '@/utils/shuffle'
import{getMyLikeMusic} from "../api/mine";
import{getCollectSongList} from "../api/songlist";
import{removeCollectSongList} from "../api/mine";
import{getMySongList} from "../api/mine";
import{createSongList} from "../api/mine";
import{deleteSongList} from "../api/mine";
import{deleteMusic} from "../api/mine";
import{searchSong} from "../api/common";
import{addSong} from "../api/mine";
import{getAllMessage} from "../api/message";
import{settingUserInfo} from "../api/mine";
import{editPassword} from "../api/login";
import { getMainRecommendList } from "@/api/rank";
import{updateSongList} from "../api/mine";
function findIndex(list, song) {
    return list.findIndex((item) => {
      return item.id === song.id;
    });
  }

//主页推荐歌曲
export const gainMainRecommendList = ({ commit }) => {
      getMainRecommendList().then((res) => {
        commit("SET_MAIN_RECOMMEND_LIST", res.data);
      });
  };


  export const gainSongDetailByMusicId = ({ commit }, musicId) => {
    getSongDetailByMusicId(musicId).then((res) => {
      commit(types.SET_SONG_DETAIL_BY_MUSIC_ID, res.data.music);
    });
  };

  // 跳转到音乐播放页面（Player组件）
export const selectPlay = ({ commit, state }, { list, index }) => {
    if (state.mode === playMode.random) {
      let newList = shuffle(list)
      commit('SET_PLAYLIST', newList)
      let song = list[index]
      let newIndex = newList.findIndex(item => item.musicId === song.musicId)
      commit('SET_CURRENT_INDEX', newIndex)
    } else {
      commit('SET_PLAYLIST', list)
      commit('SET_CURRENT_INDEX', index)
    }
    commit('SET_FULL_SCREEN', true)
    commit('SET_PLAYING_STATE', true)
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
    } else if (res.code == "50") {
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


// 登录
export const login = ({ commit }, loginInfo) => {
  return new Promise((resolve, reject) => {
    toLogin(loginInfo).then((res) => {
      if (res.code == "20") {
        ElMessage({
          type: "success",
          message: "登录成功",
        });
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        resolve();
      } else {
        if (res.code == "50") {
          ElMessage({
            type: "error",
            message: res.message,
          });
        }
        reject();
      }
    });
  });
};
// 注册
export const register = ({ commit }, registerForm) => {
  return new Promise((resolve, reject) => {
    toRegister(
      registerForm.email,
      registerForm.phone,
      registerForm.password,
      registerForm.role
    ).then((res) => {
      if (res.code == "20") {
        ElMessage({
          type: "success",
          message: "注册成功！请查看邮箱并激活账号！",
        });
        resolve();
      } else if (res.code == "50") {
        ElMessage({
          type: "error",
          message: res.message,
        });
        reject();
      }
    });
  });
};

// 获取我喜欢的音乐列表
export const gainLikeMusicList = ({ commit }) => {
  getMyLikeMusic().then((res) => {
    commit(types.SET_LIKE_MUSIC_LIST, res.data.likeList);
  });
};

// 获取收藏歌单信息
export const gainCollectSongList = ({ commit }) => {
  getCollectSongList().then((res) => {
    commit(types.SET_COLLECT_SONG_LIST, res.data.list);
  });
};
// 移除收藏的歌单
export const removeCollectMusicList = ({ commit }, listId) => {
  removeCollectSongList(listId).then((res) => {
    if (res.code == "20") {
      ElMessage({
        type: "success",
        message: res.message,
      });
    } else if (res.code == "50") {
      ElMessage({
        type: "error",
        message: res.message,
      });
    }
  });
};

// 获取我已经创建的歌单
export const gainMySongList = ({ commit }) => {
  getMySongList().then((res) => {
    commit(types.SET_HAS_SONG_LIST, res.data.list);
  });
};

// 创建歌单
export const createMusicList = ({ _ }, addForm) => {
  createSongList(
    addForm.name,
    addForm.image,
    addForm.message,
    addForm.tags
  ).then((res) => {
    if (res.code == "20") {
      ElMessage({
        type: "success",
        message: "歌单创建成功",
      });
    }
  });
};

// 更新歌单信息
export const updateMusicList = ({ dispatch }, updateForm) => {
  return updateSongList(
    updateForm.id,
    updateForm.name,
    updateForm.image,
    updateForm.message,
    updateForm.tags
  ).then((res) => {
    if (res.code == 200 || res.code == "20") {
      ElMessage({
        type: "success",
        message: "歌单更新成功",
      });
      // 更新后刷新歌单详情
      dispatch("gainSongListDetail", updateForm.id);
    } else {
      ElMessage.error(res.msg || "歌单更新失败");
    }
    return res;
  }).catch(() => {
    ElMessage.error("歌单更新失败");
  });
};
// 删除歌单
export const deleteMusicList = ({ commit }, listId) => {
  deleteSongList(listId).then((res) => {
    if (res.code == "20") {
      ElMessage({
        type: "success",
        message: res.message,
      });
    } else if (res.code == "50") {
      ElMessage({
        type: "error",
        message: res.message,
      });
    }
  });
};

// 删除歌单中的歌曲
export const deleteSong = ({ commit }, songId, listId) => {
  deleteMusic(songId, listId).then((res) => {
    if (res.code == "20") {
      ElMessage({
        type: "success",
        message: res.message,
      });
    } else if (res.code == "50") {
      ElMessage({
        type: "error",
        message: res.message,
      });
    }
  });
};

// 根据关键字搜索歌曲
export const searchMusic = ({ commit }, keyword) => {
  searchSong(keyword).then((res) => {
    commit(types.SET_SEARCH_RESULT, res.data.list);
  });
};

// 在歌单中添加歌曲
export const addMusic = ({ commit }, songId, listId) => {
  addSong(songId, listId).then((res) => {
    if (res.code == "20") {
      ElMessage({
        type: "success",
        message: res.message,
      });
    } else if (res.code == "50") {
      ElMessage({
        type: "warning",
        message: "歌曲已存在",
      });
    }
  });
};

// 获取所有消息通知
export const gainAllMessage = ({ commit }) => {
  getAllMessage().then((res) => {
    commit(types.SET_ALL_MESSAGE, res.data.msg);
  });
};

// 设置用户信息
export const setUserInfo = ({ commit }, userMessage) => {
  settingUserInfo(
    userMessage.username,
    userMessage.email,
    userMessage.phone,
    userMessage.about
  ).then((res) => {
    if (res.code == "20") {
      ElMessage({
        type: "success",
        message: res.message,
      });
    } else if (res.code == "50") {
      ElMessage({
        type: "error",
        message: res.message,
      });
    }
  });
};

// 修改密码
export const editPwd = ({ commit }, oldPassword, newPassword) => {
  editPassword(oldPassword, newPassword).then((res) => {
    if (res.code == "20") {
      ElMessage({
        type: "success",
        message: res.message,
      });
    } else if (res.code == "50") {
      ElMessage({
        type: "error",
        message: "原密码错误",
      });
    }
  });
};