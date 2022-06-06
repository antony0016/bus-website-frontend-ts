<template>
  <simple-card title="設備運作監視">
    <el-button
      type="primary"
      @click="equipmentDialogAdd"
    >
      新增
    </el-button>
    <el-tabs v-model="equipmentSelect" @tab-click="getEquipment({getcount:0})">
      <el-tab-pane 
        v-for="v in selectItem"
        :label="v.type_ch_name" :name="v.type_name"
      >
        <CEquipmentShow/>
        <CEquipmentDialog/>
      </el-tab-pane>
    </el-tabs>
  </simple-card>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import CEquipmentShow from "../../components/CGroup/CEquipment/CEquipmentShow.vue"
import CEquipmentDialog from "../../components/CGroup/CEquipment/CEquipmentDialog.vue"
import useCEquipmentStore from "../../store/CGrroup/CEquipmentStore";

const CEquipmentStore = useCEquipmentStore();
const { equipmentSelect, selectItem } = storeToRefs(CEquipmentStore);
const { equipmentDialogAdd, getEquipmentType, getEquipment } = CEquipmentStore;

getEquipmentType({getcount:0})
getEquipment({getcount:0})

</script>

<style scoped>

</style>
