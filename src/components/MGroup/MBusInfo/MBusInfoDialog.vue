<template>
  <el-dialog 
    v-model="dialogVisible.busDialogFormVisible" 
    title="路線管理"
    :before-close="handleClose"
  >
    <el-form :model="busDialogForm" label-position="left">
      <el-form-item label="所屬客運" :label-width="formLabelWidth" >
        <el-select v-model="busDialogForm.belong_company" filterable placeholder="請選擇" @change="getBusRoute({getcount: 0, select: 'dialog'}); busDialogForm.belong_route=''">
          <el-option
            v-for="item in getData.getCompanyData"
            :key="item['company_uuid']"
            :label="item['company_name']"
            :value="item['company_uuid']">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所屬路線" :label-width="formLabelWidth" >
        <el-select v-model="busDialogForm.belong_route" filterable placeholder="請選擇">
          <el-option
            v-for="item in getData.getRouteData"
            :key="item['route_uuid']"
            :label="item['route_name']"
            :value="item['route_uuid']">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="車號" :label-width="formLabelWidth">
        <el-input v-model="busDialogForm.bus_no" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="狀態" :label-width="formLabelWidth">
        <el-input v-model="busDialogForm.bus_status" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="乘車人數" :label-width="formLabelWidth">
        <el-input v-model="busDialogForm.bus_type" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="備註" :label-width="formLabelWidth">
        <el-input v-model="busDialogForm.bus_note" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible.busDialogFormVisible = false; deleteBus({deletecount:0})" type="danger" v-show="dialogVisible.busAddChangeSwitch">刪除</el-button>
        <el-button @click="dialogVisible.busDialogFormVisible = false; busDialogClear()">取消</el-button>
        <el-button type="primary" @click="putBus({putcount:0}); dialogVisible.busDialogFormVisible = false;" v-show="dialogVisible.busAddChangeSwitch">
          儲存
        </el-button>
        <el-button type="primary" @click="postBus({postcount:0}); dialogVisible.busDialogFormVisible = false;" v-show="!dialogVisible.busAddChangeSwitch">
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
import useMBusInfoStore from "../../../store/MGroup/MBusInfoStore";

const MBusInfoStore = useMBusInfoStore();
const { busDialogForm, dialogVisible, getData, disableControl } = storeToRefs(MBusInfoStore);
const { getBusRoute, busDialogClear, postBus, putBus, deleteBus } = MBusInfoStore;

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
