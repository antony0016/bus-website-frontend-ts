import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useMBusInfoStore = defineStore('MBusInfoStore', {
  state: () => ({
    apiUrl: {
      companyBaseUrl: 'http://127.0.0.1:8000/api/company/',
      companyGetUrl: 'view_company/',
      busBaseUrl: 'http://127.0.0.1:8000/api/bus/',
      busGetUrl: 'view_bus/',
      busGetDetailUrl: 'detail_bus/',
      busPostUrl: 'add_bus/',
      busPutUrl: 'update_bus/',
      busDeleteUrl: 'delete_bus/',
    },
    getData: {
      getCompanyData: [],
      getCompanyName: [{ label: '全部', value: 'all' }],
      getBusData: []
    },
    filterData: {
      selectCompany: 'all',
    },
    dialogVisible: {
      busDialogFormVisible: false,
      busAddChangeSwitch: false
    },
    busDialogForm: {
      uuid: '',
      belong_company: '',
      bus_no: '',
      bus_status: '',
      bus_etag: '',
      bus_note: '',
      bus_type: '',
    },
  }),
  getters: {},
  actions: {
    busDialogClear: function () {
      this.busDialogForm.belong_company = ''
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
    },
    busDialogEdit: function (payload: {data: object}) {
      this.busDialogClear()
      console.log(payload.data)
      this.busDialogForm.belong_company = payload.data['belong_company']
      this.busDialogForm.bus_etag = payload.data['bus_etag']
      this.busDialogForm.bus_no = payload.data['bus_no']
      this.busDialogForm.bus_note = payload.data['bus_note']
      this.busDialogForm.bus_status = payload.data['bus_status']
      this.busDialogForm.bus_type = payload.data['bus_type']
      this.busDialogForm.uuid = payload.data['uuid']
      this.dialogVisible.busDialogFormVisible = true
      this.dialogVisible.busAddChangeSwitch = true
    },
    getCompany: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.companyBaseUrl + this.apiUrl.companyGetUrl)
        .then(response => {
          console.log('get company data')
          this.getData.getCompanyName = [{ label: '全部', value: 'all' }]
          for (let v of response.data) {
            this.getData.getCompanyName.push({ label: v['company_name'], value: v['company_name'] })
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
    getBus: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.apiUrl.busBaseUrl + this.apiUrl.busGetUrl, {
        data: {
          company_filter: this.filterData.selectCompany
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
          belong_company: this.busDialogForm.belong_company,
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
          belong_company: this.busDialogForm.belong_company,
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