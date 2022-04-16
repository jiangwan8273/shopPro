// 过滤器的封装

// 获取到的JSON日期时间格式改为日期时间格式
const myfilter = (data) => {
  const date = new Date(data)
  //  年
  const y = date.getFullYear()
  // 月
  const m = ((date.getMonth() + 1) + '').padStart(2, '0')
  // 日
  const d = (date.getDate() + '').padStart(2, '0')
  // 时
  const h = (date.getHours() + '').padStart(2, '0')
  // 分
  const i = (date.getMinutes() + '').padStart(2, '0')
  // 秒
  const s = (date.getSeconds() + '').padStart(2, '0')
  return y + '-' + m + '-' + d + '-' + h + '-' + i + '-' + s
}

// 在这里封装的 filter 必须{}包裹起来，一个也需要包裹
export default {
  myfilter
}
