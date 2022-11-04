export interface AnyObject {
  [key: string]: unknown
}

export interface Options {
  value: unknown
  label: string
}

export interface NodeOptions extends Options {
  children?: NodeOptions[]
}

export interface GetParams {
  body: null
  type: string
  url: string
}

export interface PostData {
  body: string
  type: string
  url: string
}

export interface Pagination {
  total: number
  size: number
  pages?: number
  current: number
}

export type TimeRanger = [string, string]

export interface GeneralChart {
  xAxis: string[]
  data: Array<{ name: string; value: number[] }>
}

export interface PaginationRecordsRes<T> extends Pagination {
  records: T[]
}

export interface PaginationParams {
  current: number
  size: number
}
