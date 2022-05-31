<template>
  <simple-card title="客運與路線">
    <MBusInfoShow/>
    <MBusInfoDialog/>
  </simple-card>
</template>

<script setup lang="ts">
import { ref, toRefs, defineComponent, watch } from "vue";
import { storeToRefs } from "pinia";

import useMBusInfoStore from "../../store/MGroup/MBusInfoStore"
import MBusInfoShow from "../../components/MGroup/MBusInfo/MBusInfoShow.vue";
import MBusInfoDialog from "../../components/MGroup/MBusInfo/MBusInfoDialog.vue";

const MBusInfoStore = useMBusInfoStore();
const { getData, filterData } = storeToRefs(MBusInfoStore);
const { getCompany, getBus } = MBusInfoStore;

getCompany({getcount:0})
getBus({getcount:0})

</script>

<style scoped>
</style>
