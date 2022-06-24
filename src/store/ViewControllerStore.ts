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
            { id: Env.barItemIds.mRouter, to: "/Manage", isShow: true, name: "營運管理" },
            { id: Env.barItemIds.cRouter, to: "/Platform", isShow: true, name: "月台與設備" },
            { id: Env.barItemIds.bRouter, to: "/Control", isShow: true, name: "儀控管理" },
            { id: Env.barItemIds.unitTest, to: "/System", isShow: true, name: "系統管理" },
        ],
        sideMenuItems: [
            {
                id: Env.barItemIds.unitTest, subMenu: [
                    { isShow: true, name: 'TTS', to: '/TTS', id: 'UnitTest-TTS' },
                    { isShow: true, name: 'NXStream', to: '/NXStream', id: 'UnitTest-NXStream' },
                    { isShow: true, name: 'InAndOut', to: '/InAndOut', id: 'UnitTest-InAndOut' },
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
                    { isShow: true, name: '播放列隊', to: '/BQueue', id: 'BQE' },
                    { isShow: true, name: '播放紀錄', to: '/BRecord', id: 'BRC' },]
            },
        ],
        pageShow: []
    }),
    actions: {}
})

export default useViewControllerStore;
