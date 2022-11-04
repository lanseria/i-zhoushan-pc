import axios from 'axios'
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface'

export interface PolicyRecord {
  id: string
  number: number
  name: string
  contentType: 'img' | 'horizontalVideo' | 'verticalVideo'
  filterType: 'artificial' | 'rules'
  count: number
  status: 'online' | 'offline'
  createdTime: string
}

export interface PolicyParams extends Partial<PolicyRecord> {
  current: number
  pageSize: number
}

export interface PolicyListRes {
  list: PolicyRecord[]
  total: number
}

export function queryPolicyList(params: PolicyParams) {
  return axios.get<PolicyListRes>('/list/policy', {
    params,
  })
}

export interface ServiceRecord {
  id: number
  title: string
  description: string
  cover: string
  name?: string
  actionType?: string
  icon?: string
  data?: DescData[]
  enable?: boolean
  expires?: boolean
}
export function queryInspectionList() {
  return axios.get('/list/quality-inspection')
}

export function queryTheServiceList() {
  return axios.get('/list/the-service')
}

export function queryRulesPresetList() {
  return axios.get('/list/rules-preset')
}
