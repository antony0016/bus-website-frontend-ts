<template>
  <simple-card title="月台與路線">
    <el-tabs v-model="activeTab" @tab-click="">
      <el-tab-pane label="月台管理" name="platforms">
        <MPlatformShow/>
      </el-tab-pane>
      <el-tab-pane label="月台申請維護" name="applys">
        
      </el-tab-pane>
    </el-tabs>
  </simple-card>
</template>

<script setup lang="ts">
import { ref, toRefs, defineComponent, watch } from "vue";
import { storeToRefs } from "pinia";
import usePlatformStore from "../../store/MGroup/MPlatformStore";
import useMCompanyStore from "../../store/MGroup/MCompanyStore";

import MPlatformShow from "../../components/MGroup/MPlatform/MPlatformShow.vue"

const PlatformStore = usePlatformStore();
const { } = storeToRefs(PlatformStore);
const { getPlatform, getEquipment } = PlatformStore;

const MCompanyStore = useMCompanyStore();
const { } = storeToRefs(MCompanyStore);
const { getCompany, getRoute } = MCompanyStore;

const activeTab = ref('platforms')
getPlatform({ getcount: 0 })
getEquipment({ getcount: 0 })
getCompany({ getcount: 0 })
getRoute({ getcount: 0 })

</script>

<style scoped>
</style>
