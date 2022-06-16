<template>
  <el-button @click="">
    新增
  </el-button>
  <el-table
    :data="getData.scheduleData"
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
        <span style="margin-left: 10px">{{ row.schedule_end_date }}</span>
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
    <el-table-column
      prop="schedule_frequency"
      label="播放頻率"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">
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
        <span style="margin-left: 10px">{{ row.schedule_is_cycle }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="schedule_cycle_content"
      label="定期循環規則"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.schedule_cycle_type }}{{ row.schedule_cycle_day }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{row,$index}">
        <el-button @click="">
          編輯
        </el-button>
        <el-button @click="">
          插播
        </el-button>
        <el-button @click="">
          停用/啟動
        </el-button>
        <el-button @click="">
          刪除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus';

import useBScheduleStore from "../../../store/BGroup/BScheduleStore";

const BScheduleStore = useBScheduleStore();
const { getData } = storeToRefs(BScheduleStore);
const {  } = BScheduleStore;

</script>

<style scoped>
</style>
