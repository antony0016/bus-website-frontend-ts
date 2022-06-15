import TTS from '../../views/UnitTest/TTS.vue'
import MXStream from '../../views/UnitTest/MXStream.vue'
import InAndOut from '../../views/UnitTest/InAndOut.vue'

const UnitTestRoutes = [
  {
    path: "/TTS",
    name: "TTS",
    component: TTS,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/MXStream",
    name: "MXStream",
    component: MXStream,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/InAndOut",
    name: "InAndOut",
    component: InAndOut,
    meta: {
      requiredAuth: true,
    }
  },
]

export default UnitTestRoutes;
