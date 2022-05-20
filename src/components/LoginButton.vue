<template>
  <el-row justify="end">
    <el-col :span="2" :pull="2">
      <el-button type="primary" @click="logout">登入</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import router from "../router";
import useLoginManagerStore from "../store/LoginManagerStore";

const loginManagerStore = useLoginManagerStore();

const { logout } = loginManagerStore;

//const goToLogin = () => {
//  router.push('/login')
//}

</script>

<style scoped>

</style>
