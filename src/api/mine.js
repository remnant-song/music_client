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