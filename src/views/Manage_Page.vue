<template>
  <simple-card title="客運業者管理">
    <el-tabs v-model="companyRouteActiveTab" @tab-click="getCompany({getcount:0}); getRoute({getcount:0}); getBusCompany({getcount:0}); SelectCompanyDialogChange(); getBus({getcount:0}); getMaintenanceCompany({getcount:0}); getMaintenanceRoute({getcount:0});">
      <el-tab-pane label="業者基本資料" name="companys" :disabled="!pageShow['MRC']">
        <span v-show="pageShow['MRC']">
          <MCompanyCompanyShow/>
        </span>
        <MCompanyCompanyDialog/>
        <MCompanyAccountDialog/>
        <MCompanyAccountEditDialog/>
      </el-tab-pane>
      <el-tab-pane label="客運路線管理" name="routes" :disabled="!pageShow['MRC']">
        <span v-show="pageShow['MRC']">
          <MCompanyRouteShow/>
        </span>
        <MCompanyRouteDialog/>
      </el-tab-pane>
      <el-tab-pane label="車籍管理" name="bus" :disabled="!pageShow['MBM']">
        <span v-show="pageShow['MBM']">
          <MBusInfoShow/>
        </span>
        <MBusInfoDialog/>
      </el-tab-pane>
      <el-tab-pane label="班次維護" name="maintenance" :disabled="!pageShow['MSM']">
        <span v-show="pageShow['MSM']">
          <MMaintenanceShow/>
        </span>
        <MMaintenanceDialog/>
      </el-tab-pane>
    </el-tabs>
  </simple-card>
  <span>&nbsp;</span>
  <simple-card title="廣播管理">
    <el-tabs v-model="broadcastActiveTab" @tab-click="getProgram({getcount:0}); getSchedule({getcount:0}); getQueue({getcount:0}); getScheduleData({getcount:0});">
      <el-tab-pane label="程序設定" name="program" :disabled="!pageShow['BVP']">
        <span v-show="pageShow['BVP']">
          <BProgramShow/>
        </span>
        <BProgramDialog/>
      </el-tab-pane>
      <el-tab-pane label="廣播排程" name="schedule" :disabled="!pageShow['BBS']">
        <span v-show="pageShow['BBS']">
          <BScheduleShow/>
        </span>
        <BScheduleDialog/>
      </el-tab-pane>
      <el-tab-pane label="播放列隊" name="queue" :disabled="!pageShow['BQE']">
        <span v-show="pageShow['BQE']">
          <BQueueShow/>
        </span>
      </el-tab-pane>
    </el-tabs>
  </simple-card>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineComponent, watch } from "vue";
import { storeToRefs } from "pinia";

import useMCompanyStore from "../store/MGroup/MCompanyStore";
import useMBusInfoStore from "../store/MGroup/MBusInfoStore";
import useMMaintenanceStore from "../store/MGroup/MMaintenanceStore";

import useBProgramStore from "../store/BGroup/BProgramStore";
import useBScheduleStore from "../store/BGroup/BScheduleStore";
import useBQueueStore from "../store/BGroup/BQueueStore";

import useLoginManagerStore from "../store/LoginManagerStore";
import useViewControllerStore from "../store/ViewControllerStore";

import MCompanyCompanyShow from "../components/MGroup/MCompany/MCompanyCompanyShow.vue";
import MCompanyCompanyDialog from "../components/MGroup/MCompany/MCompanyCompanyDialog.vue";
import MCompanyRouteShow from "../components/MGroup/MCompany/MCompanyRouteShow.vue";
import MCompanyRouteDialog from "../components/MGroup/MCompany/MCompanyRouteDialog.vue";
import MCompanyAccountDialog from "../components/MGroup/MCompany/MCompanyAccountDialog.vue";
import MCompanyAccountEditDialog from "../components/MGroup/MCompany/MCompanyAccountEditDialog.vue";
import MBusInfoShow from "../components/MGroup/MBusInfo/MBusInfoShow.vue";
import MBusInfoDialog from "../components/MGroup/MBusInfo/MBusInfoDialog.vue";
import MMaintenanceShow from "../components/MGroup/MMaintenance/MMaintenanceShow.vue";
import MMaintenanceDialog from "../components/MGroup/MMaintenance/MMaintenanceDialog.vue";

import BProgramShow from "../components/BGroup/BProgram/BProgramShow.vue";
import BProgramDialog from "../components/BGroup/BProgram/BProgramDialog.vue"; 
import BScheduleShow from "../components/BGroup/BSchedule/BScheduleShow.vue";
import BScheduleDialog from "../components/BGroup/BSchedule/BScheduleDialog.vue";
import BQueueShow from "../components/BGroup/BQueue/BQueueShow.vue"

const loginManagerStore = useLoginManagerStore();
const { buttonDisable } = storeToRefs(loginManagerStore);

const viewControllerStore = useViewControllerStore();
const { pageShow } = storeToRefs(viewControllerStore);

const MCompanyStore = useMCompanyStore();
const { companyRouteActiveTab } = storeToRefs(MCompanyStore);
const { getCompany, getRoute } = MCompanyStore;

const MBusInfoStore = useMBusInfoStore();
const { } = storeToRefs(MBusInfoStore);
const { getBusCompany, getBus, SelectCompanyDialogChange } = MBusInfoStore;

const MMaintenanceStore = useMMaintenanceStore();
const {  } = storeToRefs(MMaintenanceStore);
const { getMaintenanceCompany, getMaintenanceRoute } = MMaintenanceStore;

let broadcastActiveTab = 'program'

const BProgramStore = useBProgramStore();
const {} = storeToRefs(BProgramStore);
const { getProgram } = BProgramStore;

const BScheduleStore = useBScheduleStore();
const {  } = storeToRefs(BScheduleStore);
const { getSchedule } = BScheduleStore;

const BQueueStore = useBQueueStore();
const {  } = storeToRefs(BQueueStore);
const { getQueue, getScheduleData } = BQueueStore;

getCompany({getcount:0})
getRoute({getcount:0})
getBusCompany({getcount:0})
getBus({getcount:0})
getMaintenanceCompany({getcount:0})
getMaintenanceRoute({getcount:0})

getProgram({getcount:0})
getSchedule({getcount:0})
getQueue({getcount:0})
getScheduleData({getcount:0})

let myDate = new Date();
let nowTime = reactive({
  data: ""
})
const setTime = (myDate: Date) => {
  const year = myDate.getFullYear();
  const month = myDate.getMonth() + 1 < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
  const date = myDate.getDate() < 10 ? "0" + (myDate.getDate()) : myDate.getDate();
  const h = myDate.getHours();
  const m = myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate.getMinutes();
  const s = myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate.getSeconds();
  const time = h + ":" + m + ":" + s;
  const day = year + "-" + month + "-" + date;

  nowTime.data = day+' '+time;
}
const nowTimes = () => {
  setTime(myDate);
  setInterval(() => {
    myDate = new Date();
    setTime(myDate)
    getQueue({getcount:0})
  }, 1000)
  return nowTime
}
nowTimes()

</script>

<style scoped>
</style>
