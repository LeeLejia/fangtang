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
  10101010: 'UnknownError',
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
  }
  static async postJson(url, data, configs = { withCredentials: true }) {
    return axios.post(url, data, configs).then(AxiosService.thenEvent).catch(AxiosService.catchEvent)
  }
  static async postKV(url, data, configs = { withCredentials: true }) {
    const paramsKV = []
    for (const key of Object.keys(data)) {
      paramsKV.push(`${key}=${data[key]}`)
    }
    const params = paramsKV.join('&')
    return axios.post(url, params, configs).then(AxiosService.thenEvent).catch(AxiosService.catchEvent)
  }
  static async post(url, data, configs) {
    return axios.post(url, data, Object.assign({ withCredentials: true }, configs)).then(AxiosService.thenEvent).catch(AxiosService.catchEvent)
  }
  static async get(url, params, configs = { withCredentials: true }) {
    if (!params) { return axios.get(url, configs).then(AxiosService.thenEvent).catch(AxiosService.catchEvent) }
    let requestStr
    if (typeof params === 'string') {
      requestStr = `${url}?${encodeURIComponent(params)}`
    } else if (typeof params === 'object') {
      const paramsKV = []
      for (const key of Object.keys(params)) {
        paramsKV.push(`${key}=${encodeURIComponent(params[key])}`)
      }
      requestStr = `${url}?${paramsKV.join('&')}`
    }
    return axios.get(requestStr, configs).then(AxiosService.thenEvent).catch(AxiosService.catchEvent)
  }
  static catchEvent(result) {
    return { code: result.response && result.response.status || 10101010, msg: result.message, status: false }
  }
  static thenEvent(result) {
    const data = result.data
    if (data.code !== 200) {
      if (data.code === 406 || data.code === 1024) {
        _configs.store && _configs.store.commit('setAuthModal', true)
      }
      return { code: data.code, msg: data.msg || ERR_CODE[data.code], status: false }
    }
    return { code: data.code, data: data.data, status: true }
  }
}

export default AxiosService
