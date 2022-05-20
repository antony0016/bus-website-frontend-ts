import { createRouter, createWebHistory } from "vue-router";
import useLoginManagerStore from "../store/LoginManagerStore";
import routes from "./routes";

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
