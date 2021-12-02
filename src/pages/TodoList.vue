<script setup>
import {Icon, List, SwipeCell, Cell, Button} from "vant"
import {ref} from "vue"
import { useRouter } from "vue-router"
import Header from "../components/Header.vue"

const router = useRouter()

const todoList = ref([])
const loading = ref(false)
const finished = ref(false)

const onLoad = async () => {
  
}

const goUpdateInfo = () => {
  router.push('/userInfo')
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
      <List
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <SwipeCell>
          <template #left>
            <Button type="success" square> 完成 </Button>
          </template>
          <Cell :border="false" square> 内容内容 </Cell>
          <template #right>
            <Button type="primary" square> 修改 </Button>
            <Button type="danger" square> 删除 </Button>
          </template>
        </SwipeCell>
      </List>
    </div>

    <div class="fixed-add">
      <Icon name="plus" />
    </div>
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
</style>
