<template>
  <simple-card title="CMS Test">
    <el-row>
      <el-col :span="5">
        <el-input v-model="cmsIp" placeholder="cms ip"/>
      </el-col>
      <el-col :span="5">
        <el-button @click="callApi">測試</el-button>
      </el-col>
    </el-row>


    <el-row>
      <el-col>
        <h3>指令</h3>
        <el-button v-for="(item, index) in cmds"
                   @click="cmd=item" :key="index">
          {{ item }}
        </el-button>
      </el-col>
      <el-col :span="5">
        <el-input v-model="cmd" placeholder="指令"/>
      </el-col>
    </el-row>

    <el-row v-for="(item, index) in cmdParams" :key="index">
      <el-col :span="3">
        <el-input v-model="item.param" :placeholder="item.param"/>
        <!--        <h3>{{  }}</h3>-->
      </el-col>
      <el-col :span="5">
        <el-input v-model="item.data" :placeholder="item.param"/>
      </el-col>
      <el-col :span="5">
        <el-checkbox v-model="item.isUse"/>
      </el-col>
    </el-row>
    {{ cmdParams }}
  </simple-card>
</template>

<script setup lang="ts">
import axios from "../../axios";
import { ref } from "vue";

const cmsIp = ref('192.168.10.233')
const cmd = ref('')
const cmds = ref(['play', 'pbTk1Play', 'pbHtm1Play'])
const cmdParams = ref([
  { param: 'skin', data: 'Default', isUse: false },
  { param: 'skin', data: 'Basic-2', isUse: false },
  { param: 'skin', data: '10003', isUse: true },
  { param: 'src', data: 'https://www.google.com/', isUse: false },
])

const callApi = () => {
  const params = cmdParams.value
    .filter(item => item.isUse)
    .map(item => `${item.param}:${item.data}`)
    .join(';')
  console.log(`http://${cmsIp.value}/cysdk/?${cmd.value}=${params}`)
  axios.get(`http://${cmsIp.value}/cysdk/?${cmd.value}=${params}`).then(
    response => {
      console.log(response)
    }
  )
}

</script>

<style scoped>

</style>
