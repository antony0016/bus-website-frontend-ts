<template>
  <el-button @click="GroupUserSwitchG()">編輯群組</el-button>
  <el-button @click="GroupUserSwitchU()">使用者列表</el-button>
  <simple-card title="群組管理" v-show="GroupUserSwitch.Switch_G">
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
        <MAccountGroupShow/>
      </el-col>
    </el-row>
  </simple-card>
  <simple-card title="使用者列表" v-show="GroupUserSwitch.Switch_U">
    <MAccountUserShow/>
    <MAccountUserDialog/>
  </simple-card>
</template>

<script setup lang="ts">
import { toRefs, defineComponent, watch } from "vue";
import { storeToRefs } from "pinia";
import MAccountDialog from "../../components/MGroup/MAccount/MAccountDialog.vue";
import MAccountGroupShow from "../../components/MGroup/MAccount/MAccountGroupShow.vue";
import MAccountUserShow from "../../components/MGroup/MAccount/MAccountUserShow.vue";
import MAccountUserDialog from "../../components/MGroup/MAccount/MAccountUserDialog.vue";

import useMAccountStore from "../../store/MGroup/MAccountStore"

const MAccountStore = useMAccountStore();
const { GroupUserSwitch, getData, nowGroupSelect } = storeToRefs(MAccountStore);
const { getGroupName, selectGroupFunction, GroupUserSwitchG, GroupUserSwitchU } = MAccountStore;
getGroupName({getcount: 0})

</script>

<style scoped>
</style>
