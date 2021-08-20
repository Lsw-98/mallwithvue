<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
// 导入购物车商品项组件
import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";

// 导入BetterScroll
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters({
      cartList: "cartList",
    }),
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>