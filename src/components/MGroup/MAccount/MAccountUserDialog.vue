<template>
  <el-dialog 
    v-model="UserDialogFormVisible" 
    title="個人資訊"
    :before-close="handleClose"
  >
    <el-form :model="UserDialogForm" label-position="left">
      <el-form-item label="ID" :label-width="formLabelWidth">
        <el-input v-model="UserDialogForm.username" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="密碼" :label-width="formLabelWidth">
        <el-input v-model="UserDialogForm.password" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="UserDialogForm.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="群組" :label-width="formLabelWidth">
        <el-select v-model="UserDialogForm.group" placeholder="請選擇群組">
          <el-option 
            v-for="(value, name, index) in getData.getGroupData"
            :label="name" :value="name" 
          />
        </el-select>
      </el-form-item>
      <el-form-item label="電話1" :label-width="formLabelWidth">
        <el-input v-model="UserDialogForm.phonemain" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="電話2" :label-width="formLabelWidth">
        <el-input v-model="UserDialogForm.phonesub" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="電子郵件" :label-width="formLabelWidth">
        <el-input v-model="UserDialogForm.useremail" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="備註" :label-width="formLabelWidth">
        <el-input v-model="UserDialogForm.note" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteUser({deletecount: 0}); UserDialogFormVisible = false" type="danger" v-show="UserDeleteShow">刪除</el-button>
        <el-button @click="UserdialogClear(); UserDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="putUser({putcount: 0}); UserDialogFormVisible = false" v-show="UserDeleteShow">
          修改
        </el-button>
        <el-button type="primary" @click="postUser({postcount: 0}); UserDialogFormVisible = false" v-show="!UserDeleteShow">
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
import useMAccountStore from "../../../store/MGroup/MAccountStore";

const MAccountStore = useMAccountStore();
const { UserDialogForm, UserDeleteShow, UserDialogFormVisible, getData } = storeToRefs(MAccountStore);
const { UserdialogClear, postUser, putUser, deleteUser } = MAccountStore;

const formLabelWidth = '50px'

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您確定要關閉視窗?(內容不會保存)')
    .then(() => {
      done()
      UserdialogClear()
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
