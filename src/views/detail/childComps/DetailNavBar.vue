<template>
  <div>
    <nav-bar class="nav-bar">
      <!-- 左插槽插入图片 -->
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <!-- 中间插槽插入选项 -->
      <div slot="center" class="titles">
        <div
          class="titles-item"
          v-for="(item, index) in titles"
          :key="index"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",

  components: {
    NavBar,
  },

  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },

  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },

    backClick() {
      // 返回上一级
      //   this.$router.go(-1);
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.titles {
  display: flex;
}

.titles-item {
  font-size: 15px;
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back img {
  margin-top: 12px;
}
</style>