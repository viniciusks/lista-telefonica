import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clienteSelecionado: [],
    contatoList: [],
    servicosList: [],
    servicos: [],
    vendas: [],
    total: 0
  },
  mutations: {

    // inclusão de dados
    setContatoList (state, data) {
      state.contatoList.push(data)      
    },
    setservicoList (state, data) {
      state.servicosList.push(data)
    },
    setId (state, indice) {
      state.id = indice
      console.log(state.id)
    },
    setInformacao (state, indice) {
      state.clienteSelecionado = state.contatoList[indice]
    },
    setTotal (state, data) {
      state.total += data.price
    },
    setFinalizar (state, data) {
      state.vendas.push(data)
    },
    setServico (state, data) {
      state.servicos.push(data)
    },
    incluirServicoMut (state, data) {
      let dado = state.vendas[data.id].servicos
      state.vendas[data.id].qtdServicos += 1
      dado.push(data.servico)
      console.log(state.vendas)
    },
    setFlag (state, data) {
      let indice = data.servico.indice
      if (state.vendas[data.id].servicos[indice].flag == 2) {
        state.vendas[data.id].servicos[indice].flag = 1
      }
    },

    // update de informações
    updateContatoList (state, data) {      
      state.contatoList[data.id].name = data.inf.name
      state.contatoList[data.id].email = data.inf.email
      state.contatoList[data.id].numero = data.inf.numero      
    },

    // pega informações
    getTotalVendaMut (state, data) {
      state.vendas[data.id].total += data.servico.price
    },

    // sincronização de id's e indices
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
    
    // deletar as informações
    delContato (state, indice) {
      let contatoList = state.contatoList
      contatoList.splice(indice, 1)
    },
    delInformacaoStore (state) {
      state.clienteSelecionado = ''
    },
    delTotalMut (state, data) {
      state.total -= data.price
    },
    delTotalVendaMut (state, data) {
      state.vendas[data.id].total -= data.servico.price
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
    },
    excluirFromVenda (state, indice) {
      state.vendas.splice(indice, 1)
    }
  },
  actions: {
    // chama "set's"
    newContato (context, data) {      
      context.commit('setContatoList', data)
    },
    newServico (context, data) {
      context.commit('setservicoList', data)
    },
    getId (context, indice) {
      context.commit('setId', indice)
    },
    getInformacao (context, indice) {
      context.commit('setInformacao', indice)
    },
    getTotalAct (context, data) {
      context.commit('setTotal', data)
    },
    getFinalizar (context, data) {
      context.commit('setFinalizar', data)
    },
    getServico (context, data) {
      context.commit('setServico', data)
    },
    getFlag (context, data) {
      context.commit('setFlag', data)
    },

    // chama "update"
    editContato (context, data) {      
      context.commit('updateContatoList', data)
    },

    // chama "get's"
    getTotalVendaAct (context, data) {
      context.commit('getTotalVendaMut', data)
    },

    // chama "sync's"
    syncIndices (context) {
      context.commit('syncIndicesMut')
    },
    syncIndiceServico (context, data) {
      context.commit('syncIndiceServicoMut', data)
    },

    // chama "excluir"
    removeContato (context, indice) {
      context.commit('delContato', indice)
    },
    delInformacao (context) {
      context.commit('delInformacaoStore')
    },
    delTotalAct (context, data) {
      context.commit('delTotalMut', data)
    },
    delTotalVendaAct (context, data) {
      context.commit('delTotalVendaMut', data)
    },
    delServico (context, data) {
      context.commit('delServicoMut', data)
    },
    incluirServicoAct (context, data) {
      context.commit('incluirServicoMut', data)
    },
    excluirServico (context, data) {
      context.commit('excluirServicoMut', data)
    },
    removeFromVenda (context, indice) {
      context.commit('excluirFromVenda', indice)
    }
  }
})
