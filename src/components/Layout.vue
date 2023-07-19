<script setup lang="ts">
import {onMounted, ref} from "vue";
import useIconStore from "../store/iconStore.ts";
import Icons from "./unit/Icons.vue";
// import vMouseMenu from '../directive/mosue-menu/mouse-menu.ts'
const iconsInfo = useIconStore()

const container = ref<HTMLElement>()

let sourceEl: HTMLElement

const startPos = {
  x: 0,
  y: 0
}

function handleDragStart(e: DragEvent) {
  const target = e.target as HTMLElement
  if (target.parentElement.dataset.flag) {
    sourceEl = target.parentElement
    sourceEl.style.pointerEvents = "none"
    sourceEl.style.zIndex = '2';
    console.log(e)
    startPos.x = e.pageX
    startPos.y = e.pageY
  }


}

let timer = -1;
function handleDragover(ev: DragEvent) {
  if (sourceEl == null) {
    return
  }
  if (timer > 0) {
    return
  }
  sourceEl.style.transform = `translate(${ev.pageX - startPos.x}px,${ev.pageY - startPos.y}px)`
  let target = ev.target as HTMLElement
  if (target.className == "mask") {
    target = target.parentElement
    console.log(target.parentElement)
    const childrenArr = Array.from(container.value.children)
    const targetIndex: number = childrenArr.indexOf(target)
    const sourceIndex: number = childrenArr.indexOf(sourceEl)
    sourceEl.style.transform=''
    iconsInfo.change(sourceIndex, targetIndex)
      timer = setTimeout(() => {
        timer = -1
      }, 500)
  }


}



function handleDragenter(ev: DragEvent) {

  // return
  // ev.preventDefault();
  // if (timer > 0) {
  //   return
  // }
  // const target = ev.target as HTMLElement
  // if (target.getAttribute('draggable')) {
  //   if (target === container.value || target === sourceEl) {
  //     return false;
  //   }
  //   console.log(target)

  //
  //   iconsInfo.change(sourceIndex, targetIndex)

  //
  // }
}

function handelDrop(e) {
  if (sourceEl != null) {
    sourceEl.style.pointerEvents = "auto"
    sourceEl.style.zIndex = "0"
  }

  sourceEl = null
  // sourceEl.style.opacity = '1'
}


</script>

<template>
  <div class="back-box hide-scroll">
    <section class="main-box grid" ref="container" @mousedown="handleDragStart" @mousemove="handleDragover"
             @mouseup="handelDrop">
      <TransitionGroup name="fade">
        <div data-flag="item" :style="{'grid-area': `span ${item.size.x} /span ${item.size.y}`}"
             v-for="(item) in iconsInfo.iconInfo"
             :key="item.info.name">
          <Icons :data="item"></Icons>
          <p class="mask">
          </p>
        </div>
      </TransitionGroup>
    </section>
  </div>

</template>

<style scoped lang="scss">

.back-box {
  //background: #383838;
  width: 100%;
  //height: 100vh;
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
  //cursor: move;
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
    position: relative;
    //width: 100%;
    //height: 100%;
    //padding: 20%;
  }
}

.fade-move {
  transition: transform 0.3s ease-in-out;
}

.mask {
  top: 0;
  position: absolute;
  border: 1px solid green;
  //background: #383838;
  width: 100%;
  height: 100%;
}
</style>