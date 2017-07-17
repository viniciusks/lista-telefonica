import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    },
    delContato (state, indice) {
      state.contatoList[indice].delete()
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
    },
    removeContato (context, indice) {
      context.commit('delContato', indice)
    }
  }
})
