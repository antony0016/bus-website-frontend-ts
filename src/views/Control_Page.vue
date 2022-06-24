<template>
  <simple-card title="儀控介面">
    <span v-show="pageShow['CIC']">
      <el-row justify="center">
        <el-col :span="12">
          <img alt="儀控介面" id="bus_plat" src="../assets/control_image.png">
        </el-col>
        <el-col :span="4">
          <span>異常車輛資訊</span>
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
}
</style>
