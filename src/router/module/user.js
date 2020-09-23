import layout from '@/layout/layout'
export default {
  path: '/user',
  name: 'user',
  component: layout,
  redirect: '/user/node',
  alwaysShow: true,
  meta: { title: '用户', icon: 'ascmanage' },
  children: [
    {
      path: 'userList',
      name: 'userList',
      component: () => import('@v/user/userList'),
      meta: { title: '用户列表', icon: '' }
    },
    {
      path: 'drawList',
      name: 'drawList',
      component: () => import('@v/user/drawList'),
      meta: { title: '中奖锁列表', icon: '' }
    },
    {
      path: 'node',
      name: 'node',
      component: () => import('@v/user/node'),
      meta: { title: '节点用户', icon: '' }
    },
    {
      path: 'query',
      name: 'query',
      component: () => import('@v/user/query'),
      meta: { title: '查询', icon: '' }
    },
    {
      path: 'nodelv',
      name: 'nodelv',
      component: () => import('@v/user/nodelv'),
      meta: { title: '设置用户等级', icon: '' }
    },
    {
      path: 'community',
      name: 'community',
      component: () => import('@v/user/community'),
      meta: { title: '线下社区', icon: '' }
    },
    {
      path: 'editNode',
      name: 'editNode',
      component: () => import('@v/user/editNode'),
      hideen: true
    },
    {
      path: 'setnodelv',
      name: 'setnodelv',
      component: () => import('@v/user/setnodelv')
    },
    {
      path: 'editcommunity',
      name: 'editcommunity',
      component: () => import('@v/user/editcommunity')
    },
    {
      path: 'limitlist',
      name: 'limitlist',
      component: () => import('@v/user/limitlist'),
      meta: { title: '限制互转币用户', icon: '' }
    },
    {
      path: 'setLimit',
      name: 'setLimit',
      component: () => import('@v/user/setLimit')
    }
  ]
}
