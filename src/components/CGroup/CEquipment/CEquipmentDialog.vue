<template>
  <el-dialog 
    v-model="dialogVisible.equipmentDialogFormVisable" 
    title="設備編輯"
    :before-close="handleClose"
  >
    <el-form :model="equipmentDialogFormData" label-position="left">
      <el-form-item label="設備種類" :label-width="formLabelWidth">
        <el-select v-model="equipmentDialogFormData.equipment_type" filterable placeholder="請選擇" :disabled="dialogVisible.selectDisable">
          <el-option
            v-for="v of selectItem"
            :key="v.type_id"
            :label="v.type_ch_name"
            :value="v.type_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="設備編號" :label-width="formLabelWidth">
        <el-input v-model="equipmentDialogFormData.equipment_no" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="設備名稱" :label-width="formLabelWidth">
        <el-input v-model="equipmentDialogFormData.equipment_name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="設備IP" :label-width="formLabelWidth">
        <el-input v-model="equipmentDialogFormData.equipment_IP" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="設備狀態" :label-width="formLabelWidth">
        <el-input v-model="equipmentDialogFormData.equipment_state" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="設備帳號" :label-width="formLabelWidth">
        <el-input v-model="equipmentDialogFormData.equipment_account" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="設備密碼" :label-width="formLabelWidth">
        <el-input  type="password" v-model="equipmentDialogFormData.equipment_password" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="所屬月台" :label-width="formLabelWidth">
        <el-select v-model="equipmentDialogFormData.belong_platform" filterable placeholder="請選擇">
          <el-option
            v-for="v of getData.platformData"
            :key="v['uuid']"
            :label="v['platform_name']"
            :value="v['uuid']">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible.equipmentDialogFormVisable = false; equipmentDialogClear()">取消</el-button>
        <el-button type="primary" @click="postEquipment({postcount:0}); dialogVisible.equipmentDialogFormVisable = false;" v-show="!dialogVisible.selectDisable">
          新增
        </el-button>
        <el-button type="primary" @click="putEquipment({putcount:0}); dialogVisible.equipmentDialogFormVisable = false;" v-show="dialogVisible.selectDisable">
          儲存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus';
import * as FileSaver from 'file-saver';
import * as XLSX from "xlsx";
import useCEquipmentStore from "../../../store/CGrroup/CEquipmentStore";

const CEquipmentStore = useCEquipmentStore();
const { selectItem, getData, dialogVisible, equipmentDialogFormData } = storeToRefs(CEquipmentStore);
const { equipmentDialogClear, postEquipment, putEquipment } = CEquipmentStore;

const formLabelWidth = '50px'

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您確定要關閉視窗?(內容不會保存)')
    .then(() => {
      done()
      equipmentDialogClear()
    })
    .catch(() => {
      // catch error
    })
}

</script>

<style scoped>
</style>
