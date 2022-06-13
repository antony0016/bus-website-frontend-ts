import { defineStore } from "pinia";
import router from "../router";
import axios from "../axios";
import Vue from "vue";
import useViewControllerStore from "../store/ViewControllerStore";
import { useStorage } from '@vueuse/core'

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
          this.checkUserType()
          // go to home page
          router.push('/').then(r => r);
        })
        .catch(error => {
          console.log(error)
        })
    },
    logout: function () {
      this.token.access = ''
      this.token.refresh = ''
      this.user.username = ''
      this.user.password = ''
      console.log('logout', this.loggedIn)
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
        })
    },
    checkUserType: function () {
      axios.get(this.address.get_user_type)
        .then(response => {
          if (response.data == 'Administartor'){
            this.buttonDisable.superAdminDisable = false
            this.buttonDisable.normalAdminDisable = false
            this.buttonDisable.userDisable = false
          }else if (response.data == 'Manager'){
            this.buttonDisable.superAdminDisable = true
            this.buttonDisable.normalAdminDisable = false
            this.buttonDisable.userDisable = false
          }else{
            this.buttonDisable.superAdminDisable = true
            this.buttonDisable.normalAdminDisable = true
            this.buttonDisable.userDisable = false
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
  }
})

export default useLoginManagerStore;