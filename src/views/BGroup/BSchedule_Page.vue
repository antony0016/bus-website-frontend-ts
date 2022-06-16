<template>
  <simple-card title="廣播排程">
    <BScheduleShow/>
    <BScheduleDialog/>
  </simple-card>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus';

import useBScheduleStore from "../../store/BGroup/BScheduleStore";
import BScheduleShow from "../../components/BGroup/BSchedule/BScheduleShow.vue";
import BScheduleDialog from "../../components/BGroup/BSchedule/BScheduleDialog.vue";

const BScheduleStore = useBScheduleStore();
const {  } = storeToRefs(BScheduleStore);
const { getSchedule } = BScheduleStore;
getSchedule({getcount:0})

</script>

<style scoped>
</style>
