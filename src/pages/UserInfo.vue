<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {Form, Field, Uploader, Button, Notify, CellGroup} from "vant"
import Compressor from 'compressorjs'
import request from "../utils/request"

import Header from '../components/Header.vue'

const router = useRouter()

const nickname = ref('')
const headImgList = ref([])
const avatarUrl = ref('')

const onSubmit = async (values) => {
  const {
    nickname: n,
  } = values

  if (!avatarUrl.value) {
    Notify({ type: 'warning', message: '请上传头像' })
    return
  }

  const param = {
    nickname: n,
    headImg: avatarUrl.value,
  }

  const data = await request.post('/api/auth/user/updateInfo', param)

  if (data.code === 0) {
    Notify({ type: 'success', message: '保存成功' })
    router.back()
  } else {
    Notify({ type: 'warning', message: data.msg })
  }
}

const onBeforeLoad = async (param) => {
  // 默认开启 checkOrientation 选项 修改图片为正确的方向
  param.message = '上传中'
  param.status = 'uploading'

  return new Promise(resolve => {
    new Compressor(param, {
      quality: 0.6,
      success: (blob) => {
        // blob -> file 
        const f = new File([blob], blob.name, { type: blob.type, lastModified: blob.lastModified })
        resolve(f)
      },
      error(err) {
        Notify({ type: 'warning', message: err.message })
      }
    })
  })
}

const onUploadImg = async (param) => {
  const fd = new FormData()
  fd.append('file', param.file)

  const data = await request.post('/api/auth/uploadImg', fd, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  if (data.code === 0) {
    Notify({ type: 'success', message: '上传成功' })
    param.message = '上传成功'
    param.status = 'done'
    const { url } = data.data
    avatarUrl.value = url
  } else {
    Notify({ type: 'warning', message: data.msg })
    param.message = '上传失败'
    param.status = 'failed'
  }
}

</script>

<template>
  <div class="container with-head">
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
              :max-size="2 * 1024 * 1024"
              v-model="headImgList"
              :before-read="onBeforeLoad"
              :after-read="onUploadImg"
            />
          </template>
        </Field>
      </CellGroup>

      <div class="button-box">
        <Button type="primary" block size="small" native-type="submit">提交</Button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
.button-box {
  padding: 16px;
}
</style>
