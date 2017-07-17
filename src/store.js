import Vue from 'vue'
import Vuex from 'vuex'
// import VueResource from 'vue-resource'

Vue.use(Vuex)
// Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    contatoList: []
  },
  mutations: {
    setContatoList (state, data) {
      state.contatoList.push(data)
    },
    updateContatoList (state, data) {
      console.log(data)
    }
  },
  actions: {
    newContato (context, data) {      
      context.commit('setContatoList', data)
    },
    editContato (context, data) {
      context.commit('updateContatoList', data)
    }
  }
})
