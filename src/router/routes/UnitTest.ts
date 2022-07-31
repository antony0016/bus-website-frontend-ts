import TTS from '../../views/UnitTest/TTS.vue'
import NXStream from '../../views/UnitTest/NXStream.vue'
import InAndOut from '../../views/UnitTest/InAndOut.vue'
import CMS from '../../views/UnitTest/CMS.vue'

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
        path: "/CMS",
        name: "CMS",
        component: CMS,
        meta: {
            requiredAuth: false,
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
