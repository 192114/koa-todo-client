import axios from "axios"
import { Dialog } from "vant"
import Cookies from 'js-cookie'

import router from '../routes'

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
        const curFullPath = sessionStorage.getItem('curFullPath') || ''
        router.push({
          path: '/login',
          replace: true,
          query: {
            redirect: encodeURIComponent(curFullPath)
          }
        })
      }
    })
  }

  return data;
});

export default axiosInstance;
