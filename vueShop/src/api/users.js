import request from '../utils/request'

// 用户管理接口

// 左侧侧边栏参数
const menus = () => {
  return request(
    {
      url: '/menus',
      method: 'GET'
    }
  )
}
// 查询用户参数
const users = (params) => {
  return request(
    {
      url: '/users',
      method: 'GET',
      params
    }
  )
}
// 修改用户状态
const userState = (dataId, dataType) => {
  return request(
    {
      url: `users/${dataId}/state/${dataType}`,
      method: 'PUT'
    }
  )
}
// 添加用户
const userAdd = (data) => {
  return request(
    {
      url: 'users',
      method: 'POST',
      data
    }
  )
}
// 删除用户
const userDelete = (param) => {
  return request(
    {
      url: `users/${param}`,
      method: 'delete'
    }
  )
}
// 修改用户
const userUpdata = (param, data) => {
  return request(
    {
      url: `users/${param}`,
      method: 'PUT',
      data
    }
  )
}
// 根据ID查询用户信息
const userQuery = (param) => {
  return request(
    {
      url: `users/${param}`,
      method: 'GET'
    }
  )
}
const userPutRolesID = (userID, data) => {
  return request(
    {
      url: `users/${userID}/role`,
      method: 'PUT',
      data
    }
  )
}
export default {
  menus,
  users,
  userState,
  userAdd,
  userDelete,
  userUpdata,
  userQuery,
  userPutRolesID
}
