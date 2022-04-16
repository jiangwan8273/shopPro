import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 全局配置 axios
const request = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  timeout: 5000
})

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 50, // 递增进度条的速度
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

// 添加请求拦截器，在请求头中加token
request.interceptors.request.use((config) => {
  NProgress.start()
  const ifToken = window.sessionStorage.getItem('token')
  if (ifToken === '') {
    this.$router.push('/login')
    this.$message.error('请登录账号')
  } else {
    config.headers.Authorization = JSON.parse(ifToken)
  }
  return config
}, (err) => {
  return err
})

request.interceptors.response.use((config) => {
  NProgress.done()
  return config
})

export default request
