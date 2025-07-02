import request from "../utils/request";

// 根据musicId获取歌曲信息详情
export function getSongDetailByMusicId(musicId) {
  return request({
    url: "/music/detail",
    method: "get",
    params: { musicId },
  });
}

// 获取推荐歌单
export function getRecommendList() {
  return request({
    url: "/songList/recommendList",
    method: "get",
  });
}
// 根据id获取歌单信息
export function getSongListDetail(listId) {
  return request({
    url: "/songList/select",
    method: "get",
    params: { listId },
  });
}
// 收藏歌单
export function collectSongList(listId) {
  return request({
    url: "/mylike/addList",
    method: "post",
    params: { listId },
  });
}