import { defineStore } from 'pinia'

const useViewControllerStore = defineStore('ViewControllerStore', {
    state: () => ({
        topBarItems: [
            { id: "mRouter", to: "/", isShow: true, name: "營運管理" },
            { id: "cRouter", to: "/", isShow: true, name: "行控管理" },
            { id: "bRouter", to: "/", isShow: true, name: "廣播系統" },
        ],
        menuSwitch: false

    }),
    actions: {}
})

export default useViewControllerStore;
