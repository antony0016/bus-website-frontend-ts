<template>
  <simple-card title="班次維護">
    <MMaintenanceShow/>
    <MMaintenanceDialog/>
  </simple-card>
</template>

<script setup lang="ts">
import { ref, toRefs, defineComponent, watch } from "vue";
import { storeToRefs } from "pinia";

import useMMaintenanceStore from "../../store/MGroup/MMaintenanceStore"
import MMaintenanceShow from "../../components/MGroup/MMaintenance/MMaintenanceShow.vue";
import MMaintenanceDialog from "../../components/MGroup/MMaintenance/MMaintenanceDialog.vue"

const MMaintenanceStore = useMMaintenanceStore();
const {  } = storeToRefs(MMaintenanceStore);
const { getMaintenanceCompany, getMaintenanceRoute } = MMaintenanceStore;
getMaintenanceCompany({getcount:0})
getMaintenanceRoute({getcount:0})

</script>

<style scoped>
</style>
