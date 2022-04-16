import request from '../utils/request'

// 权限管理接口

// 获取权限管理列表
const rights = (parma) => {
  // parma 为获取类型， list 或 tree , list 列表显示权限, tree 树状显示权限
  return request(
    {
      url: `rights/${parma}`,
      method: 'GET'
    }
  )
}

export default {
  rights
}
