import request from '../utils/request.js'

// 商品列表
const goods = (params) => {
  return request(
    {
      url: 'goods',
      method: 'GET',
      params
    }
  )
}
// 删除商品
const deleteGoods = (param) => {
  return request(
    {
      url: `goods/${param}`,
      method: 'DELETE'
    }
  )
}

export default {
  goods,
  deleteGoods
}
