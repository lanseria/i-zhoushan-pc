import axios from 'axios'
import type { PaginationParams } from '~/types/global'

export const queryFilePage = (params: FileParams) => {
  return axios.request({
    url: '/pc/file/page',
    method: 'GET',
    params,
  })
}

export interface FileRecord {
  name: string
}

export interface FileQuery {
  name?: string
}

export interface FileParams extends Partial<FileRecord>, PaginationParams {}

export const initFileQueryForm = (): FileRecord => {
  return {
    name: '',
  }
}
