<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav">
    </detail-nav-bar>
    <!-- 
      传probe-type过去
      接收@scroll事件
     -->
    <scroll
      class="content-scroll"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <!-- 4. 动态绑定轮播图数据 -->
      <!-- 传入属性时写成小写加-的形式 -->
      <detail-swiper-bar :swiper-image="swiperImage"></detail-swiper-bar>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailMessage"
        @imageLoad="isImageLoad()"
      ></detail-goods-info>
      <detail-param-info
        :param-info="paramsInfo"
        ref="param"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 导入顶部栏组件
import DetailNavBar from "./childComps/DetailNavBar";
// 3. 导入轮播图组件
import DetailSwiperBar from "./childComps/DetailSwiperBar";
// 导入详情页基本信息组件
import DetailBaseInfo from "./childComps/DetailBaseInfo";
// 导入店铺信息组件
import DetailShopInfo from "./childComps/DetailShopInfo";
// 导入商品详情信息组件
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
// 导入商品参数信息组件
import DetailParamInfo from "./childComps/DetailParamInfo";
// 导入商品评论信息组件
import DetailCommentInfo from "./childComps/DetailCommentInfo";
// 导入底部工具栏
import DetailBottomBar from "./childComps/DetaiBottomBar";

// 导入betterScroll
import Scroll from "components/common/scroll/Scroll";

// 导入GoodList组件显示推荐商品
import GoodsList from "components/content/goods/GoodsList";

// 导入回到顶部组件
import BackTop from "components/content/backTop/BackTop";

// 导入混路
import { itemImageListenerMixin } from "common/mixin";

// 导入防抖
import { debounce } from "common/utils";

import {
  getDetail,
  GoodsInfo,
  ShopInfo,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",

  components: {
    DetailNavBar,
    DetailSwiperBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
  },

  mixins: [itemImageListenerMixin],

  data() {
    return {
      iid: null,
      // 1. 定义轮播图数组
      swiperImage: [],
      goodsInfo: {},
      shopInfo: {},
      detailMessage: {},
      paramsInfo: {},
      commentInfo: {},

      // 推荐数据
      recommends: [],

      themeTopYs: [],
      getThemeTopY: null,

      currentIndex: 0,
      isShowBackTop: false,
    };
  },

  methods: {
    isImageLoad() {
      this.$refs.scroll.refresh();
      // 调用getThemeTopY()方法
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // 1.获取当前滚动到的y
      const positionY = -position.y;

      // 2.positionY和主题栏做判断
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          // this.currentIndex !== i &&
          // ((i < length - 1 &&
          //   positionY >= this.themeTopYs[i] &&
          //   positionY < this.themeTopYs[i + 1]) ||
          //   (i == length - 1 && positionY >= this.themeTopYs[i]))
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 实时监听滚动位置，实现回到顶部
      this.isShowBackTop = -position.y > 1000;
    },
    backTop() {
      // scrollTo(x, y, time)
      // 先拿到scroll组件，然后拿到scroll组件中的scroll值，最后调用scrollTo()方法
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500);

      // 这种方法封装了scroll参数, 就不需要额外调用scroll参数了, 直接调用scrollTo()方法
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    addToCart() {
      // 添加购物车
      // 1.获取购物车需要展示的商品信息
      const product = {};
      product.image = this.swiperImage[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车
      // vuex管理商品信息
      // 使用commit方法传product
      // this.$store.commit("addCart", product);   // mutations中调用方式
      this.$store.dispatch("addCart", product); // actions中调用方式
      console.log(this.$store.state.cartList);
    },
  },

  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid;

    // 2. 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 2. 从服务器请求获取轮播图数据
      const data = res.result;
      this.swiperImage = data.itemInfo.topImages;

      // 获取商品信息
      this.goodsInfo = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取店铺信息类
      this.shopInfo = new ShopInfo(data.shopInfo);

      // 获取商品详细信息
      this.detailMessage = data.detailInfo;

      // 获取商品参数信息
      this.paramsInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 下一帧函数，当DOM全部渲染完成后回调一次，但图片不一定渲染完
      // this.$nextTick(() => {
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // });
    });

    // 3. 请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    // 4. 使用防抖，等图片渲染完后定位Y
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },

  mounted() {},

  updated() {},

  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
};
</script>

<style scoped>
/* 将底部菜单栏覆盖 */
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content-scroll {
  height: calc(100% - 44px - 49px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>