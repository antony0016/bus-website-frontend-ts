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
          { isShow: false, name: 'TTS', to: '/TTS', id: 'TTS-test' },
          { isShow: false, name: 'CMS', to: '/CMS', id: 'CMS-test' },
          { isShow: true, name: 'Sample', to: '/Sample', id: 'Sample' },
          { isShow: true, name: 'AxiosExample', to: '/AxiosExample', id: 'AxiosExample' },
          { isShow: true, name: 'NewTodoSample', to: '/NewTodoSample', id: 'NewTodoSample' },
        ],
      },
      {
        id: Env.barItemIds.mRouter, subMenu: [
          { isShow: true, name: '客運與路線', to: '/MCompany', id: 'MRC' },
          { isShow: true, name: '車籍管理', to: '/MBusInfo', id: 'MBM' },
          { isShow: true, name: '月台管理', to: '/MPlatform', id: 'MPM' },
          { isShow: true, name: '月台申請', to: '/MPlatformApply', id: 'MPA' },
          { isShow: true, name: '停靠時間設定', to: '/MStopTime', id: 'MPT' },
          { isShow: true, name: '班次維護', to: '/MMaintenance', id: 'MSM' },
          { isShow: true, name: '帳號群組', to: '/MAccount', id: 'MRU' },
          { isShow: true, name: '營運報表', to: '/MReport', id: 'MRM' },
          { isShow: true, name: '修訂紀錄', to: '/MHistory', id: 'MHR' },
          { isShow: true, name: '月台群組設定', to: '/MPlatformGroup', id: 'MPG' },
        ]
      },
      {
        id: Env.barItemIds.cRouter, subMenu: [
          { isShow: true, name: '即時運作圖控', to: '/CGraphic', id: 'CIC' },
          { isShow: true, name: '車輛異常管理', to: '/CBusAbnormal', id: 'CBA' },
          { isShow: true, name: '車輛進站查詢', to: '/CBusStation', id: 'CBS' },
          { isShow: true, name: '車輛停靠查詢', to: '/CBusPlatform', id: 'CBP' },
          { isShow: true, name: '設備運作監視', to: '/CEquipment', id: 'CEM' },
          { isShow: true, name: '設備異常管理', to: '/CEquipmentAbnormal', id: 'CEA' },
          { isShow: true, name: '紀錄查詢', to: '/CRecord', id: 'CHR' },
          { isShow: true, name: '客運停靠單元測試', to: '/CBusUnitTest', id: 'CBusUnitTest' },]
      },
      {
        id: Env.barItemIds.bRouter, subMenu: [
          { isShow: true, name: '程序設定', to: '/BProgram', id: 'BVP' },
          { isShow: true, name: '廣播排程', to: '/BSchedule', id: 'BBS' },
          { isShow: true, name: '自動插播', to: '/BInStream', id: 'BAI' },
          { isShow: true, name: '播放紀錄', to: '/BRecord', id: 'BRC' },]
      },
    ],
  }),
  actions: {}
})

export default useViewControllerStore;
