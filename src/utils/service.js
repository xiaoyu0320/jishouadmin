import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '../store/store'
import { getToken } from '../utils/auth'
// 创建axios实例
export const geturl = () => {
  return window.g.apiurl
}
export const testUrl = 'http://192.168.1.50:9090/'
const service = axios.create({
  baseURL: geturl(), // url = base url + request url
  // withCredentials: true, // 是否需要带上cookie
  timeout: 300000 // request timeout
})
// 拦截器的处理
service.interceptors.request.use(
  config => {
    // 在发送请求前处理一些需求
    // 如果是有token的话 则在请求头里面加一个token
    if (store.getters.token) {
      config.headers['token'] = getToken('shop_token')
    }
    return config
  },
  error => {
    // 错误信息
    return Promise.reject(error)
  }
)
// 响应器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else {
      // 错误信息

      if (res.code === 400 || res.code === 500) {
        Message({
          message: res.msg || '请求出错',
          type: 'error',
          duration: 5000
        })
      }
      // code 300是token过期 310 是账户禁止
      if (res.code === 300 || res.code === 310) {
        MessageBox.confirm('登录失效请重试', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 确认事件
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || '请求出错'))
    }
  },
  error => {
    Message({
      message: error,
      type: 'error',
      duration: 5000
    })
    return Promise.reject(new Error(error))
  }
)
// axios 二次封装
export const http = (url, data) => {
  // 如果有存在shop_uid值的话则表示是登陆过的 就必须带uid
  if (getToken('shop_uid')) {
    data.uid = getToken('shop_uid')
  }
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: data
    }).then(res => {
      resolve(res)
    }, error => {
      reject(error)
    })
  })
}
