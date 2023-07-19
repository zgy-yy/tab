<script setup lang="ts">
import vMouseMenu from './directive/mosue-menu/mouse-menu.ts'
import {ref} from "vue";
import Background from "./components/Background.vue";
import Layout from "./components/Layout.vue";
import ToolBar from "./components/ToolBar.vue";

const fresh = ref(false)
const downImg = ref(false)
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
      downImg.value = !downImg.value
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
    <Background :refresh="fresh" :downimg="downImg"></Background>
    <Layout></Layout>
    <!--    <layout></layout>-->
    <ToolBar class="tool-bar"></ToolBar>
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

.tool-bar {
  position: absolute;
  top: 0;
  left: 10px;
}
</style>
