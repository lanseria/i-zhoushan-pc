<script lang="ts" setup>
import type { SamplePointParams, SamplePointQuery, SamplePointRecord } from '~/api/sample'
import { initSamplePointQueryForm, querySamplePointPage } from '~/api/sample'
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
} = useTablePagination<SamplePointParams, SamplePointQuery, SamplePointRecord>(querySamplePointPage, initSamplePointQueryForm, true)
</script>

<script lang="ts">
export default {
  name: 'SamplePoint',
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
            添加点位
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
          title="orgId"
        >
          <template #cell="{ record }">
            {{ record.orgId }}
          </template>
        </a-table-column>

        <a-table-column
          title="orgName"
        >
          <template #cell="{ record }">
            {{ record.orgName }}
          </template>
        </a-table-column>

        <a-table-column
          title="address"
        >
          <template #cell="{ record }">
            {{ record.address }}
          </template>
        </a-table-column>

        <a-table-column
          title="workTime"
        >
          <template #cell="{ record }">
            {{ record.workTime }}
          </template>
        </a-table-column>

        <a-table-column
          title="levelName"
        >
          <template #cell="{ record }">
            {{ record.levelName }}
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
