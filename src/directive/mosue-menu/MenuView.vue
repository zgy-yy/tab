<script setup lang="ts">
import {MenuTag} from "../direct-type.ts";
import {h, nextTick, onUpdated, ref} from "vue";

const props = defineProps<{ tags: MenuTag[], position: { x: number, y: number }, parEl: HTMLElement }>()


const menuRef = ref<Element>()
const parelSize = {
  width: props.parEl.getBoundingClientRect().width,
  height: props.parEl.getBoundingClientRect().height
}
const posi = ref({
  x: props.position.x + 'px',
  y: props.position.y + 'px'
})
nextTick(() => {
  const {width, height} = menuRef.value.getBoundingClientRect()
  if (props.position.x + width > parelSize.width) {
    posi.value.x = parelSize.width - width - 5 + 'px'
  }
  if (props.position.y + height > parelSize.height) {
    posi.value.y = parelSize.height - height - 5 + 'px'
  }
})

function stopEvent(e: Event) {
  e.preventDefault()//禁止默认行为
  e.stopPropagation()//停止冒泡 不会改变位置
}

</script>

<template>
  <div class="mouse-menu" ref="menuRef" @contextmenu="stopEvent">
    <p v-for="item in tags" @click="item.handler">{{ item.label }}</p>
  </div>
</template>

<style scoped lang="scss">
.mouse-menu {
  position: absolute;
  cursor: pointer;
  display: inline-block;
  padding: 12px;

  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  user-select: none;
  white-space: nowrap;
  left: v-bind('posi.x');
  top: v-bind('posi.y');

  & > p {
    text-align: center;
    //padding: 8px;
    border-radius: 5px;

    &:hover {
      background: rgba(183, 181, 181, 0.9);
    }
  }
}
</style>