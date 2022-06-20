<template>
  <el-dialog 
    v-model="companyAccountDialog.editIsShow" 
    title="編輯收支"
    :before-close="handleClose"
  >
    <el-form :model="companyAccountDialog" label-position="left">
      <el-form-item label="收入/支出" :label-width="formLabelWidth">
        <el-input v-model="companyAccountDialog.nowIsIncome" autocomplete="off" :disabled="true"/>
      </el-form-item>
      <el-form-item label="簡述" :label-width="formLabelWidth">
        <el-input v-model="companyAccountDialog.nowDescription" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="金額" :label-width="formLabelWidth">
        <el-input v-model="companyAccountDialog.nowAmount" type="number" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="companyAccountDialog.editIsShow = false; companyAccountEditDialogClear()">取消</el-button>
        <el-button type="primary" @click="companyAccountAddDialogSubmit(); companyAccountDialog.editIsShow = false;" v-show="!companyAccountDialog.editIsAdd">
          新增
        </el-button>
        <el-button type="primary" @click="companyAccountEditDialogSubmit(); companyAccountDialog.editIsShow = false;" v-show="companyAccountDialog.editIsAdd">
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
import useMCompanyStore from "../../../store/MGroup/MCompanyStore";

const MCompanyStore = useMCompanyStore();
const { companyAccountDialog } = storeToRefs(MCompanyStore);
const { companyAccountEditDialogClear, companyAccountAddDialogSubmit, companyAccountEditDialogSubmit } = MCompanyStore;

const formLabelWidth = '50px'

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您確定要關閉視窗?(內容不會保存)')
    .then(() => {
      done()
      companyAccountEditDialogClear()
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
