<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"> </detail-nav-bar>
    <scroll class="content-scroll" ref="scroll">
      <!-- 4. 动态绑定轮播图数据 -->
      <detail-swiper-bar :swiper-image="swiperImage"></detail-swiper-bar>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailMessage"
        @imageLoad="isImageLoad()"
      ></detail-goods-info>
      <detail-param-info :param-info="paramsInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
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

// 导入betterScroll
import Scroll from "components/common/scroll/Scroll";

// 导入GoodList组件显示推荐商品
import GoodsList from "components/content/goods/GoodsList";

// 导入混路
import { itemImageListenerMixin } from "common/mixin";

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
    Scroll,
    GoodsList,
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
    };
  },

  methods: {
    isImageLoad() {
      this.$refs.scroll.refresh();
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
    });

    // 3. 请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },

  mounted() {
  },

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
  height: calc(100% - 44px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>