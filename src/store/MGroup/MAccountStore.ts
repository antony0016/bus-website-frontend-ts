import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useMAccountStore = defineStore('MAccountStore', {
  state: () => ({
    nowGroupSelect: '',
    nowGroupSelectShow: false,
    ApiUrl: {
      baseUrl: 'http://127.0.0.1:8000/api/roletest/',
      getUrl: 'view_role/',
      postUrl: 'add_role/',
      putUrl: 'update_role/',
      deleteUrl: 'delete_role/',
      userBaseUrl: 'http://127.0.0.1:8000/api/usertest/',
      userGetUrl: 'view_user/',
      userPostUrl: 'add_user/',
      userPutUrl: 'update_user/',
      userDeleteUrl: 'delete_user/',
    },
    getData: {
      getGroupData: {},
      selectGroup: {
        nowSelectGroup: {},
        selectGroupType: '',
        selectGroupCode: '',
        selectGroupName: '',
        selectGroupPermission: {
          mGroup: {
            groupName: "營運管理：",
            groupMember: {
              MRC: { name: "客運與路線/客運業者資料及路線建立", allow: false },
              MPM: { name: "月台管理/月台資料建立及申請允許維護", allow: false },
              MPA: { name: "月台申請/備用月台停靠時間及一般月台使用次數設定", allow: false },
              MPT: { name: "停靠時間設定/備用月台停靠時間及一般月台使用次數設定", allow: false },
              MSM: { name: "班次維護/班次管理設定", allow: false },
              MBM: { name: "車籍管理/各客運業者所屬車輛車籍資料建立", allow: false },
              MRU: { name: "帳號群組/帳號權限規劃及管理", allow: false },
              MRM: { name: "營運報表/各式報表", allow: false },
              MHR: { name: "修訂紀錄/各帳號使用系統紀錄", allow: false },
              MPG: { name: "月台群組設定/月台群組設定", allow: false },
            }
          },
          cGroup: {
            groupName: "行控管理：",
            groupMember: {
              CIC: { name: "即時團控/現場即時狀態顯示", allow: false },
              CBA: { name: "車輛異常管理/車輛異常管理", allow: false },
              CBS: { name: "車輛進站查詢/車輛進出站資料查詢", allow: false },
              CBP: { name: "車輛停靠查詢/車輛進出月台資料查詢", allow: false },
              CEM: { name: "設備運作監視/設備狀態即時顯示", allow: false },
              CEA: { name: "設備異常管理/設備維護管理", allow: false },
              CHR: { name: "紀錄查詢/車輛行控資訊查詢", allow: false },
              CNVR: { name: "開啟 NVR/NVR 另頁開啟", allow: false },
              CED: { name: "設備詳細資訊(Debug)/設備詳細資訊查詢", allow: false },
            }
          },
          BGroup: {
            groupName: "廣播管理：",
            groupMember: {
              BVP: { name: "語音程序/語音程序建立及查詢", allow: false },
              BBS: { name: "廣播排程/固定或週期排程", allow: false },
              BQE: { name: "車務自動插播/車輛到月台啟動廣播", allow: false },
              BRC: { name: "播放紀錄查詢", allow: false },
            }
          }
        }
      },
      getUserData: [],
    },
    DialogForm: {
      groupType: '',
      groupCode: '',
      groupName: '',
    },
    UserDialogForm: {
      userID: '',
      username: '',
      userMail: '',
      userDetail: '',
      name: '',
      phoneMain: '',
      phoneSub: '',
      note: '',
      group: '',
      password: '',
    },
    UserDialogFormVisible: false,
    UserDeleteShow: false,
    GroupTypeSelections: [
      { labelName: 'Administartor', value: 'Administartor' },
      { labelName: 'Manager', value: 'Manager' },
      { labelName: 'User', value: 'User' },
    ],
    PermissionSelections: {
      mGroup: {
        groupName: "營運管理：",
        groupMember: {
          MRC: { name: "客運與路線/客運業者資料及路線建立", allow: false },
          MPM: { name: "月台管理/月台資料建立及申請允許維護", allow: false },
          MPA: { name: "月台申請/備用月台停靠時間及一般月台使用次數設定", allow: false },
          MPT: { name: "停靠時間設定/備用月台停靠時間及一般月台使用次數設定", allow: false },
          MSM: { name: "班次維護/班次管理設定", allow: false },
          MBM: { name: "車籍管理/各客運業者所屬車輛車籍資料建立", allow: false },
          MRU: { name: "帳號群組/帳號權限規劃及管理", allow: false },
          MRM: { name: "營運報表/各式報表", allow: false },
          MHR: { name: "修訂紀錄/各帳號使用系統紀錄", allow: false },
          MPG: { name: "月台群組設定/月台群組設定", allow: false },
        }
      },
      cGroup: {
        groupName: "行控管理：",
        groupMember: {
          CIC: { name: "即時團控/現場即時狀態顯示", allow: false },
          CBA: { name: "車輛異常管理/車輛異常管理", allow: false },
          CBS: { name: "車輛進站查詢/車輛進出站資料查詢", allow: false },
          CBP: { name: "車輛停靠查詢/車輛進出月台資料查詢", allow: false },
          CEM: { name: "設備運作監視/設備狀態即時顯示", allow: false },
          CEA: { name: "設備異常管理/設備維護管理", allow: false },
          CHR: { name: "紀錄查詢/車輛行控資訊查詢", allow: false },
          CNVR: { name: "開啟 NVR/NVR 另頁開啟", allow: false },
          CED: { name: "設備詳細資訊(Debug)/設備詳細資訊查詢", allow: false },
        }
      },
      BGroup: {
        groupName: "廣播管理：",
        groupMember: {
          BVP: { name: "語音程序/語音程序建立及查詢", allow: false },
          BBS: { name: "廣播排程/固定或週期排程", allow: false },
          BQE: { name: "車務自動插播/車輛到月台啟動廣播", allow: false },
          BRC: { name: "播放紀錄查詢", allow: false },
        }
      }
    },
    loadingShow: {
      groupTableShow: false,
      userTableShow: false
    }
  }),
  getters: {},
  actions: {
    dialogClear: function () {
      //console.log(this.DialogForm)
      this.DialogForm.groupType = ''
      this.DialogForm.groupCode = ''
      this.DialogForm.groupName = ''
      for (let [key, value] of Object.entries(this.PermissionSelections)) {
        for (let [subKey, subValue] of Object.entries(value['groupMember'])) {
          subValue['allow'] = false
        }
      }
    },
    getGroupName: function (payload: { getCount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.ApiUrl.baseUrl + this.ApiUrl.getUrl)
        .then(response => {
          console.log('get group data')
          this.getData.getGroupData = response.data
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getCount < 6) {
              loginManagerStore.refreshToken()
              this.getGroupName({ getCount: payload.getCount + 1 })
            } else {
              this.getData.getGroupData = {}
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    selectGroupFunction: function (payload: { nowSelect: string, nowSelectIndex: string }) {
      this.getGroupName({ getCount: 0 })
      this.getData.selectGroup.nowSelectGroup = Object.fromEntries(Object.entries(this.getData.getGroupData).filter(([k, v]) => k == payload.nowSelect))
      for (let [key, value] of Object.entries(this.getData.selectGroup.nowSelectGroup)) {
        this.getData.selectGroup.selectGroupType = value['group_type_name']
        this.getData.selectGroup.selectGroupName = value['group_name']
        this.getData.selectGroup.selectGroupCode = value['group_id']
        this.getData.selectGroup.selectGroupPermission = value['group_per_code']
      }
      this.nowGroupSelect = payload.nowSelectIndex
      this.nowGroupSelectShow = true
    },
    postGroupName: function (payload: { postCount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.ApiUrl.baseUrl + this.ApiUrl.postUrl, {
        data: {
          roletype: this.DialogForm.groupType,
          rolename: this.DialogForm.groupName,
          permission: this.PermissionSelections,
        }
      })
        .then(response => {
          console.log('post group data')
          this.getGroupName({ getCount: 0 })
          this.dialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postCount < 6) {
              loginManagerStore.refreshToken()
              this.postGroupName({ postCount: payload.postCount + 1 })
            } else {
              console.log('沒有權限')
              this.dialogClear()
            }
          } else {
            console.log(error)
            this.dialogClear()
          }
        })
    },
    putGroupName: function (payload: { putCount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.ApiUrl.baseUrl + this.getData.selectGroup.selectGroupCode + '/' + this.ApiUrl.putUrl, {
        data: {
          id: this.getData.selectGroup.selectGroupCode,
          roletype: this.getData.selectGroup.selectGroupType,
          rolename: this.getData.selectGroup.selectGroupName,
          permission: this.getData.selectGroup.selectGroupPermission,
        }
      })
        .then(response => {
          console.log('put group data')
          this.getGroupName({ getCount: 0 })
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putCount < 6) {
              loginManagerStore.refreshToken()
              this.putGroupName({ putCount: payload.putCount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    deleteGroupName: function (payload: { deleteCount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.ApiUrl.baseUrl + this.getData.selectGroup.selectGroupCode + '/' + this.ApiUrl.deleteUrl, {
        data: {
          id: this.getData.selectGroup.selectGroupCode,
        }
      })
        .then(response => {
          console.log('delete group data')
          this.getGroupName({ getCount: 0 })
          this.nowGroupSelect = ''
          this.nowGroupSelectShow = false
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.deleteCount < 6) {
              loginManagerStore.refreshToken()
              this.deleteGroupName({ deleteCount: payload.deleteCount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getUser: function (payload: { getCount: number }) {
      this.loadingShow.userTableShow = true
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.ApiUrl.userBaseUrl + this.ApiUrl.userGetUrl)
        .then(response => {
          console.log('get user data')
          this.getData.getUserData = response.data
          console.log(this.getData.getUserData)
          this.loadingShow.userTableShow = false
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getCount < 6) {
              loginManagerStore.refreshToken()
              this.getUser({ getCount: payload.getCount + 1 })
            } else {
              this.getData.getUserData = []
              console.log('沒有權限')
              this.loadingShow.userTableShow = false
            }
          } else {
            console.log(error)
            this.loadingShow.userTableShow = false
          }
        })
    },
    userDialogClear: function () {
      this.UserDialogForm.userID = ''
      this.UserDialogForm.username = ''
      this.UserDialogForm.userMail = ''
      this.UserDialogForm.userDetail = ''
      this.UserDialogForm.name = ''
      this.UserDialogForm.phoneMain = ''
      this.UserDialogForm.phoneSub = ''
      this.UserDialogForm.note = ''
      this.UserDialogForm.group = ''
      this.UserDialogForm.password = ''
    },
    openUserEdit: function (payload: { data: object }) {
      this.UserDialogForm.userID = payload.data['user_id']
      this.UserDialogForm.username = payload.data['username']
      this.UserDialogForm.userMail = payload.data['email']
      this.UserDialogForm.userDetail = payload.data['user_detail_id']
      this.UserDialogForm.name = payload.data['name']
      this.UserDialogForm.phoneMain = payload.data['phonemain']
      this.UserDialogForm.phoneSub = payload.data['phonesub']
      this.UserDialogForm.note = payload.data['note']
      this.UserDialogForm.group = payload.data['group']
      this.UserDialogForm.password = ''
      this.UserDeleteShow = true
      this.UserDialogFormVisible = true
    },
    addNewUserDialog: function () {
      this.userDialogClear()
      this.UserDeleteShow = false
      this.UserDialogFormVisible = true
    },
    postUser: function (payload: { postCount: number }) {
      this.loadingShow.userTableShow = true
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.ApiUrl.userBaseUrl + this.ApiUrl.userPostUrl, {
        data: {
          group: this.UserDialogForm.group,
          username: this.UserDialogForm.username,
          email: this.UserDialogForm.userMail,
          password: this.UserDialogForm.password,
          accountName: this.UserDialogForm.name,
          phoneMain: this.UserDialogForm.phoneMain,
          phoneSub: this.UserDialogForm.phoneSub,
          note: this.UserDialogForm.note,
        }
      })
        .then(response => {
          console.log('post user data')
          this.getUser({ getCount: 0 })
          this.userDialogClear()
          this.loadingShow.userTableShow = false
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postCount < 6) {
              loginManagerStore.refreshToken()
              this.postUser({ postCount: payload.postCount + 1 })
            } else {
              console.log('沒有權限')
              this.userDialogClear()
              this.loadingShow.userTableShow = false
            }
          } else {
            console.log(error)
            this.userDialogClear()
            this.loadingShow.userTableShow = false
          }
        })
    },
    putUser: function (payload: { putCount: number }) {
      this.loadingShow.userTableShow = true
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.ApiUrl.userBaseUrl + this.UserDialogForm.userID + '/' + this.ApiUrl.userPutUrl, {
        data: {
          id: this.UserDialogForm.userID,
          group: this.UserDialogForm.group,
          username: this.UserDialogForm.username,
          email: this.UserDialogForm.userMail,
          password: this.UserDialogForm.password,
          accountName: this.UserDialogForm.name,
          phoneMain: this.UserDialogForm.phoneMain,
          phoneSub: this.UserDialogForm.phoneSub,
          note: this.UserDialogForm.note,
        }
      })
        .then(response => {
          console.log('put user data')
          this.getUser({ getCount: 0 })
          this.userDialogClear()
          this.loadingShow.userTableShow = false
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putCount < 6) {
              loginManagerStore.refreshToken()
              this.putUser({ putCount: payload.putCount + 1 })
            } else {
              console.log('沒有權限')
              this.userDialogClear()
              this.loadingShow.userTableShow = false
            }
          } else {
            console.log(error)
            this.userDialogClear()
            this.loadingShow.userTableShow = false
          }
        })
    },
    deleteUser: function (payload: { deleteCount: number }) {
      this.loadingShow.userTableShow = true
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.ApiUrl.userBaseUrl + this.UserDialogForm.userID + '/' + this.ApiUrl.userDeleteUrl, {
        data: {
          id: this.UserDialogForm.userID,
        }
      })
        .then(response => {
          console.log('delete group data')
          this.getUser({ getCount: 0 })
          this.userDialogClear()
          this.loadingShow.userTableShow = false
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.deleteCount < 6) {
              loginManagerStore.refreshToken()
              this.deleteUser({ deleteCount: payload.deleteCount + 1 })
            } else {
              console.log('沒有權限')
              this.userDialogClear()
              this.loadingShow.userTableShow = false
            }
          } else {
            console.log(error)
            this.userDialogClear()
            this.loadingShow.userTableShow = false
          }
        })
    },
  }
})

export default useMAccountStore;
