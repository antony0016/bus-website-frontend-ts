<template>
  <el-row justify="space-around" align="middle" class="nav-buttons">
    <!--
    <el-col :span="1" style="white-space: nowrap">
      <el-button v-show="menuSwitch.isShow" type="primary" size="large" @click="openOrClose" circle>
        <el-icon :size="18">
          <expand v-show="menuSwitch.isFold"></expand>
          <fold v-show="!menuSwitch.isFold"></fold>
        </el-icon>
      </el-button>
    </el-col>
    -->
    <el-col :span="6" @click="router.push('/')">
      <h1>{{ title }}</h1>
    </el-col>
    <el-col :span="13">
      <!-- todo: make this component more easy to use -->
      <!-- @click="changeSideMenu(barItem.id)" is sideMenu Version -->
      <simple-scrollbar>
        <el-button v-for="(barItem, index) in topBarItems" @click="goToPage(barItem)"
                   :key="index" v-show="barItem.isShow"
                   type="primary" size="large" class="scrollbar-demo-item">
          {{ barItem.name }}
        </el-button>
      </simple-scrollbar>
    </el-col>
    <!--
    <el-col :span="1">
      <el-button type="primary" size="large">
        {{ "Now path: " + menuSwitch.topBarId + nowPath}}
      </el-button>
    </el-col>
    -->
    <el-col :span="4">
      <login-button/>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { Expand, Fold, ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { storeToRefs } from "pinia";
import LoginButton from '../components/LoginButton.vue';

import useViewControllerStore from "../store/ViewControllerStore";
import { useRoute } from 'vue-router';
import router from "../router";
import { ref, computed, watch } from "vue";
import SimpleScrollbar from "../components/SimpleScrollbar.vue";

const viewControllerStore = useViewControllerStore();
const { menuSwitch, sideMenuItems, topBarItems, nowPath } = storeToRefs(viewControllerStore);

const title = ref('桃園長庚轉運站旅運管理系統')

const openOrClose = () => {
  menuSwitch.value.isFold = !menuSwitch.value.isFold;
}

const goToPage = (topBarItem: object) => {
  router.push(topBarItem['to'])
}

//const changeSideMenu = (topBarItemId: string) => {
//  menuSwitch.value.topBarId = topBarItemId
//}

// get now path
const route = useRoute();
const goPath = computed(() => route.path)

// control now path and select
watch(goPath, (curVal, preVal) => {
  for (var val of sideMenuItems.value) {
    for (var sval of val['subMenu']) {
      if (curVal == sval['to']) {
        console.log('nowGroup:' + val['id'])
        console.log('nowPath:' + sval['to'])
        menuSwitch.value.topBarId = val['id']
        nowPath.value = sval['to']
      }
    }
  }
}, {
  //配置項
})

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
