<script setup>
import { ref } from 'vue'
import {
  Form,
  CellGroup,
  Field,
  Cell,
  Button,
  ActionSheet,
  Tag,
  Calendar,
  Notify,
} from 'vant'
import { format } from 'date-fns'
import { useRouter } from 'vue-router'

import request from '../utils/request'

import Header from '../components/Header.vue'

const router = useRouter()

const actions = [
  { name: '优先', value: 1 },
  { name: '重要', value: 2 },
  { name: '普通', value: 3 },
]

const importanceValueToColorMap = {
  1: 'danger',
  2: 'warning',
  3: 'primary',
}

const title = ref('')
const content = ref('')
const importance = ref({ name: '普通', value: 3 })
const deadline = ref()

const actionShow = ref(false)
const calendarShow = ref(false)
const submitLoading = ref(false)

const onChooseImportance = (item) => {
  importance.value = item
  actionShow.value = false
}

const onChooseDate = (value) => {
  calendarShow.value = false
  deadline.value = format(value, 'yyyy-MM-dd 23:59:59')
}

const onSubmit = async () => {
  if (!title.value) {
    Notify({ type: 'warning', message: '请输入标题' })
    return
  }
  if (!content.value) {
    Notify({ type: 'warning', message: '请输入内容' })
    return
  }
  if (!deadline.value) {
    Notify({ type: 'warning', message: '请选择截止日期' })
    return
  }

  const param = {
    title: title.value,
    content: content.value,
    importanceType: importance.value.value,
    importanceName: importance.value.name,
    deadline: deadline.value,
  }

  submitLoading.value = true

  const data = await request.post('/api/auth/todo/add', param)
  
  submitLoading.value = false

  if (data.code === 0) {
    Notify({ type: 'success', message: '保存成功' })
    router.back()
  } else {
    Notify({ type: 'warning', message: data.msg })
  }
}
</script>

<template>
<div class="container with-head">
  <Header title="新增待办" />

  <Form @submit="onSubmit">
    <CellGroup inset>
      <Field 
        label="项目名称"
        maxlength="30"
        clearable
        name="title"
        v-model="title"
        placeholder="项目名称"
        show-word-limit
      />
      <Field 
        label="项目详情"
        maxlength="150"
        clearable
        name="content"
        v-model="content"
        type="textarea"
        autosize
        placeholder="项目内容"
        show-word-limit
      />

      <Cell 
        title="重要程度"
        is-link
        title-class="field-label"
        @click="actionShow = true"
      >
        <!-- 右侧value 插槽 -->
        <template #value>
          <Tag
            :type="importanceValueToColorMap[importance.value]"
          >
            {{importance.name}}
          </Tag>
        </template>
      </Cell>

      <Cell 
        title="截止日期"
        is-link
        title-class="field-label"
        @click="calendarShow=true"
        :value="deadline"
      />
    </CellGroup>

    <div class="button-box">
      <Button type="primary" block size="small" native-type="submit" :loading="submitLoading">提交</Button>
    </div>

  </Form>
</div>

<!-- 重要程度面板 -->
<ActionSheet
  v-model:show="actionShow" 
  :actions="actions" 
  @select="onChooseImportance" 
/>

<!-- 截至日期 -->
<Calendar 
  v-model:show="calendarShow"
  @confirm="onChooseDate"
/>
</template>

<style scoped>
.button-box {
  padding: var(--padding-large);
}
</style>