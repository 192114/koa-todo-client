import {createApp} from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// 动态导入
const Login = () => import('./pages/Login.vue')
const Register = () => import('./pages/Register.vue')
const UserInfo = () => import('./pages/UserInfo.vue')
const TodoList = () => import('./pages/TodoList.vue')
const EditTodo = () => import('./pages/EditTodo.vue')

import './assets/css/root.css'
import './assets/css/common.css'
import './assets/css/transition.css'

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
  {
    path: '/edit/:id',
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
