<script setup>
import {ref} from "vue"
import {Button, Field, Notify } from "vant"
import { useRouter, useRoute } from 'vue-router'
import request from '../utils/request'

const router = useRouter()
const route = useRoute()

const username = ref("")
const password = ref("")

const loginLoading = ref(false)

const goRegister = () => {
  router.push('/register')
}

const onLogin = async () => {
  const param = {
    username: username.value,
    password: password.value,
  }

  if (!username.value) {
    Notify({ type: 'warning', message: '用户名不合法' })
    return
  }

  if (!password.value) {
    Notify({ type: 'warning', message: '密码不合法' })
    return
  }

  loginLoading.value = true

  const data = await request.post('/api/user/login', param)

  loginLoading.value = false

  if (data.code === 0) {
    Notify({ type: 'success', message: '登录成功' })
    const { redirect } = route.query
    if (redirect) {
      const target = decodeURIComponent(redirect)
      router.push(target)
    } else {
      router.push('/list')
    }
  } else {
    Notify({ type: 'warning', message: data.msg })
  }
}

</script>

<template>
  <div class="container">
    <div class="login-box">
      <p class="title">登录</p>
      <Field v-model="username" placeholder="用户名" />
      <Field v-model="password" type="password" placeholder="密码" />
      <div class="mt20 register-box">
        <a href="##" class="register-btn" @click.stop.prevent="goRegister">
          没有帐号，去注册
        </a>
      </div>
      <Button type="primary" text="登录" size="small" block class="mt20" @click="onLogin" :loading="loginLoading" />
    </div>
  </div>
  
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-box {
  width: 80%;
  background-color: #fff;
  border-radius: 6px;
  padding: var(--padding-base);
}

.title {
  text-align: center;
  font-size: var(--font-size-large);
  color: var(--primary-color);
}

.register-box {
  text-align: right;
}

.register-btn {
  color: var(--primary-color);
  font-size: var(--font-size-small);
}

.mt20 {
  margin-top: 20px
}
</style>
