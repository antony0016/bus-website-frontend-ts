<template>
  <el-dialog 
    v-model="dialogSetting.visable" 
    title="設備編輯"
    :before-close="handleClose"
  >
    <el-form :model="dialogSetting" label-position="left">
      <el-form-item label="程序類別" :label-width="formLabelWidth">
        <el-select v-model="dialogSetting.program_type_uuid" filterable placeholder="請選擇">
          <el-option
            v-for="v of getData.programTypeData"
            :key="v['uuid']"
            :label="v['program_type_ch']"
            :value="v['uuid']">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="程序名稱" :label-width="formLabelWidth">
        <el-input v-model="dialogSetting.program_name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="內容類型" :label-width="formLabelWidth">
        <el-select v-model="dialogSetting.program_content_type" filterable placeholder="請選擇" @change="contentTypeSelect()">
          <el-option
            v-for="v of contentType"
            :key="v['value']"
            :label="v['name']"
            :value="v['value']">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文字內容" :label-width="formLabelWidth" v-show="dialogSetting.contentTypeText">
        <el-input v-model="dialogSetting.program_content_text" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="檔案敘述" :label-width="formLabelWidth" v-show="dialogSetting.contentTypeFile">
        <el-input v-model="dialogSetting.program_content_text" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="檔案上傳" :label-width="formLabelWidth" v-show="dialogSetting.contentTypeFile">
        <el-input v-model="dialogSetting.program_content_file" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogSetting.visable = false; dialogClear()">取消</el-button>
        <el-button type="primary" @click="addProgram({postcount:0}); dialogSetting.visable = false;" v-show="!dialogSetting.addEditChange">
          新增
        </el-button>
        <el-button type="primary" @click="updateProgram({putcount:0}); dialogSetting.visable = false;" v-show="dialogSetting.addEditChange">
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

import useBProgramStore from "../../../store/BGroup/BProgramStore";

const BProgramStore = useBProgramStore();
const { getData, dialogSetting } = storeToRefs(BProgramStore);
const { dialogClear, contentTypeSelect, addProgram, updateProgram } = BProgramStore;

const formLabelWidth = '50px'

const contentType = [
  {name: '文字', value: 'Text'},
  {name: '檔案', value: 'File'},
]

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
</style>
