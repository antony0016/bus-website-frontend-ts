<template>

</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus';

import useBScheduleStore from "../../../store/BGroup/BScheduleStore";

const BScheduleStore = useBScheduleStore();
const {  } = storeToRefs(BScheduleStore);
const {  } = BScheduleStore;

</script>

<style scoped>
</style>
