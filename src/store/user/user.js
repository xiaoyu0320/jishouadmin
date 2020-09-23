import { getToken, setToken, removeToken } from '@/utils/auth'
import { toLogin, toGetInfo, toLogout } from '../../api/api'
import { resetRouter, asyncRoutes } from '@/router/router'
const state = {
  token: getToken('shop_token'),
  userinfo: {
    nickname: '',
    avatar: '',
    prame: true
  },
  roles: [] // 权限模块
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, info) => {
    let obj = {
      nickname: '',
      avatar: ''
    }
    state.userinfo = obj // 初始化
    state.userinfo = info
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  TEXT_CONTENT: (state, prame) => {
    state.prame = prame
  }
}
const actions = {
  // 登录模块
  login ({ commit }, userinfo) {
    const { username, password } = userinfo
    return toLogin({ mobile: username.trim(), password: password }).then(res => {
      const { data } = res
      commit('SET_TOKEN', data.token)
      commit('TEXT_CONTENT', false)
      setToken('shop_token', data.token)
      setToken('shop_uid', data.uid)
    })
  },
  // 获取用户信息模块
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      toGetInfo({ userinfo: state.userinfo.uid }).then(res => {
        const { data } = res
        if (!data) {
          reject(new Error('Verification failed, please Login again.'))
        }
        const roles = data.auth_list
        if (data.group_id != 1) {
          // 非管理员的话
          if (!roles || roles.length <= 0) {
            reject(new Error('getInfo权限列表不能为空'))
          } else {
            commit('SET_ROLES', roles)
          }
        } else {
          // 管理员
          commit('SET_ROLES', asyncRoutes)
        }
        commit('SET_INFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 退出
  logout ({ commit, state }) {
    return toLogout({ uid: state.userinfo.uid }).then(res => {
      commit('SET_TOKEN', '')
      let obj = {
        nickname: '',
        avatar: ''
      }
      commit('SET_INFO', obj)
      commit('SET_ROLES', [])
      removeToken('shop_token')
      removeToken('shop_uid')
      resetRouter()
    })
  },
  // 重置token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken('shop_token')
      removeToken('shop_uid')
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
