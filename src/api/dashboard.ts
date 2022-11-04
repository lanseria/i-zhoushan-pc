import axios from 'axios'
import type { TableData } from '@arco-design/web-vue/es/table/interface'

export interface ContentDataRecord {
  x: string
  y: number
}

export function queryContentData() {
  return axios.get<ContentDataRecord[]>('/pc/user/content-data')
}

export interface PopularRecord {
  key: number
  clickNumber: string
  title: string
  increases: number
}

export function queryPopularList(params: { type: string }) {
  return axios.get<TableData[]>('/pc/user/popular/list', { params })
}
