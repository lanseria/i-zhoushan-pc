<script lang="ts" setup>
import type { PropType } from 'vue'
const props = defineProps({
  items: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
  showBack: {
    type: Boolean,
    default: false,
  },
  showCard: {
    type: Boolean,
    default: true,
  },
})

const router = useRouter()
const route = useRoute()
const locales = $computed(() => {
  return route.matched.map(m => m.meta.locale) as string[]
})
const items = computed(() => {
  if (props.items.length === 0)
    return locales
  else
    return locales
})
const title = computed(() => {
  if (props.title === '')
    return locales[locales.length - 1]
  else
    return props.title
})
const onBack = () => {
  router.back()
}
</script>

<template>
  <div class="px-5 pb-5">
    <Breadcrumb :items="items" />
    <ACard v-if="showCard" class="general-card">
      <template #title>
        <ASpace>
          <a-button v-if="showBack" type="text" shape="circle" @click="onBack">
            <icon-left />
          </a-button>
          {{ title }}
          <slot name="title" />
        </ASpace>
      </template>
      <slot />
    </ACard>
    <slot v-else />
  </div>
</template>
