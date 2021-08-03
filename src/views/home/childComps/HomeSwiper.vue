<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <!-- 如果用item中的属性，需要绑定 -->
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 导入轮播图
// 当导出的是对象时，可以一起导入
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  // 导入属性
  props: {
    banners: {
      type: Array,
      default() {
        return []
      },
    },
  },
  components: {
    SwiperItem,
    Swiper,
  },
};
</script>

<style scoped>
</style>