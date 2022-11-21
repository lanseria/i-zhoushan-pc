import axios from 'axios'
import type { PaginationParams } from '~/types/global'
// 用户订阅
export const querySubscribePage = (params: SubscribeParams) => {
  return axios.request({
    url: '/sample/users/page',
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
// 采样点
export const querySamplePointPage = (params: SamplePointParams) => {
  return axios.request({
    url: '/sample/points/page',
    method: 'GET',
    params,
  })
}

export interface SamplePointRecord {
  name: string
}

export interface SamplePointQuery {
  name?: string
}

export interface SamplePointParams extends Partial<SamplePointRecord>, PaginationParams {}
export const initSamplePointQueryForm = (): SamplePointRecord => {
  return {
    name: '',
  }
}

// 采样点地图
export const querySamplePointMap = () => {
  return axios.request({
    url: '/sample/points/map',
    method: 'GET',
  })
}
