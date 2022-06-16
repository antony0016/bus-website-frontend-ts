<template>
  <el-row :justify="justify?justify:'start'">
    <el-col :span="span?span:24">
      <el-card>
        <template v-slot:header>
          <div class="simple-card-title">
            <!-- Don't use props and slot at the same time -->
            <span v-if="title">{{ title }}</span>
            <slot v-if="!title" name="title"/>
          </div>
        </template>
        <slot/>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
defineProps<{ title?: string, justify?: string, span?: number }>()
</script>

<style scoped>
.simple-card-title {
  font-size: 1.3em;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}
</style>
