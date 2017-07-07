import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contatoList: []
  },
  mutation: {
    updateContatoList (state, data) {
      state.contatoList = data
    }
  },
  action: {
    newContato (context, data) {
      context.commit('updateContatoList')
    }
  }
})
