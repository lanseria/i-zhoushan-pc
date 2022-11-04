<script lang="ts" setup>
import dayjs from 'dayjs'
import type { SubscribeParams, SubscribeQuery, SubscribeRecord } from '~/api/sample'
import { initSubscribeQueryForm, querySubscribePage } from '~/api/sample'
import { useTablePagination } from '~/composables/tablePagination'

const {
  // v
  // router,
  // r
  renderData,
  // formModel,
  loading,
  rowSelection,
  // c
  paginationTableOption,
  // m
  // fetchData,
  onPageChange,
  onPageSizeChange,
  reset,
  search,
} = useTablePagination<SubscribeParams, SubscribeQuery, SubscribeRecord>(querySubscribePage, initSubscribeQueryForm, true)
</script>

<script lang="ts">
export default {
  name: 'Subscribe',
}
</script>

<template>
  <LayoutContainer>
    <ARow>
      <ACol :flex="1" />
      <ADivider class="h-10" direction="vertical" />
      <ACol flex="180px" class="text-right">
        <a-space>
          <a-button type="primary" @click="search">
            <template #icon>
              <icon-search />
            </template>
            查询
          </a-button>
          <a-button @click="reset">
            <template #icon>
              <icon-refresh />
            </template>
            重置
          </a-button>
        </a-space>
      </ACol>
    </ARow>

    <a-divider class="mt-0" />
    <ARow class="mb-4">
      <ACol :span="16">
        <ASpace>
          <AButton
            type="primary"
          >
            <template #icon>
              <IconPlus />
            </template>
            添加订阅
          </AButton>
        </ASpace>
      </ACol>
    </ARow>

    <ATable
      row-key="id"
      :loading="loading"
      :pagination="paginationTableOption"
      :data="renderData"
      :bordered="false"
      :row-selection="rowSelection"
      @page-change="onPageChange"
      @page-size-change="onPageSizeChange"
    >
      <template #columns>
        <a-table-column
          title="openid"
        >
          <template #cell="{ record }">
            {{ record.openid }}
          </template>
        </a-table-column>

        <a-table-column
          title="isSubscribe"
        >
          <template #cell="{ record }">
            {{ record.isSubscribe }}
          </template>
        </a-table-column>

        <a-table-column
          title="currentSampleDateTime"
        >
          <template #cell="{ record }">
            {{ dayjs.unix(record.currentSampleDateTime).format('YYYY/MM/DD') }}
          </template>
        </a-table-column>

        <a-table-column
          title="intervalDay"
        >
          <template #cell="{ record }">
            {{ record.intervalDay }}
          </template>
        </a-table-column>

        <a-table-column
          title="nextSampleDateTime"
        >
          <template #cell="{ record }">
            {{ dayjs.unix(record.nextSampleDateTime).format('YYYY/MM/DD') }}
          </template>
        </a-table-column>

        <a-table-column
          title="操作"
          fixed="right"
          :width="220"
        >
          <template>
            <a-button type="text" size="small">
              编辑
            </a-button>
          </template>
        </a-table-column>
      </template>
    </ATable>
  </LayoutContainer>
</template>
