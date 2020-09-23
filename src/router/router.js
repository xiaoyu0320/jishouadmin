import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/layout'
import finance from './module/finance'
import message from './module/message'
import power from './module/power'
import signup from './module/signup'
import user from './module/user'
import usersetting from './module/usersetting'
Vue.use(Router)

/**
 * 注意事项: 只有当route children 大于等于1的时候才会出现子菜单
 * hideen:true                      如果有设置了这一项 那么菜单栏不会出现
 * alwaysShow:true                  如果设置为true 则始终显示根菜单
 *                                  如果未设置alwaysShow 则当有多个子路由时候 它将成为嵌套模式，否则不显示根菜单
 * redirect:noRedirect              如果设置为no redirect 则不会在breadcrumb中重定向
 * name:'router-name'               <keep alive>使用 必须设置!!!!
 * meta:{
 *   title:'title'                  显示在sidebar和面包屑导航
 *   icon:'svg-name'                svg的icon
 *   breadcrumb:false               如果设置为false 则不会在面包屑上出现，默认是true
 * }
 */

/**
 * constantRoutes
 * 没有权限的页面
 * 可以任意访问
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@v/login/login')
  },
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@v/dashboard/dashboard'),
        meta: { title: '首页', icon: 'geren' }
      }
    ]
  }
]
export const asyncRoutes = [
  signup,
  user,
  finance,
  message,
  power,
  usersetting,
  {
    path: '*',
    name: 'error',
    component: () => import('@v/error/error')
  }
]
const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router
