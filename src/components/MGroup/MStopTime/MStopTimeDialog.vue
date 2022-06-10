<template>
  <el-dialog 
    v-model="visableControl.shiftAddDialogFormVisible" 
    title="新增排程"
    :before-close="handleClose"
  >
    <el-form :model="scheduleTabData.addForm" label-position="left">
      <el-form-item label="排程名稱" :label-width="formLabelWidth">
        <el-input v-model="scheduleTabData.addForm.inputName" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visableControl.shiftAddDialogFormVisible = false; clearSchedule()">取消</el-button>
        <el-button type="primary" @click="addSchedule(); visableControl.shiftAddDialogFormVisible = false;">
          新增
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus'
import useStopTimeStore from "../../../store/MGroup/MStopTimeStore";

const StopTimeStore = useStopTimeStore();
const { visableControl, scheduleTabData } = storeToRefs(StopTimeStore);
const { clearSchedule, addSchedule } = StopTimeStore;

const formLabelWidth = '50px'
const time = ''
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您確定要關閉視窗?(內容不會保存)')
    .then(() => {
      done()
      clearSchedule()
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
