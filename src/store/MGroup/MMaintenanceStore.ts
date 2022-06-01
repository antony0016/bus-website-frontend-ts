import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import router from "../../router";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useMMaintenanceStore = defineStore('MMaintenanceStore', {
  state: () => ({
    apiUrl: {
      companyBaseUrl: 'http://127.0.0.1:8000/api/company/',
      companyGetUrl: 'view_company/',
      routebaseurl: 'http://127.0.0.1:8000/api/route/',
      routegeturl: 'view_route/',
    },
    getData: {
      getCompanyData: [],
      getCompanyName: [{ label: '所有公司', value: 'all' }],
      getRouteData: [{}],
    },
    filterData: {
      selectCompany: 'all'
    },
  }),
  getters: {},
  actions: {
    getCompany: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.companyBaseUrl + this.apiUrl.companyGetUrl)
        .then(response => {
          console.log('get company data')
          this.getData.getCompanyName = [{ label: '所有公司', value: 'all' }]
          for (let v of response.data) {
            this.getData.getCompanyName.push({ label: v['company_name'], value: v['company_uuid'] })
          }
          this.getData.getCompanyData = response.data
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getCompany({ getcount: payload.getcount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getRoute: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.apiUrl.routebaseurl + this.apiUrl.routegeturl, {
        data: {
          company_filter: this.filterData.selectCompany
        }
      })
        .then(response => {
          console.log('get route data')
          this.getData.getRouteData = []
          for (let val of response.data){
            this.getData.getRouteData.push(
              {
                belong_company: val['belong_company'],
                belong_company_id: val['belong_company_id'],
                belong_platform: val['belong_platform'],
                route_name: val['route_name'],
                route_no: val['route_no'],
                route_uuid: val['route_uuid'],
                route_via_station: val['route_via_station'],
                startTime: '無',
                endTime: '無'
              }
            )
          }
          console.log(response.data)
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getRoute({ getcount: payload.getcount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
  },
})

export default useMMaintenanceStore;