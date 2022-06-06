<template>
  <simple-card title="帳號群組">
    <el-tabs v-model="activeTab" @tab-click="getGroupName({getcount:0}); getUser({getcount:0})">
      <el-tab-pane label="編輯群組" name="groups">
        <el-row>
          <el-col :span="4">
            <el-menu
              :default-active="nowGroupSelect"
            >
              <el-menu-item
                v-for="(value, name, index) in getData.getGroupData"
                :index="index.toString()"
                @click="selectGroupFunction({nowselect: name, nowselectindex: index.toString()})"
              >
                <span>{{ name }}</span>
              </el-menu-item>
            </el-menu>
            <MAccountDialog/>
          </el-col>
          <el-col :span="1"/>
          <el-col :span="10">
            <MAccountGroupShow/>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="使用者列表" name="users">
        <MAccountUserShow/>
        <MAccountUserDialog/>
      </el-tab-pane>
    </el-tabs>
  </simple-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import MAccountDialog from "../../components/MGroup/MAccount/MAccountDialog.vue";
import MAccountGroupShow from "../../components/MGroup/MAccount/MAccountGroupShow.vue";
import MAccountUserShow from "../../components/MGroup/MAccount/MAccountUserShow.vue";
import MAccountUserDialog from "../../components/MGroup/MAccount/MAccountUserDialog.vue";

import useMAccountStore from "../../store/MGroup/MAccountStore"

const MAccountStore = useMAccountStore();
const { getData, nowGroupSelect } = storeToRefs(MAccountStore);
const { getGroupName, getUser, selectGroupFunction } = MAccountStore;

const activeTab = ref('groups')

getGroupName({ getcount: 0 })
getUser({ getcount: 0 })

</script>

<style scoped>
</style>
