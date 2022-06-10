import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useStopTimeStore = defineStore('MStopTimeStore', {
  state: () => ({
    visableControl: {
      shiftAddDialogFormVisible: false
    },
    scheduleTabData: {
      activeTab: '排程1',
      scheduleTab: [
        {lable: '排程1', name: '排程1'},
        {lable: '排程2', name: '排程2'},
        {lable: '排程3', name: '排程3'},
      ],
      addForm: {
        inputName: ''
      }
    },
    scheduleShowData: [
      {schedule:'排程1', platform:['1'], route:['1'], count:1, time:1},
      {schedule:'排程2', platform:['2'], route:['2'], count:2, time:2},
      {schedule:'排程3', platform:['3'], route:['3'], count:3, time:3},
    ],
    selectScheduleData:{
      schedulePlatform: [''],
      scheduleroute: [''],
      scheduleCount: 0,
      scheduleTime: 0
    }
  }),
  getters: {
  },
  actions: {
    clearSchedule: function () {
      this.scheduleTabData.addForm.inputName = ''
    },
    openAddSchedule: function () {
      this.clearSchedule()
      this.visableControl.shiftAddDialogFormVisible = true
    },
    addSchedule: function () {
      this.scheduleTabData.scheduleTab.push({
        lable: this.scheduleTabData.addForm.inputName, 
        name: this.scheduleTabData.addForm.inputName
      })
      this.scheduleShowData.push({
        schedule:this.scheduleTabData.addForm.inputName, 
        platform:[''], 
        route:[''], 
        count:0, 
        time:0
      })
      this.clearSchedule()
    },
    clearSelectSchedule: function () {
      this.selectScheduleData.schedulePlatform = ['']
      this.selectScheduleData.scheduleroute = ['']
      this.selectScheduleData.scheduleCount = 0
      this.selectScheduleData.scheduleTime = 0
    },
    changeSelectSchedule: function () {
      for (let v of this.scheduleShowData){
        if (v.schedule == this.scheduleTabData.activeTab){
          this.clearSelectSchedule()
          this.selectScheduleData.schedulePlatform = v.platform
          this.selectScheduleData.scheduleroute = v.route
          this.selectScheduleData.scheduleCount = v.count
          this.selectScheduleData.scheduleTime = v.time
          console.log(this.selectScheduleData)
        }
      }
    }
  }
})

export default useStopTimeStore;