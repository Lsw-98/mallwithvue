<template>
  <div id="home">
    <nav-bar class="home">
      <!-- 使用center插槽 -->
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
  </div>
</template>

<script>
// 组件导入
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";

// js导入
// 面向home.js开发
import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
  },
  data() {
    return {
      // 保存getHomeMultidata的res
      // 这里的数据不会被销毁
      banners: [],
      recommends: [],
    };
  },
  // 在组建创建好后发送网络请求
  // 声明生命周期函数
  created() {
    // 1.请求多个数据
    // created中的this就是该组件
    getHomeMultidata().then((res) => {
      // res会被回收，所以要保存到data()
      // 向上找对象
      // 得到轮播图和推荐信息
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
    // 2.
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>