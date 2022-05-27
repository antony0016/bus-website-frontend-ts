import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import { setTimeout } from "timers/promises";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useMCompanyStore = defineStore('MCompanyStore', {
  state: () => ({
    CompanyRouteSwitch: {
      Switch_C: true,
      Switch_R: false,
    },
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
    },
    getData:{
      getCompanyData: []
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
  }),
  getters: {

  },
  actions: {
    CompanyRouteSwitchC: function () {
      this.CompanyRouteSwitch.Switch_C = true
      this.CompanyRouteSwitch.Switch_R = false
      this.getCompany({getcount: 0})
    },
    CompanyRouteSwitchR: function () {
      this.CompanyRouteSwitch.Switch_C = false
      this.CompanyRouteSwitch.Switch_R = true
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
    CompanyDialogEditShow: function (payload: {data: object}) {
      this.CompanyDialogClear()
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
    getCompany: function (payload: {getcount: number}) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.ApiUrl.companybaseurl + this.ApiUrl.companygeturl)
      .then(response => {
        console.log('get group data')
        this.getData.getCompanyData = response.data
      })
      .catch(error => {
        if (error.response.status == '401' || error.response.status == '403'){
          if (payload.getcount < 6){
            loginManagerStore.refreshtoken()
            this.getCompany({getcount: payload.getcount+1})
          }else{
            console.log('沒有權限')
          }
        }else{
          console.log(error)
        }
      })
    },
    postCompany: function (payload: {postcount: number}) {
      const loginManagerStore = useLoginManagerStore();
      if (this.CompanyDialogForm.company_password != this.CompanyDialogForm.company_checkpassword){
        console.log('密碼與確認密碼不相同')
      }else{
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
          console.log('post group data')
          this.getCompany({getcount: 0})
          this.CompanyDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403'){
            if (payload.postcount < 6){
              loginManagerStore.refreshtoken()
              this.postCompany({postcount: payload.postcount+1})
            }else{
              console.log('沒有權限')
              this.CompanyDialogClear()
            }
          }else{
            console.log(error)
            this.CompanyDialogClear()
          }
        })
      }
    },
    putCompany: function (payload: {putcount: number}) {
      const loginManagerStore = useLoginManagerStore();
      if (this.CompanyDialogForm.company_password != this.CompanyDialogForm.company_checkpassword){
        console.log('密碼與確認密碼不相同')
      }else{
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
          console.log('put group data')
          this.getCompany({getcount: 0})
          this.CompanyDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403'){
            if (payload.putcount < 6){
              loginManagerStore.refreshtoken()
              this.putCompany({putcount: payload.putcount+1})
            }else{
              console.log('沒有權限')
              this.CompanyDialogClear()
            }
          }else{
            console.log(error)
            this.CompanyDialogClear()
          }
        })
      }
    },
    deleteUser: function (payload: {deletecount: number}) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.ApiUrl.companybaseurl + this.CompanyDialogForm.company_uuid + '/' + this.ApiUrl.companydeleteurl, {
        data: {
          id: this.CompanyDialogForm.company_uuid,
        }
      })
      .then(response => {
        console.log('delete group data')
        this.getCompany({getcount: 0})
        this.CompanyDialogClear()
      })
      .catch(error => {
        if (error.response.status == '401' || error.response.status == '403'){
          if (payload.deletecount < 6){
            loginManagerStore.refreshtoken()
            this.deleteUser({deletecount: payload.deletecount+1})
          }else{
            console.log('沒有權限')
            this.CompanyDialogClear()
          }
        }else{
          console.log(error)
          this.CompanyDialogClear()
        }
      })
    },
  }
})

export default useMCompanyStore;