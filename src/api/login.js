// 设置用户头像
export function setHeadImage(iconUrl) {
  return request({
    url: "/setting/setIcon",
    method: "POST",
    params: { iconUrl },
  });
}