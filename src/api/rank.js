import request from '@/utils/request'


// 获取歌曲排行（推荐歌曲）
export function getSongListRank() {
  return request({
    url: "/music/Recommend",
    method: "get",
  });
}