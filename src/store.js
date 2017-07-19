import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contatoList: [],
    flag: 2
  },
  mutations: {
    setContatoList (state, data) {
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
      contatoList.splice(indice, 1)
    },
    syncIndicesMut (state) {      
      for(let i=0;i<state.contatoList.length;i++){        
        state.contatoList[i].id = i;
      }
    },
    setFlags (state) {
      for(let i=0;i<state.contatoList.length;i++){        
        state.contatoList[i].flag = 2;
      }
    },
    changeFlag (state, data) {
      if (data == 2) {
        data = 1
        state.flag = data
        console.log(data)
      }else if (data == 1){
        data = 2
        state.flag = data
      }
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
    },
    syncIndices (context) {
      context.commit('syncIndicesMut')
    },
    initSetFlags (context) {
      context.commit('setFlags')
    },
    getFlag (context, data) {
      context.commit('changeFlag', data)
    }
  }
})
