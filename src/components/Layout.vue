<script setup lang="ts">

</script>

<template>
  <div class="back-box hide-scroll">
    <section class="main-box grid">
      <slot name="default"></slot>
    </section>
  </div>

</template>

<style scoped lang="scss">

.back-box {
  width: 100%;
  height: 100vh;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}

.main-box {
  border: 1px solid #c25050;
  width: 80%;
  padding: 230px;
  scroll-behavior: smooth;
  overflow-y: auto;
}

.grid {
  display: grid;
  grid-auto-rows: 100px;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-auto-flow: dense;
  justify-content: center;
  align-items: center;
  justify-items: center;


}
</style>