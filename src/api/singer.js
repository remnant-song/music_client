import request from "../utils/request";
// 获取推荐歌手
export function getRecommendSinger() {
  return request({
    url: "/music/getRecommendSinger",
    method: "get",
  });
}
// 根据歌手id查询歌曲
export function getSongBySingerId(id) {
  return request({
    url: "/music/singerDetails",
    method: "get",
    params: { id },
  });
}