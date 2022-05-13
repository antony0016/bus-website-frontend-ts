<template>
  <el-scrollbar>
    <div :class="'scrollbar-flex-content' + isVertical">
      <slot></slot>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  direction?: string
}>()

const isVertical = computed(() => {
  // direction init as horizon
  if (props.direction !== undefined) {
    if (['vertical'].includes(props.direction)) {
      return 'vertical'
    }
  }
  return ''
})
</script>

<style scoped>

.scrollbar-flex-content {
  display: flex;
}

.vertical > * {
  flex-shrink: 0;
}
</style>
