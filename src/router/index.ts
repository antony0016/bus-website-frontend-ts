import { createRouter, createWebHistory } from "vue-router";
import useLoginManagerStore from "../store/LoginManagerStore";


import BRoutes from "./routes/BRoutes";
import MRoutes from "./routes/MRoutes";
import CRoutes from "./routes/CRoutes";
import UnitTestRoutes from "./routes/UnitTest";

import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import Manage from "../views/Manage_Page.vue";
import Platform from "../views/Platform_Page.vue";
import Control from "../views/Control_Page.vue";
import System from "../views/System_Page.vue";

const routes = [
    ...BRoutes,
    ...CRoutes,
    ...MRoutes,
    ...UnitTestRoutes,
    {
        path: "/",
        name: "Home",
        component: Control,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound
    },
    {
        path: "/Manage",
        name: "Manage",
        component: Manage,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: "/Platform",
        name: "Platform",
        component: Platform,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: "/Control",
        name: "Control",
        component: Control,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: "/System",
        name: "System",
        component: System,
        meta: {
            requiredAuth: true,
        }
    },
]

const router = createRouter({
    routes: routes,
    history: createWebHistory(""),
})

router.beforeEach((to, from, next) => {
    const loginManagerStore = useLoginManagerStore();
    console.log(to, from);
    if (to.matched.some(record => record.meta.requiredAuth)) {
        loginManagerStore.loggedIn ? next() : next({ path: "/login" })
    } else {
        if (to.name == 'Login' && loginManagerStore.loggedIn) {
            next({ path: "/" });
        } else {
            next();
        }
    }
})

export default router;
