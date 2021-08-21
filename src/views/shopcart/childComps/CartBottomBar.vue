<template>
  <div class="cart-bottom-bar">
    <div class="check-area">
      <check-button
        class="check-btn"
        :is-checked="allChecked"
        @click.native="clickAll"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      <span>合计:{{ totalPrice }}</span>
    </div>
    <div class="buy" @click="toBuy">
      <span>购买({{ checkedLength }})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkBtn/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  data() {
    return {};
  },
  computed: {
    totalPrice() {
      // 使用过滤器过滤掉没有被选中的商品
      // 然后计算总价
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            // preValue是当前价格
            return preValue + item.price * item.count;
          }, 0)
      );
    },
    checkedLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    allChecked() {
      // 先找没有被选中的商品，如果为0，则返回true
      if (this.$store.state.cartList.length == 0) {
        return false;
      }
      return !this.$store.state.cartList.filter((item) => !item.checked).length;
    },
  },
  methods: {
    clickAll() {
      if (this.allChecked) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
    toBuy() {
      if (!this.allChecked) {
        this.$toast.show("请选择商品");
      } else {
        this.$toast.show("正在前往购买界面...");
      }
    },
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
}

.check-area {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-btn {
  width: 22px;
  height: 22px;
  line-height: 22px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.buy {
  width: 90px;
  background-color: red;
  color: #fff;
  font-size: 18px;
  text-align: center;
}
</style>