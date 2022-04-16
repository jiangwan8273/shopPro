import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rolesListDataPub: [] // 角色列表
  },
  mutations: {
    // 角色列表数据全局存储
    rolesData (state, step) {
      state.rolesListDataPub = step
    }
  },
  actions: {
  }
})
