// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import './assets/css/bootstrap.min.css'
import './assets/css/font-awesome.min.css'
import './assets/css/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
