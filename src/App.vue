<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import vMouseMenu from './directive/mosue-menu/mouse-menu.ts'
import {onMounted, ref} from "vue";
import background from "./components/Background.vue";

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
      console.log("随机壁纸")
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

const menus1 = ref([
  {
    label: '添加图标', handler: () => {
      console.log("添加图标")
    }
  },
  {
    label: '添加图标', handler: () => {
      console.log("添加图标")
    }
  }, {
    label: '添加图标', handler: () => {
      console.log("添加图标")
    }
  }

])

</script>

<template>
  <main class="page" v-mouse-menu="menus">
   <background></background>
    <hello-world></hello-world>
  </main>
</template>

<style scoped lang="scss">
.page {
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  box-sizing: border-box;
  position: relative;
}


</style>
