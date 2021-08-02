<template>
  <!-- 监听点击事件 -->
  <div class="tab-bar-item" @click="itemClick">
    <!-- 设置插槽，动态添加TabBarItem的图片和文字 -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    // 接收传来的color
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      //   isActive: true,
    };
  },
  computed: {
    isActive() {
      // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
      //   /home -> item1(/home) = true
      //   /home -> item2(/category) = false
      //   /home -> item3(/shopcart) = false
      //   /home -> item4(/profile) = false
      return this.$route.path.indexOf(this.path) !== -1;
    },
    // 通过计算属性绑定color
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  /* 让四个底部bar均等分 */
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>