import layout from '@/layout/layout'
export default {
  path: '/signup',
  name: 'signup',
  component: layout,
  redirect: '/signup/signupList',
  alwaysShow: true,
  meta: { title: '报名', icon: 'newgoods' },
  children: [
    {
      path: 'baaslist',
      name: 'baaslist',
      component: () => import('@v/signup/baaslist'),
      meta: { title: '寄售码管理', icon: '' }
    },
    {
      path: 'signupList',
      name: 'signupList',
      component: () => import('@v/signup/signupList'),
      meta: { title: '报名记录', icon: '' }
    },
    {
      path: 'drawLogList',
      name: 'drawLogList',
      component: () => import('@v/signup/drawLogList'),
      meta: { title: '开奖记录', icon: '' }
    }
  ]
}
