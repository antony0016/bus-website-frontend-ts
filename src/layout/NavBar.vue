<template>
  <el-row justify="space-between" align="middle" class="nav-buttons">
    <el-col :span="1" style="white-space: nowrap">
      <el-button v-show="menuSwitch.isShow" type="primary" size="large" @click="openOrClose" circle>
        <el-icon :size="18">
          <expand v-show="menuSwitch.isFold"></expand>
          <fold v-show="!menuSwitch.isFold"></fold>
        </el-icon>
      </el-button>
    </el-col>
    <el-col :span="1">
      <h1>{{ title }}</h1>
    </el-col>
    <el-col :span="15">
      <!-- todo: make this component more easy to use -->
      <simple-scrollbar>
        <el-button v-for="(barItem, index) in topBarItems" @click="changeSideMenu(barItem.id)"
                   :key="index" v-show="barItem.isShow"
                   type="primary" size="large" class="scrollbar-demo-item">
          {{ barItem.name }}
        </el-button>
      </simple-scrollbar>
    </el-col>
    <el-col :span="1">
      <el-button type="primary" size="large">
        {{ "Now path: " + menuSwitch.topBarId }}
      </el-button>
    </el-col>
    <el-col :span="6">
      <login-button/>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { Expand, Fold, ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { storeToRefs } from "pinia";
import LoginButton from '../components/LoginButton.vue';

import useViewControllerStore from "../store/ViewControllerStore";
import { ref } from "vue";
import SimpleScrollbar from "../components/SimpleScrollbar.vue";

const viewControllerStore = useViewControllerStore();
const { menuSwitch, topBarItems } = storeToRefs(viewControllerStore);

const title = ref('A8')

const openOrClose = () => {
  menuSwitch.value.isFold = !menuSwitch.value.isFold;
}

const changeSideMenu = (topBarItemId: string) => {
  menuSwitch.value.topBarId = topBarItemId
}

</script>

<style scoped>
.nav-buttons button {
  background-color: var(--el-color-primary-dark-2);
  border-color: var(--el-color-primary-dark-2);
}

.nav-buttons button:focus {
  background-color: var(--el-color-primary);
  border-color: var(--el-color-primary);
}

.nav-buttons button:hover {
  background-color: var(--el-color-primary);
  border-color: var(--el-color-primary);
}


.scrollbar-flex-content {
  display: flex;
}

.scrollbar-demo-item {
  flex-shrink: 0;
}

</style>
