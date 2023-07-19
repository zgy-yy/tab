<script setup lang="ts">
import {onUpdated, ref, watch} from "vue";

const props = defineProps<{ refresh: Boolean ,downimg:Boolean}>()
const img_url = ref('')
watch(() => props.refresh, () => {
  update()
})

watch(() => props.downimg, () => {
  downImg(img_url.value)
})



const client_id = "t-3ouylI0Bamt35tSGgnxpnuHAg26yiboPDar4VMRo4"

const url = 'https://source.unsplash.com/collection/1466477/1920x1080'

const stateStyle = ref('normal')

function randomImage() {
  return fetch(url).then(res => {
    img_url.value = res.url

    console.log(res.url)

  })
}

function update() {
  stateStyle.value = 'change'
  randomImage().then(() => {
    stateStyle.value = 'normal'
  })
}

function downImg(url) {
  fetch(url)
      .then(response => response.blob())
      .then(blob => {
        // 创建一个临时URL
        const imageUrl = URL.createObjectURL(blob);
        // 创建一个隐藏的链接并设置相关属性
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'image.png';

        // 模拟点击链接以开始下载
        link.dispatchEvent(new MouseEvent('click'));

        // 清除临时URL
        URL.revokeObjectURL(imageUrl);
      })
      .catch(error => {
        console.error('下载图像时出错:', error);
      });
}

randomImage()

</script>

<template>
  <div class="wrapper">
    <img class="bg-img" :class="stateStyle" :src="img_url" alt=""/>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  z-index: -1; /**/
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: #737373;
  overflow: hidden;


  .bg-img {
    z-index: -1;
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
    display: block;

    &.normal {
      filter: blur(1px);
      opacity: 0.9;
      transform: scale(1);
    }

    &.change {
      filter: blur(50px);
      opacity: 0.7;
      transform: scale(1.1);
    }
  }

}
</style>