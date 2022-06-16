<template>
  <simple-card title="NX Stream">
    <el-row :gutter="25" justify="center">
      <el-col :span="16" class="vid">
        <video id="player" playsinline
               src="https://192.168.50.47:7001/media/49744712-9d2a-22b7-5cf2-86c384651a0f.webm?resolution=480p"></video>
      </el-col>
    </el-row>
  </simple-card>
</template>

<script setup lang="ts">

import { onMounted } from "vue";

onMounted(() => {
  window.onload = () => {
    let player = document.getElementById('player')
    if (player) {
      player.play();
    }
  }
})
</script>

<style scoped>
.vid {
  border: 1px solid black;
}

video {
  height: 100%;
  width: 100%;
}
</style>
