<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import vMouseMenu from './directive/mosue-menu/mouse-menu.ts'
import {onMounted, ref} from "vue";
import background from "./components/Background.vue";
import Layout from "./components/Layout.vue";

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
    <layout>
     <template #default>
       <div class="item" v-for="item in 90" >{{ item }}</div>
     </template>
    </layout>
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
.item{
  border: 1px solid #c9b3b3;
  width: 80%;
  height: 80%;
}
div.item:first-child {
  grid-area: span 1 / span 2;
  color: #b99f9f;
  background-color: red;
}

div.item:nth-child(5) {
  grid-area: span 2 / span 2;
  background-color: red;
}
div.item:nth-child(28) {
  grid-area: span 2 / span 3;
  background-color: red;
}

</style>
