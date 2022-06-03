<template>
  <el-dialog 
    v-model="visableControl.shiftDialogFormVisible" 
    title="班表管理"
    :before-close="handleClose"
  >
    <el-tabs v-model="activeTab">
      <el-tab-pane label="工作日班次" name="normal">
        <el-form :model="ShiftDialogForm" label-position="left">
          <el-form-item label="新增資料" :label-width="formLabelWidth">
            <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.normalDayData, weekType: 'Normal'});">
              新增
            </el-button>
          </el-form-item>
          <el-form-item :label="(index+1).toString()" :label-width="formLabelWidth"
          v-for="(item, index) in ShiftDialogForm.normalDayData" :key="index"
          >
            <el-input type="time" v-model="item.arrival_time" autocomplete="off"/>
            <el-button type="danger" @click="deleteDialogValue({nowId: item.shift_uuid, weekType: 'Normal'})">刪除</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="假日班次" name="week">
        <el-form :model="ShiftDialogForm" label-position="left">
          <el-form-item label="新增資料" :label-width="formLabelWidth">
            <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.weekDayData, weekType: 'WeekDay'});">
              新增
            </el-button>
          </el-form-item>
          <el-form-item :label="(index+1).toString()" :label-width="formLabelWidth"
          v-for="(item, index) in ShiftDialogForm.weekDayData" :key="index"
          >
            <el-input type="time" v-model="item.arrival_time" autocomplete="off"/>
            <el-button type="danger" @click="deleteDialogValue({nowId: item.shift_uuid, weekType: 'WeekDay'})">刪除</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs> 
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visableControl.shiftDialogFormVisible = false; activeTab = 'normal'; shifDialogClear()">取消</el-button>
        <el-button type="primary" @click="submitDialog(); visableControl.shiftDialogFormVisible = false;">
          儲存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus'
import useMMaintenanceStore from "../../../store/MGroup/MMaintenanceStore";

const MMaintenanceStore = useMMaintenanceStore();
const { getData, ShiftDialogForm, visableControl } = storeToRefs(MMaintenanceStore);
const { shifDialogClear, submitDialog, addDialogValue, deleteDialogValue } = MMaintenanceStore;

const formLabelWidth = '50px'
const activeTab = ref('normal')
const time = ''
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您確定要關閉視窗?(內容不會保存)')
    .then(() => {
      done()
      shifDialogClear()
      activeTab.value = 'normal'
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
