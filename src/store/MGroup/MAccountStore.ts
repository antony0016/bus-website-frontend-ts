import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useMAccountStore = defineStore('MAccountStore', {
  state: () => ({
    GroupUserSwitch: {
      Switch_G: true,
      Switch_U: false,
    },
    nowGroupSelect: '',
    nowGroupSelectshow: false,
    ApiUrl: {
      baseurl: 'http://127.0.0.1:8000/api/roletest/',
      geturl: 'view_role/',
      posturl: 'add_role/',
      puturl: 'update_role/',
      deleteurl: 'delete_role/',
      userbaseurl: 'http://127.0.0.1:8000/api/usertest/',
      usergeturl: 'view_user/',
      userposturl: 'add_user/',
      userputurl: 'update_user/',
      userdeleteurl: 'delete_user/',
    },
    getData: {
      getGroupData: {},
      selectGroup: {
        nowselectgroup: {},
        selectgrouptype: '',
        selectgroupcode: '',
        selectgroupname: '',
        selectgrouppermission: {
          MGroup: {
            GroupName: "營運管理：",
            GroupMember: {
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
          CGroup: {
            GroupName: "行控管理：",
            GroupMember: {
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
            GroupName: "廣播管理：",
            GroupMember: {
              BAC: { name: "音訊片段/音訊片段建立及查詢", allow: false },
              BVP: { name: "語音程序/語音程序建立及查詢", allow: false },
              BBS: { name: "廣播排程/固定或週期排程", allow: false },
              BAI: { name: "車務自動插播/車輛到月台啟動廣播", allow: false },
            }
          }
        }
      },
      getUserData: [],
    },
    DialogForm: {
      grouptype: '',
      groupcode: '',
      groupname: '',
    },
    UserDialogForm: {
      userid: '',
      username: '',
      useremail: '',
      userdetailid: '',
      name: '',
      phonemain: '',
      phonesub: '',
      note: '',
      group: '',
      password: '',
    },
    UserDialogFormVisible: false,
    UserDeleteShow: false,
    GroupTypeSelections: [
      { labelname: 'Administartor', value: 'Administartor' },
      { labelname: 'Manager', value: 'Manager' },
      { labelname: 'User', value: 'User' },
    ],
    PermissionSelections: {
      MGroup: {
        GroupName: "營運管理：",
        GroupMember: {
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
      CGroup: {
        GroupName: "行控管理：",
        GroupMember: {
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
        GroupName: "廣播管理：",
        GroupMember: {
          BAC: { name: "音訊片段/音訊片段建立及查詢", allow: false },
          BVP: { name: "語音程序/語音程序建立及查詢", allow: false },
          BBS: { name: "廣播排程/固定或週期排程", allow: false },
          BAI: { name: "車務自動插播/車輛到月台啟動廣播", allow: false },
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
        for (let [subkey, subvalue] of Object.entries(value['GroupMember'])) {
          subvalue['allow'] = false
        }
      }
    },
    GroupUserSwitchG: function () {
      this.GroupUserSwitch.Switch_G = true
      this.GroupUserSwitch.Switch_U = false
      this.getGroupName({ getcount: 0 })
    },
    GroupUserSwitchU: function () {
      this.GroupUserSwitch.Switch_G = false
      this.GroupUserSwitch.Switch_U = true
      this.getUser({ getcount: 0 })
    },
    getGroupName: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.ApiUrl.baseurl + this.ApiUrl.geturl)
        .then(response => {
          console.log('get group data')
          this.getData.getGroupData = response.data
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshtoken()
              this.getGroupName({ getcount: payload.getcount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    selectGroupFunction: function (payload: { nowselect: string, nowselectindex: string }) {
      this.getGroupName({ getcount: 0 })
      this.getData.selectGroup.nowselectgroup = Object.fromEntries(Object.entries(this.getData.getGroupData).filter(([k, v]) => k == payload.nowselect))
      for (let [key, value] of Object.entries(this.getData.selectGroup.nowselectgroup)) {
        this.getData.selectGroup.selectgrouptype = value['group_type_name']
        this.getData.selectGroup.selectgroupname = value['group_name']
        this.getData.selectGroup.selectgroupcode = value['group_id']
        this.getData.selectGroup.selectgrouppermission = value['group_percode']
      }
      this.nowGroupSelect = payload.nowselectindex
      this.nowGroupSelectshow = true
    },
    postGroupName: function (payload: { postcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.ApiUrl.baseurl + this.ApiUrl.posturl, {
        data: {
          roletype: this.DialogForm.grouptype,
          rolename: this.DialogForm.groupname,
          permission: this.PermissionSelections,
        }
      })
        .then(response => {
          console.log('post group data')
          this.getGroupName({ getcount: 0 })
          this.dialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshtoken()
              this.postGroupName({ postcount: payload.postcount + 1 })
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
    putGroupName: function (payload: { putcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.ApiUrl.baseurl + this.getData.selectGroup.selectgroupcode + '/' + this.ApiUrl.puturl, {
        data: {
          id: this.getData.selectGroup.selectgroupcode,
          roletype: this.getData.selectGroup.selectgrouptype,
          rolename: this.getData.selectGroup.selectgroupname,
          permission: this.getData.selectGroup.selectgrouppermission,
        }
      })
        .then(response => {
          console.log('put group data')
          this.getGroupName({ getcount: 0 })
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshtoken()
              this.putGroupName({ putcount: payload.putcount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    deleteGroupName: function (payload: { deletecount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.ApiUrl.baseurl + this.getData.selectGroup.selectgroupcode + '/' + this.ApiUrl.deleteurl, {
        data: {
          id: this.getData.selectGroup.selectgroupcode,
        }
      })
        .then(response => {
          console.log('delete group data')
          this.getGroupName({ getcount: 0 })
          this.nowGroupSelect = ''
          this.nowGroupSelectshow = false
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.deletecount < 6) {
              loginManagerStore.refreshtoken()
              this.deleteGroupName({ deletecount: payload.deletecount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getUser: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.ApiUrl.userbaseurl + this.ApiUrl.usergeturl)
        .then(response => {
          console.log('get user data')
          this.getData.getUserData = response.data
          console.log(this.getData.getUserData)
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshtoken()
              this.getUser({ getcount: payload.getcount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    UserdialogClear: function () {
      this.UserDialogForm.userid = ''
      this.UserDialogForm.username = ''
      this.UserDialogForm.useremail = ''
      this.UserDialogForm.userdetailid = ''
      this.UserDialogForm.name = ''
      this.UserDialogForm.phonemain = ''
      this.UserDialogForm.phonesub = ''
      this.UserDialogForm.note = ''
      this.UserDialogForm.group = ''
      this.UserDialogForm.password = ''
    },
    openUserEdit: function (payload: { data: object }) {
      this.UserDialogForm.userid = payload.data['user_id']
      this.UserDialogForm.username = payload.data['username']
      this.UserDialogForm.useremail = payload.data['email']
      this.UserDialogForm.userdetailid = payload.data['user_detail_id']
      this.UserDialogForm.name = payload.data['name']
      this.UserDialogForm.phonemain = payload.data['phonemain']
      this.UserDialogForm.phonesub = payload.data['phonesub']
      this.UserDialogForm.note = payload.data['note']
      this.UserDialogForm.group = payload.data['group']
      this.UserDialogForm.password = ''
      this.UserDeleteShow = true
      this.UserDialogFormVisible = true
    },
    addNewUserDialog: function () {
      this.UserdialogClear()
      this.UserDeleteShow = false
      this.UserDialogFormVisible = true
    },
    postUser: function (payload: { postcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.ApiUrl.userbaseurl + this.ApiUrl.userposturl, {
        data: {
          group: this.UserDialogForm.group,
          username: this.UserDialogForm.username,
          email: this.UserDialogForm.useremail,
          password: this.UserDialogForm.password,
          accountname: this.UserDialogForm.name,
          phonemain: this.UserDialogForm.phonemain,
          phonesub: this.UserDialogForm.phonesub,
          note: this.UserDialogForm.note,
        }
      })
        .then(response => {
          console.log('post user data')
          this.getUser({ getcount: 0 })
          this.UserdialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshtoken()
              this.postUser({ postcount: payload.postcount + 1 })
            } else {
              console.log('沒有權限')
              this.UserdialogClear()
            }
          } else {
            console.log(error)
            this.UserdialogClear()
          }
        })
    },
    putUser: function (payload: { putcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.ApiUrl.userbaseurl + this.UserDialogForm.userid + '/' + this.ApiUrl.userputurl, {
        data: {
          id: this.UserDialogForm.userid,
          group: this.UserDialogForm.group,
          username: this.UserDialogForm.username,
          email: this.UserDialogForm.useremail,
          password: this.UserDialogForm.password,
          accountname: this.UserDialogForm.name,
          phonemain: this.UserDialogForm.phonemain,
          phonesub: this.UserDialogForm.phonesub,
          note: this.UserDialogForm.note,
        }
      })
        .then(response => {
          console.log('put user data')
          this.getUser({ getcount: 0 })
          this.UserdialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshtoken()
              this.putUser({ putcount: payload.putcount + 1 })
            } else {
              console.log('沒有權限')
              this.UserdialogClear()
            }
          } else {
            console.log(error)
            this.UserdialogClear()
          }
        })
    },
    deleteUser: function (payload: { deletecount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.ApiUrl.userbaseurl + this.UserDialogForm.userid + '/' + this.ApiUrl.userdeleteurl, {
        data: {
          id: this.UserDialogForm.userid,
        }
      })
        .then(response => {
          console.log('delete group data')
          this.getUser({ getcount: 0 })
          this.UserdialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.deletecount < 6) {
              loginManagerStore.refreshtoken()
              this.deleteUser({ deletecount: payload.deletecount + 1 })
            } else {
              console.log('沒有權限')
              this.UserdialogClear()
            }
          } else {
            console.log(error)
            this.UserdialogClear()
          }
        })
    },
  }
})

export default useMAccountStore;
