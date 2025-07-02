import request from '@/utils/request'


// 获取歌曲排行（推荐歌曲）
export function getSongListRank() {
  return request({
    url: "/music/Recommend",
    method: "get",
  });
}

// 根据关键字查询各类排行榜下的歌曲
export function getSongsByRank(param) {
  return request({
    url: "/music/RecommendList",
    method: "get",
    params: { param },
  });
}