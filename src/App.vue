<template>
  <div id="app">
    <!-- 添加keep-alive，防止用户切换路由时路由销毁 -->
    <!-- 将Detail的排除在外：每次跳转Detail都是重新创建，离开Detail都会销毁 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
