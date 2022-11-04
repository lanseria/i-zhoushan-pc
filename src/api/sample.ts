import axios from 'axios'
import type { PaginationParams, PaginationRecordsRes } from '~/types/global'

export const querySubscribePage = (params: SubscribeParams): Promise<PaginationRecordsRes<SubscribeRecord>> => {
  return axios.request({
    url: '/pc/sample/users/page',
    method: 'GET',
    params,
  })
}

export interface SubscribeRecord {
  name: string
}

export interface SubscribeQuery {
  name?: string
}

export interface SubscribeParams extends Partial<SubscribeRecord>, PaginationParams {}
export const initSubscribeQueryForm = (): SubscribeRecord => {
  return {
    name: '',
  }
}
