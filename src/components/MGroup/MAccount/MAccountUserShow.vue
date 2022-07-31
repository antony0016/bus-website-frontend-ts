<template>
  <el-button @click="addNewUserDialog()" :disabled="buttonDisable.superAdminDisable">新增使用者</el-button>
  <el-table
    :data="getData.getUserData"
    v-loading="loadingShow.userTableShow"
    style="width: 100%"
    :default-sort = "{prop: 'username', order: 'ascending'}">
    <el-table-column
      prop="username"
      label="ID"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.username}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="名稱"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="group"
      label="群組"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.group}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="note"
      label="備註"
      width="180"
      sortable>
      <template #default="{row,$index}">
        <span style="margin-left: 10px">{{row.note}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{row,$index}">
        <el-button
          @click="openUserEdit({data: row})"
        >
          編輯
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus'
import useMAccountStore from "../../../store/MGroup/MAccountStore";
import useLoginManagerStore from "../../../store/LoginManagerStore";

const MAccountStore = useMAccountStore();
const { getData, loadingShow } = storeToRefs(MAccountStore);
const { openUserEdit, addNewUserDialog } = MAccountStore;

const loginManagerStore = useLoginManagerStore();
const { buttonDisable } = storeToRefs(loginManagerStore);

</script>

<style scoped>

</style>
