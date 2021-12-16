<script setup>
import {Icon, List, SwipeCell, Cell, Button, Tag, Popup, Row, Col, Dialog, DropdownMenu, DropdownItem} from "vant"
import {ref, watch} from "vue"
import {useRouter} from "vue-router"
import Header from "../components/Header.vue"
import request from "../utils/request"

import {importanceValueToColorMap, actions} from '../constants/importanceColorMap'

const sortActionsList = [
  {
    value: null,
    text: '全部',
  },
  ...actions.map(item => ({
    value: item.value,
    text: item.name,
  }))
]

const sortCompleteList = [
  {
    value: null,
    text: '全部',
  },
  {
    value: 0,
    text: '未完成',
  },
  {
    value: 1,
    text: '已完成',
  }
]

const router = useRouter()

const sortActions = ref(null)
const sortComplete = ref(null)

const todoList = ref([])
const loading = ref(false)
const finished = ref(false)

const curTodoItem = ref({})
const maskShow = ref(false)

const onLoad = async () => {
  const param = {
    complete: sortComplete.value,
    importanceValue: sortActions.value,
  }

  loading.value = true

  const data = await request.post('/api/auth/todo/query', param)

  if (data.code === 0) {
    todoList.value = data.data
  }

  loading.value = false
}

watch([sortComplete, sortActions], () => {
  onLoad()
})

const goUpdateInfo = () => {
  router.push('/userInfo')
}

const onGoAdd = () => {
  router.push('/add')
}

const viewDetail = (cur) => {
  console.log(cur)
  curTodoItem.value = cur
  maskShow.value = true
}

const onComplete = (cur) => {
  Dialog.confirm({
    title: cur.title,
    message: cur.content,
    beforeClose: async (action) => {
      if (action === 'confirm') {
        const param = {
          id: cur.id,
          complete: 1,
        }
        const data = await request.post('/api/auth/todo/update', param)

        if (data.code === 0) {
          todoList.value = todoList.value.filter(item => item.id !== cur.id)
        }
      }
      return true
    }
  })
}

const onUpdate = (cur) => {
  router.push(`/edit/${cur.id}`)
}

const onDel = (cur) => {
  Dialog.confirm({
    title: cur.title,
    message: cur.content,
    beforeClose: async (action) => {
      if (action === 'confirm') {
        const param = {
          id: cur.id,
        }
        const data = await request.post('/api/auth/todo/del', param)

        if (data.code === 0) {
          todoList.value = todoList.value.filter(item => item.id !== cur.id)
        }
      }
      return true
    }
  })
}

</script>

<template>
  <div class="container with-head">
    <Header title="TODO列表">
      <template v-slot:right>
        <div @click.stop="goUpdateInfo">
          <Icon name="manager-o" />
        </div>
      </template>
    </Header>

    <DropdownMenu>
      <DropdownItem :options="sortActionsList" v-model="sortActions" />
      <DropdownItem :options="sortCompleteList" v-model="sortComplete" />
    </DropdownMenu>

    <div class="scroll-box">
      <List v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <SwipeCell v-for="item in todoList" :key="item.id">
          <template #left>
            <Button
              class="swiper-button"
              type="success"
              square
              @click.stop.prevent="onComplete(item)"
            >完成</Button>
          </template>
          <Cell square :title="item.title" :label="item.deadline" @click="viewDetail(item)">
            <Tag :type="importanceValueToColorMap[item.importanceValue]">{{item.importanceName}}</Tag>
          </Cell>
          <template #right>
            <Button
              class="swiper-button"
              type="primary"
              square
              @click.stop.prevent="onUpdate(item)"
            >修改</Button>
            <Button class="swiper-button" type="danger" square @click="onDel(item)">删除</Button>
          </template>
        </SwipeCell>
      </List>
    </div>

    <div class="fixed-add" @click="onGoAdd">
      <Icon name="plus" />
    </div>

    <!-- 点击查看详细 -->
    <Popup v-model:show="maskShow" round>
      <div class="popup-body">
        <Row gutter="20" class="popup-body-item">
          <Col span="8">标题：</Col>
          <Col span="16">{{curTodoItem.title}}</Col>
        </Row>
        <Row gutter="20" class="popup-body-item">
          <Col span="8">重要程度：</Col>
          <Col span="16">
            <Tag
              :type="importanceValueToColorMap[curTodoItem.importanceValue]"
            >{{curTodoItem.importanceName}}</Tag>
          </Col>
        </Row>
        <Row gutter="20" class="popup-body-item">
          <Col span="8">截止时间：</Col>
          <Col span="16">{{curTodoItem.deadline}}</Col>
        </Row>
        <Row gutter="20" class="popup-body-item">
          <Col span="8">内容：</Col>
          <Col span="16" class="wrap-style">{{curTodoItem.content}}</Col>
        </Row>
      </div>
    </Popup>
  </div>
</template>

<style scoped>
.scroll-box {
  width: 100%;
  height: calc(100% - 48px);
}

.fixed-add {
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;
  bottom: 24px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #fff;
  background-color: var(--primary-color);
}

.swiper-button {
  height: 100%;
}

.popup-body {
  width: 340px;
  padding: 16px;
}

.popup-body-item {
  margin-top: 12px;
}

.wrap-style {
  white-space: pre-wrap;
}
</style>
