<template>
  <el-row justify="end">
    <el-col :span="2" :pull="2">
      <el-button type="primary" @click="logout">{{ loggedIn ? '登出' : '登入' }}</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import useLoginManagerStore from "../store/LoginManagerStore";
import { toRefs } from "vue";

const loginManagerStore = useLoginManagerStore();

const { logout } = loginManagerStore;
const { loggedIn } = toRefs(loginManagerStore);


</script>

<style scoped>

</style>
