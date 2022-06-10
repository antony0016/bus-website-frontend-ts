<template>
  <el-form :model="selectScheduleData" label-position="left" :label-width="formLabelWidth">
    <el-form-item label="選擇月台">
      <el-input v-model="selectScheduleData.schedulePlatform" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="選擇客運路線">
      <el-input v-model="selectScheduleData.scheduleroute" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="每小時可停靠次數上限">
      <el-input v-model="selectScheduleData.scheduleCount" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="每小時可停靠時間上限">
      <el-input v-model="selectScheduleData.scheduleTime" autocomplete="off"/>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, watch } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus'
import useStopTimeStore from "../../../store/MGroup/MStopTimeStore";

const StopTimeStore = useStopTimeStore();
const { selectScheduleData } = storeToRefs(StopTimeStore);
const {  } = StopTimeStore;

const formLabelWidth = '150px'

</script>

<style scoped>

</style>
