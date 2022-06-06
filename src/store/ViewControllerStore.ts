import { defineStore } from 'pinia'
import Env from './env'

const useViewControllerStore = defineStore('ViewControllerStore', {
  state: () => ({
    nowPath: '',
    menuSwitch: {
      isFold: false,
      isShow: false,
      topBarId: Env.barItemIds.mRouter,
    },
    topBarItems: [
      { id: Env.barItemIds.mRouter, to: "/", isShow: false, name: "營運管理" },
      { id: Env.barItemIds.cRouter, to: "/", isShow: false, name: "行控管理" },
      { id: Env.barItemIds.bRouter, to: "/", isShow: false, name: "廣播系統" },
      { id: Env.barItemIds.unitTest, to: "/", isShow: false, name: "單元測試" },
    ],
    sideMenuItems: [
      {
        id: Env.barItemIds.unitTest, subMenu: [
          { isShow: true, name: 'Camera', to: '/Camera', id: 'Camera' },
          { isShow: false, name: 'TTS', to: '/TTS', id: 'TTS' },
          { isShow: false, name: 'CMS', to: '/CMS', id: 'CMS' },
          { isShow: true, name: 'Sample', to: '/Sample', id: 'Sample' },
          { isShow: true, name: 'AxiosExample', to: '/AxiosExample', id: 'AxiosExample' },
          { isShow: true, name: 'NewTodoSample', to: '/NewTodoSample', id: 'NewTodoSample' },
        ],
      },
      {
        id: Env.barItemIds.mRouter, subMenu: [
          { isShow: true, name: '客運與路線', to: '/MCompany', id: 'MCompany' },
          { isShow: true, name: '車籍管理', to: '/MBusInfo', id: 'MBusInfo' },
          { isShow: true, name: '月台管理', to: '/MPlatform', id: 'MPlatform' },
          { isShow: true, name: '月台申請', to: '/MPlatformApply', id: 'MPlatform_Apply' },
          { isShow: true, name: '停靠時間設定', to: '/MStopTime', id: 'MStop_Time' },
          { isShow: true, name: '班次維護', to: '/MMaintenance', id: 'MMaintenance' },
          { isShow: true, name: '帳號群組', to: '/MAccount', id: 'MAccount' },
          { isShow: true, name: '營運報表', to: '/MReport', id: 'MReport' },
          { isShow: true, name: '修訂紀錄', to: '/MHistory', id: 'MHistory' },
          { isShow: true, name: '月台群組設定', to: '/MPlatformGroup', id: 'MPlatform_Group' },
        ]
      },
      {
        id: Env.barItemIds.cRouter, subMenu: [
          { isShow: true, name: '即時運作圖控', to: '/CGraphic', id: 'CGraphic' },
          { isShow: true, name: '車輛異常管理', to: '/CBusAbnormal', id: 'CBusAbnormal' },
          { isShow: true, name: '車輛進站查詢', to: '/CBusStation', id: 'CBusStation' },
          { isShow: true, name: '車輛停靠查詢', to: '/CBusPlatform', id: 'CBusPlatform' },
          { isShow: true, name: '設備運作監視', to: '/CEquipment', id: 'CEquipment' },
          { isShow: true, name: '設備異常管理', to: '/CEquipmentAbnormal', id: 'CEquipmentAbnormal' },
          { isShow: true, name: '紀錄查詢', to: '/CRecord', id: 'CRecord' },
          { isShow: true, name: '客運停靠單元測試', to: '/CBusUnitTest', id: 'CBusUnitTest' },]
      },
      {
        id: Env.barItemIds.bRouter, subMenu: [
          { isShow: true, name: '音訊片段', to: '/BPart', id: 'BPart' },
          { isShow: true, name: '語音程序編排', to: '/BProgram', id: 'BProgram' },
          { isShow: true, name: '廣播排程', to: '/BSchedule', id: 'BSchedule' },
          { isShow: true, name: '車務自動插播', to: '/BInStream', id: 'BInStream' },]
      },
    ],
  }),
  actions: {}
})

export default useViewControllerStore;
