
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(function (config) {
  let params = new URLSearchParams()
  Object.keys(config.data).forEach((key) => {
    params.append(key, config.data[key])
  })
  config.data = params
  // console.log(config.data)
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // console.log(response)
  if (typeof response.data === 'string') {
    if (response.data.indexOf('进入管理中心') !== -1) {
      response.data = {
        code: 1,
        msg: '请先登录！'
      }
    } else if (response.data.indexOf('您没有执行此项操作的权限') !== -1) {
      response.data = {
        code: 1,
        msg: '缺少权限！'
      }
    } else if (response.data.indexOf('Elise') !== -1 && response.data.indexOf('Exception') !== -1) {
      response.data = {
        code: 1,
        msg: 'SQL error，请联系ERP组！'
      }
    } else {
      response.data = {
        code: 1,
        msg: '其他错误！'
      }
    }
  }
  return response
}, function (error) {
  console.error(error)
  alert('axios error')
  return Promise.reject(error)
})
