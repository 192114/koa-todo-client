<script setup>
import request from '../utils/request'
import {ref} from "vue"
import {Button, Field, Notify } from "vant"

const username = ref("")
const password = ref("")

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

  const data = await request.post('/api/user/login', param)

  if (data.code === 0) {
    Notify({ type: 'success', message: data.msg })
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
      <Field v-model="password" placeholder="密码" />
      <Button type="primary" text="按钮" size="small" block class="mt20" @click="onLogin" />
    </div>
  </div>
  
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
}

.login-box {
  width: 80%;
  background-color: #fff;
  border-radius: 6px;
  padding: 12px;
}

.title {
  text-align: center;
  font-size: 20px;
  color: #1890ff;
}

.mt20 {
  margin-top: 20px
}
</style>
