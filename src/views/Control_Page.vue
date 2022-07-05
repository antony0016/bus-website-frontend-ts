<template>
  <simple-card title="儀控介面">
    <span v-show="pageShow['CIC']">
      <el-row justify="center" :gutter="24">
        <el-col :span="20">
          <img alt="儀控介面" id="bus_plat" src="../assets/control_image.jpg">
        </el-col>
        <el-col :span="4">
          <el-tabs v-model="errorTabIndex">
            <el-tab-pane label="異常停靠" name="errorTab1">
            </el-tab-pane>
            <el-tab-pane label="設備異常" name="errorTab2">
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </span>
  </simple-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import useLoginManagerStore from "../store/LoginManagerStore";
import useViewControllerStore from "../store/ViewControllerStore";

const loginManagerStore = useLoginManagerStore();
const { buttonDisable } = storeToRefs(loginManagerStore);

const viewControllerStore = useViewControllerStore();
const { pageShow } = storeToRefs(viewControllerStore);
const errorTabIndex = ref('errorTab1')

</script>

<style scoped>
#bus_plat {
  width: 100%;
  border: gray solid 1px;
}

/*#error_log {*/
/*  height: 100%;*/
/*}*/
</style>
