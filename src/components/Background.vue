<script setup lang="ts">
import { ref} from "vue";

// const props = defineProps<{ refresh: Boolean ,downimg:Boolean}>()
const img_url = ref('')


const client_id = "t-3ouylI0Bamt35tSGgnxpnuHAg26yiboPDar4VMRo4"

const url = 'https://source.unsplash.com/collection/1466477/1920x1080'

const stateStyle = ref('normal')

function randomImage() {
  stateStyle.value = "change"
  fetch(url).then(res => {
    fetch(res.url).then(res => res.blob()).then(blob=>{
      let blobUrl = URL.createObjectURL(blob);

      // 设置Image元素的src属性为blobUrl
      img_url.value = blobUrl;
      stateStyle.value = "normal"
    })
  })
}

randomImage()

function downImg() {
  fetch(img_url.value)
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

defineExpose({
  randomImage,
  downImg
})

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