import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clienteSelecionado: [],
    contatoList: [],
    servicos: [],
    vendas: [],
    total: 0
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
    delContato (state, indice) {
      let contatoList = state.contatoList
      contatoList.splice(indice, 1)
    },
    syncIndicesMut (state) {      
      for(let i=0;i<state.contatoList.length;i++){        
        state.contatoList[i].id = i;
      }
    },
    syncIndiceServicoMut (state, data) {
      for (let i=0;i<state.vendas[data.id].servicos.length;i++) {
        state.vendas[data.id].servicos[i].indice = i
      }
    },
    setId (state, indice) {
      state.id = indice
    },
    setInformacao (state, indice) {
      state.clienteSelecionado = state.contatoList[indice]
    },
    delInformacaoStore (state) {
      state.clienteSelecionado = ''
    },
    setTotal (state, data) {
      state.total += data.price
    },
    delTotalMut (state, data) {
      state.total -= data.price
    },
    delTotalVendaMut (state, data) {
      state.vendas[data.id].total -= data.servico.price
    },
    setFinalizar (state, data) {
      state.vendas.push(data)
    },
    setServico (state, data) {
      state.servicos.push(data)
    },
    delServicoMut (state, data) {
      let servicos = state.servicos
      servicos.splice(data, 1)
    },
    excluirServicoMut (state, data) {
      let indice = data.servico.indice
      let dado = state.vendas[data.id].servicos
      state.vendas[data.id].qtdServicos -= 1
      dado.splice(indice, 1)
      console.log(state.vendas)
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
    syncIndiceServico (context, data) {
      context.commit('syncIndiceServicoMut', data)
    },
    getInformacao (context, indice) {
      context.commit('setInformacao', indice)
    },
    delInformacao (context) {
      context.commit('delInformacaoStore')
    },
    getTotalAct (context, data) {
      context.commit('setTotal', data)
    },
    delTotalAct (context, data) {
      context.commit('delTotalMut', data)
    },
    delTotalVendaAct (context, data) {
      context.commit('delTotalVendaMut', data)
    },
    getFinalizar (context, data) {
      context.commit('setFinalizar', data)
    },
    getServico (context, data) {
      context.commit('setServico', data)
    },
    delServico (context, data) {
      context.commit('delServicoMut', data)
    },
    excluirServico (context, data) {
      //console.log(data.servico)
      context.commit('excluirServicoMut', data)
    }
  }
})
