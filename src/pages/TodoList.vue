<script setup>
import { Icon, List, SwipeCell, Cell, Button, Tag, Popup, Row, Col } from "vant"
import { ref } from "vue"
import { useRouter } from "vue-router"
import Header from "../components/Header.vue"
import request from "../utils/request"

import { importanceValueToColorMap } from '../constants/importanceColorMap'

const router = useRouter()

const todoList = ref([])
const loading = ref(false)
const finished = ref(false)

const curTodoItem = ref({})
const maskShow = ref(false)

const onLoad = async () => {
  const param = {

  }

  loading.value = true

  const data = await request.post('/api/auth/todo/query', param)

  if (data.code === 0) {
    todoList.value = data.data
  }

  loading.value = false
}

const goUpdateInfo = () => {
  router.push('/userInfo')
}

const onGoAdd = () => {
  router.push('/add')
}

const viewDetail = (cur) => {
  console.log(cur)
  // curTodoItem.value = cur
  maskShow.value = true
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

    <div class="scroll-box">
      <List v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <SwipeCell v-for="item in todoList" key="_id">
          <template #left>
            <Button class="swiper-button" type="success" square>完成</Button>
          </template>
          <Cell square :title="item.title" :label="item.deadline" @click="viewDetail(item)">
            <Tag :type="importanceValueToColorMap[item.importanceValue]">{{ item.importanceName }}</Tag>
          </Cell>
          <template #right>
            <Button class="swiper-button" type="primary" square>修改</Button>
            <Button class="swiper-button" type="danger" square>删除</Button>
          </template>
        </SwipeCell>
      </List>
    </div>

    <div class="fixed-add" @click="onGoAdd">
      <Icon name="plus" />
    </div>

    <!-- 点击查看详细 -->
    <Popup v-model="maskShow" round>
      <Row gutter="20">
        <Col span="8">重要程度：</Col>
        <Col span="16">
          <Tag
            :type="importanceValueToColorMap[curTodoItem.importanceValue]"
          >{{ curTodoItem.importanceName }}</Tag>
        </Col>

        <Col span="8">截止时间：</Col>
        <Col span="16">{{ curTodoItem.deadline }}</Col>
      </Row>
    </Popup>
  </div>
</template>

<style scoped>
.scroll-box {
  width: 100%;
  height: 100%;
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
</style>
