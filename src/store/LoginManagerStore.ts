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
    },
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
          axios.defaults.headers.common["Authorization"] = "Bearer " + this.token.access
          // send logging message
          console.log('login!', this.loggedIn);
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
    }
  }
})

export default useLoginManagerStore;