import layout from '@/layout/layout'
export default {
  path: '/usersetting',
  name: 'usersetting',
  component: layout,
  redirect: '/setting/verity',
  alwaysShow: true,
  meta: { title: '设置', icon: 'setting' },
  children: [
    {
      path: 'adminlog',
      name: 'adminlog',
      component: () => import('@v/setting/adminlog'),
      meta: { title: '系统日志', icon: 'ascconfig' }
    },
    {
      path: 'editpassword',
      name: 'editpassword',
      component: () => import('@v/setting/editpassword'),
      meta: { title: '修改密码', icon: 'editpassword' }
    },
    {
      path: 'systemconfig',
      name: 'systemconfig',
      component: () => import('@v/setting/systemconfig'),
      meta: { title: '系统配置', icon: 'ascconfig' }
    },
    {
      path: 'awardconfig',
      name: 'awardconfig',
      component: () => import('@v/setting/awardconfig'),
      meta: { title: '奖励配置', icon: 'ascconfig' }
    }
  ]
}
