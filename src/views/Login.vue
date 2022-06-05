<template>
  <simple-card title="登入" :span="8" justify="center">
    <el-input size="large" class="login-input" v-model="user.username">
      <template #prefix>
        <el-icon>
          <user-icon/>
        </el-icon>
      </template>
    </el-input>
    <el-input size="large" type="password" class="login-input" v-model="user.password">
      <template #prefix>
        <el-icon>
          <key/>
        </el-icon>
      </template>
    </el-input>
    <el-button @click="login" class="login-button">登入</el-button>
  </simple-card>
</template>

<script setup lang="ts">
import { User as UserIcon, Key, SetUp } from "@element-plus/icons-vue";
import useLoginManagerStore from "../store/LoginManagerStore";
import useViewControllerStore from "../store/ViewControllerStore";
import { toRefs, watch } from "vue";
import { storeToRefs } from "pinia";

const loginManagerStore = useLoginManagerStore();
const { user, token } = toRefs(loginManagerStore);
const { login } = loginManagerStore;

const viewControllerStore = useViewControllerStore();
const { menuSwitch, topBarItems } = storeToRefs(viewControllerStore);

</script>

<style scoped>

.login-input {
  margin: 10px 0;
}

.login-button {
  width: 100%;
}

</style>
