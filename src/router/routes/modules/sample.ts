import type { AppRouteRecordRaw } from '../types'
import { DEFAULT_LAYOUT } from '~/router/constants'

const SAMPLE: AppRouteRecordRaw = {
  path: '/sample',
  name: 'sample',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '采样',
    requiresAuth: true,
    icon: 'icon-relation',
    order: 1,
  },
  children: [
    {
      path: 'subscribe',
      name: 'Subscribe',
      component: () => import('~/views/sample/subscribe/index.vue'),
      meta: {
        locale: '订阅管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}

export default SAMPLE
