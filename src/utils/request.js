import axios from "axios";
import { Dialog } from "vant";

const axiosInstance = axios.create({
  timeout: 10000,
});

// 请求拦截
axiosInstance.interceptors.request.use();

// 响应拦截
axiosInstance.interceptors.response.use((response) => {
  const { data } = response;
  if (data.code !== 0) {
    Dialog({ message: data.msg });
  }

  return data;
});

export default axiosInstance;
