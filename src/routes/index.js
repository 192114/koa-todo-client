import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'

// 动态导入
const Login = () => import('../pages/Login.vue')
const Register = () => import('../pages/Register.vue')
const UserInfo = () => import('../pages/UserInfo.vue')
const TodoList = () => import('../pages/TodoList.vue')
const EditTodo = () => import('../pages/EditTodo.vue')

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login',
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
  },
  {
    path: '/userInfo',
    component: UserInfo,
    name: 'userInfo',
  },
  {
    path: '/list',
    component: TodoList,
    name: 'list',
  },
  {
    path: '/add',
    component: EditTodo,
    name: 'add',
  },
  {
    path: '/edit/:id',
    component: EditTodo,
    name: 'edit',
  },
]

const router = createRouter({
  history: createWebHistory('/mytodo/'),
  routes,
})

router.beforeEach((to, from, next) => {
  const haveSession = Cookies.get('session_id')
  
  if (!haveSession && to.name !== 'login' && to.name !== 'register') {
    // 重定向到login
    next({
      path: '/login',
      query: {
        redirect: encodeURIComponent(to.fullPath),
      }
    })

    return
  } 

  next()
})

router.afterEach((to, from) => {
  sessionStorage.setItem('curFullPath', to.fullPath)
})

export default router