import CBusAbnormal from '../../views/CGroup/CBusAbnormal_Page.vue';
import CBusPlatform from '../../views/CGroup/CBusPlatform_Page.vue';
import CBusStation from '../../views/CGroup/CBusStation_Page.vue';
import CBusUnitTest from '../../views/CGroup/CBusUnitTest_Page.vue';
import CEquipment from '../../views/CGroup/CEquipment_Page.vue';
import CEquipmentAbnormal from '../../views/CGroup/CEquipmentAbnormal_Page.vue';
import CGraphic from '../../views/CGroup/CGraphic_Page.vue';
import CRecord from '../../views/CGroup/CRecord_Page.vue';

const CRoutes = [

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
]

export default CRoutes;
