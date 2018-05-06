import _axios from 'axios'

const ERR_CODE = {
  200: '成功',
  500: '请求参数错误',
  503: '系统错误',
  404: '校验错误',
  406: 'SESSION登录超时',
  1024: '需要重新登录',
  512: '角色不符合',
  128: '数据库读写错误',
  1003: '注册-帐号已经存在',
}

var _configs = {}                    // eslint-disable-line
const axios = _axios.create({
  baseURL: process.env.NODE_ENV !== 'development' ? 'http://www.cjwddz.cn/' : 'http://localhost:80/',
  timeout: 3000,
  // headers: {'X-Custom-Header': 'foobar'}
})
class AxiosService {
  static setConfigs(configs) {
    const keys = Object.keys(configs)
      for (const key of keys) {      // eslint-disable-line
        _configs[key] = configs[key] // eslint-disable-line
    }
    axios.defaults.baseURL = _configs.baseURL || axios.defaults.baseURL
    axios.defaults.headers.common.Authorization = _configs.AUTH_TOKEN || axios.defaults.headers.common.Authorization
    axios.defaults.headers.post['Content-Type'] = _configs.contentType || 'application/x-www-form-urlencoded'
  }
  static async postJson(url, data) {
    return axios.post(url, data, { withCredentials: true }).then(AxiosService.thenEvent).catch(AxiosService.catchEvent)
  }
  static async postKV(url, data) {
    const paramsKV = []
    for (const key of Object.keys(data)) {
      paramsKV.push(`${key}=${data[key]}`)
    }
    const params = paramsKV.join('&')
    return axios.post(url, params, { withCredentials: true }).then(AxiosService.thenEvent).catch(AxiosService.catchEvent)
  }
  static async get(url, params) {
    if (!params) { return axios.get(url).then(AxiosService.thenEvent).catch(AxiosService.catchEvent) }
    let requestStr
    if (typeof params === 'string') {
      requestStr = `${url}?${encodeURIComponent(params)}`
    } else if (typeof params === 'object') {
      const paramsKV = []
      for (const key of Object.keys(params)) {
        paramsKV.push(`${key}=${params[key]}`)
      }
      requestStr = `${url}?${encodeURIComponent(paramsKV.join('&'))}`
    }
    return axios.get(requestStr).then(AxiosService.thenEvent).catch(AxiosService.catchEvent)
  }
  static catchEvent(result) {
    return { code: result.response.status, msg: result.message, status: false }
  }
  static thenEvent(result) {
    const data = result.data
    if (data.code !== 200) {
      return { code: data.code, msg: data.msg || ERR_CODE[data.code], status: false }
    }
    return { code: data.code, data: data.data, status: true }
  }
}

export default AxiosService
