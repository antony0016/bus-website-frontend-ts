import Home from "../views/Home.vue";
import Login from '../views/Login.vue';
import Example1 from '../components/example/Example1.vue'
import Example2 from '../components/example/Example2.vue'
import NotFound from '../views/NotFound.vue';
import Sample from '../components/Sample.vue';
import NewTodoSample from '../components/NewTodoSample.vue';
import FindTodo from '../components/FindTodo.vue';
import NewTodo from '../components/NewTodo.vue';

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
    path: "/sample",
    name: "Sample",
    component: Sample,
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
  }
]

export default routes;
