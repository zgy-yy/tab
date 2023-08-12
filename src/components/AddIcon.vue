<script setup lang="ts">

import {reactive, ref, watch} from "vue";
import {debounce, getWebSitIcon} from "../utils";
import useIconStore from "../store/iconStore.ts";

const emits = defineEmits<{
  (e: 'closeMe', state: boolean): void
}>()


const iconStore = useIconStore()

const webUrl = ref('')

const iconMsg = reactive<{
  name: string,
  url: string,
  img: string
}>({
  name: '',
  url: '',
  img: ''
})

let blobImg: Blob;

const debouncedGetWebSitIcon = debounce<string>(getWebSitIcon, 300)


watch(webUrl, (value) => {
  iconMsg.url = webUrl.value
  debouncedGetWebSitIcon(value).then(res => {
    if (res instanceof Blob) {
      blobImg = res
      iconMsg.img = URL.createObjectURL(res)
    }
  })
})

function accomplish() {
  console.log(iconMsg)
  if (iconMsg.name === '' || iconMsg.url === '') {
    alert('')
    return
  }
  iconStore.addIcon({
    size: {
      x: 1, y: 1,
    },
    info: {
      ...iconMsg, img: blobImg
    }
  })
  emits("closeMe", true)
}

</script>

<template>
  <div class="main-body">
    <div class="title">
      <span>添加图标</span>
      <span class="get-all" @click="accomplish">完成</span>
    </div>
    <textarea v-model="webUrl" required class="input-url" rows="5" cols="40" placeholder="输入网址"></textarea>
    <input class="input-name" v-model="iconMsg.name" required placeholder="输入名称"/>
    <img class="icon-img" :src="iconMsg.img" alt=""/>
  </div>
</template>

<style scoped lang="scss">
.main-body {
  background: rgba(225, 225, 225, 0.8);
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;

  .title {
    margin: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;

    .get-all {
      background: cornflowerblue;
      padding: 6px 9px;
      border-radius: 6px;
      color: white;
    }
  }

  .input-url {
    border-radius: 10px;
    margin: 16px;
    padding-left: 12px;
    background: rgba(225, 225, 225, 0.9);;
    height: 86px;
    vertical-align: top;
  }

  .input-name {
    margin: 8px 16px;
    padding-left: 12px;
    border-radius: 10px;
    background: rgba(225, 225, 225, 0.9);
    height: 32px;

  }

  .icon-img {
    margin: 8px 16px;
    width: 48px;
  }
}
</style>