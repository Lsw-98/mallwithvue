<template>
  <div id="home">
    <nav-bar class="home">
      <!-- 使用center插槽 -->
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- :probe-type传过去的是值， probe-type传过去的是字符串 -->
    <!-- @scroll: 接收Scroll.vue传来的实时滚动位置 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <!-- 通过v-bind传入标题名 -->
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <!-- 通过v-bind动态给GoodsList组件中的props中的goods赋值 -->
      <!-- 这里就是把goods['pop'].list赋值给GoodsList组件中的props中的goods -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 监听组件点击 -->
    <!-- 如果自定义组件想被监听，需要加上.native修饰符 -->
    <!-- 当我们想监听一个组件的原生事件时，必须给对应的事件加上.natice修饰符 -->
    <!-- v-show:判断回到顶部按钮是否显示 -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 组件导入
// 顶部栏模块
import NavBar from "components/common/navbar/NavBar";
// 轮播图模块
import HomeSwiper from "./childComps/HomeSwiper";
// 推荐模块（轮播图下面）
import HomeRecommendView from "./childComps/HomeRecommendView";
// 本周流行模块
import FeatureView from "./childComps/Feature";
// 标题模块
import TabControl from "components/content/tabControl/TabControl";

// 商品展示模块
import GoodsList from "components/content/goods/GoodsList";

// 导入滚动
import Scroll from "components/common/scroll/Scroll";

// 导入回到顶部组件
import BackTop from "components/content/backTop/BackTop";

// js导入
// 面向home.js开发
// 导入封装好的请求方法
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // 保存getHomeMultidata的res
      // 这里的数据不会被销毁
      banners: [],
      recommends: [],
      // 设计三个对象，用于请求数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // 在组建创建好后发送网络请求
  // 声明生命周期函数
  created() {
    // 调用methods中封装好的getHomeMultidata()方法
    this.getHM();
    this.getHG("pop");
    this.getHG("new");
    this.getHG("sell");
  },
  methods: {
    // 将请求封装到methods中
    getHM() {
      // 网络请求
      // 1.请求多个数据
      // created中的this就是该组件
      getHomeMultidata().then((res) => {
        // res会被回收，所以要保存到data()
        // 向上找对象
        // 得到轮播图和推荐信息
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHG(type) {
      // 2.请求商品数据
      // 得到当前类型的page，然后加一
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.fPullUp();
      });
    },

    // 事件监听
    tabClick(index) {
      // 得到当前被点击的索引
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },

    // 回到顶部事件监听
    backTopClick() {
      // scrollTo(x, y, time)
      // 先拿到scroll组件，然后拿到scroll组件中的scroll值，最后调用scrollTo()方法
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500);

      // 这种方法封装了scroll参数, 就不需要额外调用scroll参数了, 直接调用scrollTo()方法
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    // 实时监听滚动事件
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
    },

    // 上拉加载更多事件
    loadMore() {
      this.getHG(this.currentType);
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  /* 
    vh就是当前屏幕可见高度的1%，也就是说 height:100vh == height:100% 
    当元素没有内容时候，设置height:100%，该元素不会被撑开，此时高度为0，
    设置height:100vh，该元素会被撑开屏幕高度一致。
  */
  height: 100vh;
  position: relative;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;

  /* 固定顶部栏 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9;
}

.tab-control {
  /* 当滚动到距顶部44px时，sticky会自动把position改为fixed,以此来固定标题栏 */
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  height: calc(100% - 93px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0px;
}

/* .content{
  height: calc(100% -93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>