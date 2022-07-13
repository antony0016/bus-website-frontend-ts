<template>
  <el-button text @click="dialogFormVisible = true" :disabled="buttonDisable.superAdminDisable">
    增加群組
  </el-button>
  <el-dialog 
    v-model="dialogFormVisible" 
    title="增加群組"
    :before-close="handleClose"
  >
    <el-form :model="DialogForm" label-position="top">
      <el-form-item label="群組名稱：" :label-width="formLabelWidth">
        <el-select v-model="DialogForm.groupType" placeholder="請選擇群組">
          <el-option
              v-for="gtitem in GroupTypeSelections"
              :label="gtitem.labelName" :value="gtitem.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="群組代碼：" :label-width="formLabelWidth">
        <el-input v-model="DialogForm.groupCode" autocomplete="off" disabled/>
      </el-form-item>
      <el-form-item label="群組名稱：" :label-width="formLabelWidth">
        <el-input v-model="DialogForm.groupName" autocomplete="off" />
      </el-form-item>
      <el-form-item
          v-for="(value, name, index) in PermissionSelections"
          :label="value.groupName" :label-width="formLabelWidth">
        <el-col :span="12">
          <el-checkbox 
            v-for="(subvalue, subname, index) in value.groupMember"
            v-model="subvalue.allow" :label="subvalue.name"
          />
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogClear(); dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="postGroupName({postCount: 0}); dialogFormVisible = false">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus'
import useMAccountStore from "../../../store/MGroup/MAccountStore";
import useLoginManagerStore from "../../../store/LoginManagerStore";

const MAccountStore = useMAccountStore();
const { DialogForm, GroupTypeSelections, PermissionSelections } = storeToRefs(MAccountStore);
const { dialogClear, postGroupName } = MAccountStore;

const loginManagerStore = useLoginManagerStore();
const { buttonDisable } = storeToRefs(loginManagerStore);

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

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
