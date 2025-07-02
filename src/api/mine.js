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