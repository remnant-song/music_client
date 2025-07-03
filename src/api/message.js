import request from '@/utils/request'
// 获取未读消息条数
export function getUnReadMsgNum() {
  return request({
    url: "/msg/getCount",
    method: "get",
  });
}
  // 将所有消息变为已读
export function modifyAllRead() {
  return request({
    url: "/msg/readMsg",
    method: "post",
  });
}

// 获取所有消息
export function getAllMessage() {
  return request({
    url: "/msg/getMsg",
    method: "get",
  });
}