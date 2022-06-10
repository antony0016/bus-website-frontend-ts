<template>
  <simple-card title="停靠時間設定">
    <el-button @click="openAddSchedule()">新增群組</el-button>
    <el-tabs v-model="scheduleTabData.activeTab" @tab-click="changeSelectSchedule()">
      <el-tab-pane 
        v-for="item in scheduleTabData.scheduleTab"
        :label="item.lable" :name="item.name"
      >
        <MStopTimeShow/>
      </el-tab-pane>
    </el-tabs>
    <MStopTimeDialog/>
  </simple-card>
</template>

<script setup lang="ts">
import { ref, toRefs, defineComponent, watch } from "vue";
import { storeToRefs } from "pinia";
import useStopTimeStore from "../../store/MGroup/MStopTimeStore";

import MStopTimeShow from "../../components/MGroup/MStopTime/MStopTimeShow.vue";
import MStopTimeDialog from "../../components/MGroup/MStopTime/MStopTimeDialog.vue";

const StopTimeStore = useStopTimeStore();
const { scheduleTabData } = storeToRefs(StopTimeStore);
const { openAddSchedule, changeSelectSchedule } = StopTimeStore;

</script>

<style scoped>
</style>
