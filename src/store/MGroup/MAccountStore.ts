import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useMAccountStore = defineStore('MAccountStore', {
  state: () => ({
    getcount: 0,
    nowGroupSelect: '',
    ApiUrl: {
      baseurl: 'http://127.0.0.1:8000/api/roletest/',
      geturl: 'view_role/',
    },
    getData: {
      getGroupData: {},
      selectGroup: {},
      getUserData: {},
    },
    DialogForm: {
      grouptype: '',
      groupcode: '',
      groupname: '',
    },
    GroupTypeSelections: [
      {labelname: 'Administartor', value: 'Administartor'},
      {labelname: 'Manager', value: 'Manager'},
      {labelname: 'User', value: 'User'},
    ],
    PermissionSelections: {
      MGroup: {
        GroupName: "營運管理：",
        GroupMember:{
          MRC: {name: "客運與路線/客運業者資料及路線建立", allow:false},
          MPM: {name: "月台管理/月台資料建立及申請允許維護", allow:false},
          MPA: {name: "月台申請/備用月台停靠時間及一般月台使用次數設定", allow:false},
          MPT: {name: "停靠時間設定/備用月台停靠時間及一般月台使用次數設定", allow:false},
          MSM: {name: "班次維護/班次管理設定", allow:false},
          MBM: {name: "車籍管理/各客運業者所屬車輛車籍資料建立", allow:false},
          MRU: {name: "帳號群組/帳號權限規劃及管理", allow:false},
          MRM: {name: "營運報表/各式報表", allow:false},
          MHR: {name: "修訂紀錄/各帳號使用系統紀錄", allow:false},
          MPG: {name: "月台群組設定/月台群組設定", allow:false},
        }
      },
      CGroup: {
        GroupName: "行控管理：",
        GroupMember:{
          CIC: {name: "即時團控/現場即時狀態顯示", allow:false},
          CBA: {name: "車輛異常管理/車輛異常管理", allow:false},
          CBS: {name: "車輛進站查詢/車輛進出站資料查詢", allow:false},
          CBP: {name: "車輛停靠查詢/車輛進出月台資料查詢", allow:false},
          CEM: {name: "設備運作監視/設備狀態即時顯示", allow:false},
          CEA: {name: "設備異常管理/設備維護管理", allow:false},
          CHR: {name: "紀錄查詢/車輛行控資訊查詢", allow:false},
          CNVR: {name: "開啟 NVR/NVR 另頁開啟", allow:false},
          CED: {name: "設備詳細資訊(Debug)/設備詳細資訊查詢", allow:false},
        }
      },
      BGroup: {
        GroupName: "廣播管理：",
        GroupMember:{
          BAC: {name: "音訊片段/音訊片段建立及查詢", allow:false},
          BVP: {name: "語音程序/語音程序建立及查詢", allow:false},
          BBS: {name: "廣播排程/固定或週期排程", allow:false},
          BAI: {name: "車務自動插播/車輛到月台啟動廣播", allow:false},     
        }
      }
    }
  }),
  getters: {},
  actions: {
    dialogClear: function () {
      //console.log(this.DialogForm)
      this.DialogForm.grouptype = ''
      this.DialogForm.groupcode = ''
      this.DialogForm.groupname = ''
      for (let [key, value] of Object.entries(this.PermissionSelections)) {
        for (let [subkey, subvalue] of Object.entries(value['GroupMember'])){
          subvalue['allow'] = false
        }
      }
    },
    getGroupName: function () {
      const loginManagerStore = useLoginManagerStore();
      loginManagerStore.refreshtoken()
      axios.get(this.ApiUrl.baseurl + this.ApiUrl.geturl, {
        headers:{Authorization: 'Bearer ' + loginManagerStore.token.access}
      })
      .then(response => {
        this.getData.getGroupData = response.data
      })
      .catch(error => {
        if (error.response.status == '401' || error.response.status == '403'){
          if (this.getcount < 10){
            this.getcount += 1
            loginManagerStore.refreshtoken()
            this.getGroupName()
          }else{
            this.getcount = 0
            console.log('沒有權限')
          }
        }else{
          console.log(error)
        }
      })
    },
    selectGroupFunction: function (payload: {nowselect: string, nowselectindex: string}) {
      this.getData.selectGroup = Object.fromEntries(Object.entries(this.getData.getGroupData).filter(([k,v]) => k==payload.nowselect))
      this.nowGroupSelect = payload.nowselectindex
    }
  }
})

export default useMAccountStore;