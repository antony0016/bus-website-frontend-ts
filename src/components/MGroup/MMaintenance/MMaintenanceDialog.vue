<template>
  <el-dialog 
    v-model="visableControl.shiftDialogFormVisible" 
    title="班表管理"
    :before-close="handleClose"
  >
    <el-tabs v-model="activeTab">
      <el-tab-pane label="禮拜一" name="Monday">
        <el-form :model="ShiftDialogForm" label-position="left">
          <el-form-item label="新增資料" :label-width="formLabelWidth">
            <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.MondayData, weekType: 'Monday'});">
              新增
            </el-button>
          </el-form-item>
          <el-form-item :label="(index+1).toString()" :label-width="formLabelWidth"
          v-for="(item, index) in ShiftDialogForm.MondayData" :key="index"
          >
            <el-input type="time" v-model="item.arrival_time" autocomplete="off"/>
            <el-button type="danger" @click="deleteDialogValue({nowId: item.shift_uuid, weekType: 'Monday'})">刪除</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="禮拜二" name="Tuesday">
        <el-form :model="ShiftDialogForm" label-position="left">
          <el-form-item label="新增資料" :label-width="formLabelWidth">
            <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.TuesdayData, weekType: 'Tuesday'});">
              新增
            </el-button>
          </el-form-item>
          <el-form-item :label="(index+1).toString()" :label-width="formLabelWidth"
          v-for="(item, index) in ShiftDialogForm.TuesdayData" :key="index"
          >
            <el-input type="time" v-model="item.arrival_time" autocomplete="off"/>
            <el-button type="danger" @click="deleteDialogValue({nowId: item.shift_uuid, weekType: 'Tuesday'})">刪除</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="禮拜三" name="Wednesday">
        <el-form :model="ShiftDialogForm" label-position="left">
          <el-form-item label="新增資料" :label-width="formLabelWidth">
            <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.WednesdayData, weekType: 'Wednesday'});">
              新增
            </el-button>
          </el-form-item>
          <el-form-item :label="(index+1).toString()" :label-width="formLabelWidth"
          v-for="(item, index) in ShiftDialogForm.WednesdayData" :key="index"
          >
            <el-input type="time" v-model="item.arrival_time" autocomplete="off"/>
            <el-button type="danger" @click="deleteDialogValue({nowId: item.shift_uuid, weekType: 'Wednesday'})">刪除</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="禮拜四" name="Thursday">
        <el-form :model="ShiftDialogForm" label-position="left">
          <el-form-item label="新增資料" :label-width="formLabelWidth">
            <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.ThursdayData, weekType: 'Thursday'});">
              新增
            </el-button>
          </el-form-item>
          <el-form-item :label="(index+1).toString()" :label-width="formLabelWidth"
          v-for="(item, index) in ShiftDialogForm.ThursdayData" :key="index"
          >
            <el-input type="time" v-model="item.arrival_time" autocomplete="off"/>
            <el-button type="danger" @click="deleteDialogValue({nowId: item.shift_uuid, weekType: 'Thursday'})">刪除</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="禮拜五" name="Friday">
        <el-form :model="ShiftDialogForm" label-position="left">
          <el-form-item label="新增資料" :label-width="formLabelWidth">
            <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.FridayData, weekType: 'Friday'});">
              新增
            </el-button>
          </el-form-item>
          <el-form-item :label="(index+1).toString()" :label-width="formLabelWidth"
          v-for="(item, index) in ShiftDialogForm.FridayData" :key="index"
          >
            <el-input type="time" v-model="item.arrival_time" autocomplete="off"/>
            <el-button type="danger" @click="deleteDialogValue({nowId: item.shift_uuid, weekType: 'Friday'})">刪除</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="禮拜六" name="Saturday">
        <el-form :model="ShiftDialogForm" label-position="left">
          <el-form-item label="新增資料" :label-width="formLabelWidth">
            <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.SaturdayData, weekType: 'Saturday'});">
              新增
            </el-button>
          </el-form-item>
          <el-form-item :label="(index+1).toString()" :label-width="formLabelWidth"
          v-for="(item, index) in ShiftDialogForm.SaturdayData" :key="index"
          >
            <el-input type="time" v-model="item.arrival_time" autocomplete="off"/>
            <el-button type="danger" @click="deleteDialogValue({nowId: item.shift_uuid, weekType: 'Saturday'})">刪除</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="禮拜日" name="Sunday">
        <el-form :model="ShiftDialogForm" label-position="left">
          <el-form-item label="新增資料" :label-width="formLabelWidth">
            <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.SundayData, weekType: 'Sunday'});">
              新增
            </el-button>
          </el-form-item>
          <el-form-item :label="(index+1).toString()" :label-width="formLabelWidth"
          v-for="(item, index) in ShiftDialogForm.SundayData" :key="index"
          >
            <el-input type="time" v-model="item.arrival_time" autocomplete="off"/>
            <el-button type="danger" @click="deleteDialogValue({nowId: item.shift_uuid, weekType: 'Sunday'})">刪除</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs> 
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visableControl.shiftDialogFormVisible = false; activeTab = 'Monday'; shifDialogClear()">取消</el-button>
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
const activeTab = ref('Monday')
const time = ''
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您確定要關閉視窗?(內容不會保存)')
    .then(() => {
      done()
      shifDialogClear()
      activeTab.value = 'Monday'
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
