import Vue from 'vue'
import Vuex from 'vuex'
// import VueResource from 'vue-resource'

Vue.use(Vuex)
// Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    contatoList: [],
    id: 0
  },
  mutations: {
    setContatoList (state, data) {
      state.contatoList.push(data)
    },
    updateContatoList (state, data) {      
      state.contatoList[data.id].name = data.item.name
      state.contatoList[data.id].email = data.item.email
      state.contatoList[data.id].numero = data.item.numero
    },
    setId (state, indice) {
      state.id = indice
    }
  },
  actions: {
    newContato (context, data) {      
      context.commit('setContatoList', data)
    },
    editContato (context, data) {      
      context.commit('updateContatoList', data)
    },
    getId (context, indice) {
      context.commit('setId', indice)
    }
  }
})
