<script setup lang="ts">
import {IconInfo} from "../../types/uintType.ts";

const props = defineProps<{ data: IconInfo }>()
</script>

<template>
  <div class="container">
    <img src="" alt="">
    <p>{{ data.info.name }}</p>
  </div>
</template>

<style scoped lang="scss">
.container {
  border: 1px solid red;
  background: #737373;
}
</style>