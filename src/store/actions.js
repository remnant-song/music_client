import * as types from "./mutation-types";
import { playMode } from "../common/config";
import {
  getSongDetailByMusicId,
} from "../api/songlist";


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