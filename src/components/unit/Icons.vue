<script setup lang="ts">
import {IconInfo} from "../../types/uintType.ts";
import {toRefs} from "vue";

const props = defineProps<{ data: IconInfo }>()
const {data} = toRefs(props)
const imgUrl = URL.createObjectURL(data.value.info.img)


</script>

<template>
  <div class="container">
    <img :src="imgUrl" alt="">
    <p class="name no-wrap">{{ data.info.name }}</p>
  </div>

</template>

<style scoped lang="scss">
.container {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: 60px;
    width: 60px;
    border-radius: 9px;
  }

  .name {
    font-size: 14px;
    margin-top: 10px;
    width: 100%;
    text-align: center;
  }
}

</style>