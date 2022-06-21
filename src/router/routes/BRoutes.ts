// BGroup
import BQueue from "../../views/BGroup/BQueue_Page.vue";
import BRecord from "../../views/BGroup/BRecord_Page.vue";
import BProgram from "../../views/BGroup/BProgram_Page.vue";
import BSchedule from "../../views/BGroup/BSchedule_Page.vue";

const BRoutes = [
  {
    path: "/BQueue",
    name: "BQueue",
    component: BQueue,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/BRecord",
    name: "BRecord",
    component: BRecord,
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
]

export default BRoutes;
