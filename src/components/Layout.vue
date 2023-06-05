<script setup lang="ts">
import {onMounted, ref} from "vue";
import useIconStore from "../store/iconStore.ts";
import Icons from "./unit/Icons.vue";
// import vMouseMenu from '../directive/mosue-menu/mouse-menu.ts'
const iconsInfo = useIconStore()

const container = ref<HTMLElement>()

let sourceEl: HTMLElement

function handleDragStart(e: DragEvent) {
  sourceEl = e.target as HTMLElement
  sourceEl.style.opacity = '0.01'
}

function handleDragover(ev: DragEvent) {
  ev.preventDefault();
}

let timer = -1;

function handleDragenter(ev: DragEvent) {
  ev.preventDefault();
  if (timer > 0) {
    return
  }
  const target = ev.target as HTMLElement

  if (target.getAttribute('draggable')) {
    if (target === container.value || target === sourceEl) {
      return false;
    }
    console.log(target)
    const childrenArr = Array.from(container.value.children)
    const targetIndex: number = childrenArr.indexOf(target)
    const sourceIndex: number = childrenArr.indexOf(sourceEl)

    iconsInfo.change(sourceIndex, targetIndex)
    timer = setTimeout(() => {
      timer = -1
    }, 500)

  }
}

function handelDrop(e) {
  sourceEl.style.opacity = '1'
}


</script>

<template>
  <div class="back-box hide-scroll">
    <section class="main-box grid" ref="container" @dragstart="handleDragStart" @dragover="handleDragover"
             @dragenter="handleDragenter"
             @drop="handelDrop">
      <TransitionGroup name="fade">
        <div draggable="true" :style="{'grid-area': `span ${item.size.x} /span ${item.size.y}`}"
             v-for="(item) in iconsInfo.iconInfo"
             :key="item.info.name">
          <Icons :data="item"></Icons>
        </div>
      </TransitionGroup>
    </section>
  </div>

</template>

<style scoped lang="scss">

.back-box {
  width: 100%;
  height: 100vh;
  scroll-behavior: smooth;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}

.main-box {
  margin: 0 auto;
  border: 1px solid #c25050;
  width: 80%;
  padding: 230px 0;
  scroll-behavior: smooth;
  overflow-y: auto;
}

.grid {
  display: grid;
  grid-auto-rows: 150px;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-auto-flow: dense;
  justify-content: center;
  align-items: center;
  justify-items: center;

  & > div {
    border: 1px solid red;
    width: 100%;
    height: 100%;
    padding: 20%;
  }
}

.fade-move {
  transition: transform 0.3s ease-in-out;
}

</style>