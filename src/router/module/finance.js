import layout from '@/layout/layout'
export default {
  path: '/finance',
  name: 'finance',
  component: layout,
  redirect: '/finance/usdt',
  alwaysShow: true,
  meta: { title: '财务', icon: 'ascmanage' },
  children: [
    {
      path: 'usdt',
      name: 'usdt',
      component: () => import('@v/finance/usdt'),
      meta: { title: 'USDT明细', icon: '' }
    },
    {
      path: 'asc',
      name: 'asc',
      component: () => import('@v/finance/asc'),
      meta: { title: 'epc明细', icon: '' }
    },
    {
      path: 'assetsList',
      name: 'assetsList',
      component: () => import('@v/finance/assetsList'),
      meta: { title: '资产列表', icon: '' }
    },
    {
      path: 'tobeusdt',
      name: 'tobeusdt',
      component: () => import('@v/finance/tobeusdt'),
      meta: { title: 'USDT充提', icon: '' }
    },
    {
      path: 'tobeasc',
      name: 'tobeasc',
      component: () => import('@v/finance/tobeasc'),
      meta: { title: 'epc充提', icon: '' }
    },
    {
      path: 'auditUsdt',
      name: 'auditUsdt',
      component: () => import('@v/finance/auditUsdt')
    }
  ]
}
