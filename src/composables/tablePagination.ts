import type { TableRowSelection } from '@arco-design/web-vue'
// import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import { isEmpty } from 'lodash-es'
import type { AxiosResponse } from 'axios'
import type { PaginationRecordsRes } from '~/types/global'
import { initBasePagination } from '~/utils/pagination'

const basePagination = initBasePagination()

export const useTablePagination = <P, FM, RD>(queryPage: (params: P) => Promise<AxiosResponse<PaginationRecordsRes<RD>>>, initQueryForm: any, usePageAlive = false) => {
  const { loading, setLoading } = useLoading(true)
  const route = useRoute()
  const router = useRouter()
  const renderData: Ref<RD[]> = ref([])
  const formModel: Ref<FM> = ref(initQueryForm())
  const selectedKeys = ref([])
  const pagination = reactive({
    ...basePagination,
  })
  const rowSelection = reactive<TableRowSelection>({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
  })
  const paginationTableOption = computed(() => {
    return {
      current: pagination.current,
      pageSize: pagination.size,
      total: pagination.total,
      showPageSize: true,
    }
  })
  const multiSelected = computed(() => {
    return selectedKeys.value.length > 0
  })

  const fetchData = async (
    params: any = basePagination) => {
    setLoading(true)
    try {
      if (usePageAlive) {
        // 记录分页与查询数据
        router.replace({
          query: {
            ...route.query,
            ...params as any,
          },
        })
      }
      const { data } = await queryPage(params)
      renderData.value = data.records
      pagination.current = params.current
      pagination.size = params.size
      pagination.total = data.total
    }
    catch (err) {
    //
    }
    finally {
      setLoading(false)
    }
  }

  const onPageChange = (current: number) => {
    fetchData({
      ...formModel.value,
      ...basePagination,
      current,
    })
  }
  const onPageSizeChange = (size: number) => {
    fetchData({ ...formModel.value, ...basePagination, size })
  }

  const reset = () => {
    formModel.value = initQueryForm()
  }
  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as any)
  }

  onMounted(() => {
    if (usePageAlive) {
      // 记录分页与查询数据
      // console.log(route.query)
      if (!isEmpty(route.query)) {
        const { current, size, total, ...other } = route.query
        pagination.current = +(current as string)
        pagination.size = +(size as string)
        pagination.total = +(total as string)
        formModel.value = { ...initQueryForm(), ...other } as any
        fetchData({ ...pagination, ...formModel.value })
      }
      //
      else {
        fetchData()
      }
    }
    else {
      fetchData()
    }
  })

  return {
    // v
    router,
    // r
    renderData,
    formModel,
    loading,
    rowSelection,
    selectedKeys,
    // c
    paginationTableOption,
    multiSelected,
    // m
    fetchData,
    onPageChange,
    onPageSizeChange,
    reset,
    search,
  }
}
