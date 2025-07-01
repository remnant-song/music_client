import request from "../utils/request";

// 根据musicId获取歌曲信息详情
export function getSongDetailByMusicId(musicId) {
  return request({
    url: "/music/detail",
    method: "get",
    params: { musicId },
  });
}