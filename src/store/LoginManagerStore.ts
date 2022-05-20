import { defineStore } from "pinia";
import router from "../router";
import axios from "../axios";
import useViewControllerStore from "../store/ViewControllerStore";

const useLoginManagerStore = defineStore('LoginManagerStore', {
  state: () => ({
    user: {
      username: '',
      password: '',
    },
    token: {
      access: '',
      refresh: '',
    },
    address:{
      get_token: 'http://localhost:8000/token/',
      refresh_token: 'http://localhost:8000/token/refresh/',
    },
  }),
  getters: {
    loggedIn: function (state) {
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
          // use useViewControllerStore's data
          const viewControllerStore = useViewControllerStore();
          // set navbar item show
          viewControllerStore.menuSwitch.isShow = true
          for (var val of viewControllerStore.topBarItems){
            val['isShow'] = true 
          }
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
      // use useViewControllerStore's data
      const viewControllerStore = useViewControllerStore();
      // set navbar item disable show
      viewControllerStore.menuSwitch.isShow = false
      for (var val of viewControllerStore.topBarItems){
        val['isShow'] = false 
      }
      console.log('logout', this.loggedIn)
      // go to login page
      router.push('/login')
    }
  }
})

export default useLoginManagerStore;
