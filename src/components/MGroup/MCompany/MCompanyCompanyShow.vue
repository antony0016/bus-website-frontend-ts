<template>
  <el-container class="button-gutter">
    <el-button @click="CompanyDialogAddShow()" :disabled="buttonDisable.normalAdminDisable">新增客運業者</el-button>
    <el-upload
      class="upload"
      action=""
      :multiple="false"
      :show-file-list="false"
      accept="csv"
      :on-change="mcompanyUploadChange"
      :disabled="buttonDisable.normalAdminDisable">
      <el-button type="primary" :disabled="buttonDisable.normalAdminDisable">匯入</el-button>
    </el-upload>
    <el-button @click="exportCompanyExcel" :disabled="buttonDisable.normalAdminDisable">匯出</el-button>
  </el-container>
  <el-table
    :data="getData.getCompanyData"
    id="company_table"
    style="width: 100%"
    :default-sort="{prop: 'company_no', order: 'ascending'}">
    <el-table-column
      prop="company_no"
      label="業者編號"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.company_no }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="company_name"
      label="客運公司"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.company_name }}</span>
      </template>
    </el-table-column>
    <el-table-column
        prop="company_en_name"
        label="客運公司英文"
        width="180"
        sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.company_en_name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="unified_no"
      label="統一編號"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.unified_no }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="company_phone"
      label="電話"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.company_phone }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="company_fax"
      label="傳真"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.company_fax }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="company_address"
      label="地址"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.company_address }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="contract_state"
      label="合約狀態"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.contract_state }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="contract_datetime"
      label="合約開始期間"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.contract_datetime }}</span>
      </template>
    </el-table-column>
    <el-table-column
        prop="contract_end_datetime"
        label="合約結束期間"
        width="180"
        sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.contract_end_datetime }}</span>
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
        <el-button @click="companyAccountDialogOpen({id: row.company_uuid})">
          收支頁面
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus';
import * as FileSaver from 'file-saver';
import * as XLSX from "xlsx";
import useMCompanyStore from "../../../store/MGroup/MCompanyStore";
import useLoginManagerStore from "../../../store/LoginManagerStore";

const MCompanyStore = useMCompanyStore();
const { getData } = storeToRefs(MCompanyStore);
const { postCompanyCsvData, CompanyDialogAddShow, CompanyDialogEditShow, CompanyGoToRoute, companyAccountDialogOpen } = MCompanyStore;

const loginManagerStore = useLoginManagerStore();
const { buttonDisable } = storeToRefs(loginManagerStore);

const mcompanyUploadChange = (file: any, fileList: any) => {
  const files = file.raw
  if (!/\.(csv|xls|xlsx)$/.test(files.name.toLowerCase())) {
    console.log("上傳格式不正確，請上傳csv、xls或者xlsx格式");
    return false;
  }
  // 讀取表格
  const fileReader = new FileReader();
  // fileReader.readAsText(file.raw, "UTF-8")
  fileReader.onload = (ev: any) => {
    const data = ev.target.result
    // const buf = new Uint8Array(data)
    // const isUtf8File = isUtf8(buf)
    // const workbook = XLSX.read(isUtf8File ? data : cptable.utils.decode(936, buf), { type: isUtf8File ? "array" : 'string'});
    const workbook = XLSX.read(data, {
      type: "binary",
    });
    const wsname = workbook.SheetNames[0];
    const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // 得到的資料
    postCompanyCsvData({ data: ws, postcount: 0 })
  };
  fileReader.readAsBinaryString(files);
}

const exportCompanyExcel = () => {
  let exportdataList = [['業者編號', '客運公司', '統一編號', '電話', '傳真', '地址', '合約狀態', '合約期間', 'Email']]
  for (let v of getData.value.getCompanyData) {
    let templist = [
      v['company_no'],
      v['company_name'],
      v['unified_no'],
      v['company_phone'],
      v['company_fax'],
      v['company_address'],
      v['contract_state'],
      v['contract_datetime'],
      v['company_email']
    ]
    exportdataList.push(templist)
  }

  let wb = XLSX.utils.book_new()
  let ws = XLSX.utils.aoa_to_sheet(exportdataList)
  XLSX.utils.book_append_sheet(wb, ws, 'companyData')

  let wbout = XLSX.write(wb, {
    bookType: "csv",
    bookSST: true,
    type: "array"
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream;charset=utf-8" }),
      "companyData.csv"
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, wbout);
  }
}

</script>

<style scoped>
</style>
