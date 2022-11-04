import type { Pagination } from '~/types/global'

export const initBasePagination = (size = 10): Pagination => {
  return {
    current: 1,
    size,
    total: 0,
  }
}
