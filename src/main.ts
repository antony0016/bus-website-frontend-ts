import { createApp } from 'vue'
import App from './App.vue'

// Router and Store instructor
import router from "./router";
import { createPinia } from "pinia";

// Element plus UI lib
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const vm = createApp(App)
vm.use(router).use(createPinia())
vm.use(ElementPlus)

vm.mount('#app')
