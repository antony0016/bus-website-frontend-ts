<template>
  <el-button @click="dialogAddShow()">
    新增
  </el-button>
  <el-input v-model="getData.filterText" placeholder="請輸入排程名稱" autocomplete="off"/>
  <el-table
    :data="filterTextComputed"
    v-loading="loadingShow.scheduleTableShow"
    id="schedule_table"
    style="width: 100%"
    :default-sort="{prop: 'schedule_name', order: 'ascending'}">
    <el-table-column
      prop="schedule_name"
      label="名稱"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.schedule_name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="schedule_start_date"
      label="開始日期"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.schedule_start_date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="schedule_start_time"
      label="開始時間"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.schedule_start_time }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="schedule_end_date"
      label="結束日期"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px" v-if="row.schedule_end_date == null">無</span>
        <span style="margin-left: 10px" v-else>{{ row.schedule_end_date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="schedule_end_time"
      label="結束時間"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px" v-if="row.schedule_end_time == null">無</span>
        <span style="margin-left: 10px" v-else>{{ row.schedule_end_time }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="schedule_frequency"
      label="播放頻率"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px" v-if="row.schedule_frequency_hour == 'null' || row.schedule_frequency_minute == 'null'">
          無播放頻率，撥放次數為{{row.schedule_frequency_number}}次
        </span>
        <span style="margin-left: 10px" v-else>
          每{{ row.schedule_frequency_hour }}小時，{{row.schedule_frequency_minute}}分鐘{{row.schedule_frequency_number}}次
        </span>
      </template>
    </el-table-column>
    <el-table-column
      prop="schedule_cycle"
      label="是否定期循環"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px" v-if="row.schedule_is_cycle == true">是</span>
        <span style="margin-left: 10px" v-else-if="row.schedule_is_cycle == false">否</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="schedule_cycle_content"
      label="定期循環規則"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px" v-if="row.schedule_cycle_type == 'null'">
          無
        </span>
        <span style="margin-left: 10px" v-else-if="row.schedule_cycle_type == 'week'">
          每週{{ row.schedule_cycle_day_text }}
        </span>
        <span style="margin-left: 10px" v-else-if="row.schedule_cycle_type == 'day'">
          每天
        </span>
      </template>
    </el-table-column>
    <el-table-column
      prop="schedule_open_close"
      label="狀態"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px" v-if="row.schedule_open_close == true">啟用</span>
        <span style="margin-left: 10px" v-else-if="row.schedule_open_close == false">停用</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{row,$index}">
        <el-button @click="dialogEditShow({data:row})">
          編輯
        </el-button>
        <el-button @click="inStreamScheduleSwitch({putcount:0, id:row.uuid})">
          插播
        </el-button>
        <el-button @click="scheduleOpenCloseSwitch({putcount:0, id:row.uuid})">
          停用/啟動
        </el-button>
        <el-button @click="deleteSchedule({deletecount:0, id:row.uuid})">
          刪除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, computed } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus';

import useBScheduleStore from "../../../store/BGroup/BScheduleStore";

const BScheduleStore = useBScheduleStore();
const { getData, loadingShow } = storeToRefs(BScheduleStore);
const { dialogAddShow, dialogEditShow, deleteSchedule, scheduleOpenCloseSwitch, inStreamScheduleSwitch } = BScheduleStore;

const filterTextComputed = computed(() => {
  let arr = []
  arr = getData.value.scheduleData.filter((v: any) => v['schedule_name'].indexOf(getData.value.filterText) !== -1);
  console.log(arr)
  return arr
})

</script>

<style scoped>
</style>
