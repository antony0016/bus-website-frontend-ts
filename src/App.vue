<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <el-container id="whole">
    <el-header id="header">
      <nav-bar/>
    </el-header>
    <el-container>
      <el-main id="main">
        <el-row style="width: 100%;height:100%;">
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

<style>
body {
  margin: 0;
  padding: 0;
}

#header {
  background-color: var(--el-color-primary-dark-2);
  color: white;
  display: flex;
  align-items: center;
}

#whole {
  height: 100vh;
}

#main {
  background-color: var(--el-color-info-light-9);
}
</style>
