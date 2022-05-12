import { defineStore } from "pinia";
import router from "../router";

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
  }),
  getters: {
    loggedIn: function (state) {
      // return state.token.access.length > 0;
      return true;
    }
  },
  actions: {
    login: function () {
      this.token.access = '1';
      this.token.refresh = '1';
      console.log('login!', this.loggedIn);
      router.push('/').then(r => r);
    }
  }
})

export default useLoginManagerStore;
