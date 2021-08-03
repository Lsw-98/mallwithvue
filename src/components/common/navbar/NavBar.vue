<template>
  <div class="nav-bar">
    <!-- 给插槽附名（具名插槽），到时候才能指定要插入哪个插槽 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.nav-bar {
  /* 决定了元素如何在页面上排列，使它们能在不同的屏幕尺寸和设备下可预测地展现出来 */
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}

.left,
.right {
  width: 60px;
}

.center {
  flex: 1;
}
</style>