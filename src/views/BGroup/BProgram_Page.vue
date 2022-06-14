<template>
  <simple-card title="程序設定">
    <BProgramShow/>
    <BProgramDialog/>
  </simple-card>
</template>

<script setup lang="ts">
import { ref, toRefs, defineComponent, watch } from "vue";
import { storeToRefs } from "pinia";

import useBProgramStore from "../../store/BGroup/BProgramStore";
import BProgramShow from "../../components/BGroup/BProgram/BProgramShow.vue";
import BProgramDialog from "../../components/BGroup/BProgram/BProgramDialog.vue";

const BProgramStore = useBProgramStore();
const {} = storeToRefs(BProgramStore);
const { getProgram } = BProgramStore;

getProgram({getcount:0})

</script>

<style scoped>
</style>
