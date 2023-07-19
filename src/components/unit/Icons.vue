<script setup lang="ts">
import {IconInfo} from "../../types/uintType.ts";

const props = defineProps<{ data: IconInfo }>()
</script>

<template>
  <div class="container">
    <img :src="props.data.info.img" alt="">
    <p>{{ data.info.name }}</p>
  </div>

</template>

<style scoped lang="scss">
.container {
  position: relative;
  border: 1px solid red;
  background: #737373;

  img {
    height: 60px;
  }
}

</style>