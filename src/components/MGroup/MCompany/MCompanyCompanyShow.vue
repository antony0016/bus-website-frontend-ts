<template>
  <el-button @click="CompanyDialogAddShow()">新增客運業者</el-button>
  <el-button>匯入</el-button>
  <el-button>範例表格下載</el-button>
  <el-table
    :data="getData.getCompanyData"
    style="width: 100%">
    <el-table-column
      label="業者編號"
      width="180">
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.company_no}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="客運公司"
      width="180">
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.company_name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="統一編號"
      width="180">
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.unified_no}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="電話"
      width="180">
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.company_phone}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="傳真"
      width="180">
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.company_fax}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="地址"
      width="180">
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.company_address}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="合約狀態"
      width="180">
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.contract_state}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="合約期間"
      width="180">
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.contract_datetime}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{row,$index}">
        <el-button @click="CompanyGoToRoute({data: row})">
          路線管理
        </el-button>
        <el-button @click="CompanyDialogEditShow({data: row})">
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
const { CompanyDialogAddShow, CompanyDialogEditShow, CompanyGoToRoute } = MCompanyStore;

</script>

<style scoped>

</style>
