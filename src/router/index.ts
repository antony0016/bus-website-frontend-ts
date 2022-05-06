import { createRouter, createWebHistory } from "vue-router";
import vr from "vue-router";
import Home from "../views/Home.vue";

// define your routes here
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
]

const router = createRouter({
  routes: routes,
  history: createWebHistory(""),
})

router.beforeEach((to, from) => {
  console.log(to, from);
})

export default router;
