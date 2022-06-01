<template>
  <el-select v-model="filterData.selectCompany" filterable placeholder="請選擇" @change="SelectCompanyDialogChange()">
    <el-option
      v-for="item in getData.getCompanyName"
      :key="item['value']"
      :label="item['label']"
      :value="item['value']">
    </el-option>
  </el-select>
  <el-select v-model="filterData.selectRoute" filterable placeholder="請選擇" @change="getBus({getcount:0})" :disabled="disableControl.routeSelectdisable">
    <el-option
      v-for="item in getData.getRouteDataName"
      :key="item['value']"
      :label="item['label']"
      :value="item['value']">
    </el-option>
  </el-select>
  <el-button @click="">匯入</el-button>
  <el-button @click="busDialogAdd()">手動新增</el-button>
  <el-button>範例表格下載</el-button>
  <el-table
    :data="getData.getBusData"
    style="width: 100%"
    :default-sort = "{prop: 'belong_company', order: 'ascending'}">
    <el-table-column
      prop="belong_company"
      label="所屬客運"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.belong_company}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="bus_no"
      label="車號"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.bus_no}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="bus_etag"
      label="etag"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.bus_etag}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="bus_status"
      label="狀態"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.bus_status}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="bus_type"
      label="乘車人數"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.bus_type}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="bus_note"
      label="備註"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.bus_note}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="belong_route"
      label="所屬路線"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.belong_route}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="belong_route_via"
      label="經由站"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.belong_route_via}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{row,$index}">
        <el-button @click="busDialogEdit({data: row})">
          編輯
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus'
import useMBusInfoStore from "../../../store/MGroup/MBusInfoStore"

const MBusInfoStore = useMBusInfoStore();
const { getData, filterData, disableControl } = storeToRefs(MBusInfoStore);
const { SelectCompanyDialogChange, getBus, busDialogEdit, busDialogAdd } = MBusInfoStore;

</script>

<style scoped>

</style>
