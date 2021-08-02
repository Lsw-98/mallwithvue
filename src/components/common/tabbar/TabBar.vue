<template>
  <!-- 设计页面底部bar -->
  <div id="tab-bar">
    <!-- 设置一个插槽, 动态添加TabBarItem -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  /* 生成绝对定位的元素，相对于浏览器窗口进行定位。 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /* 做一个阴影 */
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.15);
}
</style>