import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 10000,
})

// 请求拦截
axiosInstance.interceptors.request.use()

// 响应拦截
axiosInstance.interceptors.response.use(response => response.data)


export default axiosInstance