<template>
  <simple-card>
    <template #title>
      <h1>123</h1>
    </template>
    <el-button @click="getData({choice:1})">取得1</el-button>
    <el-button @click="getData({choice:2})">取得2</el-button>
    <el-button @click="getData({choice:3})">取得3</el-button>
    <p>{{ data }}</p>
  </simple-card>
</template>

<script setup lang="ts">
import useAxiosExampleStore from "../../store/AxiosExampleStore";
import { toRefs } from "vue";

const axiosExampleStore = useAxiosExampleStore()
const { getData } = axiosExampleStore
const { data } = toRefs(axiosExampleStore)
</script>

<style scoped>
</style>
