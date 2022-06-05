<template>
  <el-main :id="background">
    <el-row>
      <el-col :span="24">
        <router-view/>
      </el-col>
    </el-row>
  </el-main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();
const goPath = computed(() => route.path)
const background = ref()
watch(goPath,(curVal,preVal)=>{
  if (curVal == '/login'){
    background.value = "image"
    return background
  }else{
    background.value = "main"
    return background
  }
})

</script>

<style scoped>

#main {
  background-color: var(--el-color-info-light-9);
}

#image {
  background-image: url(
    "../assets/login_background.png"
  );
  background-size: cover;
}

</style>
