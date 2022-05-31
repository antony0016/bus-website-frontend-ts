<template>
  <el-dialog 
    v-model="DialogVisible.RouteDialogFormVisible" 
    title="路線管理"
    :before-close="handleClose"
  >
    <el-form :model="RouteDialogForm" label-position="left">
      <el-form-item label="客運公司" :label-width="formLabelWidth">
        <el-select v-model="getData.RouteinDialogSelect" filterable placeholder="請選擇" :disabled="DialogVisible.RoutrDisable" @change="getBus({ getcount: 0 }); getData.BusDialogSelect=''">
          <el-option
            v-for="item in getData.getCompanyData"
            :key="item['company_name']"
            :label="item['company_name']"
            :value="item['company_name']">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="車籍" :label-width="formLabelWidth">
        <el-select v-model="getData.BusDialogSelect" filterable placeholder="請選擇" :disabled="DialogVisible.RoutrDisable">
          <el-option
            v-for="item in getData.busDialogData"
            :key="item['uuid']"
            :label="item['bus_no']"
            :value="item['uuid']">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路線代碼" :label-width="formLabelWidth">
        <el-input v-model="RouteDialogForm.route_no" autocomplete="off" :disabled="DialogVisible.RoutrDisable"/>
      </el-form-item>
      <el-form-item label="路線" :label-width="formLabelWidth">
        <el-input v-model="RouteDialogForm.route_name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="經由站" :label-width="formLabelWidth">
        <el-input v-model="RouteDialogForm.route_via_station" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="DialogVisible.RouteDialogFormVisible = false; deleteRoute({deletecount:0})" type="danger" v-show="DialogVisible.RouteAddChangeSwitch">刪除</el-button>
        <el-button @click="DialogVisible.RouteDialogFormVisible = false; RouteDialogClear()">取消</el-button>
        <el-button type="primary" @click="putRoute({putcount:0}); DialogVisible.RouteDialogFormVisible = false;" v-show="DialogVisible.RouteAddChangeSwitch">
          儲存
        </el-button>
        <el-button type="primary" @click="postRoute({postcount:0}); DialogVisible.RouteDialogFormVisible = false;" v-show="!DialogVisible.RouteAddChangeSwitch">
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
import useMCompanyStore from "../../../store/MGroup/MCompanyStore";

const MCompanyStore = useMCompanyStore();
const { DialogVisible, RouteDialogForm, getData } = storeToRefs(MCompanyStore);
const { RouteDialogClear, postRoute, putRoute, deleteRoute, getBus } = MCompanyStore;

const formLabelWidth = '50px'

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您確定要關閉視窗?(內容不會保存)')
    .then(() => {
      done()
      RouteDialogClear()
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
