<script setup>
import {ref} from 'vue'
import {Form, Field, Uploader, Button, Notify, CellGroup} from "vant"
import request from "../utils/request"

import Header from '../components/Header.vue'

const nickname = ref('')
const headImgList = ref([])

const onSubmit = async (values) => {
  const {
    nickname: n,
    headImgList: imgList,
  } = values

  if (!imgList[0]) {
    Notify({ type: 'warning', message: '请上传头像' })
    return
  }

  const param = {
    nickname: n,
    headImg: imgList[0],
  }

  const data = await request.post('/api/user/updateInfo', param)

  if (data.code === 0) {
    Notify({ type: 'success', message: '注册成功' })
  } else {
    Notify({ type: 'warning', message: data.msg })
  }
}

</script>

<template>
  <div class="container">
    <Header 
      title="个人信息"
    />

    <Form @submit="onSubmit">
      <CellGroup inset>
        <Field
          label="用户昵称"
          placeholder="用户昵称"
          v-model="nickname"
          name="nickname"
          :rules="[
            {
              pattern: /^\w{3,8}$/,
              message: '昵称格式不正确',
            },
          ]"
        />

        <Field
          label="头像"
          name="headImgList"
        >
          <template #input>
            <Uploader 
              :max-count="1"
              v-model="headImgList"
            />
          </template>
        </Field>
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
  padding-top: 64px;
}

.button-box {
  padding: 16px;
}
</style>
