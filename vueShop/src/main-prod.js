import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入自定义静态css配置
import '@/assets/cssStatic/index.css'
// 引入自定义全局配置的 axios
import '@/utils/request.js'
// 引入自定义 api
import api from '@/api/index.js'

// 引入自定义过滤器
import filters from '@/filter/index.js'
// 全局导入自定义过滤器
for (const item in filters) {
  Vue.filter(item, filters[item])
}

Vue.prototype.$http = api
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
