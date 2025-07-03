import request from '@/utils/request'
export function getLyric(lyricUrl) {
 return axios.get(lyricUrl);
}
// 添加到我喜欢的音乐
export function addLikeMusic(musicId) {
    return request({
      url: "/mylike/add",
      method: "post",
      params: { musicId },
    });
  }

  // 歌曲搜索
export function searchSong(keyword) {
  return request({
    url: "music/search",
    method: "get",
    params: { keyword },
  });
}