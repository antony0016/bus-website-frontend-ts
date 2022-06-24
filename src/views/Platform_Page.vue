<template>
  <simple-card title="月台管理">
    <el-tabs v-model="platformActiveTab" @tab-click="getPlatform({ getcount: 0 }); getDetailPlatform({ getcount: 0 }); getCompany({ getcount: 0 })">
      <el-tab-pane label="月台管理" name="platforms" :disabled="!pageShow['MPM']">
        <span v-show="pageShow['MPM']">
          <MPlatformShow/>
        </span>
      </el-tab-pane>
      <el-tab-pane label="月台申請" name="applys" :disabled="!pageShow['MPA']">
        <span v-show="pageShow['MPA']">
          月台申請
        </span>
      </el-tab-pane>
      <el-tab-pane label="停靠時間/次數設定" name="stopHours" :disabled="!pageShow['MPT']">
        <span v-show="pageShow['MPT']">
          <el-button @click="openAddSchedule()">新增群組</el-button>
            <el-tabs v-model="scheduleTabData.activeTab" @tab-click="changeSelectSchedule()">
              <el-tab-pane 
                v-for="item in scheduleTabData.scheduleTab"
                :label="item.lable" :name="item.name"
              >
                <MStopTimeShow/>
              </el-tab-pane>
            </el-tabs>
            <MStopTimeDialog/>
        </span>
      </el-tab-pane>
    </el-tabs>
  </simple-card>
  <span>&nbsp;</span>
  <simple-card title="設備管理">
    <el-tabs v-model="equipmentActiveTab" @tab-click="getEquipmentType({getcount:0}); getEquipment({getcount:0})">
      <el-tab-pane label="設備運作監視" name="equipments" :disabled="!pageShow['CEM']">
        <span v-show="pageShow['CEM']">
          <el-button
            type="primary"
            @click="equipmentDialogAdd"
          >
            新增
          </el-button>
          <el-tabs v-model="equipmentSelect" @tab-click="getEquipment({getcount:0})" :disabled="!pageShow['CEM']">
            <el-tab-pane 
              v-for="v in selectItem"
              :label="v.type_ch_name" :name="v.type_name"
            >
              <CEquipmentShow/>
              <CEquipmentDialog/>
            </el-tab-pane>
          </el-tabs>
        </span>
      </el-tab-pane>
      <el-tab-pane label="設備異常log" name="equipmentAbnormal" :disabled="!pageShow['CEA']">
        <span v-show="pageShow['CEA']">
          設備異常log
        </span>
      </el-tab-pane>
    </el-tabs>
  </simple-card>
</template>

<script setup lang="ts">
import { ref, toRefs, defineComponent, watch } from "vue";
import { storeToRefs } from "pinia";

import useLoginManagerStore from "../store/LoginManagerStore";
import useViewControllerStore from "../store/ViewControllerStore";

import usePlatformStore from "../store/MGroup/MPlatformStore";
import useMCompanyStore from "../store/MGroup/MCompanyStore";
import useCEquipmentStore from "../store/CGrroup/CEquipmentStore";
import useStopTimeStore from "../store/MGroup/MStopTimeStore";

import MPlatformShow from "../components/MGroup/MPlatform/MPlatformShow.vue";
import MStopTimeShow from "../components/MGroup/MStopTime/MStopTimeShow.vue";
import MStopTimeDialog from "../components/MGroup/MStopTime/MStopTimeDialog.vue";
import CEquipmentShow from "../components/CGroup/CEquipment/CEquipmentShow.vue";
import CEquipmentDialog from "../components/CGroup/CEquipment/CEquipmentDialog.vue";

const loginManagerStore = useLoginManagerStore();
const { buttonDisable } = storeToRefs(loginManagerStore);

const viewControllerStore = useViewControllerStore();
const { pageShow } = storeToRefs(viewControllerStore);

const PlatformStore = usePlatformStore();
const { } = storeToRefs(PlatformStore);
const { getPlatform, getDetailPlatform } = PlatformStore;

const MCompanyStore = useMCompanyStore();
const { } = storeToRefs(MCompanyStore);
const { getCompany } = MCompanyStore;

const StopTimeStore = useStopTimeStore();
const { scheduleTabData } = storeToRefs(StopTimeStore);
const { openAddSchedule, changeSelectSchedule } = StopTimeStore;

const CEquipmentStore = useCEquipmentStore();
const { equipmentSelect, selectItem } = storeToRefs(CEquipmentStore);
const { equipmentDialogAdd, getEquipmentType, getEquipment } = CEquipmentStore;

const platformActiveTab = ref('platforms')
const equipmentActiveTab = ref('equipments')

getPlatform({ getcount: 0 })
getDetailPlatform({ getcount: 0 })
getCompany({ getcount: 0 })

getEquipmentType({getcount:0})
getEquipment({getcount:0})

</script>

<style scoped>
</style>
