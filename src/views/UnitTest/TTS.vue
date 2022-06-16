<template>
  <simple-card title="TTS Test">
    <el-row>
      <el-col :span="5">
        <el-input v-model="text"/>
      </el-col>
      <el-col :span="5">
        <el-button @click="play">播放</el-button>
      </el-col>
    </el-row>
  </simple-card>
</template>

<script setup lang="ts">

import { ref } from "vue";
import axios from "../../axios";

const text = ref('第三月台')

const play = () => {
  axios.get('http://localhost:5000?text=' + text.value).then()
}

</script>

<style scoped>

</style>
