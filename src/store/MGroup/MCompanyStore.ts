import { kebabCase } from "element-plus/lib/utils";
import xlsx from 'xlsx';
import { defineStore } from "pinia";
import router from "../../router";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";
import useMBusInfoStore from "../../store/MGroup/MBusInfoStore"

const useMCompanyStore = defineStore('MCompanyStore', {
  state: () => ({
    companyRouteActiveTab: 'companys',
    ApiUrl: {
      companybaseurl: 'http://127.0.0.1:8000/api/company/',
      companygeturl: 'view_company/',
      companyposturl: 'add_company/',
      companyPostCsvUrl: 'add_csv_company/',
      companyputurl: 'update_company/',
      companydeleteurl: 'delete_company/',
      routebaseurl: 'http://127.0.0.1:8000/api/route/',
      routegeturl: 'view_route/',
      routeposturl: 'add_route/',
      routePostCsvUrl: 'add_csv_route/',
      routeputurl: 'update_route/',
      routedeleteurl: 'delete_route/',
      baseCompanyAccountUrl: 'http://127.0.0.1:8000/api/companyaccount/',
      companyAccountGetUrl: 'view_company_account/',
      companyAccountPostUrl: 'add_company_account/',
      companyAccountPutUrl: 'update_company_account/',
      companyAccountDeleteUrl: 'delete_company_account/',
    },
    DialogVisible: {
      CompanyDialogFormVisible: false,
      CompanyAddChangeSwitch: false,
      RouteDialogFormVisible: false,
      RouteAddChangeSwitch: false,
      RoutrDisable: false,
      busInfoDialogFormVisible: false,
    },
    getData: {
      getCompanyData: [],
      getCompanyNameData: [{ label: '全部', value: 'all' }],
      RouteCompanySelect: 'all',
      getBusData: [],
      getRouteData: [],
      RouteinDialogSelect: ''
    },
    CompanyDialogForm: {
      company_uuid: '',
      company_no: '',
      company_name: '',
      unified_no: '',
      company_phone: '',
      company_fax: '',
      company_address: '',
      contract_state: '',
      contract_datetime: '',
      company_email: '',
      company_password: '',
      company_checkpassword: ''
    },
    RouteDialogForm: {
      route_uuid: '',
      route_no: '',
      route_name: '',
      route_via_station: '',
    },
    companyAccountDialog: {
      isShow: false,
      incomeSwitch: 'income',
      editIsShow: false,
      editIsAdd: false,
      getIncomeData: [],
      getExpenditureData:[],
      nowComapny: '',
      nowIsIncome: 'income',
      nowIncomeBoolean: true,
      nowAmount: 0,
      nowDescription: '',
      nowAccountUuid: '',
    },
  }),
  getters: {},
  actions: {
    postCompanyCsvData: function (payload:{data: any, postcount: number}) {
      const loginManagerStore = useLoginManagerStore(); 
      axios.post(this.ApiUrl.companybaseurl + this.ApiUrl.companyPostCsvUrl, {
        data: {
          postdata: payload.data
        }
      })
        .then(response => {
          console.log('post csv company data')
          this.getCompany({ getcount: 0 })
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.postCompanyCsvData({ data: payload.data, postcount: payload.postcount + 1 })
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
    CompanyDialogClear: function () {
      this.CompanyDialogForm.company_uuid = ''
      this.CompanyDialogForm.company_no = ''
      this.CompanyDialogForm.company_name = ''
      this.CompanyDialogForm.unified_no = ''
      this.CompanyDialogForm.company_phone = ''
      this.CompanyDialogForm.company_fax = ''
      this.CompanyDialogForm.company_address = ''
      this.CompanyDialogForm.contract_state = ''
      this.CompanyDialogForm.contract_datetime = ''
      this.CompanyDialogForm.company_email = '',
      this.CompanyDialogForm.company_password = '',
      this.CompanyDialogForm.company_checkpassword = ''
    },
    CompanyDialogAddShow: function () {
      this.DialogVisible.CompanyAddChangeSwitch = false
      this.DialogVisible.CompanyDialogFormVisible = true
    },
    CompanyDialogEditShow: function (payload: { data: object }) {
      this.CompanyDialogClear()
      console.log(payload.data)
      this.CompanyDialogForm.company_uuid = payload.data['company_uuid']
      this.CompanyDialogForm.company_no = payload.data['company_no']
      this.CompanyDialogForm.company_name = payload.data['company_name']
      this.CompanyDialogForm.unified_no = payload.data['unified_no']
      this.CompanyDialogForm.company_phone = payload.data['company_phone']
      this.CompanyDialogForm.company_fax = payload.data['company_fax']
      this.CompanyDialogForm.company_address = payload.data['company_address']
      this.CompanyDialogForm.contract_state = payload.data['contract_state']
      this.CompanyDialogForm.contract_datetime = payload.data['contract_datetime']
      this.CompanyDialogForm.company_email = payload.data['company_email']
      this.CompanyDialogForm.company_password = ''
      this.CompanyDialogForm.company_checkpassword = ''
      this.DialogVisible.CompanyAddChangeSwitch = true
      this.DialogVisible.CompanyDialogFormVisible = true
    },
    getCompany: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.ApiUrl.companybaseurl + this.ApiUrl.companygeturl)
        .then(response => {
          console.log('get company data')
          this.getData.getCompanyNameData = [{ label: '全部', value: 'all' }]
          for (let v of response.data) {
            this.getData.getCompanyNameData.push({ label: v['company_name'], value: v['company_uuid'] })
          }
          this.getData.getCompanyData = response.data
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getCompany({ getcount: payload.getcount + 1 })
            } else {
              this.getData.getCompanyNameData = [{ label: '全部', value: 'all' }]
              this.getData.getCompanyData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    postCompany: function (payload: { postcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      if (this.CompanyDialogForm.company_password != this.CompanyDialogForm.company_checkpassword) {
        console.log('密碼與確認密碼不相同')
      } else {
        axios.post(this.ApiUrl.companybaseurl + this.ApiUrl.companyposturl, {
          data: {
            company_no: this.CompanyDialogForm.company_no,
            company_name: this.CompanyDialogForm.company_name,
            unified_no: this.CompanyDialogForm.unified_no,
            company_phone: this.CompanyDialogForm.company_phone,
            company_fax: this.CompanyDialogForm.company_fax,
            company_address: this.CompanyDialogForm.company_address,
            contract_state: this.CompanyDialogForm.contract_state,
            contract_datetime: this.CompanyDialogForm.contract_datetime,
            company_email: this.CompanyDialogForm.company_email,
            company_password: this.CompanyDialogForm.company_password
          }
        })
          .then(response => {
            console.log('post company data')
            this.getCompany({ getcount: 0 })
            this.CompanyDialogClear()
          })
          .catch(error => {
            if (error.response.status == '401' || error.response.status == '403') {
              if (payload.postcount < 6) {
                loginManagerStore.refreshToken()
                this.postCompany({ postcount: payload.postcount + 1 })
              } else {
                console.log('沒有權限')
                this.CompanyDialogClear()
              }
            } else {
              console.log(error)
              this.CompanyDialogClear()
            }
          })
      }
    },
    putCompany: function (payload: { putcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      if (this.CompanyDialogForm.company_password != this.CompanyDialogForm.company_checkpassword) {
        console.log('密碼與確認密碼不相同')
      } else {
        axios.put(this.ApiUrl.companybaseurl + this.CompanyDialogForm.company_uuid + '/' + this.ApiUrl.companyputurl, {
          data: {
            id: this.CompanyDialogForm.company_uuid,
            company_no: this.CompanyDialogForm.company_no,
            company_name: this.CompanyDialogForm.company_name,
            unified_no: this.CompanyDialogForm.unified_no,
            company_phone: this.CompanyDialogForm.company_phone,
            company_fax: this.CompanyDialogForm.company_fax,
            company_address: this.CompanyDialogForm.company_address,
            contract_state: this.CompanyDialogForm.contract_state,
            contract_datetime: this.CompanyDialogForm.contract_datetime,
            company_email: this.CompanyDialogForm.company_email,
            company_password: this.CompanyDialogForm.company_password
          }
        })
          .then(response => {
            console.log('put company data')
            this.getCompany({ getcount: 0 })
            this.CompanyDialogClear()
          })
          .catch(error => {
            if (error.response.status == '401' || error.response.status == '403') {
              if (payload.putcount < 6) {
                loginManagerStore.refreshToken()
                this.putCompany({ putcount: payload.putcount + 1 })
              } else {
                console.log('沒有權限')
                this.CompanyDialogClear()
              }
            } else {
              console.log(error)
              this.CompanyDialogClear()
            }
          })
      }
    },
    deleteCompany: function (payload: { deletecount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.ApiUrl.companybaseurl + this.CompanyDialogForm.company_uuid + '/' + this.ApiUrl.companydeleteurl, {
        data: {
          id: this.CompanyDialogForm.company_uuid,
        }
      })
        .then(response => {
          console.log('delete company data')
          this.getCompany({ getcount: 0 })
          this.CompanyDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.deletecount < 6) {
              loginManagerStore.refreshToken()
              this.deleteCompany({ deletecount: payload.deletecount + 1 })
            } else {
              console.log('沒有權限')
              this.CompanyDialogClear()
            }
          } else {
            console.log(error)
            this.CompanyDialogClear()
          }
        })
    },
    CompanyGoToRoute: function (payload: { data: object }) {
      this.getData.RouteCompanySelect = payload.data['company_uuid']
      this.getRoute({ getcount: 0})
      this.companyRouteActiveTab = 'routes'
    },
    postRouteCsvData: function (payload:{data: any, postcount: number}) {
      const loginManagerStore = useLoginManagerStore(); 
      axios.post(this.ApiUrl.routebaseurl + this.ApiUrl.routePostCsvUrl, {
        data: {
          postdata: payload.data
        }
      })
        .then(response => {
          console.log('post csv route data')
          this.getRoute({ getcount: 0 })
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.postRouteCsvData({ data: payload.data, postcount: payload.postcount + 1 })
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
    RouteDialogClear: function () {
      this.RouteDialogForm.route_uuid = ''
      this.RouteDialogForm.route_name = ''
      this.RouteDialogForm.route_no = ''
      this.RouteDialogForm.route_via_station = ''
    },
    RouteDialogAddShow: function () {
      this.RouteDialogClear()
      this.getData.RouteinDialogSelect = ''
      this.DialogVisible.RoutrDisable = false
      this.DialogVisible.RouteAddChangeSwitch = false
      this.DialogVisible.RouteDialogFormVisible = true
    },
    RouteDialogEditShow: function (payload: { data: object }) {
      this.RouteDialogClear()
      console.log(payload.data)
      this.RouteDialogForm.route_uuid = payload.data['route_uuid']
      this.RouteDialogForm.route_no = payload.data['route_no']
      this.RouteDialogForm.route_name = payload.data['route_name']
      this.RouteDialogForm.route_via_station = payload.data['route_via_station']
      this.getData.RouteinDialogSelect = payload.data['belong_company']
      this.DialogVisible.RoutrDisable = true
      this.DialogVisible.RouteAddChangeSwitch = true
      this.DialogVisible.RouteDialogFormVisible = true
    },
    getRoute: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.ApiUrl.routebaseurl + this.ApiUrl.routegeturl, {
        data: {
          company_filter: this.getData.RouteCompanySelect
        }
      })
        .then(response => {
          console.log('get route data')
          this.getData.getRouteData = response.data
          console.log(response.data)
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getRoute({ getcount: payload.getcount + 1 })
            } else {
              this.getData.getRouteData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    postRoute: function (payload: { postcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.ApiUrl.routebaseurl + this.ApiUrl.routeposturl, {
        data: {
          belong_company: this.getData.RouteinDialogSelect,
          route_no: this.RouteDialogForm.route_no,
          route_name: this.RouteDialogForm.route_name,
          route_via_station: this.RouteDialogForm.route_via_station
        }
      })
        .then(response => {
          console.log('post route data')
          this.getRoute({ getcount: 0 })
          this.RouteDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.postRoute({ postcount: payload.postcount + 1 })
            } else {
              console.log('沒有權限')
              this.RouteDialogClear()
            }
          } else {
            console.log(error)
            this.RouteDialogClear()
          }
        })
    },
    putRoute: function (payload: { putcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.ApiUrl.routebaseurl + this.RouteDialogForm.route_uuid + '/' + this.ApiUrl.routeputurl, {
        data: {
          id: this.RouteDialogForm.route_uuid,
          belong_company: this.getData.RouteinDialogSelect,
          route_no: this.RouteDialogForm.route_no,
          route_name: this.RouteDialogForm.route_name,
          route_via_station: this.RouteDialogForm.route_via_station
        }
      })
        .then(response => {
          console.log('put route data')
          this.getRoute({ getcount: 0 })
          this.RouteDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshToken()
              this.putRoute({ putcount: payload.putcount + 1 })
            } else {
              console.log('沒有權限')
              this.RouteDialogClear()
            }
          } else {
            console.log(error)
            this.RouteDialogClear()
          }
        })
    },
    deleteRoute: function (payload: { deletecount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.ApiUrl.routebaseurl + this.RouteDialogForm.route_uuid + '/' + this.ApiUrl.routedeleteurl, {
        data: {
          id: this.RouteDialogForm.route_uuid,
        }
      })
        .then(response => {
          console.log('delete route data')
          this.getRoute({ getcount: 0 })
          this.RouteDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.deletecount < 6) {
              loginManagerStore.refreshToken()
              this.deleteRoute({ deletecount: payload.deletecount + 1 })
            } else {
              console.log('沒有權限')
              this.RouteDialogClear()
            }
          } else {
            console.log(error)
            this.RouteDialogClear()
          }
        })
    },
    goToBusInfo: function (payload: { data: object }) {
      const MBusInfoStore = useMBusInfoStore();
      MBusInfoStore.filterData.selectCompany = payload.data['belong_company_id']
      MBusInfoStore.SelectCompanyDialogChange()
      MBusInfoStore.filterData.selectRoute = payload.data['route_uuid']
      MBusInfoStore.getBus({getcount:0})
      this.companyRouteActiveTab = 'bus'
    },
    companyAccountDialogClear: function () {
      this.companyAccountDialog.getIncomeData = []
      this.companyAccountDialog.getExpenditureData = []
      this.companyAccountDialog.nowAmount = 0
      this.companyAccountDialog.nowDescription = ''
      this.companyAccountDialog.nowComapny = ''
      this.companyAccountDialog.incomeSwitch = 'income'
    },
    companyAccountDialogOpen: function (payload: { id: string }) {
      this.companyAccountDialogClear()
      this.postCompanyAccount({postcount:0, id: payload.id})
      this.companyAccountDialog.isShow = true
    },
    companyAccountEditDialogClear: function () {
      this.companyAccountDialog.nowAmount = 0
      this.companyAccountDialog.nowDescription = ''
      this.companyAccountDialog.nowAccountUuid = ''
    },
    companyAccountAddDialogOpen: function (payload: { isIncome: string }) {
      this.companyAccountEditDialogClear()
      if (payload.isIncome == 'income'){
        this.companyAccountDialog.nowIsIncome = '收入'
      }else{
        this.companyAccountDialog.nowIsIncome = '支出'
      }
      this.companyAccountDialog.editIsAdd = false
      this.companyAccountDialog.editIsShow = true
    },
    companyAccountAddDialogSubmit: function () {
      if (this.companyAccountDialog.nowIsIncome == '收入'){
        this.companyAccountDialog.nowIncomeBoolean = true
      }else{
        this.companyAccountDialog.nowIncomeBoolean = false
      }
      this.postCompanyAccountData({postcount:0})
    },
    companyAccountEditDialogOpen: function (payload: { data: object, isIncome: String }) {
      this.companyAccountEditDialogClear()
      if (payload.isIncome == 'income'){
        this.companyAccountDialog.nowIsIncome = '收入'
      }else{
        this.companyAccountDialog.nowIsIncome = '支出'
      }
      this.companyAccountDialog.nowAmount = payload.data['amount']
      this.companyAccountDialog.nowDescription = payload.data['description']
      this.companyAccountDialog.nowAccountUuid = payload.data['uuid']
      this.companyAccountDialog.editIsAdd = true
      this.companyAccountDialog.editIsShow = true
    },
    companyAccountEditDialogSubmit: function () {
      if (this.companyAccountDialog.nowIsIncome == '收入'){
        this.companyAccountDialog.nowIncomeBoolean = true
      }else{
        this.companyAccountDialog.nowIncomeBoolean = false
      }
      this.putCompanyAccountData({putcount:0})
    },
    postCompanyAccount: function (payload: { postcount: number, id: string }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.ApiUrl.baseCompanyAccountUrl + this.ApiUrl.companyAccountGetUrl, {
        data: {
          company_filter: payload.id,
        }
      })
        .then(response => {
          this.companyAccountDialog.getIncomeData = response.data['income']
          this.companyAccountDialog.getExpenditureData = response.data['expenditure']
          this.companyAccountDialog.nowComapny = payload.id
          console.log('get company account data')
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.postCompanyAccount({ postcount: payload.postcount + 1, id: payload.id })
            } else {
              console.log('沒有權限')
              this.companyAccountDialogClear()
            }
          } else {
            console.log(error)
            this.companyAccountDialogClear()
          }
        })
    },
    postCompanyAccountData: function (payload: { postcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.ApiUrl.baseCompanyAccountUrl + this.ApiUrl.companyAccountPostUrl, {
        data: {
          is_income: this.companyAccountDialog.nowIncomeBoolean,
          amount: this.companyAccountDialog.nowAmount,
          description: this.companyAccountDialog.nowDescription,
          belong_company: this.companyAccountDialog.nowComapny
        }
      })
        .then(response => {
          this.postCompanyAccount({postcount:0, id: this.companyAccountDialog.nowComapny})
          this.companyAccountEditDialogClear()
          console.log('post company account data')
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.postCompanyAccountData({ postcount: payload.postcount + 1 })
            } else {
              console.log('沒有權限')
              this.companyAccountEditDialogClear()
            }
          } else {
            console.log(error)
            this.companyAccountEditDialogClear()
          }
        })
    },
    putCompanyAccountData: function (payload: { putcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.ApiUrl.baseCompanyAccountUrl + this.companyAccountDialog.nowAccountUuid + '/' + this.ApiUrl.companyAccountPutUrl, {
        data: {
          account_uuid: this.companyAccountDialog.nowAccountUuid,
          is_income: this.companyAccountDialog.nowIncomeBoolean,
          amount: this.companyAccountDialog.nowAmount,
          description: this.companyAccountDialog.nowDescription,
          belong_company: this.companyAccountDialog.nowComapny
        }
      })
        .then(response => {
          console.log('put company account data')
          this.postCompanyAccount({postcount:0, id: this.companyAccountDialog.nowComapny})
          this.companyAccountEditDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshToken()
              this.putCompanyAccountData({ putcount: payload.putcount + 1 })
            } else {
              console.log('沒有權限')
              this.companyAccountEditDialogClear()
            }
          } else {
            console.log(error)
            this.companyAccountEditDialogClear()
          }
        })
    },
    deleteCompanyAccountData: function (payload: { deletecount: number, id: String }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.ApiUrl.baseCompanyAccountUrl + payload.id + '/' + this.ApiUrl.companyAccountDeleteUrl, {
        data: {
          account_uuid: payload.id,
        }
      })
        .then(response => {
          console.log('delete company account data')
          this.postCompanyAccount({postcount:0, id: this.companyAccountDialog.nowComapny})
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.deletecount < 6) {
              loginManagerStore.refreshToken()
              this.deleteCompanyAccountData({ deletecount: payload.deletecount + 1, id: payload.id })
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

export default useMCompanyStore;
