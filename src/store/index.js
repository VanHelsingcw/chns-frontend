import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userFilterInfo: {
      healthFilterInfoObj: {},
      propertyFilterInfoObj: {},
      year: ''
    }
  },
  mutations: {
    setuserFilterInfo(state, obj) {
      state.userFilterInfo.healthFilterInfoObj = obj.healthFilterInfoObj
      state.userFilterInfo.propertyFilterInfoObj = obj.propertyFilterInfoObj
      state.userFilterInfo.year = obj.year
    }
  },
  actions: {},
  modules: {}
})
