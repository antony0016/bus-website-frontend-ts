<template>
  <el-row justify="end">
    <el-col :span="2" :pull="2">
      <el-button type="primary" @click="goToLogin">登入</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import router from "../router";

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>

</style>
