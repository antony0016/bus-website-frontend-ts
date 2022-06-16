import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useBScheduleStore = defineStore('BScheduleStore', {
  state: () => ({
    getData:{
      scheduleData: []
    },
    apiUrl:{
      baseScheduleUrl: 'http://127.0.0.1:8000/api/broadcastschedule/',
      getScheduleUrl: 'view_schedule/',
    },
  }),
  getters: {},
  actions: {
    getSchedule: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.baseScheduleUrl + this.apiUrl.getScheduleUrl)
        .then(response => {
          console.log('get schedule data')
          this.getData.scheduleData = response.data
          console.log(this.getData.scheduleData)
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getSchedule({ getcount: payload.getcount + 1 })
            } else {
              this.getData.scheduleData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
  }
})

export default useBScheduleStore;