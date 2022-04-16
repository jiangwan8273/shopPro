import request from '@/utils/request.js'

const reports = () => {
  return request(
    {
      url: '/reports/type/1',
      method: 'GET'
    }
  )
}

export default {
  reports
}
