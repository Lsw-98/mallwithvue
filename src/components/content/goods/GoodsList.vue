<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
    ></goods-list-item>
    <!-- 展示父组件传过来的goods[type].list -->
    <!-- {{ goods }} -->
  </div>
</template>

<script>
// 商品展示单个项模块
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  // 父组件通过 props 向下传递数据给子组件
  // 要让子组件使用父组件的数据，需要通过子组件的 props 选项
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  /* 均等分 */
  justify-content: space-around;
  padding: 2px;
}
</style>