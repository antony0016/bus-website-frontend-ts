<template>
  <el-card>
    <template v-slot:header>
      <div class="simple-card-title">
        <!-- Don't use props and slot at the same time -->
        <span v-if="title.length">{{ props.title }}</span>
        <slot v-if="!title.length" name="title"/>
      </div>
    </template>
    <el-row :justify="justify?justify:'start'">
      <el-col :span="span?span:24">
        <slot/>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps(["title", "justify", "span"])
</script>

<style scoped>
.simple-card-title {
  font-size: 1.3em;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}
</style>
