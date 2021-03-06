import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useBScheduleStore = defineStore('BScheduleStore', {
  state: () => ({
    apiUrl:{
      baseScheduleUrl: 'http://127.0.0.1:8000/api/broadcastschedule/',
      getScheduleUrl: 'view_schedule/',
      postScheduleUrl: 'add_schedule/',
      putScheduleUrl: 'update_schedule/',
      deleteScheduleUrl: 'delete_schedule/',
      openCloseSwitchUrl: 'open_close_schedule/',
      InStreamScheduleUrl: 'instream_schedule/',
      baseProgramUrl: 'http://127.0.0.1:8000/api/broadcastprogram/',
      getProgramUrl: 'view_program/'
    },
    getData:{
      programData: [],
      scheduleData: [],
      filterText: ''
    },
    dialogSetting: {
      visable: false,
      addEditChange: false,
      schedule_id: '',
      schedule_name: '',
      schedule_start_date: '',
      schedule_start_time: '',
      schedule_end_date: '',
      schedule_end_time: '',
      schedule_frequency_hour: '',
      schedule_frequency_minute: '',
      schedule_frequency_number: '',
      schedule_is_cycle: false,
      schedule_cycle_type: '',
      schedule_cycle_day: [
        {lable: '日', value:false},
        {lable: '一', value:false},
        {lable: '二', value:false},
        {lable: '三', value:false},
        {lable: '四', value:false},
        {lable: '五', value:false},
        {lable: '六', value:false},
      ],
      schedule_end_date_disable: true,
      schedule_end_time_disable: true,
      schedule_frequency_hour_disable: true,
      schedule_frequency_minute_disable: true,
      schedule_cycle_type_disable: true,
      schedule_cycle_day_disable: true,
      schedule_program_select: '',
      schedule_programs: [{}]
    },
    loadingShow: {
      scheduleTableShow: false
    }
  }),
  getters: {},
  actions: {
    dialogClear: function (){
      this.getSchedule({getcount:0})
      this.dialogSetting.schedule_id = ''
      this.dialogSetting.schedule_name = ''
      this.dialogSetting.schedule_start_date = ''
      this.dialogSetting.schedule_start_time = ''
      this.dialogSetting.schedule_end_date = ''
      this.dialogSetting.schedule_end_time = ''
      this.dialogSetting.schedule_frequency_hour = ''
      this.dialogSetting.schedule_frequency_minute = ''
      this.dialogSetting.schedule_frequency_number = ''
      this.dialogSetting.schedule_is_cycle = false
      this.dialogSetting.schedule_cycle_type = ''
      this.dialogSetting.schedule_cycle_day = [
        {lable: '日', value:false},
        {lable: '一', value:false},
        {lable: '二', value:false},
        {lable: '三', value:false},
        {lable: '四', value:false},
        {lable: '五', value:false},
        {lable: '六', value:false},
      ]
      this.dialogSetting.schedule_program_select = ''
      this.dialogSetting.schedule_programs = []
      this.dialogSetting.schedule_end_date_disable = true
      this.dialogSetting.schedule_end_time_disable = true
      this.dialogSetting.schedule_frequency_hour_disable = true
      this.dialogSetting.schedule_frequency_minute_disable = true
      this.dialogSetting.schedule_cycle_type_disable = true
      this.dialogSetting.schedule_cycle_day_disable = true
    },
    dialogCycleTypeChange: function (){
      if (this.dialogSetting.schedule_is_cycle == false){
        this.dialogSetting.schedule_end_date = ''
        this.dialogSetting.schedule_end_time = ''
        this.dialogSetting.schedule_frequency_hour = ''
        this.dialogSetting.schedule_frequency_minute = ''
        this.dialogSetting.schedule_cycle_type = ''
        this.dialogSetting.schedule_cycle_day = [
          {lable: '日', value:false},
          {lable: '一', value:false},
          {lable: '二', value:false},
          {lable: '三', value:false},
          {lable: '四', value:false},
          {lable: '五', value:false},
          {lable: '六', value:false},
        ]
        this.dialogSetting.schedule_end_date_disable = true
        this.dialogSetting.schedule_end_time_disable = true
        this.dialogSetting.schedule_frequency_hour_disable = true
        this.dialogSetting.schedule_frequency_minute_disable = true
        this.dialogSetting.schedule_cycle_type_disable = true
        this.dialogSetting.schedule_cycle_day_disable = true
      }else{
        this.dialogSetting.schedule_end_date_disable = false
        this.dialogSetting.schedule_end_time_disable = false
        this.dialogSetting.schedule_frequency_hour_disable = false
        this.dialogSetting.schedule_frequency_minute_disable = false
        this.dialogSetting.schedule_cycle_type_disable = false
        this.dialogSetting.schedule_cycle_day_disable = false
      }
    },
    dialogCycleEveryDayCheck: function (){
      if (this.dialogSetting.schedule_cycle_type == 'day'){
        this.dialogSetting.schedule_cycle_day = [
          {lable: '日', value:true},
          {lable: '一', value:true},
          {lable: '二', value:true},
          {lable: '三', value:true},
          {lable: '四', value:true},
          {lable: '五', value:true},
          {lable: '六', value:true},
        ]
        this.dialogSetting.schedule_cycle_day_disable = true
      }else{
        this.dialogSetting.schedule_cycle_day = [
          {lable: '日', value:false},
          {lable: '一', value:false},
          {lable: '二', value:false},
          {lable: '三', value:false},
          {lable: '四', value:false},
          {lable: '五', value:false},
          {lable: '六', value:false},
        ]
        this.dialogSetting.schedule_cycle_day_disable = false
      }
    },
    dialogAddProgram: function (){
      let check = false
      for (let cv of this.dialogSetting.schedule_programs){
        if (cv['program_uuid'] == this.dialogSetting.schedule_program_select){
          check = true
        }
      }
      let order_list = []
      for (let od of this.dialogSetting.schedule_programs){
        order_list.push(od['program_order'])
      }
      let maxNum = Math.max(...order_list)
      if (maxNum == -Infinity){
        maxNum = 0
      }
      if (check == false){
        for (let v of this.getData.programData){
          if (v['uuid'] == this.dialogSetting.schedule_program_select){
            this.dialogSetting.schedule_programs.push({
              program_uuid: v['uuid'],
              program_name: v['program_name'],
              program_type_uuid: v['program_type_uuid'],
              program_type_name: v['program_type'],
              program_type_name_ch: v['program_type_ch'],
              program_content_text: v['program_content_text'],
              program_order: maxNum + 1
            })
          }
        }
      }
      console.log(this.dialogSetting.schedule_programs)
    },
    dialogDeleteProgram: function (payload: { data: object }){
      let orderNum = 0
      this.dialogSetting.schedule_programs.forEach( (item, index) => {
        if(item['program_uuid'] === payload.data['program_uuid']) orderNum=item['program_order'], this.dialogSetting.schedule_programs.splice(index,1);
      });
      for (let od of this.dialogSetting.schedule_programs){
        if(od['program_order']>orderNum){
          od['program_order'] = od['program_order']-1
        }
      }
    },
    dialogSwitchProgram: function (payload: { data: object, direction: string }){
      let switchNum = 0
      let selectId = 0
      let switchId = 0
      if (payload.direction == 'up'){
        this.dialogSetting.schedule_programs.forEach( (item, index) => {
          if(item['program_uuid'] === payload.data['program_uuid']) switchNum = item['program_order'], selectId = item['program_uuid'];
        });
        this.dialogSetting.schedule_programs.forEach( (item, index) => {
          if(item['program_order'] == switchNum - 1) switchId = item['program_uuid']
        });
        if (switchNum != 1){
          this.dialogSetting.schedule_programs.forEach( (item, index) => {
            if(item['program_uuid'] === selectId) item['program_order'] = switchNum - 1
            if(item['program_uuid'] === switchId) item['program_order'] = switchNum
          })
        }
      }else{
        let order_list = []
        for (let od of this.dialogSetting.schedule_programs){
          order_list.push(od['program_order'])
        }
        let maxNum = Math.max(...order_list)
        if (maxNum == -Infinity){
          maxNum = 0
        }
        this.dialogSetting.schedule_programs.forEach( (item, index) => {
          if(item['program_uuid'] === payload.data['program_uuid']) switchNum = item['program_order'], selectId = item['program_uuid'];
        });
        this.dialogSetting.schedule_programs.forEach( (item, index) => {
          if(item['program_order'] == switchNum + 1) switchId = item['program_uuid']
        });
        if (switchNum != maxNum){
          this.dialogSetting.schedule_programs.forEach( (item, index) => {
            if(item['program_uuid'] === selectId) item['program_order'] = switchNum + 1
            if(item['program_uuid'] === switchId) item['program_order'] = switchNum
          })
        }
      }
    },
    dialogAddShow: function (){
      this.dialogClear()
      this.getProgram({getcount:0})
      this.dialogSetting.addEditChange = false
      this.dialogSetting.visable = true
    },
    dialogEditShow: function (payload: { data: object }){
      this.dialogClear()
      this.getProgram({getcount:0})
      this.dialogSetting.schedule_id = payload.data['uuid']
      this.dialogSetting.schedule_name = payload.data['schedule_name']
      this.dialogSetting.schedule_start_date = payload.data['schedule_start_date']
      this.dialogSetting.schedule_start_time = payload.data['schedule_start_time']
      this.dialogSetting.schedule_frequency_number = payload.data['schedule_frequency_number']
      this.dialogSetting.schedule_is_cycle = payload.data['schedule_is_cycle']
      if (this.dialogSetting.schedule_is_cycle == false){
        this.dialogCycleTypeChange()
      }else{
        this.dialogCycleTypeChange()
        this.dialogSetting.schedule_end_date = payload.data['schedule_end_date']
        this.dialogSetting.schedule_end_time = payload.data['schedule_end_time']
        this.dialogSetting.schedule_frequency_hour = payload.data['schedule_frequency_hour']
        this.dialogSetting.schedule_frequency_minute = payload.data['schedule_frequency_minute']
        this.dialogSetting.schedule_cycle_type = payload.data['schedule_cycle_type']
        this.dialogSetting.schedule_cycle_day = payload.data['schedule_cycle_day']
      }
      this.dialogSetting.schedule_programs = payload.data['schedule_programs']
      this.dialogSetting.addEditChange = true
      this.dialogSetting.visable = true
    },
    getProgram: function (payload: { getcount: number }) {
      this.loadingShow.scheduleTableShow = true
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.baseProgramUrl + this.apiUrl.getProgramUrl)
        .then(response => {
          console.log('get program data')
          this.getData.programData = response.data
          console.log(this.getData.programData)
          this.loadingShow.scheduleTableShow = false
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getProgram({ getcount: payload.getcount + 1 })
            } else {
              this.getData.programData = []
              console.log('沒有權限')
              this.loadingShow.scheduleTableShow = false
            }
          } else {
            console.log(error)
            this.loadingShow.scheduleTableShow = false
          }
        })
    },
    getSchedule: function (payload: { getcount: number }) {
      this.loadingShow.scheduleTableShow = true
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.baseScheduleUrl + this.apiUrl.getScheduleUrl)
        .then(response => {
          console.log('get schedule data')
          this.getData.scheduleData = response.data
          console.log(this.getData.scheduleData)
          this.loadingShow.scheduleTableShow = false
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getSchedule({ getcount: payload.getcount + 1 })
            } else {
              this.getData.scheduleData = []
              console.log('沒有權限')
              this.loadingShow.scheduleTableShow = false
            }
          } else {
            console.log(error)
            this.loadingShow.scheduleTableShow = false
          }
        })
    },
    addSchedule: function (payload: { postcount: number }) {
      this.loadingShow.scheduleTableShow = true
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.apiUrl.baseScheduleUrl + this.apiUrl.postScheduleUrl, 
        {
        data: {
          schedule_name: this.dialogSetting.schedule_name,
          schedule_start_date: this.dialogSetting.schedule_start_date,
          schedule_end_date: this.dialogSetting.schedule_end_date,
          schedule_start_time: this.dialogSetting.schedule_start_time,
          schedule_end_time: this.dialogSetting.schedule_end_time,
          schedule_frequency_hour: this.dialogSetting.schedule_frequency_hour,
          schedule_frequency_minute: this.dialogSetting.schedule_frequency_minute,
          schedule_frequency_number: this.dialogSetting.schedule_frequency_number,
          schedule_is_cycle: this.dialogSetting.schedule_is_cycle,
          schedule_cycle_type: this.dialogSetting.schedule_cycle_type,
          schedule_cycle_day: this.dialogSetting.schedule_cycle_day,
          schedule_programs: this.dialogSetting.schedule_programs,
          }
        }
      )
        .then(response => {
          console.log('post program data')
          this.getSchedule({ getcount: 0 })
          this.dialogClear()
          this.loadingShow.scheduleTableShow = false
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.addSchedule({ postcount: payload.postcount + 1 })
            } else {
              console.log('沒有權限')
              this.dialogClear()
              this.loadingShow.scheduleTableShow = false
            }
          } else {
            console.log(error)
            this.dialogClear()
            this.loadingShow.scheduleTableShow = false
          }
        })
    },
    updateSchedule: function (payload: { putcount: number }) {
      this.loadingShow.scheduleTableShow = true
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.apiUrl.baseScheduleUrl + this.dialogSetting.schedule_id + '/' + this.apiUrl.putScheduleUrl, {
        data: {
          schedule_id: this.dialogSetting.schedule_id,
          schedule_name: this.dialogSetting.schedule_name,
          schedule_start_date: this.dialogSetting.schedule_start_date,
          schedule_end_date: this.dialogSetting.schedule_end_date,
          schedule_start_time: this.dialogSetting.schedule_start_time,
          schedule_end_time: this.dialogSetting.schedule_end_time,
          schedule_frequency_hour: this.dialogSetting.schedule_frequency_hour,
          schedule_frequency_minute: this.dialogSetting.schedule_frequency_minute,
          schedule_frequency_number: this.dialogSetting.schedule_frequency_number,
          schedule_is_cycle: this.dialogSetting.schedule_is_cycle,
          schedule_cycle_type: this.dialogSetting.schedule_cycle_type,
          schedule_cycle_day: this.dialogSetting.schedule_cycle_day,
          schedule_programs: this.dialogSetting.schedule_programs,
        }
      })
        .then(response => {
          console.log('put schedule data')
          this.getSchedule({ getcount: 0 })
          this.dialogClear()
          this.loadingShow.scheduleTableShow = false
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshToken()
              this.updateSchedule({ putcount: payload.putcount + 1 })
            } else {
              console.log('沒有權限')
              this.dialogClear()
              this.loadingShow.scheduleTableShow = false
            }
          } else {
            console.log(error)
            this.dialogClear()
            this.loadingShow.scheduleTableShow = false
          }
        })
    },
    deleteSchedule: function (payload: { deletecount: number, id: string }) {
      this.loadingShow.scheduleTableShow = true
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.apiUrl.baseScheduleUrl + payload.id + '/' + this.apiUrl.deleteScheduleUrl, {
        data: {
          schedule_id: payload.id,
        }
      })
        .then(response => {
          console.log('delete schedule data')
          this.getSchedule({ getcount: 0 })
          this.dialogClear()
          this.loadingShow.scheduleTableShow = false
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.deletecount < 6) {
              loginManagerStore.refreshToken()
              this.deleteSchedule({ deletecount: payload.deletecount, id: payload.id })
            } else {
              console.log('沒有權限')
              this.dialogClear()
              this.loadingShow.scheduleTableShow = false
            }
          } else {
            console.log(error)
            this.dialogClear()
            this.loadingShow.scheduleTableShow = false
          }
        })
    },
    scheduleOpenCloseSwitch: function (payload: { putcount: number, id: string }) {
      this.loadingShow.scheduleTableShow = true
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.apiUrl.baseScheduleUrl + payload.id + '/' + this.apiUrl.openCloseSwitchUrl, {
        data: {
          schedule_id: payload.id,
        }
      })
        .then(response => {
          console.log('schedule open close switch ok')
          this.getSchedule({ getcount: 0 })
          this.dialogClear()
          this.loadingShow.scheduleTableShow = false
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshToken()
              this.scheduleOpenCloseSwitch({ putcount: payload.putcount, id: payload.id })
            } else {
              console.log('沒有權限')
              this.dialogClear()
              this.loadingShow.scheduleTableShow = false
            }
          } else {
            console.log(error)
            this.dialogClear()
            this.loadingShow.scheduleTableShow = false
          }
        })
    },
    inStreamScheduleSwitch: function (payload: { putcount: number, id: string }) {
      this.loadingShow.scheduleTableShow = true
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.apiUrl.baseScheduleUrl + payload.id + '/' + this.apiUrl.InStreamScheduleUrl, {
        data: {
          schedule_id: payload.id,
        }
      })
        .then(response => {
          console.log('instream schedule switch ok')
          this.getSchedule({ getcount: 0 })
          this.loadingShow.scheduleTableShow = false
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshToken()
              this.inStreamScheduleSwitch({ putcount: payload.putcount, id: payload.id })
            } else {
              console.log('沒有權限')
              this.loadingShow.scheduleTableShow = false
            }
          } else {
            console.log(error)
            this.loadingShow.scheduleTableShow = false
          }
        })
    },
  }
})

export default useBScheduleStore;