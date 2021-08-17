import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 默认情况下$bus是没有值的，需要new一个vue实例赋值给事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
