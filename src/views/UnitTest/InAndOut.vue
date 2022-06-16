<template>
  <simple-card title="In and out">
    <el-row :gutter="25">
      <el-col :span="6" v-for="(car, index) in cars" @click="changeIndex(index)">
        <el-card>
          <p>{{ car.timeStamp }}</p>
          <p>{{ car.ocrResult }}</p>
          <!--          <p>{{ car.vehicleCode }}</p>-->
          <!--          <p>{{ car.message }}</p>-->

          <!--          <video v-if="seeIndex === index" id="player" playsinline-->
          <!--                 src="https://192.168.50.47:7001/media/49744712-9d2a-22b7-5cf2-86c384651a0f.webm?resolution=480p"></video>-->
        </el-card>
      </el-col>
    </el-row>
  </simple-card>
</template>

<script setup lang="ts">
// import NXStream from './NXStream.vue'
import { onMounted, ref } from "vue";

const seeIndex = ref(-1)

const changeIndex = (index: number) => {
  if (seeIndex.value === index) {
    seeIndex.value = -1;
  }
  seeIndex.value = index;
}

type carData = {
  timeStamp: string,
  ocrResult: string,
  vehicleCode: number,
  message: number,
  platePath: string,
  imagePath: string,
}

const cars = ref([] as carData[])

const plates = ['ABC-1234', 'CBA-4321', 'DEF-5678', 'DEF-8765', 'EAS-2313', 'HYS-1278']

const testData = [{
  timeStamp: "",
  ocrResult: "ABC-1234",
  vehicleCode: 1,
  message: 0,
  platePath: "/2022/04/06/plate/20220406163555841_ABC-3456_1_A101_A8_1_2.jpg ",
  imagePath: "/2022/04/06/images/20220406163555841_ABC-3456_1_A101_A8_1_2_plate.jpg "
}]

onMounted(() => {
  let intervalTimeout = Math.random() * 3000 + 1000;
  setInterval(() => {
    let timeout = Math.random() * 2000 + 200;
    let plateIndex = Math.round(Math.random() * 100 % 5);
    setTimeout(() => {
      carIn(plateIndex)
    }, timeout)
    setTimeout(() => {
      carOut(plateIndex)
    }, timeout * 5)
  }, intervalTimeout)
})

const carIn = (plateIndex: number) => {
  let hasCar = cars.value.filter(car => car.ocrResult === plates[plateIndex]).length === 0;
  if (hasCar) {
    cars.value.push({
      timeStamp: new Date().toISOString(),
      ocrResult: plates[plateIndex],
      vehicleCode: 1,
      message: 0,
      platePath: "/2022/04/16/plate/20220416163555841_ABC-3456_1_A101_A8_1_2.jpg ",
      imagePath: "/2022/04/16/images/20220416163555841_ABC-3456_1_A101_A8_1_2_plate.jpg "
    })
  }
}
const carOut = (plateIndex: number) => {
  cars.value = cars.value.filter(car => car.ocrResult !== plates[plateIndex])
}

/*
timeStamp: 抓圖時間
ocrResult: 車牌號碼
vehicleCode: 車種代碼，詳表(1)
message: 訊息，詳表(4)
platePath: 小圖路徑(FTP)
imagePath: 大圖路徑(FTP)
*/

</script>

<style scoped>
video {
  height: 120%;
  width: 120%;
}
</style>
