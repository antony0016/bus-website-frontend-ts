<template>
  <simple-card title="班次維護">
    <MMaintenanceShow/>
  </simple-card>
</template>

<script setup lang="ts">
import { ref, toRefs, defineComponent, watch } from "vue";
import { storeToRefs } from "pinia";

import useMMaintenanceStore from "../../store/MGroup/MMaintenanceStore"
import MMaintenanceShow from "../../components/MGroup/MMaintenance/MMaintenanceShow.vue";

const MMaintenanceStore = useMMaintenanceStore();
const {  } = storeToRefs(MMaintenanceStore);
const { getCompany, getRoute } = MMaintenanceStore;
getCompany({getcount:0})
getRoute({getcount:0})

</script>

<style scoped>
</style>
