
import layout from '@/layout/layout'
export default {
  path: '/message',
  name: 'message',
  component: layout,
  redirect: '/message/newsList',
  alwaysShow: true,
  meta: { title: '消息', icon: 'ascmanage' },
  children: [
    {
      path: 'newsList',
      name: 'newsList',
      component: () => import('@v/message/newsList'),
      meta: { title: '动态通知', icon: '' }
    },
    {
      path: 'newsIssue',
      name: 'newsIssue',
      component: () => import('@v/message/newsIssue'),
      meta: { title: '发布', icon: '' }
    }
  ]
}
