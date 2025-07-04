import request from '@/utils/request'
// 设置用户头像
export function setHeadImage(iconUrl) {
  return request({
    url: "/setting/setIcon",
    method: "POST",
    params: { iconUrl },
  });
}

// 登录
export function toLogin(loginInfo) {
  return request({
    url: "/login/login",
    method: "POST",
    data: loginInfo,
  });
}
// 注册
export function toRegister(email, phone, password, role) {
  return request({
    url: "/login/register",
    method: "POST",
    data: { email, phone, password, role },
  });
}

// 修改密码
export function editPassword({ oldPassword, newPassword }) {
  return request({
    url: "/setting/setPassword",
    method: "POST",
    params: { oldPassword, newPassword },
  });
}