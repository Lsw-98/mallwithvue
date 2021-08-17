<template>
  <!-- 通过给标签绑定ref可以指定获取到该标签 -->
  <!-- ref如果绑定在组件中，那么通过this.$refs.refname获取到的是一个组件对象 -->
  <!-- ref如果绑定在普通标签中，那么通过this.$refs.refname获取到的是一个元素对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 引入滚动js
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  components: {
    BScroll,
  },
  props: {
    // 将该属性封装，供不同组件使用
    // 再Home的scroll标签中进行实时监听, 这里将监听到的值拿到
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1.创建BetterScroll对象，给wrapper标签加上滚动
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    // 2.监听滚动位置，显示或隐藏回到顶部按钮
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on("scroll", (position) => {
        // 将实时滚动位置发出，传到Home组件
        this.$emit("scroll", position);
      });
    }

    // 3.监听上拉加载事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // 一旦滚动到底部，就传给Home
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // time = 300: 默认值为300
    scrollTo(x, y, time = 300) {
      // 先拿到scroll参数，再调用scrollTo()方法
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    // 封装一个scroll
    fPullUp() {
      this.scroll.finishPullUp();
    },

    refresh() {
      this.scroll && this.scroll.refresh();
    },

    // 获取离开当前组件时Y的坐标
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>