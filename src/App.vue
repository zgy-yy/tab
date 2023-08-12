<script setup lang="ts">
import vMouseMenu from './directive/mosue-menu/mouse-menu.ts'
import {ref} from "vue";
import Background from "./components/Background.vue";
import Layout from "./components/Layout.vue";
import ToolBar from "./components/ToolBar.vue";
import AddIcon from "./components/AddIcon.vue";
import useIconStore from "./store/iconStore.ts";

const iconStore = useIconStore()
iconStore.getIcons()

const bgRef = ref()

const showAddIcon = ref(false)
const menus = ref([
  {
    label: '添加图标', handler: () => {
      showAddIcon.value = true
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
      bgRef.value.randomImage();
    }
  },
  {
    label: '下载壁纸', handler: () => {
      bgRef.value.downImg()
    }
  },
  {
    label: '编辑主页', handler: () => {
      console.log("编辑主页")
    }
  },

])
const men = ref([{
  label: '编辑主页', handler: () => {
    console.log("编辑主页")
  }
}])
// storage


</script>

<template>
  <main class="page" v-mouse-menu="menus">
    <Background ref="bgRef"></Background>
    <Layout>
      <template #leftBar>
        <ToolBar class="tool-bar" v-mouse-menu="men"></ToolBar>

      </template>
    </Layout>
    <add-icon v-if="showAddIcon" @close-me="state =>{ showAddIcon=!state}" class="add-icon"/>
  </main>
</template>

<style scoped lang="scss">
.page {
  max-width: 100%;
  height: 100%;
  //max-height: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  color: aliceblue;
}

.tool-bar {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 10px;
}

.add-icon {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
}
</style>
On branch master
Your branch and 'origin/master' have diverged,
and have 3 and 1 different commits each, respectively.
(use "git pull" to merge the remote branch into yours)
