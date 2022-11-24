import type { AppRouteRecordRaw } from '../types'
import { DEFAULT_LAYOUT } from '~/router/constants'

const PARKING: AppRouteRecordRaw = {
  path: '/parking',
  name: 'parking',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '停车点',
    requiresAuth: true,
    icon: 'icon-relation',
    order: 1,
  },
  children: [
    {
      path: 'points-map',
      name: 'ParkingMap',
      component: () => import('~/views/parking/points-map/index.vue'),
      meta: {
        locale: '点位地图',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}

export default PARKING
