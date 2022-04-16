import request from '../utils/request'

// 获取角色列表
const roles = () => {
  return request(
    {
      url: 'roles',
      method: 'GET'
    }
  )
}
// 添加角色
const addRoles = (data) => {
  return request(
    {
      url: '/roles',
      method: 'POST',
      data
    }
  )
}
// ID 查询角色
const checkRoles = (param) => {
  return request(
    {
      url: `/roles/${param}`,
      method: 'GET'
    }
  )
}
// 删除角色
const deleteRoles = (param) => {
  return request(
    {
      url: `/roles/${param}`,
      method: 'DELETE'
    }
  )
}
// 修改角色
const editRoles = (id, data) => {
  return request(
    {
      url: `/roles/${id}`,
      method: 'PUT',
      data
    }
  )
}
// 删除角色指定权限
const deleteRolesRights = (ID1, ID2) => {
  return request(
    {
      url: `roles/${ID1}/rights/${ID2}`,
      method: 'DELETE'
    }
  )
}
export default {
  roles,
  addRoles,
  checkRoles,
  deleteRoles,
  editRoles,
  deleteRolesRights
}
