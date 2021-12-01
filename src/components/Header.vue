<script setup>
import {defineProps} from "vue"
import {Icon} from "vant"
import {useRouter} from "vue-router"

const router = useRouter()

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "标题",
  },
})

const emit = defineEmits(["onClose"])

const onBack = () => {
  emit("onClose")
  router.back()
}
</script>

<template>
  <header class="header">
    <div class="header-icon" @click.stop="onBack">
      <Icon name="arrow-left" />
    </div>

    <div class="header-title">
      {{ props.title }}
    </div>

    <div class="header-icon">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 46px;
  background-color: #fff;
  display: flex;
  align-items: center;
}

.header-title {
  text-align: center;
  line-height: 46px;
  font-size: 14px;
  color: #24292f;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.header-icon {
  width: 46px;
  text-align: center;
  line-height: 46px;
  font-size: 20px;
}
</style>
