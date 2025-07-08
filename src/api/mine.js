import request from '@/utils/request'
// 移除我喜欢的歌曲
export function removeMyLikeMusic(musicId) {
    return request({
      url: "/mylike/remove",
      method: "post",
      params: { musicId },
    });
  }

// 获取用户信息
export function getUserInfo() {
  return request({
    url: "/login/getInfo",
    method: "get",
  });
}

// 获取我喜欢的音乐
export function getMyLikeMusic() {
  return request({
    url: "/mylike/getMyLike",
    method: "get",
  });
}

// 移除收藏的歌单
export function removeCollectSongList(listId) {
  return request({
    url: "/mylike/removeList",
    method: "post",
    params: { listId },
  });
}

// 获取我已经创建的歌单
export function getMySongList() {
  return request({
    url: "/songList/getMySongList",
    method: "get",
  });
}

// 创建歌单
export function createSongList(name, image, message, tags) {
  return request({
    url: "/songList/create",
    method: "post",
    data: { name, image, message, tags },
  });
}


// 更新歌单信息
export function updateSongList(id, name, image, message, tags) {
  return request({
    url: "/songList/update",
    method: "post",
    data: { id, name, image, message, tags },
  });
}
// 删除歌单
export function deleteSongList(listId) {
  return request({
    url: "/songList/removeSongList",
    method: "post",
    params: { listId },
  });
}

// 删除歌单中的歌曲
export function deleteMusic({ songId, listId }) {
  return request({
    url: "/songList/removeSong",
    method: "post",
    params: { songId, listId },
  });
}

// 在歌单中添加歌曲
export function addSong({ songId, listId }) {
  return request({
    url: "/songList/addSong",
    method: "post",
    params: { songId, listId },
  });
}

export function settingUserInfo(username, emial, phone, about) {
  return request({
    url: "/setting/setMessage",
    method: "post",
    data: { username, emial, phone, about },
  });
}
