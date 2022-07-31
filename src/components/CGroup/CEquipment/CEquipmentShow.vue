<template>
  <el-table
    :data="getData.filterEquipmentData"
    v-loading="loadingShow.equipmentTableShow"
    style="width: 100%"
    :default-sort = "{prop: 'equipment_no', order: 'ascending'}">
    <el-table-column
      prop="equipment_no"
      label="編號"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.equipment_no}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="equipment_name"
      label="名稱"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.equipment_name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="equipment_IP"
      label="IP"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.equipment_IP}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="equipment_state"
      label="狀態"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.equipment_state}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="belong_platform_name"
      label="所屬月台"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.belong_platform_name}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{row,$index}">
        <el-button
          type="primary"
          @click="equipmentDialogUpdate({data: row})"
        >
          編輯
        </el-button>
        <el-button
          type="danger"
          @click="deleteEquipment({deletecount:0, id: row.uuid})"
        >
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
import * as FileSaver from 'file-saver';
import * as XLSX from "xlsx";
import useCEquipmentStore from "../../../store/CGrroup/CEquipmentStore";

const CEquipmentStore = useCEquipmentStore();
const { getData, loadingShow } = storeToRefs(CEquipmentStore);
const { equipmentDialogUpdate, deleteEquipment } = CEquipmentStore;

</script>

<style scoped>
</style>
