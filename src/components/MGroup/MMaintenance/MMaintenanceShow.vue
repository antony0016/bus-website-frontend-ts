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
    :default-sort="{prop: 'route_no', order: 'ascending'}">
    <el-table-column
      prop="belong_company"
      label="客運公司"
      width="150"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.belong_company }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="route_no"
      label="路線代碼"
      width="150"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.route_no }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="route_name"
      label="路線"
      width="150"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.route_name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="route_via_station"
      label="經由站"
      width="150"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.route_via_station }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="startTime"
      label="發車時間-工作日"
      width="150"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.noramlStartTime.substring(0, 5) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="route_via_station"
      label="末車時間-工作日"
      width="150"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.noramlEndTime.substring(0, 5) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="startTime"
      label="發車時間-假日"
      width="150"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.weekStartTime.substring(0, 5) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="route_via_station"
      label="末車時間-假日"
      width="150"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.weekEndTime.substring(0, 5) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{row,$index}">
        <el-upload
          class="upload"
          action=""
          :multiple="false"
          :show-file-list="false"
          accept="csv"
          :on-change="mbusshiftUploadChange">
          <el-button type="primary" @click="postBusShiftCsvChoice({data: row.route_uuid, weektype: 'Normal'})">平日班表匯入
          </el-button>
        </el-upload>
        <el-upload
          class="upload"
          action=""
          :multiple="false"
          :show-file-list="false"
          accept="csv"
          :on-change="mbusshiftUploadChange">
          <el-button type="primary" @click="postBusShiftCsvChoice({data: row.route_uuid, weektype: 'WeekDay'})">假日班表匯入
          </el-button>
        </el-upload>
        <el-container>
          <el-button @click="exportMaintenanceExcel(row)">
            匯出
          </el-button>
          <el-button @click="shiftDialogShow({data: row})">
            班表
          </el-button>
        </el-container>
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
import useMMaintenanceStore from "../../../store/MGroup/MMaintenanceStore";

const MMaintenanceStore = useMMaintenanceStore();
const { getData, filterData } = storeToRefs(MMaintenanceStore);
const { getRoute, shiftDialogShow, postBusShiftCsvChoice, postBusShiftCsvData } = MMaintenanceStore;

const mbusshiftUploadChange = (file: any, fileList: any) => {
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
    postBusShiftCsvData({ data: ws, postcount: 0 })
  };
  fileReader.readAsBinaryString(files);
}

const exportMaintenanceExcel = (data: any) => {
  let exportdataList_Normal = [
    ['所屬客運', '所屬路線', '工作日首班車', '工作日末班車'],
    [data.belong_company, data.route_name, data.noramlStartTime, data.noramlEndTime],
    ['時刻表', null, null, null, null]
  ]
  for (let nv of data.noramlBusShiftData) {
    let templist_normal = [
      nv['arrival_time'],
    ]
    exportdataList_Normal.push(templist_normal)
  }

  let exportdataList_Week = [
    ['所屬客運', '所屬路線', '假日首班車', '假日末班車'],
    [data.belong_company, data.route_name, data.weekStartTime, data.weekEndTime],
    ['時刻表', null, null, null, null]
  ]
  for (let wv of data.weekBusShiftData) {
    let templist_week = [
      wv['arrival_time'],
    ]
    exportdataList_Week.push(templist_week)
  }

  let wb_n = XLSX.utils.book_new()
  let wb_w = XLSX.utils.book_new()
  let ws_n = XLSX.utils.aoa_to_sheet(exportdataList_Normal)
  let ws_w = XLSX.utils.aoa_to_sheet(exportdataList_Week)
  XLSX.utils.book_append_sheet(wb_n, ws_n, 'normalDayData')
  XLSX.utils.book_append_sheet(wb_w, ws_w, 'weekDayData')

  let wbout_n = XLSX.write(wb_n, {
    bookType: "csv",
    bookSST: true,
    type: "array"
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout_n], { type: "application/octet-stream;charset=utf-8" }),
      "shiftNormalDayData.csv"
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, wbout_n);
  }

  let wbout_w = XLSX.write(wb_w, {
    bookType: "csv",
    bookSST: true,
    type: "array"
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout_w], { type: "application/octet-stream;charset=utf-8" }),
      "shiftWeekDayData.csv"
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, wbout_w);
  }

}

</script>

<style scoped>

</style>
