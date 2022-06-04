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
  <el-upload
    class="upload"
    action=""
    :multiple="false"
    :show-file-list="false"
    accept="csv"
    :on-change="mrouteUploadChange">
    <el-button type="primary">匯入</el-button>
  </el-upload>
  <el-button @click="exportRouteExcel">匯出</el-button>
  <el-table
    :data="getData.getRouteData"
    id="route_table"
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
    <el-table-column label="操作">
      <template #default="{row,$index}">
        <el-button @click="RouteDialogEditShow({data: row})">
          編輯
        </el-button>
        <el-button @click="goToBusInfo({data: row})">
          車籍
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus'
import * as FileSaver from 'file-saver';
import * as XLSX from "xlsx";
import useMCompanyStore from "../../../store/MGroup/MCompanyStore";

const MCompanyStore = useMCompanyStore();
const { getData } = storeToRefs(MCompanyStore);
const { getRoute, postRouteCsvData, RouteDialogAddShow, RouteDialogEditShow, goToBusInfo } = MCompanyStore;

const mrouteUploadChange = ( file: any, fileList: any ) => {
  const files = file.raw
  if (!/\.(csv|xls|xlsx)$/.test(files.name.toLowerCase())) {
    console.log("上傳格式不正確，請上傳csv、xls或者xlsx格式");
    return false;
  }
  // 讀取表格
  const fileReader = new FileReader();
  fileReader.onload = (ev: any) => {
    const workbook = XLSX.read(ev.target.result, {
      type: "binary",
    });
    const wsname = workbook.SheetNames[0];
    const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // 得到的資料
    postRouteCsvData({data: ws, postcount: 0})
  };
  fileReader.readAsBinaryString(files);
}

const exportRouteExcel = () => {
  var csvParam = { raw: true };
  var wb = XLSX.utils.table_to_book(document.querySelector("#route_table"), csvParam);
  var wbout = XLSX.write(wb, {
    bookType: "csv",
    bookSST: true,
    type: "array"
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream;charset=utf-8" }),
      "routeData.csv"
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, wbout);
  }
}

</script>

<style scoped>

</style>
