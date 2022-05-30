<template>
  <el-button @click="CompanyRouteSwitchC()">業者基本資料</el-button>
  <el-button @click="CompanyRouteSwitchR()">客運路線管理</el-button>
  <simple-card title="業者基本資料" v-show="CompanyRouteSwitch.Switch_C">
    <MCompanyCompanyShow/>
    <MCompanyCompanyDialog/>
  </simple-card>
  <simple-card title="客運路線管理" v-show="CompanyRouteSwitch.Switch_R">
    <MCompanyRouteShow/>
    <MCompanyRouteDialog/>
  </simple-card>
</template>

<script setup lang="ts">
import { toRefs, defineComponent, watch } from "vue";
import { storeToRefs } from "pinia";

import useMCompanyStore from "../../store/MGroup/MCompanyStore"
import MCompanyCompanyShow from "../../components/MGroup/MCompany/MCompanyCompanyShow.vue";
import MCompanyCompanyDialog from "../../components/MGroup/MCompany/MCompanyCompanyDialog.vue";
import MCompanyRouteShow from "../../components/MGroup/MCompany/MCompanyRouteShow.vue";
import MCompanyRouteDialog from "../../components/MGroup/MCompany/MCompanyRouteDialog.vue";

const MCompanyStore = useMCompanyStore();
const { CompanyRouteSwitch } = storeToRefs(MCompanyStore);
const { CompanyRouteSwitchC, CompanyRouteSwitchR, getCompany, getRoute } = MCompanyStore;
getCompany({getcount:0})
getRoute({getcount:0})

</script>

<style scoped>
</style>
