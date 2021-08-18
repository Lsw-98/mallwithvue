<template>
  <div class="goods-item" @click="itemClick">
    <!-- @load="imageload" 监听图片是否加载完成, 当图片加载完后，就会执行imageLoad()方法-->
    <img :src="isShowImage" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    isShowImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    // 当图片加载完后，会调用imageLoad()函数
    imageLoad() {
      // 事件总线：解决组件间通信问题
      // 在Vue中可以使用 EventBus 来作为沟通桥梁的概念，就像是所有组件共用相同的事件中心，
      // 可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件
      // 通过this.$bus.emit('事件名')来发送事件
      // 通过this.$bus.$on('事件名', 箭头函数)监听事件，见Home.vue
      this.$bus.$emit("itemImageLoad");
    },

    itemClick() {
      // 点击item跳转到详情页
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>