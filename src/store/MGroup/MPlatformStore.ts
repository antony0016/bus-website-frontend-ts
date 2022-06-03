import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

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
      getEquipmentUrl: 'view_equipment/',
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
      routes: [],
      Etag: '',
      Laser: '',
      Camera: '',
      Guide_Plate: '',
      People_Count: '',
    },
    selectData: {
      selectNowPlatform: '',
      selectPlatformEtagAntenna: '',
      selectPlatformPeopleCountAccount: '',
      selectPlatformPeopleCountPassword: '',
      selectPlatformDirection: '',
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
      this.getDetailPlatform({getcount:0})
      this.disableControl.choiceEquipment = false
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
          this.DetailPlatformData.uuid = response.data['uuid']
          this.DetailPlatformData.platform_no = response.data['platform_no']
          this.DetailPlatformData.platform_name = response.data['platform_name']
          this.DetailPlatformData.platform_type = response.data['platform_type']
          this.DetailPlatformData.routes = response.data['routes']
          this.DetailPlatformData.Etag = response.data['equipments']['Etag']
          this.DetailPlatformData.Laser = response.data['equipments']['Laser']
          this.DetailPlatformData.Camera = response.data['equipments']['Camera']
          this.DetailPlatformData.Guide_Plate = response.data['equipments']['Guide_Plate']
          this.DetailPlatformData.People_Count = response.data['equipments']['People_Count']
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getPlatform({ getcount: payload.getcount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getEquipment: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.baseEquipmentUrl + this.apiUrl.getEquipmentUrl)
        .then(response => {
          console.log('get equipment data')
          this.platformGetData.getEquipmentData = response.data
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getEquipment({ getcount: payload.getcount + 1 })
            } else {
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
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
  }
})

export default usePlatformStore;
