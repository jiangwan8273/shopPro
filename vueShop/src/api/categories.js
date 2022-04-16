import request from '../utils/request'

// 获取商品列表
const categories = (data) => {
  return request(
    {
      url: '/categories',
      method: 'GET',
      data
    }
  )
}
// 获取参数列表
const categoriesAttributes = (id, params) => {
  return request(
    {
      url: `categories/${id}/attributes`,
      method: 'GET',
      params
    }
  )
}

export default {
  categories,
  categoriesAttributes
}
