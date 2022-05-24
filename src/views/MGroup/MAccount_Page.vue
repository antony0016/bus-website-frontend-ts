<template>
  <simple-card title="帳號管理">
    <el-row>
      <el-col :span="6">
        <el-menu 
          :default-active="nowGroupSelect"
        >
          <el-menu-item 
            v-for="(value, name, index) in getData.getGroupData"
            :index="index.toString()"
            @click="selectGroupFunction({nowselect: name, nowselectindex: index.toString()})"
          >
            <span>{{name}}</span>
          </el-menu-item>
        </el-menu>
        <MAccountDialog/>
      </el-col>
      <el-col :span="6">
        {{getData.selectGroup}}
      </el-col>
    </el-row>
    
  </simple-card>
</template>

<script setup lang="ts">
import { toRefs, defineComponent, watch } from "vue";
import { storeToRefs } from "pinia";
import MAccountDialog from "../../components/MGroup/MAccount/MAccountDialog.vue";

import useMAccountStore from "../../store/MGroup/MAccountStore"

const MAccountStore = useMAccountStore();
const { getData, nowGroupSelect } = storeToRefs(MAccountStore);
const { getGroupName, selectGroupFunction } = MAccountStore;
getGroupName()

</script>

<style scoped>
</style>
