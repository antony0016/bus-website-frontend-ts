<template>
  <el-dialog 
    v-model="visableControl.shiftDialogFormVisible" 
    title="班表管理"
    :before-close="handleClose"
  >
    <el-tabs v-model="activeTab">
      <el-tab-pane label="禮拜一" name="Monday">
        <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.MondayData, weekType: 'Monday'});">
          新增
        </el-button>
        <el-table
          :data="ShiftDialogForm.MondayData"
          style="width: 100%"
          :default-sort="{prop: 'arrival_time', order: 'ascending'}"
        >
          <el-table-column
            prop="arrival_time"
            label="抵達時間"
            width="350"
            sortable>
            <template #default="{row,$index}">
              <el-input type="time" v-model="ShiftDialogForm.MondayData[$index].arrival_time" autocomplete="off"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="broadcast_time_default"
            label="預計播放時間"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.MondayData[$index].broadcast_time_default}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="broadcast_time"
            label="自訂播放時間"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.MondayData[$index].broadcast_time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_auto_broadcast"
            label="是否自動播放"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.MondayData[$index].is_auto_broadcast}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="kanban_status"
            label="看板狀態"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.MondayData[$index].kanban_status}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="control"
            label="操作"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <el-button type="danger" @click="deleteDialogValue({nowId: ShiftDialogForm.MondayData[$index].shift_uuid, weekType: 'Monday'})">刪除</el-button>
              <div v-if="ShiftDialogForm.MondayData[$index].is_exist=='existed'">
                <el-button type="primary" @click="playBusShiftAudio({postcount:0, shift_uuid:ShiftDialogForm.MondayData[$index].shift_uuid})">播放</el-button>
              </div>
              <div v-else>
                <el-button type="primary" @click="playBusShiftAudio({postcount:0, shift_uuid:ShiftDialogForm.MondayData[$index].shift_uuid})" :disabled="true">播放</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="禮拜二" name="Tuesday">
        <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.TuesdayData, weekType: 'Tuesday'});">
          新增
        </el-button>
        <el-table
          :data="ShiftDialogForm.TuesdayData"
          style="width: 100%"
          :default-sort="{prop: 'arrival_time', order: 'ascending'}"
        >
          <el-table-column
            prop="arrival_time"
            label="抵達時間"
            width="350"
            sortable>
            <template #default="{row,$index}">
              <el-input type="time" v-model="ShiftDialogForm.TuesdayData[$index].arrival_time" autocomplete="off"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="broadcast_time_default"
            label="預計播放時間"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.TuesdayData[$index].broadcast_time_default}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="broadcast_time"
            label="自訂播放時間"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.TuesdayData[$index].broadcast_time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_auto_broadcast"
            label="是否自動播放"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.TuesdayData[$index].is_auto_broadcast}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="kanban_status"
            label="看板狀態"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.TuesdayData[$index].kanban_status}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="control"
            label="操作"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <el-button type="danger" @click="deleteDialogValue({nowId: ShiftDialogForm.TuesdayData[$index].shift_uuid, weekType: 'Tuesday'})">刪除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="禮拜三" name="Wednesday">
        <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.WednesdayData, weekType: 'Wednesday'});">
          新增
        </el-button>
        <el-table
          :data="ShiftDialogForm.WednesdayData"
          style="width: 100%"
          :default-sort="{prop: 'arrival_time', order: 'ascending'}"
        >
          <el-table-column
            prop="arrival_time"
            label="抵達時間"
            width="350"
            sortable>
            <template #default="{row,$index}">
              <el-input type="time" v-model="ShiftDialogForm.WednesdayData[$index].arrival_time" autocomplete="off"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="broadcast_time_default"
            label="預計播放時間"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.WednesdayData[$index].broadcast_time_default}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="broadcast_time"
            label="自訂播放時間"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.WednesdayData[$index].broadcast_time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_auto_broadcast"
            label="是否自動播放"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.WednesdayData[$index].is_auto_broadcast}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="kanban_status"
            label="看板狀態"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.WednesdayData[$index].kanban_status}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="control"
            label="操作"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <el-button type="danger" @click="deleteDialogValue({nowId: ShiftDialogForm.WednesdayData[$index].shift_uuid, weekType: 'Wednesday'})">刪除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="禮拜四" name="Thursday">
        <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.ThursdayData, weekType: 'Thursday'});">
          新增
        </el-button>
        <el-table
          :data="ShiftDialogForm.ThursdayData"
          style="width: 100%"
          :default-sort="{prop: 'arrival_time', order: 'ascending'}"
        >
          <el-table-column
            prop="arrival_time"
            label="抵達時間"
            width="350"
            sortable>
            <template #default="{row,$index}">
              <el-input type="time" v-model="ShiftDialogForm.ThursdayData[$index].arrival_time" autocomplete="off"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="broadcast_time_default"
            label="預計播放時間"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.ThursdayData[$index].broadcast_time_default}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="broadcast_time"
            label="自訂播放時間"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.ThursdayData[$index].broadcast_time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_auto_broadcast"
            label="是否自動播放"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.ThursdayData[$index].is_auto_broadcast}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="kanban_status"
            label="看板狀態"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.ThursdayData[$index].kanban_status}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="control"
            label="操作"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <el-button type="danger" @click="deleteDialogValue({nowId: ShiftDialogForm.ThursdayData[$index].shift_uuid, weekType: 'Thursday'})">刪除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="禮拜五" name="Friday">
        <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.FridayData, weekType: 'Friday'});">
          新增
        </el-button>
        <el-table
          :data="ShiftDialogForm.FridayData"
          style="width: 100%"
          :default-sort="{prop: 'arrival_time', order: 'ascending'}"
        >
          <el-table-column
            prop="arrival_time"
            label="抵達時間"
            width="350"
            sortable>
            <template #default="{row,$index}">
              <el-input type="time" v-model="ShiftDialogForm.FridayData[$index].arrival_time" autocomplete="off"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="broadcast_time_default"
            label="預計播放時間"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.FridayData[$index].broadcast_time_default}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="broadcast_time"
            label="自訂播放時間"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.FridayData[$index].broadcast_time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_auto_broadcast"
            label="是否自動播放"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.FridayData[$index].is_auto_broadcast}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="kanban_status"
            label="看板狀態"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.FridayData[$index].kanban_status}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="control"
            label="操作"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <el-button type="danger" @click="deleteDialogValue({nowId: ShiftDialogForm.FridayData[$index].shift_uuid, weekType: 'Friday'})">刪除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="禮拜六" name="Saturday">
        <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.SaturdayData, weekType: 'Saturday'});">
          新增
        </el-button>
        <el-table
          :data="ShiftDialogForm.SaturdayData"
          style="width: 100%"
          :default-sort="{prop: 'arrival_time', order: 'ascending'}"
        >
          <el-table-column
            prop="arrival_time"
            label="抵達時間"
            width="350"
            sortable>
            <template #default="{row,$index}">
              <el-input type="time" v-model="ShiftDialogForm.SaturdayData[$index].arrival_time" autocomplete="off"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="broadcast_time_default"
            label="預計播放時間"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.SaturdayData[$index].broadcast_time_default}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="broadcast_time"
            label="自訂播放時間"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.SaturdayData[$index].broadcast_time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_auto_broadcast"
            label="是否自動播放"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.SaturdayData[$index].is_auto_broadcast}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="kanban_status"
            label="看板狀態"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.SaturdayData[$index].kanban_status}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="control"
            label="操作"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <el-button type="danger" @click="deleteDialogValue({nowId: ShiftDialogForm.SaturdayData[$index].shift_uuid, weekType: 'Saturday'})">刪除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="禮拜日" name="Sunday">
        <el-button type="primary" @click="addDialogValue({data: ShiftDialogForm.SundayData, weekType: 'Sunday'});">
          新增
        </el-button>
        <el-table
          :data="ShiftDialogForm.SundayData"
          style="width: 100%"
          :default-sort="{prop: 'arrival_time', order: 'ascending'}"
        >
          <el-table-column
            prop="arrival_time"
            label="抵達時間"
            width="350"
            sortable>
            <template #default="{row,$index}">
              <el-input type="time" v-model="ShiftDialogForm.SundayData[$index].arrival_time" autocomplete="off"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="broadcast_time_default"
            label="預計播放時間"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.SundayData[$index].broadcast_time_default}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="broadcast_time"
            label="自訂播放時間"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.SundayData[$index].broadcast_time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_auto_broadcast"
            label="是否自動播放"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.SundayData[$index].is_auto_broadcast}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="kanban_status"
            label="看板狀態"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <span>{{ShiftDialogForm.SundayData[$index].kanban_status}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="control"
            label="操作"
            width="150"
            sortable>
            <template #default="{row,$index}">
              <el-button type="danger" @click="deleteDialogValue({nowId: ShiftDialogForm.SundayData[$index].shift_uuid, weekType: 'Sunday'})">刪除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
const { shifDialogClear, submitDialog, addDialogValue, deleteDialogValue, playBusShiftAudio } = MMaintenanceStore;

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
