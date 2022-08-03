<template>
  <el-dialog 
    v-model="DialogVisible.CompanyDialogFormVisible" 
    title="客運業者管理"
    :before-close="handleClose"
  >
    <el-form :model="CompanyDialogForm" label-position="left">
      <el-form-item label="業者編號" :label-width="formLabelWidth">
        <el-input v-model="CompanyDialogForm.company_no" autocomplete="off" :disabled="true"/>
      </el-form-item>
      <el-form-item label="公司名稱" :label-width="formLabelWidth">
        <el-input v-model="CompanyDialogForm.company_name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="公司英文名稱" :label-width="formLabelWidth">
        <el-input v-model="CompanyDialogForm.company_en_name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="統一編號" :label-width="formLabelWidth">
        <el-input v-model="CompanyDialogForm.unified_no" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="電話" :label-width="formLabelWidth">
        <el-input v-model="CompanyDialogForm.company_phone" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="連絡人姓名" :label-width="formLabelWidth">
        <el-input v-model="CompanyDialogForm.company_contact_name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="傳真" :label-width="formLabelWidth">
        <el-input v-model="CompanyDialogForm.company_fax" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="CompanyDialogForm.company_address" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="合約狀態" :label-width="formLabelWidth">
        <el-input v-model="CompanyDialogForm.contract_state" autocomplete="off" :disabled="true"/>
      </el-form-item>
      <el-form-item label="合約開始期間" :label-width="formLabelWidth">
        <el-input type="datetime-local" v-model="CompanyDialogForm.contract_datetime" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="合約結束期間" :label-width="formLabelWidth">
        <el-input type="datetime-local" v-model="CompanyDialogForm.contract_end_datetime" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="E-mail" :label-width="formLabelWidth">
        <el-input type="email" v-model="CompanyDialogForm.company_email" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="密碼" :label-width="formLabelWidth">
        <el-input type="password" v-model="CompanyDialogForm.company_password" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="確認密碼" :label-width="formLabelWidth">
        <el-input type="password" v-model="CompanyDialogForm.company_checkpassword" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteCompany({deletecount: 0}); DialogVisible.CompanyDialogFormVisible = false" type="danger" v-show="DialogVisible.CompanyAddChangeSwitch">刪除</el-button>
        <el-button @click="DialogVisible.CompanyDialogFormVisible = false; CompanyDialogClear()">取消</el-button>
        <el-button type="primary" @click="putCompany({putcount: 0}); DialogVisible.CompanyDialogFormVisible = false;" v-show="DialogVisible.CompanyAddChangeSwitch">
          儲存
        </el-button>
        <el-button type="primary" @click="postCompany({postcount: 0}); DialogVisible.CompanyDialogFormVisible = false;" v-show="!DialogVisible.CompanyAddChangeSwitch">
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
const { DialogVisible, CompanyDialogForm, getData } = storeToRefs(MCompanyStore);
const { CompanyDialogClear, postCompany, putCompany, deleteCompany } = MCompanyStore;

const formLabelWidth = '50px'

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您確定要關閉視窗?(內容不會保存)')
    .then(() => {
      done()
      CompanyDialogClear()
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
