<script setup>
import {ref} from "vue"
import {CellGroup, Field, Form, Button} from "vant"
import request from "../utils/request"

const username = ref('')
const password = ref('')
const surePassword = ref('')

const onSubmit = (values) => {
  console.log(values)
}

const onFailed = (values, errors) => {
  console.log(values, errors)
}

</script>

<template>
  <div class="container">
    <Form @submit="onSubmit" @failed="onFailed">
      <CellGroup 
        inset
      >
        <Field 
          label="邮箱"
          placeholder="邮箱"
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


      <div class="button-box">
        <Button type="primary" block size="small">提交</Button>
      </div>
    </Form>

  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  box-sizing: border-box;
  padding-top: 20px;
}

.button-box {
  padding: 16px;
}
</style>
