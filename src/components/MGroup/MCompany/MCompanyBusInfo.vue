<template>
  <el-dialog 
    v-model="DialogVisible.busInfoDialogFormVisible" 
    title="車籍資料"
    :before-close="handleClose"
  >
    <el-form :model="busInfoDialogForm" label-position="left">
      <el-form-item label="ID" :label-width="formLabelWidth">
        <span>{{busInfoDialogForm.uuid}}</span>
      </el-form-item>
      <el-form-item label="所屬客運" :label-width="formLabelWidth">
        <span>{{busInfoDialogForm.belong_company}}</span>
      </el-form-item>
      <el-form-item label="車籍 Etag" :label-width="formLabelWidth">
        <span>{{busInfoDialogForm.busEtag}}</span>
      </el-form-item>
      <el-form-item label="車籍編號" :label-width="formLabelWidth">
        <span>{{busInfoDialogForm.busNo}}</span>
      </el-form-item>
      <el-form-item label="乘坐人數" :label-width="formLabelWidth">
        <span>{{busInfoDialogForm.busType}}</span>
      </el-form-item>
      <el-form-item label="註記" :label-width="formLabelWidth">
        <span>{{busInfoDialogForm.busNote}}</span>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="DialogVisible.busInfoDialogFormVisible = false; busDialogClear()">關閉</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus'
import useMCompanyStore from "../../../store/MGroup/MCompanyStore";

const MCompanyStore = useMCompanyStore();
const { DialogVisible, busInfoDialogForm, getData } = storeToRefs(MCompanyStore);
const { busDialogClear } = MCompanyStore;

const formLabelWidth = '50px'

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您確定要關閉視窗?(內容不會保存)')
    .then(() => {
      done()
      busDialogClear()
    })
    .catch(() => {
      // catch error
    })
}

</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
