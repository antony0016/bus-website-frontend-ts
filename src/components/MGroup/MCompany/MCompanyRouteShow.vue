<template>
  <el-select v-model="getData.RouteCompanySelect" filterable placeholder="請選擇">
    <el-option
      v-for="item in getData.getCompanyNameData"
      :key="item['value']"
      :label="item['label']"
      :value="item['value']">
    </el-option>
  </el-select>
  <el-button @click="getRoute({getcount: 0})">查詢</el-button>
  <el-button @click="RouteDialogAddShow()">新增路線</el-button>
  <el-button>匯入</el-button>
  <el-table
    :data="getData.getRouteData"
    style="width: 100%">
    <el-table-column
      label="客運公司"
      width="180">
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.belong_company}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="路線代碼"
      width="180">
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.route_no}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="路線"
      width="180">
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.route_name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="經由站"
      width="180">
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.route_via_station}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{row,$index}">
        <el-button @click="RouteDialogEditShow({data: row})">
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
import useMCompanyStore from "../../../store/MGroup/MCompanyStore";

const MCompanyStore = useMCompanyStore();
const { getData } = storeToRefs(MCompanyStore);
const { getRoute, RouteDialogAddShow, RouteDialogEditShow } = MCompanyStore;

</script>

<style scoped>

</style>
