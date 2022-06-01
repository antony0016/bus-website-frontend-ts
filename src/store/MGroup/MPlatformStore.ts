import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const usePlatformStore = defineStore('MPlatformStore', {
  state: () => ({
    apiUrl: {
      basePlatformUrl: 'http://127.0.0.1:8000/api/platform/',
      getPlatformUrl: 'view_platform',
      putPlatformUrl: 'update_platform',
      baseEquipmentUrl: 'http://127.0.0.1:8000/api/equipment/',
      getEquipmentUrl: 'view_equipment',
      routebaseurl: 'http://127.0.0.1:8000/api/route/',
      routegeturl: 'view_route/',
    },
    platformGetData: {
      getPlatformData: [],
      getEquipmentData: [],
      getCompanyRouteData: [],
    },
    selectData: {
      selectNowPlatform: '',
      selectPlatformEtag: '',
      selectPlatformEtagAntenna: '',
      selectPlatformPeopleCount: '',
      selectPlatformPeopleCountAccount: '',
      selectPlatformPeopleCountPassword: '',
      selectPlatformLaser: '',
      selectPlatformDirection: '',
      selectPlatformCamera: '',
      selectPlatformCameraAccount: '',
      selectPlatformCameraPassword: '',
      selectPlatformGuidePlate: '',
      selectPlatformCompany: '',
      selectPlatformRoute: '',
    }
  }),
  getters: {
  },
  actions: {
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
