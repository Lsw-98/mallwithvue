<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    // 浏览商品时的标题名
    // 传入一个数组，数据为标题名
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // 记录当前谁被选中
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      // 判断当前谁处于点击状态
      this.currentIndex = index;
      // 子给父传参用emit
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}

.tab-control-item {
  flex: 1;
  background-color: #fff;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 3px solid var(--color-high-text);
}
</style>