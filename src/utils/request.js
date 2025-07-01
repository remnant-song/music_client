// 对axios的二次封装
import axios from "axios";

const requests = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
});

// 请求拦截器
requests.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers = {
        Authorization: localStorage.getItem("token"), // 携带权限参数
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(new Error("faile"));
  }
);

// 对外暴露
export default requests;