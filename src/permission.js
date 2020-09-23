import router from './router/router'
import store from './store/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 页面加载进度条
import 'nprogress/nprogress.css' // 页面加载进度条样式
import { getToken } from './utils/auth'
import getPageTitle from './utils/get-page-title'

// 实例化nprogress配置
NProgress.configure({ showSpinner: false })

// 配置白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // 设置标题
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否登录
  const token = getToken('shop_token')
  // 携带token
  if (token) {
    if (to.path === '/login') {
      // 如果已经登陆过的 直接跳到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否通过了getInfo获取了权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 如果有用户权限的话
        next()
      } else {
        // 如果没有用户信息
        try {
          // 得到用户的信息
          const info = await store.dispatch('user/getInfo')
          // 基于角色得到路由图
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            info
          )
          // 动态添加路由
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // 删除token且跳转到登陆页重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || '登录出错')
          next(`/login?redirect=${ to.path }`)
          NProgress.done()
        }
      }
    }
  } else {
    // 如果没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单中直接进入
      next()
    } else {
      // 没有权限的情况下 强制跳回首页 登录后可以跳回原本页面
      next(`/login?redirect=${ to.path }`)
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  // 完成态 清除顶部进度
  NProgress.done()
})
