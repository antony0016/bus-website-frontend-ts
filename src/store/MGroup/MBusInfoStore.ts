import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useMBusInfoStore = defineStore('MBusInfoStore', {
  state: () => ({
    apiUrl: {
      companyBaseUrl: 'http://127.0.0.1:8000/api/company/',
      companyGetUrl: 'view_company/',
      routebaseurl: 'http://127.0.0.1:8000/api/route/',
      routegeturl: 'view_route/',
      busBaseUrl: 'http://127.0.0.1:8000/api/bus/',
      busGetUrl: 'view_bus/',
      busGetDetailUrl: 'detail_bus/',
      busPostUrl: 'add_bus/',
      busPostCsvUrl: 'add_csv_bus/',
      busPutUrl: 'update_bus/',
      busDeleteUrl: 'delete_bus/',
    },
    disableControl: {
      routeSelectdisable: true,
      dialogCompanySelect: false
    },
    getData: {
      getCompanyData: [],
      getCompanyName: [{ label: '所有公司', value: 'all' }],
      getRouteData: [],
      getRouteDataName: [{ label: '所有路線', value: 'all' }],
      getBusData: []
    },
    filterData: {
      selectCompany: 'all',
      selectRoute: 'all',
    },
    dialogVisible: {
      busDialogFormVisible: false,
      busAddChangeSwitch: false
    },
    busDialogForm: {
      uuid: '',
      belong_company: '',
      belong_route: '',
      bus_no: '',
      bus_status: '',
      bus_etag: '',
      bus_note: '',
      bus_type: '',
    },
  }),
  getters: {},
  actions: {
    postBusCsvData: function (payload:{data: any, postcount: number}) {
      const loginManagerStore = useLoginManagerStore(); 
      axios.post(this.apiUrl.busBaseUrl + this.apiUrl.busPostCsvUrl, {
        data: {
          postdata: payload.data
        }
      })
        .then(response => {
          console.log('post csv bus data')
          this.getRoute({getcount:0, select: 'main'})
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.postBusCsvData({ data: payload.data, postcount: payload.postcount + 1 })
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
    busDialogClear: function () {
      this.busDialogForm.belong_company = ''
      this.busDialogForm.belong_route = ''
      this.busDialogForm.bus_etag = ''
      this.busDialogForm.bus_no = ''
      this.busDialogForm.bus_note = ''
      this.busDialogForm.bus_status = ''
      this.busDialogForm.bus_type = ''
      this.busDialogForm.uuid = ''
    },
    busDialogAdd: function () {
      this.busDialogClear()
      this.dialogVisible.busDialogFormVisible = true
      this.dialogVisible.busAddChangeSwitch = false
      this.disableControl.dialogCompanySelect = false
    },
    busDialogEdit: function (payload: {data: object}) {
      this.busDialogClear()
      console.log(payload.data)
      this.busDialogForm.belong_company = payload.data['belong_company_uuid']
      this.busDialogForm.belong_route = payload.data['belong_route']
      this.busDialogForm.bus_etag = payload.data['bus_etag']
      this.busDialogForm.bus_no = payload.data['bus_no']
      this.busDialogForm.bus_note = payload.data['bus_note']
      this.busDialogForm.bus_status = payload.data['bus_status']
      this.busDialogForm.bus_type = payload.data['bus_type']
      this.busDialogForm.uuid = payload.data['uuid']
      this.getRoute({getcount: 0, select: 'dialog'})
      this.dialogVisible.busDialogFormVisible = true
      this.dialogVisible.busAddChangeSwitch = true
      this.disableControl.dialogCompanySelect = true
    },
    SelectCompanyDialogChange: function (){
      if (this.filterData.selectCompany == 'all'){
        this.disableControl.routeSelectdisable = true
        this.filterData.selectRoute = 'all'
        this.getBus({getcount:0})
      }else{
        this.disableControl.routeSelectdisable = false
        this.filterData.selectRoute = 'all'
        this.getRoute({getcount:0, select: 'main'})
      }
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
              this.getData.getCompanyName = [{ label: '所有公司', value: 'all' }]
              this.getData.getCompanyData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getRoute: function (payload: { getcount: number, select: string }) {
      const loginManagerStore = useLoginManagerStore();
      let companyFilter: string
      if (payload.select=='main'){
        companyFilter = this.filterData.selectCompany
      }else{
        companyFilter = this.busDialogForm.belong_company
      }
      axios.post(this.apiUrl.routebaseurl + this.apiUrl.routegeturl, {
        data: {
          company_filter: companyFilter
        }
      })
        .then(response => {
          console.log('get route data')
          if (payload.select=='main'){
            this.getData.getRouteDataName = [{ label: '所有路線', value: 'all' }]
            for (let v of response.data) {
              this.getData.getRouteDataName.push({ label: v['route_name'], value: v['route_uuid'] })
            }
            this.getBus({getcount:0})
          }else{
            this.getData.getRouteData = response.data
          }
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getRoute({ getcount: payload.getcount + 1 , select: payload.select})
            } else {
              this.getData.getRouteDataName = [{ label: '所有路線', value: 'all' }]
              this.getData.getRouteData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getBus: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.apiUrl.busBaseUrl + this.apiUrl.busGetUrl, {
        data: {
          company_filter: this.filterData.selectCompany,
          route_filter: this.filterData.selectRoute
        }
      })
        .then(response => {
          console.log('get bus data')
          this.getData.getBusData = response.data
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getBus({ getcount: payload.getcount + 1 })
            } else {
              this.getData.getBusData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    postBus: function (payload: { postcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.apiUrl.busBaseUrl + this.apiUrl.busPostUrl, {
        data: {
          belong_route: this.busDialogForm.belong_route,
          bus_etag: this.busDialogForm.bus_etag,
          bus_no: this.busDialogForm.bus_no,
          bus_note: this.busDialogForm.bus_note,
          bus_status: this.busDialogForm.bus_status,
          bus_type: this.busDialogForm.bus_type,
        }
      })
        .then(response => {
          console.log('post bus data')
          this.getBus({ getcount: 0 })
          this.busDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.postBus({ postcount: payload.postcount + 1 })
            } else {
              console.log('沒有權限')
              this.busDialogClear()
            }
          } else {
            console.log(error)
            this.busDialogClear()
          }
        })
    },
    putBus: function (payload: { putcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.apiUrl.busBaseUrl + this.busDialogForm.uuid + '/' + this.apiUrl.busPutUrl, {
        data: {
          id: this.busDialogForm.uuid,
          belong_route: this.busDialogForm.belong_route,
          bus_etag: this.busDialogForm.bus_etag,
          bus_no: this.busDialogForm.bus_no,
          bus_note: this.busDialogForm.bus_note,
          bus_status: this.busDialogForm.bus_status,
          bus_type: this.busDialogForm.bus_type,
        }
      })
        .then(response => {
          console.log('put company data')
          this.getBus({ getcount: 0 })
          this.busDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshToken()
              this.putBus({ putcount: payload.putcount + 1 })
            } else {
              console.log('沒有權限')
              this.busDialogClear()
            }
          } else {
            console.log(error)
            this.busDialogClear()
          }
        })
    },
    deleteBus: function (payload: { deletecount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.apiUrl.busBaseUrl + this.busDialogForm.uuid + '/' + this.apiUrl.busDeleteUrl, {
        data: {
          id: this.busDialogForm.uuid,
        }
      })
        .then(response => {
          console.log('delete bus data')
          this.getBus({ getcount: 0 })
          this.busDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.deletecount < 6) {
              loginManagerStore.refreshToken()
              this.deleteBus({ deletecount: payload.deletecount + 1 })
            } else {
              console.log('沒有權限')
              this.busDialogClear()
            }
          } else {
            console.log(error)
            this.busDialogClear()
          }
        })
    },
  }
})

export default useMBusInfoStore;