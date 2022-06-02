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
      busShiftGetUrl: 'view_busshift/'
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
          noramlStartTime: '',
          noramlEndTime: '',
          noramlBusShiftData: [{ shift_uuid: 0, arrival_time: '', week_type: '' }],
          weekStartTime: '',
          weekEndTime: '',
          weekBusShiftData: [{ shift_uuid: 0, arrival_time: '', week_type: '' }],
        }
      ],
    },
    filterData: {
      selectCompany: 'all'
    },
    ShiftDialogForm: {
      normalDayData: [{ shift_uuid: 0, arrival_time: '', week_type: '' }],
      weekDayData: [{ shift_uuid: 0, arrival_time: '', week_type: '' }],
    }
  }),
  getters: {},
  actions: {
    shiftDialogShow: function (payload: {data: object}){
      this.ShiftDialogForm.normalDayData = payload.data['noramlBusShiftData']
      this.ShiftDialogForm.weekDayData = payload.data['weekBusShiftData']
      this.visableControl.shiftDialogFormVisible = true
    },
    shifDialogClear: function (){
      this.ShiftDialogForm.normalDayData = [{ shift_uuid: 0, arrival_time: '', week_type: '' }]
      this.ShiftDialogForm.weekDayData = [{ shift_uuid: 0, arrival_time: '', week_type: '' }]
      this.getRoute({getcount:0})
    },
    submitDialog: function (){
      console.log('here')
      console.log(this.ShiftDialogForm.normalDayData)
      console.log(this.getData.getRouteShiftData)
      this.shifDialogClear()
    },
    addDialogValue: function (payload: {data: Array<object>, weekType: string}){
      this.ShiftDialogForm.normalDayData.push({ shift_uuid: 0, arrival_time: '', week_type: '' })
      console.log(this.getData.getRouteShiftData)
    },
    getCompany: function (payload: { getcount: number }) {
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
              this.getCompany({ getcount: payload.getcount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getRoute: function (payload: { getcount: number }) {
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
            this.getBusShift({getcount: 0, routeData: val})
          }
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getRoute({ getcount: payload.getcount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getBusShift: function (payload: { getcount: number, routeData: Array<object> }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.apiUrl.busShiftBaseUrl + this.apiUrl.busShiftGetUrl, {
        data: {
          route_filter: payload.routeData['route_uuid']
        }
      })
        .then(response => {
          console.log('get busshift data')
          this.getData.getRouteShiftData.push(
            {
              belong_company: payload.routeData['belong_company'],
              belong_company_id: payload.routeData['belong_company_id'],
              belong_platform: payload.routeData['belong_platform'],
              route_name: payload.routeData['route_name'],
              route_no: payload.routeData['route_no'],
              route_uuid: payload.routeData['route_uuid'],
              route_via_station: payload.routeData['route_via_station'],
              noramlStartTime: response.data['NormalStartTime'],
              noramlEndTime: response.data['NormalEndTime'],
              noramlBusShiftData: response.data['NormalDay'],
              weekStartTime: response.data['WeekStartTime'],
              weekEndTime: response.data['WeekEndTime'],
              weekBusShiftData: response.data['WeekDay'],
            }
          )
          console.log(this.getData.getRouteShiftData)
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getBusShift({ getcount: payload.getcount + 1, routeData: payload.routeData })
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