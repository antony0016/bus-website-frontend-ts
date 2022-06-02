<template>
  <el-select v-model="filterData.selectCompany" filterable placeholder="請選擇" @change="getRoute({getcount:0})">
    <el-option
      v-for="item in getData.getCompanyName"
      :key="item['value']"
      :label="item['label']"
      :value="item['value']">
    </el-option>
  </el-select>
  <el-table
    :data="getData.getRouteShiftData"
    style="width: 100%"
    :default-sort = "{prop: 'route_no', order: 'ascending'}">
    <el-table-column
      prop="belong_company"
      label="客運公司"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.belong_company}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="route_no"
      label="路線代碼"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.route_no}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="route_name"
      label="路線"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.route_name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="route_via_station"
      label="經由站"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.route_via_station}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="startTime"
      label="發車時間-工作日"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.noramlStartTime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="route_via_station"
      label="末車時間-工作日"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.noramlEndTime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="startTime"
      label="發車時間-假日"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.weekStartTime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="route_via_station"
      label="末車時間-假日"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.weekEndTime}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{row,$index}">
        <el-button @click="">
          匯入
        </el-button>
        <el-button @click="">
          匯出
        </el-button>
        <el-button @click="shiftDialogShow({data: row})">
          班表
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus'
import useMMaintenanceStore from "../../../store/MGroup/MMaintenanceStore";

const MMaintenanceStore = useMMaintenanceStore();
const { getData, filterData } = storeToRefs(MMaintenanceStore);
const { getRoute, shiftDialogShow } = MMaintenanceStore;

</script>

<style scoped>

</style>
