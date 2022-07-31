<template>
  <el-select v-model="selectData.scheduleSelect" filterable placeholder="請選擇">
    <el-option
      v-for="item in getData.scheduleData"
      :key="item['uuid']"
      :label="item['schedule_name']"
      :value="item['uuid']"
      :disabled="item['disabled']">
    </el-option>
  </el-select>
  <el-button type="primary" @click="addQueue({postcount:0})">
    增加排程
  </el-button>
  <el-table
    :data="getData.queueData"
    v-loading="loadingShow.queueTableShow"
    id="queue_table"
    style="width: 100%"
    :default-sort="{prop: 'order', order: 'ascending'}">
    <el-table-column
      prop="order"
      label="順序"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.order }}</span>
      </template>
    </el-table-column>
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
      prop="schedule_end_date"
      label="結束日期"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.schedule_end_date }}</span>
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
      prop="schedule_end_time"
      label="結束時間"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.schedule_end_time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{row,$index}">
        <el-button type="danger" @click="deleteSchedule({deletecount:0, id:row.uuid})">
          刪除
        </el-button>
        <el-button @click="switchQueue({putcount:0, id:row.uuid, direction:'up'})">
          ▲
        </el-button>
        <el-button @click="switchQueue({putcount:0, id:row.uuid, direction:'down'})">
          ▼
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus';

import useBQueueStore from "../../../store/BGroup/BQueueStore";

const BQueueStore = useBQueueStore();
const { getData, loadingShow, selectData } = storeToRefs(BQueueStore);
const { getScheduleData, addQueue, deleteSchedule, switchQueue } = BQueueStore;

getScheduleData({getcount:0})

</script>

<style scoped>
</style>
