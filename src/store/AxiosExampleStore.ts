import { defineStore } from "pinia";
import axios from "../axios";
// import router from "../router";

const useAxiosExampleStore = defineStore('AxiosExampleStore', {
  state: () => ({
    data: [],
  }),
  getters: {},
  actions: {
    getData: function (payload: { choice: number }) {
      let url = '';
      switch (payload.choice) {
        case 1:
          url = 'FIDS/Airport/Departure'
        case 2:
          url = 'Airline'
          break;
        case 3:
          url = 'FIDS/Airport/Arrival'
          break;
        default:
          url = 'FIDS/Airport/Departure'
      }
      // url = 'https://ptx.transportdata.tw/MOTC/v2/Air/FIDS/Airport/Departure'
      axios.get(url, {
        params: {
          format: 'JSON',
          top: 1,
        }
      })
        .then(response => {
          this.data = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
  }
})

export default useAxiosExampleStore;
