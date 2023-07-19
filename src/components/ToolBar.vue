<script setup lang="ts">

</script>


<!--侧边栏-->
<template>
  <div class="main">
    <div class="content hide-scroll setting">设置</div>
    <ol class="content hide-scroll">
      <li>主页</li>
      <li>设计</li>
      <li>程序</li>
      <li>购物</li>
    </ol>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/css/communal";

.main {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  & > .setting {
    margin-bottom: 10px;
  }

  .content {
    cursor: pointer;
    overflow: scroll;
    max-height: 50%;
    padding: 5px;
    border-radius: 10px;
    background: rgba(29, 29, 31, 0.12);
    backdrop-filter: saturate(190%) blur(10px);

    & > li {
      margin: 16px 2px;
    }
  }
}
</style>