import Home from "../views/Home.vue";
import Login from '../views/Login.vue';
import Example1 from '../components/example/Example1.vue'
import Example2 from '../components/example/Example2.vue'
import NotFound from '../views/NotFound.vue';


const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/example1",
    name: "Example1",
    component: Example1,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/example2",
    name: "Example2",
    component: Example2,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: NotFound,
  },
]

export default routes;
