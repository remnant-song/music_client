// 对axios的二次封装
import axios from "axios";
import { ElMessage } from 'element-plus';


const requests = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
});

// 请求拦截器
requests.interceptors.request.use(
  (config) => {
    // if (localStorage.getItem("token")) {
    //   config.headers = {
    //     Authorization: localStorage.getItem("token"), // 携带权限参数
    //   };
    // }
  if (localStorage.getItem("token")) {         //AIAI
  config.headers.Authorization = localStorage.getItem("token");
  }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
// requests.interceptors.response.use(
//   (res) => {
//     return res.data;
//   },
//   (error) => {
//     return Promise.reject(new Error("faile"));
//   }
// );
// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    console.error('请求失败详情:', error); // 打印完整错误信息
    const message = error.response?.data?.message || error.message || '未知错误';
    ElMessage.error(message); // 使用 Element Plus 提示用户
    return Promise.reject(error); // 向上抛出原始错误对象
  }
);

// 对外暴露
export default requests;