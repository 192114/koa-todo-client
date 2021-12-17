import axios from "axios"
import { Dialog } from "vant"
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  timeout: 10000,
});

// 请求拦截
axiosInstance.interceptors.request.use();

// 响应拦截
axiosInstance.interceptors.response.use((response) => {
  const { data } = response;
  if (data.code !== 0) {
    Dialog({ message: data.msg }).then(() => {
      if (data.code === 401) {
        Cookies.remove('session_id')
      }
    });
  }

  return data;
});

export default axiosInstance;
