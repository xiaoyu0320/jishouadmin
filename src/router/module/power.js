import layout from '@/layout/layout'
export default {
  path: '/usermanage',
  name: 'usermanage',
  component: layout,
  redirect: '/usermanage/rolelist',
  alwaysShow: true,
  meta: { title: '权限管理', icon: 'usermanage' },
  children: [
    {
      path: 'rolelist',
      name: 'rolelist',
      component: () => import('@v/usermanage/rolelist'),
      meta: { title: '角色列表', icon: 'userlist' }
    },
    {
      path: 'power',
      name: 'power',
      component: () => import('@v/usermanage/power'),
      meta: { title: '权限管理', icon: 'power' }
    },
    {
      path: 'list',
      name: 'list',
      component: () => import('@v/supplier/list'),
      meta: { title: '管理员列表', icon: 'userlist' }
    }
  ]
}
