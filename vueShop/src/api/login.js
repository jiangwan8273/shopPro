import request from '@/utils/request'

// 登陆接口
const login = (data) => {
  return request({
    method: 'POST',
    url: 'login',
    data
  })
}

export default {
  login
}
