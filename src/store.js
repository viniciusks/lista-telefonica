import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contatoList: []
  },
  mutations: {
    setContatoList (state, data) {
      let indice = state.contatoList.length           
      data.id = indice
      state.contatoList.push(data)
    },
    updateContatoList (state, data) {      
      state.contatoList[data.id].name = data.inf.name
      state.contatoList[data.id].email = data.inf.email
      state.contatoList[data.id].numero = data.inf.numero      
    },
    setId (state, indice) {
      state.id = indice
    },
    delContato (state, indice) {
      let contatoList = state.contatoList
      contatoList.splice(contatoList.indexOf(indice), 1)
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
