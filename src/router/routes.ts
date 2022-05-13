import Home from "../views/Home.vue";
import Login from '../views/Login.vue';
import AxiosExample from '../components/example/AxiosExample.vue';
import NotFound from '../views/NotFound.vue';
import NewTodoSample from '../components/example/NewTodoSample.vue';
import FindTodo from '../components/FindTodo.vue';
import NewTodo from '../components/NewTodo.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/AxiosExample",
    name: "AxiosExample",
    component: AxiosExample,
    meta: {
      requiredAuth: true,
    }
  },
  {
    path: "/NewTodoSample",
    name: "NewTodoSample",
    component: NewTodoSample
  },
  {
    path: "/NewTodo",
    name: "NewTodo",
    component: NewTodo
  },
  {
    path: "/FindTodo",
    name: "FindTodo",
    component: FindTodo
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  }
]

export default routes;
