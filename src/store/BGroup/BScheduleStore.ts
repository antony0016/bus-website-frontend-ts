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
      baseProgramUrl: 'http://127.0.0.1:8000/api/broadcastprogram/',
      getProgramUrl: 'view_program/'
    },
    getData:{
      programData: [],
      scheduleData: []
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
      schedule_cycle_type_disable: true,
      schedule_cycle_day_disable: true,
      schedule_program_select: '',
      schedule_programs: [{}]
    },
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
    },
    dialogCycleTypeChange: function (){
      if (this.dialogSetting.schedule_is_cycle == false){
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
        this.dialogSetting.schedule_cycle_type_disable = true
        this.dialogSetting.schedule_cycle_day_disable = true
      }else{
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
      if (check == false){
        for (let v of this.getData.programData){
          if (v['uuid'] == this.dialogSetting.schedule_program_select){
            this.dialogSetting.schedule_programs.push({
              program_uuid: v['uuid'],
              program_name: v['program_name'],
              program_type_uuid: v['program_type_uuid'],
              program_type_name: v['program_type'],
              program_type_name_ch: v['program_type_ch'],
              program_content_text: v['program_content_text']
            })
          }
        }
      }
    },
    dialogDeleteProgram: function (payload: { data: object }){
      this.dialogSetting.schedule_programs.forEach( (item, index) => {
        if(item['program_uuid'] === payload.data['program_uuid']) this.dialogSetting.schedule_programs.splice(index,1);
      });
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
      this.dialogSetting.schedule_end_date = payload.data['schedule_end_date']
      this.dialogSetting.schedule_end_time = payload.data['schedule_end_time']
      this.dialogSetting.schedule_frequency_hour = payload.data['schedule_frequency_hour']
      this.dialogSetting.schedule_frequency_minute = payload.data['schedule_frequency_minute']
      this.dialogSetting.schedule_frequency_number = payload.data['schedule_frequency_number']
      this.dialogSetting.schedule_is_cycle = payload.data['schedule_is_cycle']
      if (this.dialogSetting.schedule_is_cycle == false){
        this.dialogCycleTypeChange()
      }else{
        this.dialogCycleTypeChange()
        this.dialogSetting.schedule_cycle_type = payload.data['schedule_cycle_type']
        this.dialogSetting.schedule_cycle_day = payload.data['schedule_cycle_day']
      }
      this.dialogSetting.schedule_programs = payload.data['schedule_programs']
      this.dialogSetting.addEditChange = true
      this.dialogSetting.visable = true
    },
    getProgram: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.baseProgramUrl + this.apiUrl.getProgramUrl)
        .then(response => {
          console.log('get program data')
          this.getData.programData = response.data
          console.log(this.getData.programData)
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getProgram({ getcount: payload.getcount + 1 })
            } else {
              this.getData.programData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
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
    addSchedule: function (payload: { postcount: number }) {
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
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.addSchedule({ postcount: payload.postcount + 1 })
            } else {
              console.log('沒有權限')
              this.dialogClear()
            }
          } else {
            console.log(error)
            this.dialogClear()
          }
        })
    },
    updateSchedule: function (payload: { putcount: number }) {
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
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshToken()
              this.updateSchedule({ putcount: payload.putcount + 1 })
            } else {
              console.log('沒有權限')
              this.dialogClear()
            }
          } else {
            console.log(error)
            this.dialogClear()
          }
        })
    },
    deleteSchedule: function (payload: { deletecount: number, id: string }) {
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
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.deletecount < 6) {
              loginManagerStore.refreshToken()
              this.deleteSchedule({ deletecount: payload.deletecount, id: payload.id })
            } else {
              console.log('沒有權限')
              this.dialogClear()
            }
          } else {
            console.log(error)
            this.dialogClear()
          }
        })
    },
  }
})

export default useBScheduleStore;