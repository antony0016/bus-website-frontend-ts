import TTS from '../../views/UnitTest/TTS.vue'
import NXStream from '../../views/UnitTest/NXStream.vue'
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
        path: "/NXStream",
        name: "NXStream",
        component: NXStream,
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
