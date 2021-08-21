import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

// 导入toast中的index.js文件
import toast from 'components/common/toast'

Vue.config.productionTip = false

// 默认情况下$bus是没有值的，需要new一个vue实例赋值给事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 使用fastclick解决移动端300ms延迟问题
FastClick.attach(document.body)

// 使用图片懒加载
// 将src="" 改为 v-lazy="isShowImage"
Vue.use(VueLazyload)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
