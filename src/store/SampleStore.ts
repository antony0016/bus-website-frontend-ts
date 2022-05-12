import { defineStore } from "pinia";
// import router from "../router";

const useSampleStore = defineStore('SampleStore', {
  state: () => ({
    sampleList: [],
  }),
  getters: {},
  actions: {}
})

export default useSampleStore;
