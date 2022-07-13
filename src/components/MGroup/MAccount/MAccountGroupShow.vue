<template>
  <el-form :model="getData.selectGroup" label-position="top" v-show="nowGroupSelectShow">
    <el-form-item label="群組名稱：">
      <el-select v-model="getData.selectGroup.selectGroupType" placeholder="請選擇群組">
        <el-option
            v-for="gtitem in GroupTypeSelections"
            :label="gtitem.labelName" :value="gtitem.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="群組代碼：">
      <el-input v-model="getData.selectGroup.selectGroupCode" autocomplete="off" disabled/>
    </el-form-item>
    <el-form-item label="群組名稱：">
      <el-input v-model="getData.selectGroup.selectGroupName" autocomplete="off" />
    </el-form-item>
    <el-form-item 
      v-for="(value, name, index) in getData.selectGroup.selectGroupPermission"
      :label="value.groupName">
      <el-col :span="12">
        <el-checkbox 
          v-for="(subvalue, subname, index) in value.groupMember"
          v-model="subvalue.allow" :label="subvalue.name"
        />
      </el-col>
    </el-form-item>
    <el-col :span="12">
      <el-button @click="putGroupName({putCount: 0})">
        更改
      </el-button>
    </el-col>
    <el-col :span="12">
      <el-button @click="deleteGroupName({deleteCount: 0})">
        刪除
      </el-button>
    </el-col>  
  </el-form>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus'
import useMAccountStore from "../../../store/MGroup/MAccountStore";

const MAccountStore = useMAccountStore();
const { GroupTypeSelections, getData, nowGroupSelectShow } = storeToRefs(MAccountStore);
const { putGroupName, deleteGroupName } = MAccountStore;


</script>

<style scoped>

</style>
