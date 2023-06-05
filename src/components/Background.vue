<script setup lang="ts">
import {onUpdated, ref, watch} from "vue";

const props = defineProps<{ refresh: Boolean }>()

watch(() => props.refresh, () => {
    update()
})


const client_id = "t-3ouylI0Bamt35tSGgnxpnuHAg26yiboPDar4VMRo4"

const url = 'https://source.unsplash.com/collection/1466477/1920x1080'
const img_url = ref('')
const stateStyle = ref('normal')

function randomImage() {
  return fetch(url).then(res => {
    img_url.value = res.url
  })
}

function update() {
  stateStyle.value = 'change'
  randomImage().then(() => {
    stateStyle.value = 'normal'
  })
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