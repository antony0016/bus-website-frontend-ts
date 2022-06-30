<template>
  <simple-card title="儀控介面">
    <span v-show="pageShow['CIC']">
      <el-row justify="center" :gutter="24">
        <el-col :span="20">
          <img alt="儀控介面" id="bus_plat" src="../assets/control_image.jpg">
        </el-col>
        <el-col :span="4">
          <simple-card title="異常車輛資訊">
          </simple-card>
        </el-col>
      </el-row>
    </span>
  </simple-card>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineComponent, watch } from "vue";
import { storeToRefs } from "pinia";

import useLoginManagerStore from "../store/LoginManagerStore";
import useViewControllerStore from "../store/ViewControllerStore";

const loginManagerStore = useLoginManagerStore();
const { buttonDisable } = storeToRefs(loginManagerStore);

const viewControllerStore = useViewControllerStore();
const { pageShow } = storeToRefs(viewControllerStore);

</script>

<style scoped>
#bus_plat {
  width: 100%;
  border: gray solid 1px;
}

#error_log {
  height: 100%;
}
</style>
