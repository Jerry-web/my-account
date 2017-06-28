// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import config from './config'
import echarts from 'echarts'
import axios from 'axios'
import moment from 'moment';
import './assets/css/bootstrap.min.css'
import './assets/css/font-awesome.min.css'
import './assets/css/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.prototype.$http = axios
Vue.prototype.config = config
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment
Vue.config.productionTip = false
Vue.use(ElementUI)

// http请求拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {

  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  if (data.data.code == 8) {
    router.push('/login')
  } else {
    return data
  }
}, error => {

  return Promise.reject(error)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
