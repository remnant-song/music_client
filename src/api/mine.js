// 移除我喜欢的歌曲
export function removeMyLikeMusic(musicId) {
    return request({
      url: "/mylike/remove",
      method: "post",
      params: { musicId },
    });
  }