import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import router from "../../router";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useMMaintenanceStore = defineStore('MMaintenanceStore', {
  state: () => ({
    apiUrl: {
      companyBaseUrl: 'http://127.0.0.1:8000/api/company/',
      companyGetUrl: 'view_company/',
      routeBaseUrl: 'http://127.0.0.1:8000/api/route/',
      routeGetUrl: 'view_route/',
      busShiftBaseUrl: 'http://127.0.0.1:8000/api/busshift/',
      busShiftGetUrl: 'view_busshift/',
      busShiftEditUrl: 'edit_busshift/',
      busShiftCsvEditUrl: 'edit_csv_busshift/',
    },
    visableControl: {
      shiftDialogFormVisible: false,
    },
    getData: {
      getCompanyData: [],
      getCompanyName: [{ label: '所有公司', value: 'all' }],
      getRouteShiftData: [
        {
          belong_company: '',
          belong_company_id: '',
          belong_platform: '',
          route_name: '',
          route_no: '',
          route_uuid: '',
          route_via_station: '',
          MondayStartTime: '',
          MondayEndTime: '',
          MondayBusShiftData: [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }],
          TuesdayStartTime: '',
          TuesdayEndTime: '',
          TuesdayBusShiftData: [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }],
          WednesdayStartTime: '',
          WednesdayEndTime: '',
          WednesdayBusShiftData: [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }],
          ThursdayStartTime: '',
          ThursdayEndTime: '',
          ThursdayBusShiftData: [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }],
          FridayStartTime: '',
          FridayEndTime: '',
          FridayBusShiftData: [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }],
          SaturdayStartTime: '',
          SaturdayEndTime: '',
          SaturdayBusShiftData: [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }],
          SundayStartTime: '',
          SundayEndTime: '',
          SundayBusShiftData: [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }],
        }
      ],
    },
    filterData: {
      selectCompany: 'all',
      selectChoiceRoute: 0,
      selectChoiceWeekType: ''
    },
    ShiftDialogForm: {
      MondayData: [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }],
      TuesdayData: [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }],
      WednesdayData: [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }],
      ThursdayData: [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }],
      FridayData: [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }],
      SaturdayData: [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }],
      SundayData: [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }],
      belongRoute: '',
    }
  }),
  getters: {},
  actions: {
    postBusShiftCsvChoice: function (payload:{data: number}){
      this.filterData.selectChoiceRoute = payload.data
    },
    postBusShiftCsvData: function (payload:{data: any, postcount: number}){
      const loginManagerStore = useLoginManagerStore(); 
      axios.post(this.apiUrl.busShiftBaseUrl + this.apiUrl.busShiftCsvEditUrl, {
        data: {
          belongroute: this.filterData.selectChoiceRoute,
          postdata: payload.data
        }
      })
        .then(response => {
          console.log('post csv busshift data')
          this.getMaintenanceRoute({getcount:0})
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.postBusShiftCsvData({ data: payload.data, postcount: payload.postcount + 1 })
            } else {
              console.log('沒有權限')
            }
          } 
          else if (error.response.status == '500'){
            console.log('文件內項目已經添加了')
          }
          else {
            console.log(error)
          }
        })    
    },
    shiftDialogShow: function (payload: {data: object}){
      this.shifDialogClear()
      this.ShiftDialogForm.MondayData = payload.data['MondayBusShiftData']
      this.ShiftDialogForm.TuesdayData = payload.data['TuesdayBusShiftData']
      this.ShiftDialogForm.WednesdayData = payload.data['WednesdayBusShiftData']
      this.ShiftDialogForm.ThursdayData = payload.data['ThursdayBusShiftData']
      this.ShiftDialogForm.FridayData = payload.data['FridayBusShiftData']
      this.ShiftDialogForm.SaturdayData = payload.data['SaturdayBusShiftData']
      this.ShiftDialogForm.SundayData = payload.data['SundayBusShiftData']
      this.ShiftDialogForm.belongRoute = payload.data['route_uuid']
      this.visableControl.shiftDialogFormVisible = true
    },
    shifDialogClear: function (){
      this.ShiftDialogForm.MondayData = [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }]
      this.ShiftDialogForm.TuesdayData = [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }]
      this.ShiftDialogForm.WednesdayData = [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }]
      this.ShiftDialogForm.ThursdayData = [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }]
      this.ShiftDialogForm.FridayData = [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }]
      this.ShiftDialogForm.SaturdayData = [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }]
      this.ShiftDialogForm.SundayData = [{ shift_uuid: 0, arrival_time: '', week_type: '', is_exist: '' }]
      this.ShiftDialogForm.belongRoute = ''
      this.getMaintenanceRoute({getcount:0})
    },
    submitDialog: function (){
      console.log('here')
      console.log(this.getData.getRouteShiftData)
      this.editBusShift({postcount:0})
      this.shifDialogClear()
    },
    addDialogValue: function (payload: {data: Array<object>, weekType: string}){
      let nowUuid = 0
      if (payload.data.length <= 0){
        nowUuid = 1
      }else{
        nowUuid = payload.data[payload.data.length-1]['shift_uuid'] + 1
      }
      if (payload.weekType == 'Monday'){
        this.ShiftDialogForm.MondayData.push({ shift_uuid: nowUuid, arrival_time: '', week_type: 'Monday', is_exist: 'newdata' })
      }else if (payload.weekType == 'Tuesday'){
        this.ShiftDialogForm.TuesdayData.push({ shift_uuid: nowUuid, arrival_time: '', week_type: 'Tuesday', is_exist: 'newdata' })
      }else if (payload.weekType == 'Wednesday'){
        this.ShiftDialogForm.WednesdayData.push({ shift_uuid: nowUuid, arrival_time: '', week_type: 'Wednesday', is_exist: 'newdata' })
      }else if (payload.weekType == 'Thursday'){
        this.ShiftDialogForm.ThursdayData.push({ shift_uuid: nowUuid, arrival_time: '', week_type: 'Thursday', is_exist: 'newdata' })
      }else if (payload.weekType == 'Friday'){
        this.ShiftDialogForm.FridayData.push({ shift_uuid: nowUuid, arrival_time: '', week_type: 'Friday', is_exist: 'newdata' })
      }else if (payload.weekType == 'Saturday'){
        this.ShiftDialogForm.SaturdayData.push({ shift_uuid: nowUuid, arrival_time: '', week_type: 'Saturday', is_exist: 'newdata' })
      }else if (payload.weekType == 'Sunday'){
        this.ShiftDialogForm.SundayData.push({ shift_uuid: nowUuid, arrival_time: '', week_type: 'Sunday', is_exist: 'newdata' })
      }
      console.log(this.getData.getRouteShiftData)
    },
    deleteDialogValue: function (payload: {nowId: number, weekType: string}){
      if (payload.weekType == 'Monday'){
        this.ShiftDialogForm.MondayData.forEach( (item, index) => {
          if(item.shift_uuid === payload.nowId) this.ShiftDialogForm.MondayData.splice(index,1);
        });
      }else if (payload.weekType == 'Tuesday'){
        this.ShiftDialogForm.TuesdayData.forEach( (item, index) => {
          if(item.shift_uuid === payload.nowId) this.ShiftDialogForm.TuesdayData.splice(index,1);
        });
      }else if (payload.weekType == 'Wednesday'){
        this.ShiftDialogForm.WednesdayData.forEach( (item, index) => {
          if(item.shift_uuid === payload.nowId) this.ShiftDialogForm.WednesdayData.splice(index,1);
        });
      }else if (payload.weekType == 'Thursday'){
        this.ShiftDialogForm.ThursdayData.forEach( (item, index) => {
          if(item.shift_uuid === payload.nowId) this.ShiftDialogForm.ThursdayData.splice(index,1);
        });
      }else if (payload.weekType == 'Friday'){
        this.ShiftDialogForm.FridayData.forEach( (item, index) => {
          if(item.shift_uuid === payload.nowId) this.ShiftDialogForm.FridayData.splice(index,1);
        });
      }else if (payload.weekType == 'Saturday'){
        this.ShiftDialogForm.SaturdayData.forEach( (item, index) => {
          if(item.shift_uuid === payload.nowId) this.ShiftDialogForm.SaturdayData.splice(index,1);
        });
      }else if (payload.weekType == 'Sunday'){
        this.ShiftDialogForm.SundayData.forEach( (item, index) => {
          if(item.shift_uuid === payload.nowId) this.ShiftDialogForm.SundayData.splice(index,1);
        });
      }
    },
    getMaintenanceCompany: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.companyBaseUrl + this.apiUrl.companyGetUrl)
        .then(response => {
          console.log('get company data')
          this.getData.getCompanyName = [{ label: '所有公司', value: 'all' }]
          for (let v of response.data) {
            this.getData.getCompanyName.push({ label: v['company_name'], value: v['company_uuid'] })
          }
          this.getData.getCompanyData = response.data
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getMaintenanceCompany({ getcount: payload.getcount + 1 })
            } else {
              this.getData.getCompanyName = [{ label: '所有公司', value: 'all' }]
              this.getData.getCompanyData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getMaintenanceRoute: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.apiUrl.routeBaseUrl + this.apiUrl.routeGetUrl, {
        data: {
          company_filter: this.filterData.selectCompany
        }
      })
        .then(response => {
          console.log('get route data')
          this.getData.getRouteShiftData = []
          for (let val of response.data){
            this.getBusShift({getcount: 0, routeData: val, len: response.data.length})
          }
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getMaintenanceRoute({ getcount: payload.getcount + 1 })
            } else {
              this.getData.getRouteShiftData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getBusShift: function (payload: { getcount: number, routeData: Array<object>, len: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.apiUrl.busShiftBaseUrl + this.apiUrl.busShiftGetUrl, {
        data: {
          route_filter: payload.routeData['route_uuid']
        }
      })
        .then(response => {
          console.log('get busshift data')
          if (this.getData.getRouteShiftData.length < payload.len){
            this.getData.getRouteShiftData.push(
              {
                belong_company: payload.routeData['belong_company'],
                belong_company_id: payload.routeData['belong_company_id'],
                belong_platform: payload.routeData['belong_platform'],
                route_name: payload.routeData['route_name'],
                route_no: payload.routeData['route_no'],
                route_uuid: payload.routeData['route_uuid'],
                route_via_station: payload.routeData['route_via_station'],
                MondayStartTime: response.data['MondayStartTime'],
                MondayEndTime: response.data['MondayEndTime'],
                MondayBusShiftData: response.data['Monday'],
                TuesdayStartTime: response.data['TuesdayStartTime'],
                TuesdayEndTime: response.data['TuesdayEndTime'],
                TuesdayBusShiftData: response.data['Tuesday'],
                WednesdayStartTime: response.data['WednesdayStartTime'],
                WednesdayEndTime: response.data['WednesdayEndTime'],
                WednesdayBusShiftData: response.data['Wednesday'],
                ThursdayStartTime: response.data['ThursdayStartTime'],
                ThursdayEndTime: response.data['ThursdayEndTime'],
                ThursdayBusShiftData: response.data['Thursday'],
                FridayStartTime: response.data['FridayStartTime'],
                FridayEndTime: response.data['FridayEndTime'],
                FridayBusShiftData: response.data['Friday'],
                SaturdayStartTime: response.data['SaturdayStartTime'],
                SaturdayEndTime: response.data['SaturdayEndTime'],
                SaturdayBusShiftData: response.data['Saturday'],
                SundayStartTime: response.data['SundayStartTime'],
                SundayEndTime: response.data['SundayEndTime'],
                SundayBusShiftData: response.data['Sunday'],
              }
            )
          }
          console.log(this.getData.getRouteShiftData)
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getBusShift({ getcount: payload.getcount + 1, routeData: payload.routeData, len: payload.len })
            } else {
              this.getData.getRouteShiftData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    editBusShift: function (payload: { postcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.apiUrl.busShiftBaseUrl + this.apiUrl.busShiftEditUrl, {
        data: {
          MondayData: this.ShiftDialogForm.MondayData,
          TuesdayData: this.ShiftDialogForm.TuesdayData,
          WednesdayData: this.ShiftDialogForm.WednesdayData,
          ThursdayData: this.ShiftDialogForm.ThursdayData,
          FridayData: this.ShiftDialogForm.FridayData,
          SaturdayData: this.ShiftDialogForm.SaturdayData,
          SundayData: this.ShiftDialogForm.SundayData,
          belongRoute: this.ShiftDialogForm.belongRoute,
        }
      })
        .then(response => {
          console.log('post busshift data')
          console.log(response.data)
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.editBusShift({ postcount: payload.postcount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
  },
})

export default useMMaintenanceStore;