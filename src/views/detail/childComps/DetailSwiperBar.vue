<template>
  <swiper class="detail-swiper-bar">
    <swiper-item v-for="(item, index) in swiperImage" :key="index">
      <!-- 这里是:src, 动态绑定数据 -->
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
// 导入轮播图组件
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiperBar",
  components: {
    Swiper,
    SwiperItem,
  },

  // 接收轮播图数据
  props: {
    swiperImage: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.detail-swiper-bar {
  height: 300px;
  overflow: hidden;
}
</style>