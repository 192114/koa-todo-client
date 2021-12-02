import {createApp} from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import UserInfo from './pages/UserInfo.vue'
import TodoList from './pages/TodoList.vue'
import EditTodo from './pages/EditTodo.vue'

import './assets/css/root.css'
import './assets/css/common.css'

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/userInfo',
    component: UserInfo,
  },
  {
    path: '/list',
    component: TodoList,
  },
  {
    path: '/add',
    component: EditTodo,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
