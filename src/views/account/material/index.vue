<script lang="ts" setup>
import type { FileParams, FileQuery, FileRecord } from '~/api/file'
import { initFileQueryForm, queryFilePage } from '~/api/file'
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
} = useTablePagination<FileParams, FileQuery, FileRecord>(queryFilePage, initFileQueryForm, true)
</script>

<script lang="ts">
export default {
  name: 'Material',
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
            添加文件
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
          title="url"
        >
          <template #cell="{ record }">
            <a-image
              width="100"
              height="100"
              fit="cover"
              :src="record.url"
            />
          </template>
        </a-table-column>
        <a-table-column
          title="name"
        >
          <template #cell="{ record }">
            {{ record.name }}
          </template>
        </a-table-column>

        <a-table-column
          title="size"
        >
          <template #cell="{ record }">
            {{ record.size }}
          </template>
        </a-table-column>

        <a-table-column
          title="etag"
        >
          <template #cell="{ record }">
            {{ record.etag }}
          </template>
        </a-table-column>

        <a-table-column
          title="lastModified"
        >
          <template #cell="{ record }">
            {{ record.lastModified }}
          </template>
        </a-table-column>

        <a-table-column
          title="操作"
          fixed="right"
          :width="220"
        >
          <template>
            <a-button size="small">
              编辑
            </a-button>
          </template>
        </a-table-column>
      </template>
    </ATable>
  </LayoutContainer>
</template>
