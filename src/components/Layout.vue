<script setup lang="ts">
import useIconStore from "../store/iconStore.ts";
import Icons from "./unit/Icons.vue";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import vMouseMenu from '../directive/mosue-menu/mouse-menu.ts'

const iconsInfo = useIconStore()

const {
  icons
} = storeToRefs(iconsInfo)
// const container = ref<HTMLElement>()
let originalEl: HTMLElement
let sourceEl: HTMLElement
let sourceInd: number
const offset = {
  x: 0,
  y: 0
}

function handleDragStart(e: DragEvent) {

  const target = e.target as HTMLElement //.item-container
  originalEl = target
  if (target.className == 'item-container') {
    sourceEl = target.cloneNode(true) as HTMLElement
    const containerEl = target.parentElement //容器
    sourceInd = Array.from(containerEl.children).indexOf(target)//要移动元素的index
    originalEl.style.visibility = 'hidden'

    sourceEl.style.position = 'fixed'
    // // 更新元素的位置为鼠标的位置
    sourceEl.style.left = 0 + 'px';
    sourceEl.style.top = 0 + 'px';
    // // 获取鼠标相对于该元素的位置
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    offset.x = e.offsetX
    offset.y = e.offsetY
    sourceEl.style.transform = `translate(${mouseX - e.offsetX}px,${mouseY - e.offsetY}px)`
    sourceEl.style.zIndex = "9"
    sourceEl.style.pointerEvents = "none"
    containerEl.append(sourceEl)
  }
}


function handleDragover(ev: MouseEvent) {
  if (sourceEl == null) {
    return
  }
  const mouseX = ev.clientX
  const mouseY = ev.clientY
  sourceEl.style.transform = `translate(${mouseX - offset.x}px,${mouseY - offset.y}px)`
  let target = ev.target as HTMLElement
  if (target.className == "item-container") {//在别的元素上
    const containerEl = target.parentElement //容器
    let curInd = Array.from(containerEl.children).indexOf(target)
    console.log("sour", sourceInd, "cur", curInd)
    iconsInfo.change(sourceInd, curInd)
    sourceInd = curInd
  }

}


let curUrl: string = ''

function handelDrop() {
  if (sourceEl != null) {
    sourceEl.parentElement.removeChild(sourceEl)
    originalEl.style.visibility = 'visible'
  }
  sourceEl = null

}

const menu = ref([
  {
    label: '当前页面打开', handler: () => {
      console.log(curUrl)
      window.open('http://' + curUrl);
      console.log("添加图标")
    }
  },
  {
    label: '新标签页打开', handler: () => {
      console.log("新标签页打开")
    }
  },
  {
    label: '编辑主页', handler: () => {
      console.log("编辑主页")
    }
  },
  {
    label: '编辑图标', handler: () => {
      console.log("编辑图标")
    }
  },
  {
    label: '添加图标', handler: () => {
      console.log("添加图标")
    }
  },
  {
    label: '删除图标', handler: () => {
      console.log("删除图标")
    }
  },

])


</script>

<template>
  <div class="back-box hide-scroll">
    <section class="main-box grid " @mousedown.left="handleDragStart" @mousemove="handleDragover"
             @mouseup.left="handelDrop">
      <TransitionGroup name="fade">
        <div v-mouse-menu="menu" @contextmenu="()=>curUrl=item.info.url" class="item-container"
             :style="{'grid-area': `span ${item.size.x} /span ${item.size.y}`}"
             v-for="(item) in icons"
             :key="item.info.name">
          <Icons :data="item"></Icons>
        </div>
      </TransitionGroup>
    </section>
    <slot name="leftBar"></slot>
  </div>

</template>

<style scoped lang="scss">

.back-box {
  height: 100%;
  scroll-behavior: smooth;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;

  }
}

.main-box {

  position: relative;
  margin: 0 auto;
  padding: 230px 20%;
  scroll-behavior: smooth;

}

.grid {
  display: grid;
  grid-auto-rows: 150px;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-auto-flow: dense;
  justify-content: center;
  align-items: center;
  justify-items: center;

  .item-container {
    position: relative;

    &::after {
      content: ' ';
      display: inline-block;
      width: 100%;
      height: 100%;
      //background: rgba(253, 251, 251, 0.16);
      top: 0;
      position: absolute;
    }
  }
}

.fade-move {
  transition: transform 1s ease-in-out;
}

</style>