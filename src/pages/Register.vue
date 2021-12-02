<script setup>
import { ref } from "vue"
import { CellGroup, Field, Form, Button, Notify } from "vant"
import { useRouter } from 'vue-router'
import request from "../utils/request"

import Header from '../components/Header.vue'

const router  = useRouter()

const username = ref('')
const password = ref('')
const surePassword = ref('')

const onSubmit = async (values) => {
  const {
    username: u,
    password: p,
    surePassword,
  } = values

  if (surePassword !== p) {
    Notify({ type: 'warning', message: '两次密码输入不一致' })
    return
  }

  const param = {
    username: u,
    password: p
  }

  const data = await request.post('/api/user/register', param)

  if (data.code === 0) {
    Notify({ type: 'success', message: '注册成功' })
    router.push('/login')
  } else {
    Notify({ type: 'warning', message: data.msg })
  }
}

const goLogin = () => {
  router.push('/login')
}

</script>

<template>
  <div class="container">

    <Header 
      title="注册"
    />

    <Form @submit="onSubmit">
      <CellGroup inset>
        <Field
          label="邮箱"
          placeholder="邮箱"
          name="username"
          v-model="username"
          :rules="[
            {
              pattern: /^\w+@[a-z0-9]+\.[a-z]{2,4}$/,
              message: '邮箱格式不正确'
            }
          ]"
        />
        <Field
          type="password"
          label="密码"
          name="password"
          placeholder="密码"
          v-model="password"
          :rules="[
            {
              pattern: /^[\w_@.,]{6,16}$/,
              message: '密码为6-16位的字母数字_@.,组合'
            }
          ]"
        />

        <Field
          type="password"
          label="确认密码"
          name="surePassword"
          placeholder="确认密码"
          v-model="surePassword"
          :rules="[
            {
              pattern: /^[\w_@.,]{6,16}$/,
              message: '密码为6-16位的字母数字_@.,组合'
            }
          ]"
        />
      </CellGroup>

      <div class="login-box">
        <a href="##" class="login-btn" @click.stop.prevent="goLogin">已有帐号，去登录</a>
      </div>

      <div class="button-box">
        <Button type="primary" round block size="small" native-type="submit">提交</Button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: var(--main-bg-color);
  box-sizing: border-box;
  padding-top: var(--space-with-head);
}

.login-box {
  text-align: right;
  padding: 6px 16px 0px 16px;
}

.login-btn {
  color: var(--primary-color);
  font-size: var(--font-size-small);
}

.button-box {
  padding: var(--padding-large);
}
</style>
