<template>
  <simple-card title="播放列隊">
    <BQueueShow/>
    {{nowTime.data}}
  </simple-card>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineComponent, watch, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";

import BQueueShow from "../../components/BGroup/BQueue/BQueueShow.vue"

import useBQueueStore from "../../store/BGroup/BQueueStore";

const BQueueStore = useBQueueStore();
const {  } = storeToRefs(BQueueStore);
const { getQueue } = BQueueStore;

let myDate = new Date();
let nowTime = reactive({
  data: ""
})
const setTime = (myDate: Date) => {
  const year = myDate.getFullYear();
  const month = myDate.getMonth() + 1 < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
  const date = myDate.getDate() < 10 ? "0" + (myDate.getDate()) : myDate.getDate();
  const h = myDate.getHours();
  const m = myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate.getMinutes();
  const s = myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate.getSeconds();
  const time = h + ":" + m + ":" + s;
  const day = year + "-" + month + "-" + date;

  nowTime.data = day+' '+time;
}
const nowTimes = () => {
  setTime(myDate);
  setInterval(() => {
    myDate = new Date();
    setTime(myDate)
    getQueue({getcount:0})
  }, 1000)
  return nowTime
}
nowTimes()

getQueue({getcount:0})

</script>

<style scoped>
</style>
