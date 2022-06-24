<template>
  <el-container id="whole">
    <el-header id="header">
      <nav-bar/>
    </el-header>
    <el-container>
      <!-- <side-menu v-if="loggedIn"/> -->
      <main-section/>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import NavBar from "./layout/NavBar.vue";
import SideMenu from './layout/SideMenu.vue'
import MainSection from "./layout/MainSection.vue";
import useLoginManagerStore from "./store/LoginManagerStore";

const loginManagerStore = useLoginManagerStore();
const loggedIn = computed(() => loginManagerStore.loggedIn);

const LoginManagerStore = useLoginManagerStore();
const {  } = storeToRefs(LoginManagerStore);
const { checkUserType } = LoginManagerStore;

checkUserType({count:0})

</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: var(--el-font-family);
  font-size: var(--el-font-size-base);
}

#header {
  background-color: var(--el-color-primary-dark-2);
  color: white;
}

#whole {
  height: 100vh;
}

.button-gutter > * {
  margin-right: 5px;
}

</style>
