import Home from "../views/Home.vue";
import Login from '../views/Login.vue';
import AxiosExample from '../components/example/AxiosExample.vue';
import NotFound from '../views/NotFound.vue';
import NewTodoSample from '../components/example/NewTodoSample.vue';
import FindTodo from '../components/FindTodo.vue';
import NewTodo from '../components/NewTodo.vue';

//MGroup
import MAccount from '../views/MGroup/MAccount_Page.vue';
import MBusInfo from '../views/MGroup/MBusInfo_Page.vue';
import MCompany from '../views/MGroup/MCompany_Page.vue';
import MHistory from '../views/MGroup/MHistory_Page.vue';
import MMaintenance from '../views/MGroup/MMaintenance_Page.vue';
import MPlatform from '../views/MGroup/MPlatform_Page.vue';
import MPlatformApply from '../views/MGroup/MPlatformApply_Page.vue';
import MPlatformGroup from '../views/MGroup/MPlatformGroup_Page.vue';
import MReport from '../views/MGroup/MReport_Page.vue';
import MStopTime from '../views/MGroup/MStopTime_Page.vue';

//CGroup
import CBusAbnormal from '../views/CGroup/CBusAbnormal_Page.vue';
import CBusPlatform from '../views/CGroup/CBusPlatform_Page.vue';
import CBusStation from '../views/CGroup/CBusStation_Page.vue';
import CBusUnitTest from '../views/CGroup/CBusUnitTest_Page.vue';
import CEquipment from '../views/CGroup/CEquipment_Page.vue';
import CEquipmentAbnormal from '../views/CGroup/CEquipmentAbnormal_Page.vue';
import CGraphic from '../views/CGroup/CGraphic_Page.vue';
import CRecord from '../views/CGroup/CRecord_Page.vue';

//BGroup
import BInStream from '../views/BGroup/BInStream_Page.vue';
import BPart from '../views/BGroup/BPart_Page.vue';
import BProgram from '../views/BGroup/BProgram_Page.vue';
import BSchedule from '../views/BGroup/BSchedule_Page.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: MCompany,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
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
  // CGroup
  {
    path: "/CBusAbnormal",
    name: "CBusAbnormal",
    component: CBusAbnormal,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/CBusPlatform",
    name: "CBusPlatform",
    component: CBusPlatform,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/CBusStation",
    name: "CBusStation",
    component: CBusStation,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/CBusUnitTest",
    name: "CBusUnitTest",
    component: CBusUnitTest,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/CEquipment",
    name: "CEquipment",
    component: CEquipment,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/CEquipmentAbnormal",
    name: "CEquipmentAbnormal",
    component: CEquipmentAbnormal,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/CGraphic",
    name: "CGraphic",
    component: CGraphic,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/CRecord",
    name: "CRecord",
    component: CRecord,
    meta: {
      requiredAuth: true,
    }
  },
  // BGroup
  {
    path: "/BInStream",
    name: "BInStream",
    component: BInStream,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/BPart",
    name: "BPart",
    component: BPart,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/BProgram",
    name: "BProgram",
    component: BProgram,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/BSchedule",
    name: "BSchedule",
    component: BSchedule,
    meta: {
      requiredAuth: true,
    }
  },
  // Other
  {
    path: "/AxiosExample",
    name: "AxiosExample",
    component: AxiosExample,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/NewTodoSample",
    name: "NewTodoSample",
    component: NewTodoSample
  },
  {
    path: "/NewTodo",
    name: "NewTodo",
    component: NewTodo
  },
  {
    path: "/FindTodo",
    name: "FindTodo",
    component: FindTodo
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  }
]

export default routes;
