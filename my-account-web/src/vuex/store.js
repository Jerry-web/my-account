/**
 * Created by Jerry on 2017/7/3.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    activeIndex: '/login'
  }
})

export default store
