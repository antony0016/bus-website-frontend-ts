import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";
import useMCompanyStore from "../MGroup/MCompanyStore";

const usePlatformStore = defineStore('MPlatformStore', {
  state: () => ({
    disableControl: {
      choiceEquipment: true
    },
    apiUrl: {
      basePlatformUrl: 'http://127.0.0.1:8000/api/platform/',
      getPlatformUrl: 'view_platform/',
      getDetailPlatformUrl: 'view_detail_platform/',
      putPlatformUrl: 'update_platform/',
      baseEquipmentUrl: 'http://127.0.0.1:8000/api/equipment/',
      getPlatformEquipmentUrl: 'view_platform_equipment/',
      routebaseurl: 'http://127.0.0.1:8000/api/route/',
      routegeturl: 'view_route/',
    },
    platformGetData: {
      getPlatformData: [],
      getEquipmentData: [],
      getCompanyRouteData: [],
    },
    DetailPlatformData: {
      uuid: '',
      platform_no: '',
      platform_name: '',
      platform_type: '',
      routes: Array[''],
      Camera: '',
    },
    selectData: {
      selectNowPlatform: '',
      selectPlatformCameraAccount: '',
      selectPlatformCameraPassword: '',
      selectPlatformCompany: '',
      selectPlatformRoute: '',
    }
  }),
  getters: {
  },
  actions: {
    selectPlatform: function () {
      console.log(this.selectData.selectNowPlatform)
      this.clearPlatformTable()
      this.getDetailPlatform({getcount:0})
      this.disableControl.choiceEquipment = false
    },
    clearPlatformTable: function () {
      this.DetailPlatformData.uuid = ''
      this.DetailPlatformData.platform_no = ''
      this.DetailPlatformData.platform_name = ''
      this.DetailPlatformData.platform_type = ''
      this.DetailPlatformData.routes = Array['']
      this.DetailPlatformData.Camera = ''
      this.selectData.selectPlatformCameraAccount = ''
      this.selectData.selectPlatformCameraPassword = ''
    },
    getPlatform: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.basePlatformUrl + this.apiUrl.getPlatformUrl)
        .then(response => {
          console.log('get platform data')
          this.platformGetData.getPlatformData = response.data
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getPlatform({ getcount: payload.getcount + 1 })
            } else {
              this.platformGetData.getPlatformData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getDetailPlatform: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.apiUrl.basePlatformUrl + this.apiUrl.getDetailPlatformUrl, {
        data: {
          platform_filter: this.selectData.selectNowPlatform
        }
      })
        .then(response => {
          console.log('get detail platform data')
          this.getPlatformEquipment({postcount:0})
          this.DetailPlatformData.uuid = response.data['uuid']
          this.DetailPlatformData.platform_no = response.data['platform_no']
          this.DetailPlatformData.platform_name = response.data['platform_name']
          this.DetailPlatformData.platform_type = response.data['platform_type']
          this.DetailPlatformData.routes = response.data['routes']
          this.DetailPlatformData.Camera = response.data['equipments']['Camera']
          this.selectData.selectPlatformCameraAccount = response.data['equipments']['Camera_Account']
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getDetailPlatform({ getcount: payload.getcount + 1 })
            } else {
              this.clearPlatformTable()
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getPlatformEquipment: function (payload: { postcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.apiUrl.baseEquipmentUrl + this.apiUrl.getPlatformEquipmentUrl, {
        data: {
          platform_filter: this.selectData.selectNowPlatform
        }
      })
        .then(response => {
          console.log('get equipment data')
          this.platformGetData.getEquipmentData = response.data
          console.log(this.platformGetData.getEquipmentData)
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.getPlatformEquipment({ postcount: payload.postcount + 1 })
            } else {
              this.platformGetData.getEquipmentData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getSelectRoute: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.apiUrl.routebaseurl + this.apiUrl.routegeturl, {
        data: {
          company_filter: this.selectData.selectPlatformCompany
        }
      })
        .then(response => {
          console.log('get route data')
          console.log(response.data)
          this.platformGetData.getCompanyRouteData = response.data
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getSelectRoute({ getcount: payload.getcount + 1 })
            } else {
              this.platformGetData.getCompanyRouteData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    addPlatformRoute: function () {
      let checkRoute = this.DetailPlatformData.routes.filter((sv: { [x: string]: string; }) => sv['id'] == this.selectData.selectPlatformRoute)
      if (checkRoute.length < 1 && this.selectData.selectPlatformRoute != ''){
        let nowRoute = this.platformGetData.getCompanyRouteData.filter(v => v['route_uuid'] == this.selectData.selectPlatformRoute)
        this.DetailPlatformData.routes.push({id: nowRoute[0]['route_uuid'], route_name: nowRoute[0]['route_name']})
      }
    },
    deletePlatformRoute: function (payload: { data: object }) {
      let deleteRoute = this.DetailPlatformData.routes.filter((sv: { [x: string]: string; }) => sv['id'] != payload.data['id'])
      this.DetailPlatformData.routes = deleteRoute
    },
    submitPlatformData: function (payload: { putcount: number }) {
      console.log(this.DetailPlatformData)
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.apiUrl.basePlatformUrl + this.DetailPlatformData.uuid + '/' + this.apiUrl.putPlatformUrl, {
        data: {
          platformUuid: this.DetailPlatformData.uuid,
          platformNo: this.DetailPlatformData.platform_no,
          platformName: this.DetailPlatformData.platform_name,
          routes: this.DetailPlatformData.routes,
          camera: this.DetailPlatformData.Camera,
          camera_account: this.selectData.selectPlatformCameraAccount,
          camera_password: this.selectData.selectPlatformCameraPassword,
        }
      })
        .then(response => {
          console.log('update platform data')
          this.getDetailPlatform({getcount:0})
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshToken()
              this.submitPlatformData({ putcount: payload.putcount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    changeCamera: function () {
      for (let v of this.platformGetData.getEquipmentData['Camera']){
        if (this.DetailPlatformData.Camera == v['uuid']){
          this.selectData.selectPlatformCameraAccount = v.equipment_account
        }
      }
      
    }
  }
})

export default usePlatformStore;
