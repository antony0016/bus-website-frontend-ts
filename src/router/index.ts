import { createRouter, createWebHistory } from "vue-router";
import useLoginManagerStore from "../store/LoginManagerStore";


import BRoutes from "./routes/BRoutes";
import MRoutes from "./routes/MRoutes";
import CRoutes from "./routes/CRoutes";
import UnitTestRoutes from "./routes/UnitTest";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  ...BRoutes,
  ...CRoutes,
  ...MRoutes,
  ...UnitTestRoutes,
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
    if (to.name == 'Login' && loginManagerStore.loggedIn == true) {
      next({ path: "/" });
    } else {
      next();
    }
  }
})

export default router;
