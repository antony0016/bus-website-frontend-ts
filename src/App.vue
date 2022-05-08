<template>
  <el-container id="whole">
    <el-header id="header">
      <nav-bar/>
    </el-header>
    <el-container>
      <el-menu
        :collapse="menuSwitch"
      >
        <el-sub-menu index="1">
          <template v-slot:title>
            <el-icon>
              <location/>
            </el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
      <el-main id="main">
        <el-row>
          <el-col :span="24">
            <el-card style="width: 100%;height:100%;">
              <router-view/>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import { Location } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";

import useViewControllerStore from "./store/ViewControllerStore";

const viewControllerStore = useViewControllerStore();
const { menuSwitch } = storeToRefs(viewControllerStore);

</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: var(--el-font-family);
  font-size: var(--el-font-size-base);
}

#header {
  background-color: var(--el-color-primary);
  color: white;
  display: flex;
}

#whole {
  height: 100vh;
}

#main {
  background-color: var(--el-color-info-light-9);
}
</style>
