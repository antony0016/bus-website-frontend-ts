import { defineStore } from "pinia";
import router from "../router";
import axios from "../axios";
import useViewControllerStore from "../store/ViewControllerStore";
import { useStorage } from '@vueuse/core'

import useMCompanyStore from "./MGroup/MCompanyStore";
import useMBusInfoStore from "./MGroup/MBusInfoStore";
import useMMaintenanceStore from "./MGroup/MMaintenanceStore";
import usePlatformStore from "./MGroup/MPlatformStore";

const useLoginManagerStore = defineStore('LoginManagerStore', {
  state: () => ({
    user: {
      username: '',
      password: '',
    },
    token: {
      access: useStorage('access', ''),
      refresh: useStorage('refresh', ''),
    },
    address: {
      get_token: 'http://localhost:8000/token/',
      refresh_token: 'http://localhost:8000/token/refresh/',
      get_user_type: 'http://127.0.0.1:8000/api/roletest/view_user_type/'
    },
    buttonDisable: {
      superAdminDisable: true,
      normalAdminDisable: true,
      userDisable: true
    }
  }),
  getters: {
    loggedIn: function (state) {
      // use useViewControllerStore's data
      const viewControllerStore = useViewControllerStore();
      viewControllerStore.menuSwitch.isShow = true
      for (let val of viewControllerStore.topBarItems) {
        val['isShow'] = this.token.access != ''
      }
      return state.token.access.length > 0;
      // return true;
    }
  },
  actions: {
    login: function () {
      axios.post(this.address.get_token, this.user)
        .then(response => {
          // set access and refresh token
          this.token.access = response.data['access']
          this.token.refresh = response.data['refresh']
          sessionStorage.setItem('access', response.data.access)
          sessionStorage.setItem('refresh', response.data.refresh)
          axios.defaults.headers.common["Authorization"] = "Bearer " + this.token.access
          // send logging message
          console.log('login!', this.loggedIn);
          this.checkUserType({count:0})
          // go to home page
          router.push('/').then(r => r);
        })
        .catch(error => {
          console.log(error)
          this.token.access = ''
          this.token.refresh = ''
          router.push('/login')
        })
    },
    logout: function () {
      this.token.access = ''
      this.token.refresh = ''
      this.user.username = ''
      this.user.password = ''
      console.log('logout', this.loggedIn)
      const MCompanyStore = useMCompanyStore()
      MCompanyStore.getData.RouteCompanySelect = 'all'
      const MBusInfoStore = useMBusInfoStore()
      MBusInfoStore.filterData.selectCompany = 'all'
      MBusInfoStore.filterData.selectRoute = 'all'
      const MMaintenanceStore = useMMaintenanceStore()
      MMaintenanceStore.filterData.selectCompany = 'all'
      const PlatformStore = usePlatformStore()
      PlatformStore.selectData.selectNowPlatform = ''
      // go to login page
      router.push('/login')
    },
    refreshToken: function () {
      axios.post(this.address.refresh_token, { refresh: this.token.refresh })
        .then(response => {
          //console.log(response.data.access)
          this.token.access = response.data.access
          axios.defaults.headers.common["Authorization"] = "Bearer " + this.token.access
          sessionStorage.setItem('access', response.data.access)
          //console.log(this.token.access)
        })
        .catch(error => {
          console.log(error)
          this.token.access = ''
          this.token.refresh = ''
          router.push('/login')
        })
    },
    checkUserType: function (payload: { count: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.address.get_user_type)
        .then(response => {
          if (response.data['UserType'] == 'Administartor') {
            this.buttonDisable.superAdminDisable = false
            this.buttonDisable.normalAdminDisable = false
            this.buttonDisable.userDisable = false
          } else if (response.data['UserType'] == 'Manager') {
            this.buttonDisable.superAdminDisable = true
            this.buttonDisable.normalAdminDisable = false
            this.buttonDisable.userDisable = false
          } else {
            this.buttonDisable.superAdminDisable = true
            this.buttonDisable.normalAdminDisable = true
            this.buttonDisable.userDisable = false
          }

          const viewControllerStore = useViewControllerStore();
          for (let v of viewControllerStore.sideMenuItems) {
            for (let sv of v.subMenu) {
              let a = Object.fromEntries(Object.entries(response.data['Permissions']).filter(([k]) => k == sv.id))
              sv.isShow = a[sv.id]
            }
          }
          console.log(viewControllerStore.sideMenuItems)
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.count < 6) {
              loginManagerStore.refreshToken()
              this.checkUserType({ count: payload.count + 1 })
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

export default useLoginManagerStore;
