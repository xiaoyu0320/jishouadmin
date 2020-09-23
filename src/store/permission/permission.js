import { asyncRoutes, constantRoutes } from '@/router/router'
// 判断是否有权限
function hasPermission (roles, route) {
  if (route.name) {
    return roles.some(role => route.name.toLowerCase() == role)
  } else {
    return true
  }
}

export function filterAsyncRoutes (routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route } // 浅拷贝
    if (hasPermission(roles, tmp)) {
      // 如果有子级的话就递归子极
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
const state = {
  routes: [],
  addRoutes: []
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
const actions = {
  generateRoutes ({ commit }, info) {
    return new Promise(resolve => {
      let accessedRoutes
      if (info.group_id == 1) {
        // 如果是管理员的话 就全部路由都添加上去
        accessedRoutes = asyncRoutes
      } else {
        const authlist = info.auth_list
        accessedRoutes = filterAsyncRoutes(asyncRoutes, authlist)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
