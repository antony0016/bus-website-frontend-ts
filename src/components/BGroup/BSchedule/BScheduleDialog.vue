<template>
  <el-dialog 
    v-model="dialogSetting.visable" 
    title="排程編輯"
    :before-close="handleClose"
  >
    <el-form :model="dialogSetting" label-position="left">
      <el-form-item label="排程名稱" :label-width="formLabelWidth">
        <el-input v-model="dialogSetting.schedule_name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="開始日期" :label-width="formLabelWidth">
        <el-input v-model="dialogSetting.schedule_start_date" type="date" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="結束日期" :label-width="formLabelWidth">
        <el-input v-model="dialogSetting.schedule_end_date" type="date" autocomplete="off" :disabled="dialogSetting.schedule_end_date_disable"/>
      </el-form-item>
      <el-form-item label="開始時間" :label-width="formLabelWidth">
        <el-input v-model="dialogSetting.schedule_start_time" type="time" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="結束時間" :label-width="formLabelWidth">
        <el-input v-model="dialogSetting.schedule_end_time" type="time" autocomplete="off" :disabled="dialogSetting.schedule_end_time_disable"/>
      </el-form-item>
      <el-form-item label="每隔/小時" :label-width="formLabelWidth">
        <el-select v-model="dialogSetting.schedule_frequency_hour" filterable placeholder="請選擇" :disabled="dialogSetting.schedule_frequency_hour_disable">
          <el-option
            v-for="v of hourSelect"
            :key="v['value']"
            :label="v['lable']"
            :value="v['value']">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="每隔/分鐘" :label-width="formLabelWidth">
        <el-select v-model="dialogSetting.schedule_frequency_minute" filterable placeholder="請選擇" :disabled="dialogSetting.schedule_frequency_minute_disable">
          <el-option
            v-for="v of minuteSelect"
            :key="v['value']"
            :label="v['lable']"
            :value="v['value']">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="播放次數" :label-width="formLabelWidth">
        <el-input v-model="dialogSetting.schedule_frequency_number" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="定期循環" :label-width="formLabelWidth">
        <el-checkbox v-model="dialogSetting.schedule_is_cycle" @change="dialogCycleTypeChange()"/>
      </el-form-item>
      <el-form-item label="每週/每日" :label-width="formLabelWidth">
        <el-select v-model="dialogSetting.schedule_cycle_type" filterable placeholder="請選擇" 
          :disabled="dialogSetting.schedule_cycle_type_disable"
          @change="dialogCycleEveryDayCheck()"
        >
          <el-option
            v-for="v of cycleTypeSelect"
            :key="v.value"
            :label="v.lable"
            :value="v.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="星期" :label-width="formLabelWidth">
        <el-checkbox v-for="v in dialogSetting.schedule_cycle_day"
          v-model="v.value" :label="v.lable" :disabled="dialogSetting.schedule_cycle_day_disable"
        />
      </el-form-item>
      <el-form-item label="新增程序" :label-width="formLabelWidth">
        <el-select v-model="dialogSetting.schedule_program_select" filterable placeholder="請選擇" 
        >
          <el-option
            v-for="v of getData.programData"
            :key="v['uuid']"
            :label="v['program_name']"
            :value="v['uuid']">
          </el-option>
        </el-select>
        <el-button type="primary" @click="dialogAddProgram()">
          新增
        </el-button>
      </el-form-item>
      <el-form-item label="廣播內容" :label-width="formLabelWidth">
        <el-table
          :data="dialogSetting.schedule_programs"
          id="schedule_have_programs_table"
          style="width: 100%"
          :default-sort="{prop: 'program_order', order: 'ascending'}">
          <el-table-column
            prop="program_order"
            label="順序"
            width="180"
            sortable>
            <template #default="{row,$index}">
              <span style="margin-left: 10px">{{ row.program_order }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="program_name"
            label="程序名稱"
            width="180"
            sortable>
            <template #default="{row,$index}">
              <span style="margin-left: 10px">{{ row.program_name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="program_content_text"
            label="程序內容"
            width="180"
            sortable>
            <template #default="{row,$index}">
              <span style="margin-left: 10px">{{ row.program_content_text }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{row,$index}">
              <el-button type="danger" @click="dialogDeleteProgram({data:row})">
                刪除
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="順序調整">
            <template #default="{row,$index}">
              <el-button @click="dialogSwitchProgram({data:row, direction: 'up'})">
                ▲
              </el-button>
              <el-button @click="dialogSwitchProgram({data:row, direction: 'down'})">
                ▼
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogSetting.visable = false; dialogClear()">取消</el-button>
        <el-button type="primary" @click="addSchedule({postcount:0}); dialogSetting.visable = false;" v-show="!dialogSetting.addEditChange">
          新增
        </el-button>
        <el-button type="primary" @click="updateSchedule({putcount:0}); dialogSetting.visable = false;" v-show="dialogSetting.addEditChange">
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

import useBScheduleStore from "../../../store/BGroup/BScheduleStore";

const BScheduleStore = useBScheduleStore();
const { getData, dialogSetting } = storeToRefs(BScheduleStore);
const { dialogClear, dialogCycleTypeChange, dialogCycleEveryDayCheck, dialogAddProgram, dialogDeleteProgram, addSchedule, updateSchedule, dialogSwitchProgram } = BScheduleStore;

const formLabelWidth = '50px'

let hourSelect: { lable: number; value: number; }[] = []
let minuteSelect: { lable: number; value: number; }[] = []
let cycleTypeSelect = [
    {lable: '每週', value: 'week'},
    {lable: '每天', value: 'day'}
  ]

const hourSelectDue = () => {
  for (let h = 0; h < 25; h++){
    hourSelect.push({lable: h, value: h})
  }
}

const minuteSelectDue = () => {
  for (let m = 0; m < 61; m++){
    minuteSelect.push({lable: m, value: m})
  }
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您確定要關閉視窗?(內容不會保存)')
    .then(() => {
      done()
      dialogClear()
    })
    .catch(() => {
      // catch error
    })
}

hourSelectDue()
minuteSelectDue()

</script>

<style scoped>
</style>
