//MGroup
import MAccount from '../../views/MGroup/MAccount_Page.vue';
import MBusInfo from '../../views/MGroup/MBusInfo_Page.vue';
import MCompany from '../../views/MGroup/MCompany_Page.vue';
import MHistory from '../../views/MGroup/MHistory_Page.vue';
import MMaintenance from '../../views/MGroup/MMaintenance_Page.vue';
import MPlatform from '../../views/MGroup/MPlatform_Page.vue';
import MPlatformApply from '../../views/MGroup/MPlatformApply_Page.vue';
import MPlatformGroup from '../../views/MGroup/MPlatformGroup_Page.vue';
import MReport from '../../views/MGroup/MReport_Page.vue';
import MStopTime from '../../views/MGroup/MStopTime_Page.vue';

const MRoutes = [
  {
    path: "/",
    name: "Home",
    component: MCompany,
    meta: {
      requiredAuth: true,
    }
  },
  // MGroup
  {
    path: "/MAccount",
    name: "MAccount",
    component: MAccount,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/MBusInfo",
    name: "MBusInfo",
    component: MBusInfo,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/MCompany",
    name: "MCompany",
    component: MCompany,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/MHistory",
    name: "MHistory",
    component: MHistory,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/MMaintenance",
    name: "MMaintenance",
    component: MMaintenance,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/MPlatform",
    name: "MPlatform",
    component: MPlatform,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/MPlatformApply",
    name: "MPlatformApply",
    component: MPlatformApply,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/MPlatformGroup",
    name: "MPlatformGroup",
    component: MPlatformGroup,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/MReport",
    name: "MReport",
    component: MReport,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/MStopTime",
    name: "MStopTime",
    component: MStopTime,
    meta: {
      requiredAuth: true,
    }
  },
]

export default MRoutes;
