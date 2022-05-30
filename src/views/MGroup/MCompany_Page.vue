<template>
  <simple-card title="客運與路線">
    <el-tabs v-model="companyRouteActiveTab" @tab-click="getCompany({getcount:0}); getRoute({getcount:0})">
      <el-tab-pane label="業者基本資料" name="companys">
        <MCompanyCompanyShow/>
        <MCompanyCompanyDialog/>
      </el-tab-pane>
      <el-tab-pane label="客運路線管理" name="routes">
        <MCompanyRouteShow/>
        <MCompanyRouteDialog/>
      </el-tab-pane>
    </el-tabs>
  </simple-card>
</template>

<script setup lang="ts">
import { ref, toRefs, defineComponent, watch } from "vue";
import { storeToRefs } from "pinia";

import useMCompanyStore from "../../store/MGroup/MCompanyStore"
import MCompanyCompanyShow from "../../components/MGroup/MCompany/MCompanyCompanyShow.vue";
import MCompanyCompanyDialog from "../../components/MGroup/MCompany/MCompanyCompanyDialog.vue";
import MCompanyRouteShow from "../../components/MGroup/MCompany/MCompanyRouteShow.vue";
import MCompanyRouteDialog from "../../components/MGroup/MCompany/MCompanyRouteDialog.vue";

const MCompanyStore = useMCompanyStore();
const { companyRouteActiveTab } = storeToRefs(MCompanyStore);
const { getCompany, getRoute } = MCompanyStore;

getCompany({getcount:0})
getRoute({getcount:0})

</script>

<style scoped>
</style>
