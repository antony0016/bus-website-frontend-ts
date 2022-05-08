<template>
  <el-row align="middle" style="width: 100%">
    <el-col :span="1" style="white-space: nowrap">
      <el-button type="primary" :icon="Expand" size="large" @click="openOrClose" circle/>
    </el-col>
    <el-col :span="1">
      <h1>A8</h1>
    </el-col>
    <el-col :span="16">
      <el-button v-for="(barItem, index) in topBarItems" :key="index" type="primary" size="large">
        {{ barItem.name }}
      </el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { Expand } from '@element-plus/icons-vue';
import useViewControllerStore from "../store/ViewControllerStore";
import { storeToRefs } from "pinia";

const viewController = useViewControllerStore();
const { menuSwitch, topBarItems } = storeToRefs(viewController);

const openOrClose = () => {
  menuSwitch.value = !menuSwitch.value;
}


</script>

<style scoped>
</style>
