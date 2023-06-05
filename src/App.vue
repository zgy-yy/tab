<script setup lang="ts">
import vMouseMenu from './directive/mosue-menu/mouse-menu.ts'
import {ref} from "vue";
import background from "./components/Background.vue";
import layout from "./components/Layout.vue";

const fresh = ref(false)
const menus = ref([
  {
    label: '添加图标', handler: () => {
      console.log("添加图标")
    }
  },
  {
    label: '添加小组件', handler: () => {
      console.log("添加小组件")
    }
  },
  {
    label: '随机壁纸', handler: () => {
      fresh.value = !fresh.value
    }
  },
  {
    label: '下载壁纸', handler: () => {
      console.log("下载壁纸")
    }
  },
  {
    label: '编辑主页', handler: () => {
      console.log("编辑主页")
    }
  },

])

</script>

<template>
  <main class="page" v-mouse-menu="menus">
    <background :refresh="fresh"></background>
    <layout></layout>
  </main>
</template>

<style scoped lang="scss">
.page {
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  color: aliceblue;
}

</style>
