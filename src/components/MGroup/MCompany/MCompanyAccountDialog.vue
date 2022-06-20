<template>
  <el-dialog 
    v-model="companyAccountDialog.isShow" 
    title="客運業者收支介面"
    :before-close="handleClose"
  >
    <el-tabs v-model="companyAccountDialog.incomeSwitch" @tab-click="">
      <el-tab-pane label="收入" name="income">
        <el-button type="primary" @click="companyAccountAddDialogOpen({isIncome: 'income'})">
          新增收入
        </el-button>
        <el-table
          :data="companyAccountDialog.getIncomeData"
          id="income_table"
          style="width: 100%"
          :default-sort="{prop: 'description', order: 'ascending'}">
          <el-table-column
            prop="description"
            label="簡述"
            width="180"
            sortable>
            <template #default="{row,$index}">
              <span style="margin-left: 10px">{{ row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            label="金額"
            width="180"
            sortable>
            <template #default="{row,$index}">
              <span style="margin-left: 10px">{{ row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{row,$index}">
              <el-button type="primary" @click="companyAccountEditDialogOpen({data:row, isIncome: 'income'})">
                編輯
              </el-button>
              <el-button type="danger" @click="deleteCompanyAccountData({deletecount:0, id: row.uuid})">
                刪除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="支出" name="expenditure">
        <el-button type="primary" @click="companyAccountAddDialogOpen({isIncome: 'expenditure'})">
          新增支出
        </el-button>
        <el-table
          :data="companyAccountDialog.getExpenditureData"
          id="income_table"
          style="width: 100%"
          :default-sort="{prop: 'description', order: 'ascending'}">
          <el-table-column
            prop="description"
            label="簡述"
            width="180"
            sortable>
            <template #default="{row,$index}">
              <span style="margin-left: 10px">{{ row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            label="金額"
            width="180"
            sortable>
            <template #default="{row,$index}">
              <span style="margin-left: 10px">{{ row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{row,$index}">
              <el-button type="primary" @click="companyAccountEditDialogOpen({data:row, isIncome: 'expenditure'})">
                編輯
              </el-button>
              <el-button type="danger" @click="deleteCompanyAccountData({deletecount:0, id: row.uuid})">
                刪除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="companyAccountDialog.isShow = false; companyAccountDialogClear()">關閉</el-button>
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
const { companyAccountDialogClear, companyAccountAddDialogOpen, companyAccountEditDialogOpen, deleteCompanyAccountData } = MCompanyStore;

const formLabelWidth = '50px'

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您確定要關閉視窗?(內容不會保存)')
    .then(() => {
      done()
      companyAccountDialogClear()
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
