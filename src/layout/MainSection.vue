<template>
  <el-main id="main">
    <el-row>
      <el-col :span="24">
        <router-view/>
      </el-col>
    </el-row>
  </el-main>
</template>

<script setup lang="ts">
</script>

<style scoped>
#main {
  background-color: var(--el-color-info-light-9);
}
</style>
