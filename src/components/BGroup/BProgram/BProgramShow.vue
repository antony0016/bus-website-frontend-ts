<template>
  <el-button @click="dialogAddOpen()">
    新增
  </el-button>
  <el-input v-model="getData.filterText" placeholder="請輸入程序名稱" autocomplete="off"/>
  <el-table
    :data="filterTextComputed"
    id="program_table"
    style="width: 100%"
    :default-sort="{prop: 'program_type', order: 'ascending'}">
    <el-table-column
      prop="program_type"
      label="類別"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.program_type_ch }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="program_name"
      label="名稱"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.program_name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="program_content_text"
      label="內容"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{ row.program_content_text }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{row,$index}">
        <el-button @click="dialogEditOpen({data:row})">
          編輯
        </el-button>
        <el-button @click="pilotProgram({putcount:0, id:row.uuid})">
          試播
        </el-button>
        <el-button @click="deleteProgram({deletecount:0, id:row.uuid})">
          刪除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, computed } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus';

import useBProgramStore from "../../../store/BGroup/BProgramStore";

const BProgramStore = useBProgramStore();
const { getData } = storeToRefs(BProgramStore);
const { dialogAddOpen, dialogEditOpen, deleteProgram, pilotProgram } = BProgramStore;

const filterTextComputed = computed(() => {
  let arr = []
  arr = getData.value.programData.filter((v: any) => v['program_name'].indexOf(getData.value.filterText) !== -1);
  console.log(arr)
  return arr
})

</script>

<style scoped>
</style>
