import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useBQueueStore = defineStore('BQueueStore', {
  state: () => ({
    apiUrl: {
      baseQueueUrl: 'http://127.0.0.1:8000/api/broadcastqueue/',
      getQueueUrl: 'view_queue/',
      getScheduleDataUrl: 'view_schedule_data/',
      postQueueUrl: 'add_queue/',
      deleteQueueUrl: 'delete_queue/',
      switchQueueUrl: 'switch_order_queue/',
    },
    getData: {
      scheduleData: [],
      queueData: []
    },
    selectData: {
      scheduleSelect: ''
    }
  }),
  getters: {},
  actions: {
    getScheduleData: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.baseQueueUrl + this.apiUrl.getScheduleDataUrl)
        .then(response => {
          console.log('get schedule data')
          this.getData.scheduleData = response.data
          console.log(this.getData.scheduleData)
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getScheduleData({ getcount: payload.getcount + 1 })
            } else {
              this.getData.scheduleData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getQueue: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.baseQueueUrl + this.apiUrl.getQueueUrl)
        .then(response => {
          console.log('get queue data')
          this.getData.queueData = response.data
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getQueue({ getcount: payload.getcount + 1 })
            } else {
              this.getData.queueData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    addQueue: function (payload: { postcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.apiUrl.baseQueueUrl + this.apiUrl.postQueueUrl, 
        {
        data: {
          uuid: this.selectData.scheduleSelect,
          }
        }
      )
        .then(response => {
          console.log('post queue data')
          this.getQueue({ getcount: 0 })
          this.getScheduleData({getcount:0})
          this.selectData.scheduleSelect = ''
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.addQueue({ postcount: payload.postcount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    deleteSchedule: function (payload: { deletecount: number, id: string }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.apiUrl.baseQueueUrl + payload.id + '/' + this.apiUrl.deleteQueueUrl, {
        data: {
          uuid: payload.id,
        }
      })
        .then(response => {
          console.log('delete queue data')
          this.getQueue({ getcount: 0 })
          this.getScheduleData({getcount:0})
          this.selectData.scheduleSelect = ''
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.deletecount < 6) {
              loginManagerStore.refreshToken()
              this.deleteSchedule({ deletecount: payload.deletecount, id: payload.id })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    switchQueue: function (payload: { putcount: number, id: string, direction: string }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.apiUrl.baseQueueUrl + payload.id + '/' + this.apiUrl.switchQueueUrl, {
        data: {
          uuid: payload.id,
          direction: payload.direction
        }
      })
        .then(response => {
          console.log('put schedule data')
          this.getQueue({ getcount: 0 })
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshToken()
              this.switchQueue({ putcount: payload.putcount + 1, id: payload.id, direction: payload.direction })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
  }
})

export default useBQueueStore;