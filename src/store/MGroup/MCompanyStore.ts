import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useMCompanyStore = defineStore('MCompanyStore', {
  state: () => ({
    companyRouteActiveTab: 'companys',
    ApiUrl: {
      companybaseurl: 'http://127.0.0.1:8000/api/company/',
      companygeturl: 'view_company/',
      companyposturl: 'add_company/',
      companyputurl: 'update_company/',
      companydeleteurl: 'delete_company/',
      routebaseurl: 'http://127.0.0.1:8000/api/route/',
      routegeturl: 'view_route/',
      routeposturl: 'add_route/',
      routeputurl: 'update_route/',
      routedeleteurl: 'delete_route/',
    },
    DialogVisible: {
      CompanyDialogFormVisible: false,
      CompanyAddChangeSwitch: false,
      RouteDialogFormVisible: false,
      RouteAddChangeSwitch: false,
      RoutrDisable: false,
    },
    getData: {
      getCompanyData: [],
      getCompanyNameData: [{ label: '全部', value: '全部' }],
      RouteCompanySelect: '全部',
      getRouteData: [],
      RouteinDialogSelect: '',
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
      belong_company: '',
      route_no: '',
      route_name: '',
      route_via_station: '',
    }
  }),
  getters: {},
  actions: {
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
          this.getData.getCompanyNameData = [{ label: '全部', value: '全部' }]
          for (let v of response.data) {
            this.getData.getCompanyNameData.push({ label: v['company_name'], value: v['company_uuid'] })
          }
          this.getData.getCompanyData = response.data
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshtoken()
              this.getCompany({ getcount: payload.getcount + 1 })
            } else {
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
                loginManagerStore.refreshtoken()
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
                loginManagerStore.refreshtoken()
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
              loginManagerStore.refreshtoken()
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
      this.getRoute({ getcount: 0 })
      this.companyRouteActiveTab = 'routes'
    },
    RouteDialogClear: function () {
      this.RouteDialogForm.route_uuid = ''
      this.RouteDialogForm.belong_company = ''
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
      this.RouteDialogForm.route_uuid = payload.data['route_uuid']
      this.RouteDialogForm.belong_company = payload.data['belong_company']
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
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshtoken()
              this.getRoute({ getcount: payload.getcount + 1 })
            } else {
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
          console.log('post company data')
          this.getRoute({ getcount: 0 })
          this.RouteDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshtoken()
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
          belong_company: this.RouteDialogForm.belong_company,
          route_no: this.RouteDialogForm.route_no,
          route_name: this.RouteDialogForm.route_name,
          route_via_station: this.RouteDialogForm.route_via_station
        }
      })
        .then(response => {
          console.log('put company data')
          this.getRoute({ getcount: 0 })
          this.RouteDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshtoken()
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
          console.log('delete company data')
          this.getRoute({ getcount: 0 })
          this.RouteDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.deletecount < 6) {
              loginManagerStore.refreshtoken()
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
  }
})

export default useMCompanyStore;
