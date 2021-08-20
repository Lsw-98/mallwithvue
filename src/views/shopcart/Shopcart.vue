<template>
  <div class="shop-cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
// 导入头部导航栏组件
import NavBar from "components/common/navbar/NavBar";
// 导入商品列表展示组件
import CartList from "./childComps/CartList";
// 导入底部工具栏
import CartBottomBar from "./childComps/CartBottomBar";

// 导入mapGetters
// mapGetters辅助函数：仅仅是将store中的getters映射到局部计算属性
import { mapGetters } from "vuex";

export default {
  name: "Shopcart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters({
      length: "cartLength",
    }),
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.shop-cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;
}
</style>